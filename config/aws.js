const AWS = require("aws-sdk");
const fs = require("fs");
const  key = require('../config/keys');

const ID = key.accessKeyId;
const SECRET = key.secretAccessKey;
const BUCKET_NAME = key.bucketName;
const bucketBaseURL = key.bucketBaseURL;





async function checkAwsFolder(type) {

  //console.log('BUCKETBASEURL',bucketBaseURL);
  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
  });

  if( type == 'blog'){

    var blogparam = {
    Bucket: BUCKET_NAME,
    Key: "blog"
  };

  var featureparam = {
    Bucket: BUCKET_NAME,
    Key: "blog/feature"
  };

  var largeparam = {
    Bucket: BUCKET_NAME,
    Key: "blog/feature/large"
  };

  var mediumparam = {
    Bucket: BUCKET_NAME,
    Key: "blog/feature/medium"
  };

  var originalparam = {
    Bucket: BUCKET_NAME,
    Key: "blog/feature/original"
  };

  var thumbnailparam = {
    Bucket: BUCKET_NAME,
    Key: "blog/feature/thumbnail"
  };

  try {
    await s3.headObject(blogparam).promise();
    await s3.headObject(featureparam).promise();
    await s3.headObject(largeparam).promise();
    await s3.headObject(mediumparam).promise();
    await s3.headObject(originalparam).promise();
    await s3.headObject(thumbnailparam).promise();
  } catch (err) {
    if (err.statusCode === 404) {
      s3.putObject(blogparam).promise();
      s3.putObject(featureparam).promise();
      s3.putObject(largeparam).promise();
      s3.putObject(mediumparam).promise();
      s3.putObject(originalparam).promise();
      s3.putObject(thumbnailparam).promise();
    }
  }

  }


  if( type == 'setting'){

    var settingparam = {
    Bucket: BUCKET_NAME,
    Key: "setting"
  };

  var largeparam = {
    Bucket: BUCKET_NAME,
    Key: "setting/large"
  };

  var mediumparam = {
    Bucket: BUCKET_NAME,
    Key: "setting/medium"
  };

  var originalparam = {
    Bucket: BUCKET_NAME,
    Key: "setting/original"
  };

  var thumbnailparam = {
    Bucket: BUCKET_NAME,
    Key: "setting/thumbnail"
  };

  try {
    await s3.headObject(settingparam).promise();
    await s3.headObject(largeparam).promise();
    await s3.headObject(mediumparam).promise();
    await s3.headObject(originalparam).promise();
    await s3.headObject(thumbnailparam).promise();
  } catch (err) {
    if (err.statusCode === 404) {
      s3.putObject(settingparam).promise();
      s3.putObject(largeparam).promise();
      s3.putObject(mediumparam).promise();
      s3.putObject(originalparam).promise();
      s3.putObject(thumbnailparam).promise();
    }
  }
  
  }

  if( type == 'productcategory'){

    
    var productparam = {
      Bucket: BUCKET_NAME,
      Key: "product"
    };
    
    var categoryparam = {
    Bucket: BUCKET_NAME,
    Key: "category"
  };

  var largeparam = {
    Bucket: BUCKET_NAME,
    Key: "product/category/large"
  };

  var mediumparam = {
    Bucket: BUCKET_NAME,
    Key: "product/category/medium"
  };

  var originalparam = {
    Bucket: BUCKET_NAME,
    Key: "product/category/original"
  };

  var thumbnailparam = {
    Bucket: BUCKET_NAME,
    Key: "product/category/thumbnail"
  };

  try {
    await s3.headObject(productparam).promise();
    await s3.headObject(categoryparam).promise();
    await s3.headObject(largeparam).promise();
    await s3.headObject(mediumparam).promise();
    await s3.headObject(originalparam).promise();
    await s3.headObject(thumbnailparam).promise();
  } catch (err) {
    if (err.statusCode === 404) {
      s3.putObject(productparam).promise();
      s3.putObject(categoryparam).promise();
      s3.putObject(largeparam).promise();
      s3.putObject(mediumparam).promise();
      s3.putObject(originalparam).promise();
      s3.putObject(thumbnailparam).promise();
    }
  }
  
  }


  if( type == 'brand'){

    var brandparam = {
    Bucket: BUCKET_NAME,
    Key: "brand"
  };

  var largeparam = {
    Bucket: BUCKET_NAME,
    Key: "brand/large"
  };

  var mediumparam = {
    Bucket: BUCKET_NAME,
    Key: "brand/medium"
  };

  var originalparam = {
    Bucket: BUCKET_NAME,
    Key: "brand/original"
  };

  var thumbnailparam = {
    Bucket: BUCKET_NAME,
    Key: "brand/thumbnail"
  };

  try {
    await s3.headObject(brandparam).promise();
    await s3.headObject(largeparam).promise();
    await s3.headObject(mediumparam).promise();
    await s3.headObject(originalparam).promise();
    await s3.headObject(thumbnailparam).promise();
  } catch (err) {
    if (err.statusCode === 404) {
      s3.putObject(brandparam).promise();
      s3.putObject(largeparam).promise();
      s3.putObject(mediumparam).promise();
      s3.putObject(originalparam).promise();
      s3.putObject(thumbnailparam).promise();
    }
  }
  
  }


  if( type == 'user'){

    var userparam = {
    Bucket: BUCKET_NAME,
    Key: "user"
  };

  var largeparam = {
    Bucket: BUCKET_NAME,
    Key: "user/large"
  };

  var mediumparam = {
    Bucket: BUCKET_NAME,
    Key: "user/medium"
  };

  var originalparam = {
    Bucket: BUCKET_NAME,
    Key: "user/original"
  };

  var thumbnailparam = {
    Bucket: BUCKET_NAME,
    Key: "user/thumbnail"
  };

  try {
    await s3.headObject(userparam).promise();
    await s3.headObject(largeparam).promise();
    await s3.headObject(mediumparam).promise();
    await s3.headObject(originalparam).promise();
    await s3.headObject(thumbnailparam).promise();
  } catch (err) {
    if (err.statusCode === 404) {
      s3.putObject(userparam).promise();
      s3.putObject(largeparam).promise();
      s3.putObject(mediumparam).promise();
      s3.putObject(originalparam).promise();
      s3.putObject(thumbnailparam).promise();
    }
  }
  
  }


  if( type == 'product'){

    var productparam = {
    Bucket: BUCKET_NAME,
    Key: "product"
  };

  var galleryparam = {
    Bucket: BUCKET_NAME,
    Key: "product/gallery"
  };



  var featureparam = {
    Bucket: BUCKET_NAME,
    Key: "product/feature"
  };

  var varientparam = {
    Bucket: BUCKET_NAME,
    Key: "product/varient"
  };

  var largeparam = {
    Bucket: BUCKET_NAME,
    Key: "product/feature/large"
  };

  var mediumparam = {
    Bucket: BUCKET_NAME,
    Key: "product/feature/medium"
  };

  var originalparam = {
    Bucket: BUCKET_NAME,
    Key: "product/feature/original"
  };

  var thumbnailparam = {
    Bucket: BUCKET_NAME,
    Key: "product/feature/thumbnail"
  };


  var glargeparam = {
    Bucket: BUCKET_NAME,
    Key: "product/gallery/large"
  };

  var gmediumparam = {
    Bucket: BUCKET_NAME,
    Key: "product/gallery/medium"
  };

  var goriginalparam = {
    Bucket: BUCKET_NAME,
    Key: "product/gallery/original"
  };

  var gthumbnailparam = {
    Bucket: BUCKET_NAME,
    Key: "product/gallery/thumbnail"
  };


  var vlargeparam = {
    Bucket: BUCKET_NAME,
    Key: "product/varient/large"
  };

  var vmediumparam = {
    Bucket: BUCKET_NAME,
    Key: "product/varient/medium"
  };

  var voriginalparam = {
    Bucket: BUCKET_NAME,
    Key: "product/varient/original"
  };

  var vthumbnailparam = {
    Bucket: BUCKET_NAME,
    Key: "product/varient/thumbnail"
  };





  try {
    await s3.headObject(productparam).promise();
    await s3.headObject(featureparam).promise();
    await s3.headObject(galleryparam).promise();
    await s3.headObject(varientparam).promise();
    await s3.headObject(largeparam).promise();
    await s3.headObject(mediumparam).promise();
    await s3.headObject(originalparam).promise();
    await s3.headObject(thumbnailparam).promise();
    await s3.headObject(glargeparam).promise();
    await s3.headObject(gmediumparam).promise();
    await s3.headObject(goriginalparam).promise();
    await s3.headObject(gthumbnailparam).promise();
    await s3.headObject(vlargeparam).promise();
    await s3.headObject(vmediumparam).promise();
    await s3.headObject(voriginalparam).promise();
    await s3.headObject(vthumbnailparam).promise();
  } catch (err) {
    if (err.statusCode === 404) {
      s3.putObject(productparam).promise();
      s3.putObject(featureparam).promise();
      s3.putObject(galleryparam).promise();
      s3.putObject(varientparam).promise();
      s3.putObject(largeparam).promise();
      s3.putObject(mediumparam).promise();
      s3.putObject(originalparam).promise();
      s3.putObject(thumbnailparam).promise();
      s3.putObject(glargeparam).promise();
      s3.putObject(gmediumparam).promise();
      s3.putObject(goriginalparam).promise();
      s3.putObject(gthumbnailparam).promise();
      s3.putObject(vlargeparam).promise();
      s3.putObject(vmediumparam).promise();
      s3.putObject(voriginalparam).promise();
      s3.putObject(vthumbnailparam).promise();
    }
  }
  
  }


  


  


}


