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
  if (isEmpty(error.custom_message)) {
    error = {};
    error.custom_message = "something went wrong";
  }
  return error;
};

module.exports.checkError = checkError;
/*-------------------------------------------------------------------------------------------------------*/
const slugify = require("slugify");
const fs = require("fs");
const Jimp = require("jimp");

const sizes = {
  thumbnail: [150, 150],
  medium: [300, 300],
  large: [1024, 1024]
};

const imageUpload = async (upload, uploadPath) => {
  let { filename, mimetype, encoding, createReadStream } = await upload;
  let stream = createReadStream();

  filename = slugify(filename, { lower: true, replacement: "-" });
  filename = Date.now() + "-" + filename;

  let original = uploadPath + "original/" + filename;
  let large = uploadPath + "large/" + filename;
  let medium = uploadPath + "medium/" + filename;
  let thumbnail = uploadPath + "thumbnail/" + filename;

  let path = "." + original;

  return new Promise((resolve, reject) =>
    stream
      .on("error", error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      // .on('error', error => reject(error))
      .on("finish", () => {
        for (let i in sizes) {
          Jimp.read(path, (err, image) => {
            if (err) throw err;
            image
              .resize(sizes[i][0], sizes[i][1]) // resize
              .quality(70) // set JPEG quality
              //.greyscale() // set greyscale
              .write("." + uploadPath + i + "/" + filename); // save
          });
        }

        resolve({
          original,
          large,
          medium,
          thumbnail
        });
      })
  );
};

module.exports.imageUpload = imageUpload;
/*-------------------------------------------------------------------------------------------------------*/

const imageUnlink = imgObject => {
  for (let i in imgObject) {
    //fs.unlinkSync("." + imgObject[i]);
    fs.unlink("." + imgObject[i], function(err) {
      if (err) console.log(err);
    });
  }
};

module.exports.imageUnlink = imageUnlink;
