const Messages = require("./messages");

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports.isEmpty = isEmpty;
/*-------------------------------------------------------------------------------------------------------*/
const putError = (value) => {
  const error = {};
  error.custom_message = value;
  return error;
};

module.exports.putError = putError;
/*-------------------------------------------------------------------------------------------------------*/
const checkError = (error) => {
  console.log(error.message);
  if (isEmpty(error.custom_message)) {
    error = {};
    error.custom_message = "something went wrong";
  }
  return error;
};

module.exports.checkError = checkError;
/*-------------------------------------------------------------------------------------------------------*/

const { AuthenticationError } = require("apollo-server-express");

const checkToken = (token) => {
  if (token === false) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }
  return;
};



module.exports.checkToken = checkToken;
/*-------------------------------------------------------------------------------------------------------*/

const slugify = require("slugify");
const stringTourl = (str) => {
  var brandName = str.replace(/[^a-z0-9\s\-]/gi, "-");
  brandName = slugify(brandName, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
  });

  if (isEmpty(brandName) || brandName === "-") {
    /* brandName = Math.floor(Math.random() * 1000 + 1);
    brandName = brandName.toString(); */
    var date = new Date();
    brandName = date.getTime().toString();
  }

  return brandName;
};

module.exports.stringTourl = stringTourl;

const validateUrl = (url) => {
  var validthis = /\-[0-9]$/; //regex for test "-(number 0-9)"
  if (validthis.test(url)) {
    let i = parseInt(url[url.length - 1]) + 1;
    return url.slice(0, url.length - 1) + i;
  } else {
    return url + "-2";
  }
};

module.exports.validateUrl = validateUrl;

const updateUrl = async (url, table) => {
  var url = stringTourl(url);
  switch (table) {
    case "Product":
      var Table = require("../models/Product");
      break;
    case "ProductCat":
      var Table = require("../models/ProductCat");
      break;
    case "Blog":
      var Table = require("../models/Blog");
      break;
    case "Brand":
      var Table = require("../models/Brand");
      break;
  }

  var duplicate = true;
  while (duplicate) {
    let data = await Table.findOne({ url: url });
    if (data) {
      url = validateUrl(url);
    } else {
      duplicate = false;
      return Promise.resolve(url);
    }
  }
};

module.exports.updateUrl = updateUrl;

/*-------------------------------------------------------------------------------------------------------*/

const fs = require("fs");
const Jimp = require("jimp");
const sharp = require("sharp");

//const path = require("path");
//const pathToFile = path.dirname(require.main.filename);

const sizes = {
  thumbnail: [150, 150],
  medium: [300, 300],
  large: [1024, 1024],
};

const sharpResize = (path, i, uploadPath, filename) => {
  return new Promise((resolve, reject) => {
    try {
      sharp(path)
        .resize(sizes[i][0], sizes[i][1])
        .toBuffer()
        .then((data) => {
          fs.writeFileSync(`.${uploadPath + i}/${filename}`, data);
          return resolve(true);
        })
        .catch((err) => {
          console.log(err);
          return resolve(false);
        });
    } catch (error) {
      return resolve(false);
    }
  });
};

const jimpResize = (path, i, uploadPath, filename) => {
  return new Promise((resolve, reject) => {
    try {
      Jimp.read(path, (err, image) => {
        if (err) {
          //throw err;
          console.log("jimp", err);
          return resolve(false);
        }

        image
          .resize(sizes[i][0], sizes[i][1]) // resize
          .quality(70) // set JPEG quality
          .write("." + uploadPath + i + "/" + filename); // save

        return resolve(true);
      });
    } catch (error) {
      return resolve(false);
    }
  });
};

const imageUpload = async (upload, uploadPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { filename, mimetype, encoding, createReadStream } = await upload;

      const extensions = ["gif", "jpeg", "jpg", "png", "webp", "svg"];
      
      let ext = filename.split(".");
      ext = ext.pop();
      ext = ext.toLowerCase();
      if (!~extensions.indexOf(ext)) {
        return resolve({
          success: false,
          message: "This extension not allowed",
        });
      }

      let stream = createReadStream();

      filename = slugify(filename, { lower: true, replacement: "-" });
      filename = Date.now() + "-" + filename;

      let original = uploadPath + "original/" + filename;
      let large = uploadPath + "large/" + filename;
      let medium = uploadPath + "medium/" + filename;
      let thumbnail = uploadPath + "thumbnail/" + filename;
      let path = "." + original;

      if (!fs.existsSync("." + uploadPath + "original/")) {
        return resolve({
          success: false,
          message: "Path does not exist",
        });
      }

      stream
        .on("error", (error) => {
          console.log(JSON.stringify(error));

          fs.unlink(path, function (err) {
            if (err) console.log(err);
          });
          return resolve({
            success: false,
            message: "This image can't be upload 1",
          });
        })

        .pipe(fs.createWriteStream(path))

        .on("finish", async () => {
          for (let i in sizes) {
            if (ext === "svg") {
              fs.copyFileSync(path, `.${uploadPath + i}/${filename}`);
              continue;
            }

            let resized = await sharpResize(path, i, uploadPath, filename);

            if (resized) {
              continue;
            } else {
              //fs.unlinkSync(path);
              fs.unlink(path, function (err) {
                if (err) console.log(err);
              });
              return resolve({
                success: false,
                message: "This image can't be upload 2",
              });
            }
          }

          return resolve({
            success: true,
            data: {
              original,
              large,
              medium,
              thumbnail,
            },
          });
        });
    } catch (error) {
    //  console.log(error);
      return resolve({
        success: false,
        message: "This image can't be upload 3",
      });
    }
  });
};

module.exports.imageUpload = imageUpload;
/*-------------------------------------------------------------------------------------------------------*/

const imageUnlink = (imgObject) => {
  console.log("is here comes", imgObject);
  for (let i in imgObject) {
    //console.log("here comes", imgObject[i]);
    //fs.unlinkSync("." + imgObject[i]);
    fs.unlink("." + imgObject[i], function (err) {
      if (err) console.log(err);
    });
  }
};

module.exports.imageUnlink = imageUnlink;

/*---------------------------------------------------------------------------------------------------------------*/
const getdate = (format, timezone = "UTC", date) => {
  var d;
  if (isEmpty(date)) {
    d = new Date();
  } else {
    d = new Date(date);
  }

  switch (format) {
    case "1": {
      const dtf = new Intl.DateTimeFormat("en", {
        timeZone: timezone,
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye },
      ] = dtf.formatToParts(d);
      return `${mo} ${da}, ${ye}`;
      break;
    }
    case "2": {
      const dtf = new Intl.DateTimeFormat("en", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye },
      ] = dtf.formatToParts(d);
      return `${ye}-${mo}-${da}`;
      break;
    }
    case "3": {
      const dtf = new Intl.DateTimeFormat("en", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye },
      ] = dtf.formatToParts(d);
      return `${mo}/${da}/${ye}`;
      break;
    }
    case "4": {
      const dtf = new Intl.DateTimeFormat("en", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye },
      ] = dtf.formatToParts(d);
      return `${da}/${mo}/${ye}`;
      break;
    }
  }
};

module.exports.getdate = getdate;

const MESSAGE_RESPONSE = (type, item, success) => {
  return {
    message: Messages[type].replace(":item", item),
    success: success,
  };
};

module.exports.MESSAGE_RESPONSE = MESSAGE_RESPONSE;