async function uploadFile(filePath,filename,awspath) {

    // console.log('filePath----',filePath);
    // console.log('filename----',filename);
    // console.log('awspath----',awspath);
    const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET
      });

      const  fpath    = filePath.substring(1);
      //console.log('fpath---',fpath);
      const fileContent = fs.readFileSync(fpath);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${awspath}/${filename}`,
        Body: fileContent,
        ACL: 'public-read'
    };

    try {
      //console.log('beforedata');
      const stored = await s3.upload(params).promise();
      //console.log('response---------------',stored);
      //console.log('KEY---------------',stored.Key);
      console.log('KEY---------------',stored.Location);
      return stored.Key;
    }catch(error){
      return '';
    }
    //console.log('beforereturn') 
  }


  async function FileDelete(filekey) {

    const s3 = new AWS.S3({
      accessKeyId: ID,
      secretAccessKey: SECRET
  });
  
  var options = {
      Bucket    : BUCKET_NAME ,
      Key    : filekey,
  };
    try {
      
      const filedeleted = await s3.deleteObject(options).promise();
      //console.log('Deleted',filedeleted); 
      return filedeleted;
    }catch(error){
      return error;
    }
    
    
  }

module.exports = {
    checkAwsFolder: checkAwsFolder, 
    uploadFile: uploadFile,
    FileDelete : FileDelete
}