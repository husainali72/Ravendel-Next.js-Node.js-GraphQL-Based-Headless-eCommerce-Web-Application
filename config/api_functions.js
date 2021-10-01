const { checkToken, imageUnlink, imageUpload, isEmpty, MESSAGE_RESPONSE } = require("./helpers");
const validate = require("../validations/blog");

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
  let page = pageNumber || 1
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
    console.log('response', response)
    if(response){
      return {
        message: MESSAGE_RESPONSE("SINGLE_RESULT_FOUND", name, true),
        data: response,
      };
    }else{
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
    const response = await modal.findOne({ url });

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

const GET_ALL_FUNC = async (modal, name) => {
  try {
    const response = await modal.find({});
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

const DELETE_FUNC = async (token, delete_id, modal, name) => {
  if (!token) {
    return MESSAGE_RESPONSE("TOKEN_REQ", name, false);
  }
  checkToken(token);
  if (!delete_id) {
    return MESSAGE_RESPONSE("ID_ERROR", name, false);
  }
  try {
    const response = await modal.findByIdAndRemove(delete_id);
    if (response) {
      if (response.feature_image) {
        imageUnlink(response.feature_image);
      }
      return MESSAGE_RESPONSE("DELETE", name, true);
    }
    return MESSAGE_RESPONSE("NOT_EXIST", name, false);
  } catch (error) {
    return MESSAGE_RESPONSE("DELETE_ERROR", name, false);
  }
};

const CREATE_FUNC = async (token, name, modal, data, method, path) => {
  if (!token) {
    return MESSAGE_RESPONSE("TOKEN_REQ", name, false);
  }
  checkToken(token);
  try {
    const errors = validate(method, data);
    if (!isEmpty(errors)) {
      return {
        message: errors,
        success: false,
      };
    }
    if (data.feature_image) {
      let imgObject = "";
      if (args.feature_image) {
        imgObject = await imageUpload(args.feature_image, path);

        if (imgObject.success === false) {
          return {
            message: imgObject.message || 'Something went wrong with upload featured image' ,
            success: false
          }
        }
      }
      data.feature_image = imgObject.data || imgObject;
    }
    if (data.name) {
      const response = await modal.findOne({ name: data.name });
      if (response) {
        return MESSAGE_RESPONSE("DUPLICATE", "Name", false);
      }
    }
    const response = new modal(data);
    await response.save();
    return MESSAGE_RESPONSE("AddSuccess", name, true);
  } catch (error) {
    return MESSAGE_RESPONSE("CREATE_ERROR", name, false);
  }
};

const UPDATE_FUNC = async (
  token,
  method,
  updateId,
  modal,
  name,
  data,
  path
) => {
  if (!token) {
    return MESSAGE_RESPONSE("TOKEN_REQ", name, false);
  }
  checkToken(token);
  try {
    const errors = validate(method, data);
    if (!isEmpty(errors)) {
      return {
        message: errors,
        success: false,
      };
    }
    if (!updateId) {
      return MESSAGE_RESPONSE("ID_ERROR", name, false);
    }
    const response = await modal.findById({ _id: updateId });
    if (response) {
      if (args.updatedImage) {
        let imgObject = await imageUpload(args.updatedImage, path);
        if (imgObject.success === false) {
          // throw putError(imgObject.message);
          return {
            message: imgObject.message || 'Something went wrong with upload featured image' ,
            success: false
          }
        } else {
          imageUnlink(response.feature_image);
          response.feature_image = imgObject.data;
        }
      }
      response.data;
      await response.save();
      return MESSAGE_RESPONSE("UpdateSuccess", name, true);
    }
    return MESSAGE_RESPONSE("NOT_EXIST", name, false);
  } catch (error) {
    return MESSAGE_RESPONSE("UPDATE_ERROR", name, false);
  }
};

module.exports.DELETE_FUNC = DELETE_FUNC;
module.exports.UPDATE_FUNC = UPDATE_FUNC;
module.exports.CREATE_FUNC = CREATE_FUNC;
module.exports.GET_ALL_FUNC = GET_ALL_FUNC;
module.exports.GET_BY_URL = GET_BY_URL;
module.exports.GET_BY_PAGINATIONS = GET_BY_PAGINATIONS;
module.exports.GET_SINGLE_FUNC = GET_SINGLE_FUNC;
