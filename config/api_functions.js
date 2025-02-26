const {
  checkToken,
  imageUnlink,
  imageUpload,
  isEmpty,
  MESSAGE_RESPONSE,
  _validate,
  prodAvgRating,
  UploadImageLocal,
  sendEmailTemplate
} = require("./helpers");
const bcrypt = require("bcryptjs");
const Setting = require("../models/Setting");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const GET_BY_PAGINATIONS = async (
  limit,
  pageNumber,
  orderBy,
  order,
  searchInFields,
  Modal,
  Name
) => {
  let sort = orderBy ? orderBy : "_id";
  let sortDirection = order === "DESC" ? -1 : 1;
  let per_page = limit || 10;
  let page = pageNumber || 1;
  const [
    {
      total: [total = 0],
      edges,
    },
  ] = await Modal.aggregate([
    { $match: searchInFields },
    {
      $facet: {
        total: [{ $group: { _id: null, count: { $sum: 1 } } }],
        edges: [
          { $sort: { [sort]: sortDirection } },
          { $skip: per_page * (page - 1) },
          { $limit: per_page },
        ],
      },
    },
    {
      $project: {
        total: "$total.count",
        edges: "$edges",
      },
    },
  ]);
  if (!edges.length) {
    return {
      pagination: { totalCount: total, page: page },
      data: edges,
      message: MESSAGE_RESPONSE("RETRIEVE_ERROR", Name, false),
    };
  } else {
    return {
      message: MESSAGE_RESPONSE("RESULT_FOUND", Name, true),
      pagination: { totalCount: total, page: page },
      data: edges,
    };
  }
};

const GET_SINGLE_FUNC = async (id, modal, name) => {
  if (!id) {
    return {
      message: MESSAGE_RESPONSE("ID_ERROR", name, false),
    };
  }
  try {
    const response = await modal.findById(id);
    if (response) {
      return {
        message: MESSAGE_RESPONSE("SINGLE_RESULT_FOUND", name, true),
        data: response,
      };
    } else {
      return {
        message: MESSAGE_RESPONSE("RETRIEVE_ERROR", name, false),
        data: response,
      };
    }
  } catch (error) {
    return {
      message: MESSAGE_RESPONSE("RETRIEVE_ERROR", name, false),
    };
  }
};

const GET_BY_ROOT_ID = async (id, modal, name) => {
  if (!id) {
    return {
      message: MESSAGE_RESPONSE("ID_ERROR", name, false),
    };
  }
  try {
    const response = await modal.find({
      categoryId: { $in: root.id },
    });
    if (response) {
      return {
        message: MESSAGE_RESPONSE("SINGLE_RESULT_FOUND", name, true),
        data: response,
      };
    } else {
      return {
        message: MESSAGE_RESPONSE("RETRIEVE_ERROR", name, false),
        data: response,
      };
    }
  } catch (error) {
    return {
      message: MESSAGE_RESPONSE("RETRIEVE_ERROR", name, false),
    };
  }
};
const GET_BY_URL = async (modal, url, name) => {
  if (!url) {
    return {
      message: MESSAGE_RESPONSE("URL_ERROR", name, false),
    };
  }
  try {
    const response = await modal.findOne({ url: url });

    return {
      message: MESSAGE_RESPONSE("RESULT_FOUND", name, true),
      data: response,
    };
  } catch (error) {
    return {
      message: MESSAGE_RESPONSE("RETRIEVE_ERROR", name, false),
    };
  }
};

const GET_ALL_FUNC = async (modal, name, admin, sortField = "date") => {
  try {
    let response;
    const sortObj = { [sortField]: -1 };

    if (modal === Product && !admin) response = await modal.find({ status: "Publish" }).sort(sortObj);
    else if (modal === Customer) response = await modal.find({status: "ACTIVE"}).sort(sortObj);
    else response = await modal.find({}).sort(sortObj);

    if(response.length) {
      return {
        message: MESSAGE_RESPONSE("RESULT_FOUND", name, true),
        data: response,
      };
    } else {
      return {
        message: MESSAGE_RESPONSE("RETRIEVE_ERROR", name, false),
        data: response,
      };
    }
  } catch (error) {
    return {
      message: MESSAGE_RESPONSE("RETRIEVE_ERROR", name, false),
    };
  }
};

const DELETE_FUNC = async (token, delete_id, modal, name) => {
  if (!token) {
    return MESSAGE_RESPONSE("TOKEN_REQ", name, false);
  }
  checkToken(token);
  if (!delete_id) {
    return MESSAGE_RESPONSE("ID_ERROR", name, false);
  }
  try {
    let response;
    if(name === "Customers") {
      response = await modal.findByIdAndUpdate({ _id: delete_id }, { status: "DELETED" });
    }
    else {
      response = await modal.findByIdAndDelete({ _id: delete_id });
    }
    const setting = await Setting.findOne({});
    if (response) {
      if (response.feature_image || response.image) {
        imageUnlink(response.feature_image || response.feature_image);
      }
      return MESSAGE_RESPONSE("DELETE", name, true);
    }

    return MESSAGE_RESPONSE("NOT_EXIST", name, false);
  } catch (error) {
    return MESSAGE_RESPONSE("DELETE_ERROR", name, false);
  }
};

