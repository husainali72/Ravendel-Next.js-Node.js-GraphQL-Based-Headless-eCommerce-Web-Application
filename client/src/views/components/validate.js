import { PhoneNumberUtil } from "google-libphonenumber";
import { capitalize, get } from "lodash";

const isNullOrWhitespace = (value) => value === "" || /^\s*$/.test(value);

const generateErrorMessage = (name, key, prefix = '') => {
  let msg = key ? `${key} ${name}` : name;
  msg = capitalize(msg.replaceAll("_", " "));
  return `${prefix}${msg} is required`;
};

export const validate = (names, args) => {
  let errors = "";
  if (names && names?.length > 0) {
    names?.map((name) => {
      const value = args[name];
      if (isNullOrWhitespace(value) || (name === "discountValue" && isNaN(value))) {
        errors = generateErrorMessage(name, null);
      } else if (Array.isArray(value) && value.length === 0) {
        errors = generateErrorMessage("Category field", null);
      }
    });
  }
  return errors;
};

export const validatenestedArray = (main, names, args, key) => {
  let errors = "";
  if (names && names?.length > 0) {
    args?.map((obj) => {
      names?.map((name) => {
        if (!obj[main][name]) {
          errors = generateErrorMessage(name, key);
        }
      });
    });
  }
  return errors;
};

export const validatenested = (main, names, args, key) => {
  let errors = "";
  if (names && names?.length > 0) {
    if (Array.isArray(args[main])) {
      if (args[main].length > 0) {
        args[main].map((obj) => {
          names?.map((name) => {
            if (isNullOrWhitespace(obj[name])) {
              if (name === "handle") {
                errors = generateErrorMessage("Link", null, obj.name + ' ');
              } else {
                errors = generateErrorMessage(name, key, capitalize(main) + ' ');
              }
            }
          });
        });
      } else {
        errors = generateErrorMessage(main, null, capitalize);
      }
    } else {
      names.map((name) => {
        const value = get(args, `${main}.${name}`);
        if (isNullOrWhitespace(value)) {
          errors = generateErrorMessage(name, null, capitalize(main) + ' ');
        }
      });
    }
  }
  return errors;
};

export const validatePhone = (names, args) => {
  let errors = "";
  if (names && names.length > 0) {
    names?.map((name) => {
      if (!args[name] || args[name] === "+") {
        errors = "Phone number is required";
      } else {
        try {
          const phone = args[name].replace(/^(\d{2})(\d{5})(\d{5})$/, "+$1 $2-$3");
          const phoneUtil = PhoneNumberUtil.getInstance();
          const valid = phoneUtil.isValidNumber(phoneUtil.parse(phone));
          if (!valid) {
            errors = "Phone number is invalid";
          }
        } catch (err) {
          errors = "Phone number is invalid";
        }
      }
    });
  }
  return errors;
};

export const validateNestedPhone = (main, names, args) => {
  let errors = "";
  if (names && names.length > 0) {
    names?.map((name) => {
      const value = get(args, `${main}.${name}`);
      if (!value || value === "+") {
        errors = "Phone number is required";
      } else {
        try {
          const phone = value.replace(/^(\d{2})(\d{5})(\d{5})$/, "+$1 $2-$3");
          const phoneUtil = PhoneNumberUtil.getInstance();
          const valid = phoneUtil.isValidNumber(phoneUtil.parse(phone));
          if (!valid) {
            errors = "Phone number is invalid";
          }
        } catch (err) {
          errors = "Phone number is invalid";
        }
      }
    });
  }
  return errors;
};
