export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

/*let baseURL = "";
if (process.env.NODE_ENV === "production") {
  baseURL = "http://159.89.170.199:80";
} else {
  baseURL = "http://localhost:8000";
}*/

//export const baseUrl = "http://159.89.170.199";
// export const baseUrl = "http://localhost:8000";
export const baseUrl = "http://localhost:8000";
export const app_router_base_url = '/'

export var bucketName = "revendal-image";
export var bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;

if (process.env.NODE_ENV === "production") {
  bucketName = "revendal-image-prod";
  bucketBaseURL = `https://${bucketName}.s3.amazonaws.com/`;
}
/*-------------------------------------------------------------------------------------------------------------------------------------- */
//simple category array to Tree array
export const unflatten = (arr) => {
  var tree = [],
    mappedArr = {},
    arrElem,
    mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for (var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id]["children"] = [];
  }

  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.parentId) {
        mappedArr[mappedElem["parentId"]]["children"].push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
};

/*----------------------------------------------------------------------------------------------------------------------------------------- */
//print tree array with html
// export var categoriesPrint = "";
// export const printTree = tree => {
//   categoriesPrint += "<ul>";

//   for (let i in tree) {
//     categoriesPrint += "<li>" + tree[i].name;
//     if (tree[i].children && tree[i].children.length) {
//       printTree(tree[i].children);
//     }
//     categoriesPrint += "</li>";
//   }

//   categoriesPrint += "</ul>";
// };

export var categoriesPrint = "";
export const printTree = (tree) => {
  categoriesPrint += "<ul className='category-dropdown'>";

  for (let i in tree) {
    categoriesPrint += `<li className="${tree[i].children && tree[i].children.length ? "has-submenu" : ""
      }">                               
                        <label for="${tree[i].name
      }" className="checkmark-container">${tree[i].name}
                          <input type='checkbox' name="abc" id="${tree[i].name
      }">
                          <span className="checkmark"></span>
                        </label>`;
    if (tree[i].children && tree[i].children.length) {
      printTree(tree[i].children);
    }
    categoriesPrint += "</li>";
  }

  categoriesPrint += "</ul>";
};

/*----------------------------------------------------------------------------------------------------------------------------------------------*/

export const getQueryString = (search, param) => {
  return new URLSearchParams(search).get(param);
};

/************************************************************************************************************************ */

export const getResponseHandler = (response, key) => {
  let success = false;
  let error = false;
  let message = "";
  let data = [];

  console.log("in response hanler");

  if (response && response.data && response.data[key]) {
    console.log("response", response);
    let res = response.data[key];
    if (res.message) {
      console.log(res);
      if (res.message.success) {
        if (res.data) {
          data = res.data;
        }
        success = true;
      } else {
        error = true;
      }
      if (res.message.message) {
        message = res.message.message;
      } else {
        message = "Something went wrong!";
      }
    } else {
      error = true;
      message = "Something went wrong!";
    }
  } else {
    message = "Something went wrong!";
  }

  console.log(success);

  return [error, success, message, data];
};

export const mutationResponseHandler = (response, key) => {
  let success = false;
  let error = false;
  let message = "";

  console.log("in response hanler");

  if (response && response.data && response.data[key]) {
    console.log("response", response);
    let res = response.data[key];
    if (res.message) {
      console.log(res);
      if (res.success) {
        console.log("success", res.success);
        success = true;
      } else {
        error = true;
      }
      if (res.message) {
        message = res.message;
      } else {
        message = "Something went wrong!";
      }
    } else {
      error = true;
      message = "Something went wrong!";
    }
  } else {
    message = "Something went wrong!";
  }

  console.log(success);

  return [error, success, message];
};