const CREATE_FUNC = async (
  token,
  name,
  modal,
  data,
  args,
  path,
  validation,
  modal2
) => {

  /////////////////////////////////////////
  if (!data.queryName && !token) {
    return MESSAGE_RESPONSE("TOKEN_REQ", name, false);
  }
  //////////////////////////////////////////
  try {
    const errors = _validate(validation, data);
    if (!isEmpty(errors)) {
      return {
        message: errors,
        success: false,
      };
    }

    if (name === "Review") {
      const customer = await Customer.findById(new mongoose.Types.ObjectId(data.customerId));
      if (!customer) return MESSAGE_RESPONSE("NOT_EXIST", "Customer", false);
      const product = await Product.findById(new mongoose.Types.ObjectId(data.productId))
      if (!product) return MESSAGE_RESPONSE("NOT_EXIST", "Product", false);
    }
    //console.log('DATA', data) ;
    //console.log('ARGUMENT', args) ;

    // if (args.feature_image || args.image) {
    //   let imgObject = "";
    //   imgObject = await imageUpload(data.feature_image.file || data.image, path);

    //   if (imgObject.success === false) {
    //     return {
    //       message:
    //         imgObject.message ||
    //         "Something went wrong with upload featured image",
    //       success: false,
    //     };
    //   }
    //   data.feature_image = imgObject.data || imgObject;
    // }

    if (args.feature_image || args.image || args.thumbnail_image) {
      let imgObject = "";
      let imgObject2 = "";
      let image = null;
      let image2 = null;

      if (data.feature_image) {
        image = data.feature_image.file;
      }
      if (data.image) {
        image = data.image[0].file;
      }

      if (data.upload_image) {
        image = data.upload_image[0].file;
      }
      if (data.upload_thumbnail_image) {
        image2 = data.upload_thumbnail_image[0].file;
      }
      
      if (name && name === "User") {
        image = data.image.file;
      }
      const setting = await Setting.findOne({});

      if (setting.imageStorage.status === 's3') {
        imgObject = await imageUpload(image, path, name, data.url);
      } else {
        if(args.feature_image || args.image ){
          imgObject = await UploadImageLocal(image, path, name);
        }
        if (args.thumbnail_image) {
          imgObject2 = await UploadImageLocal(image2, path, name);
          data.thumbnail_image = imgObject2?.data || imgObject2;
        }
      }

      if ((name && name === "Product Category") || name && name === "User") {
        data.image = imgObject?.data || imgObject;
      } else {
        data.feature_image = imgObject?.data || imgObject;
      }
    }
    if (data.name) {
      const nameresponse = await modal.findOne({ name: data.name });
      if (nameresponse) {
        return MESSAGE_RESPONSE("DUPLICATE", "Name", false);
      }
    }
    if (data.email && name !== "Review") {
      const emailresponse = await modal.find({ $and: [{ productId: data.productId }, { email: data.email }] });
      //console.log("emailres===",emailresponse)
      if (emailresponse.length > 0) {
        return MESSAGE_RESPONSE("DUPLICATE", "Email", false);
      }
    }
    //console.log('DATA--------',data);
    const response = new modal(data);

    if (data.password) {
      response.password = await bcrypt.hash(data.password, 10);
    }

    if (name !== "Page" && name !== "Product Attribute") response.updated = Date.now()

    await response.save();
    // update average rating of product related to reviews
    if (name === "Review") {
      await prodAvgRating(data.productId, modal, modal2)
    }

    if(name === "Customer"){
      sendEmailTemplate("WELCOME", data)
    }

    return MESSAGE_RESPONSE("AddSuccess", name, true);
  } catch (error) {
    return MESSAGE_RESPONSE("CREATE_ERROR", name, false);
  }
};

