const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const slugify = require("slugify");
// @route   Post api/posts
// @desc    upload files for blogs and pages
// @access  public
router.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req);
  form.maxFileSize = 5000000;
  form.on("fileBegin", function(name, file) {
    let filename = slugify(file.name, { lower: true, replacement: "-" });
    filename = Date.now() + "-" + filename;
    file.path = "./assets/images/blog/content/" + filename;
  });
  form.on("file", function(name, file) {
    console.log("Uploaded " + file.name);
    res.json({ location: file.path.substr(1) });
  });
  form.on("error", function(err) {
    //console.log(err);
    res.status(404).send("Invalid image");
  });
});

module.exports = router;
