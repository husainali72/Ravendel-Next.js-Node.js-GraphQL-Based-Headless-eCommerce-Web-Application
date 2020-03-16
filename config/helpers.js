const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports.isEmpty = isEmpty;
/*-------------------------------------------------------------------------------------------------------*/
const putError = value => {
  const error = {};
  error.custom_message = value;
  return error;
};

module.exports.putError = putError;
/*-------------------------------------------------------------------------------------------------------*/
const checkError = error => {
  console.log(error);
  if (isEmpty(error.custom_message)) {
    error = {};
    error.custom_message = "something went wrong";
  }
  return error;
};

module.exports.checkError = checkError;
/*-------------------------------------------------------------------------------------------------------*/

const { AuthenticationError } = require("apollo-server-express");

const checkToken = token => {
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
const stringTourl = str => {
  var brandName = str.replace(/[^a-z0-9\s\-]/gi, "");
  brandName =
    "/" +
    slugify(brandName, {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true
    });

  return brandName;
};

module.exports.stringTourl = stringTourl;

/*-------------------------------------------------------------------------------------------------------*/

const fs = require("fs");
const Jimp = require("jimp");

const sizes = {
  thumbnail: [150, 150],
  medium: [300, 300],
  large: [1024, 1024]
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

      const extensions = ["gif", "jpeg", "jpg", "png"];
      let ext = filename.split(".");
      ext = ext.pop();
      ext = ext.toLowerCase();
      if (!~extensions.indexOf(ext)) {
        return resolve({
          success: false,
          message: "This image can't be upload"
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

      stream
        .on("error", error => {
          console.log(JSON.stringify(error));

          fs.unlink(path, function(err) {
            if (err) console.log(err);
          });
          return resolve({
            success: false,
            message: "This image can't be upload"
          });
        })

        .pipe(fs.createWriteStream(path))

        .on("finish", async () => {
          for (let i in sizes) {
            let resized = await jimpResize(path, i, uploadPath, filename);

            if (resized) {
              continue;
            } else {
              //fs.unlinkSync(path);
              fs.unlink(path, function(err) {
                if (err) console.log(err);
              });
              return resolve({
                success: false,
                message: "This image can't be upload"
              });
            }
          }

          return resolve({
            success: true,
            data: {
              original,
              large,
              medium,
              thumbnail
            }
          });
        });
    } catch (error) {
      return resolve({
        success: false,
        message: "This image can't be upload"
      });
    }
  });
};

module.exports.imageUpload = imageUpload;
/*-------------------------------------------------------------------------------------------------------*/

const imageUnlink = imgObject => {
  console.log("here comes", imgObject);
  for (let i in imgObject) {
    //console.log("here comes", imgObject[i]);
    //fs.unlinkSync("." + imgObject[i]);
    fs.unlink("." + imgObject[i], function(err) {
      if (err) console.log(err);
    });
  }
};

module.exports.imageUnlink = imageUnlink;

/*---------------------------------------------------------------------------------------------------------------*/