const UPDATE_FUNC = async (
  token,
  updateId,
  modal,
  name,
  data,
  path,
  args,
  validation,
  modal2
) => {
  if (!token) {
    return MESSAGE_RESPONSE("TOKEN_REQ", name, false);
  }
  checkToken(token);
  try {
    const errors = _validate(validation, data);
    if (!isEmpty(errors)) {
      return {
        message: errors,
        success: false,
      };
    }
    if (!updateId) {
      return MESSAGE_RESPONSE("ID_ERROR", name, false);
    }
    let response = await modal.findById(updateId);
    if (response) {
      if (args.updatedImage || args.update_image || args.upload_thumbnail_image || args.upload_image) {
        let imgObject = "";
        let imgObject2 = "";
        let image = null;
        let image2 = null;
        if (args.upload_image) {
          image = args.upload_image[0].file;
        }

        if (args.upload_thumbnail_image) {
          image2 = args.upload_thumbnail_image[0].file;
        }

        if (args.updatedImage) {
          image = args.updatedImage.file;
        }
        if (args.update_image) {
          image = args.update_image[0].file; /// this image are in array let check it
        }
        const setting = await Setting.findOne({});

        // if (data.image) {
        //      image = data.image[0].file;   /// this image are in array let check it
        // }
        // imgObject = await imageUpload(image, path, name);
        if (setting?.imageStorage?.status === "s3") {
          imgObject = await imageUpload(image, path, name);
        } else {
          if (args.updatedImage || args.update_image || args.upload_image || args.feature_image) {
            imgObject = await UploadImageLocal(image, path, name);
          }
          if (args.upload_thumbnail_image) {
            imgObject2 = await UploadImageLocal(image2, path, name);
            data.upload_thumbnail_image = imgObject2.data;
          }
        }

        if (imgObject?.success === false || imgObject2?.success === false) {
          return {
            message: imgObject.message || "Something went wrong with upload featured image",
            success: false,
          };
        } else {
          if (args.updatedImage || args.update_image || args.upload_image) {
            imageUnlink(response.image);
            data.image = imgObject.data || imgObject;
          }
          if (args.upload_thumbnail_image) {
            imageUnlink(response.thumbnail_image);
            data.thumbnail_image = imgObject2.data || imgObject;
          }
          if (args.feature_image) {
            imageUnlink(response.feature_image);
            data.feature_image = imgObject.data || imgObject;
          }
        }
      }
      if (data?.password && data?.password?.length != 0) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      else{
        data.password = response.password
      }

      for (const [key, value] of Object.entries(data)) {
        response[key] = value;
      }
      
      if (data.gender === "" && data.gender === null) {
        return {
          message: "Invalid gender",
          success: false,
        };
      }
      if (name !== "Page" && name !== "Product Attribute") response.updated = Date.now();

      response = await modal.findByIdAndUpdate({ _id: response._id }, { ...response });
      // await response.save();
      // // update average rating of product related to reviews
      if (name === "Review") {
        await prodAvgRating(data.productId, modal, modal2);
      }
      return MESSAGE_RESPONSE("UpdateSuccess", name, true);
    }
    return MESSAGE_RESPONSE("NOT_EXIST", name, false);
  } catch (error) {
    console.log("error in update : ", error);
    return MESSAGE_RESPONSE("UPDATE_ERROR", name, false);
  }
};

const UPDATE_DEVICE_INFO = async (id, args, modal) => {
  if (!id) {
    return MESSAGE_RESPONSE("TOKEN_REQ", name, false);
  }

  const response = await modal.findById(id);

  if (response) {
    response.device_info = args.device_info;
    await response.save();
    return MESSAGE_RESPONSE("UpdateSuccess", "User", true);
  }
  return MESSAGE_RESPONSE("NOT_EXIST", "User", false);
};

UPDATE_PASSWORD_FUNC = async (
  token,
  updateId,
  modal,
  name,
  data,
  validation
) => {
  if (!token) {
    return MESSAGE_RESPONSE("TOKEN_REQ", name, false);
  }
  checkToken(token);
  try {
    const errors = _validate(validation, data);
    if (!isEmpty(errors)) {
      return {
        message: errors,
        success: false,
      };
    }
    if (!updateId) {
      return MESSAGE_RESPONSE("ID_ERROR", name, false);
    }
    const response = await modal.findById(updateId);
    if (response) {
      //  console.log("args", args);
      if (data.newPassword) {
        const isMatch = await bcrypt.compare(data.oldPassword, response.password)
        if (!isMatch) {
          return MESSAGE_RESPONSE("InvalidOldPassword", name, false);
        }
        if (data.newPassword === data.oldPassword) {
          return MESSAGE_RESPONSE("oldNewPasswordNotMatch", name, false);
        }
      }
      response.password = await bcrypt.hash(data.newPassword, 10);

      await response.save();
      return MESSAGE_RESPONSE("UpdateSuccess", name, true);
    }
    return MESSAGE_RESPONSE("NOT_EXIST", name, false);
  } catch (error) {
    // console.log("UPDATE_FUNC", error);
    return MESSAGE_RESPONSE("UPDATE_ERROR", name, false);
  }
}

module.exports.DELETE_FUNC = DELETE_FUNC;
module.exports.UPDATE_FUNC = UPDATE_FUNC;
module.exports.UPDATE_PASSWORD_FUNC = UPDATE_PASSWORD_FUNC;
module.exports.CREATE_FUNC = CREATE_FUNC;
module.exports.GET_ALL_FUNC = GET_ALL_FUNC;
module.exports.GET_BY_URL = GET_BY_URL;
module.exports.GET_BY_PAGINATIONS = GET_BY_PAGINATIONS;
module.exports.GET_SINGLE_FUNC = GET_SINGLE_FUNC;
module.exports.GET_BY_ROOT_ID = GET_BY_ROOT_ID;
module.exports.UPDATE_DEVICE_INFO = UPDATE_DEVICE_INFO;
