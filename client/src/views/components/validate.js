import { PhoneNumberUtil } from "google-libphonenumber";
import { capitalize } from "lodash";
const isNullOrWhitespace = (value) => value === "" || /^\s*$/.test(value);
export const validate = (names, args) => {
  let errors = "";
  if (names && names.length > 0) {
    names.map((name) => {
      if (
        isNullOrWhitespace(args[name]) ||
        (name === "discountValue" && isNaN(args[name]))
      ) {
        const txt =
          name === "discountValue"
            ? "Discount value is required"
            : name.replaceAll("_", " ") + " is required";
        const str = txt.charAt(0).toUpperCase() + txt.slice(1);
        return (errors = str)
      }
      if (Array.isArray(args[name]) && args[name].length <= 0) {
        return (errors = `Category field is required`);
      }
    })
  }
  return errors;
};
export const validatenestedArray = (main, names, args, key) => {
  let errors = "";
  if (names && names.length > 0) {
    args.map((obj) => {
      names.map((name) => {
        if (!obj[main][name]) {
          if (key) {

            return (errors = `${key} ${name}  is required`);
          }
          else {
            let msg = name.charAt(0).toUpperCase() + name.slice(1)
            return (errors = `${msg}  is required`);
          }
        }
      })

    })
  }
  return errors;
}
export const validatenested = (main, names, args, key) => {
  let errors = "";
  if (names && names.length > 0) {
    if (Array.isArray(args[main])) {
      if (args[main].length > 0) {
        args[main].map((obj) => {
          names.map((name) => {
            if (isNullOrWhitespace(obj[name])) {
              if (name === "handle") {
                let msg = obj.name.charAt(0).toUpperCase() + obj.name.slice(1);
                return (errors = `${msg} Link is required`);
              } else if (key) {
                let msg = `${key} ${
                  name.charAt(0).toUpperCase() + name.slice(1)
                }`;
                return (errors = `${msg} is required`);
              } else {
                let msg = main.charAt(0).toUpperCase() + main.slice(1);
                return (errors = `${msg.replace("_", " ")} is required`);
              }
            }
          });
        });
      } else {
        return (errors = `${capitalize(main)} is required`);
      }
    } else {
      names.map((name) => {
        if (isNullOrWhitespace(args[main])) {
          return (errors = `${
            main.charAt(0).toUpperCase() + main.slice(1)
          } is required`);
        }
        if (isNullOrWhitespace(args[main][name])) {
          return (errors = `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } is required`);
        }
      })
    }
  }
  return errors;
};
export const validatePhone = (names, args) => {
  let errors = "";
  if (names && names.length > 0) {
    names.map((name) => {
      if (!args[name] || args[name] === "+") {
        return (errors = "Phone number is required");
      }
      try {
        let valid = false;
        const phone = args[name].replace(
          /^(\d{2})(\d{5})(\d{5})$/,
          "+$1 $2-$3"
        );
        const phoneUtil = PhoneNumberUtil.getInstance();
        valid = phoneUtil.isValidNumber(phoneUtil.parse(phone));
        if (!valid) {
          return (errors = "Phone number is invalid");
        }
      } catch (err) {
        return (errors = "Phone number is invalid");
      }
    });
  }
  return errors;
};
export const validateNestedPhone = (main, names, args) => {
  let errors = "";
  if (names && names.length > 0) {
    names.map((name) => {
      if (!args[main][name] || args[main][name] === "+") {
        return (errors = "Phone number is required");
      }
      try {
        let valid = false;
        const phone = args[main][name].replace(
          /^(\d{2})(\d{5})(\d{5})$/,
          "+$1 $2-$3"
        );
        const phoneUtil = PhoneNumberUtil.getInstance();

        valid = phoneUtil.isValidNumber(phoneUtil.parse(phone));
        if (!valid) {
          return (errors = "Phone number is invalid");
        }
      } catch (err) {
        return (errors = "Phone number is invalid");
      }
    });
  }
  return errors;
};

export const validatSpecification = (specifications) => {
  let errors = "";
  if (specifications && specifications?.length > 0) {
    specifications?.map((obj) => {
      if (isNullOrWhitespace(obj?.group)) {
        return (errors = `Group name is required`);
      }
      if (obj?.customFields && obj?.customFields?.length > 0) {
        obj?.customFields?.map((custom_field) => {
          if (!custom_field?.attributeValueId) {
            errors = `Specification value is required`;
          }
          if (!custom_field?.attributeId) {
            errors = `Specification key is required`;
          }

        });
      } else {
        return (errors = `Specification Fields are required`);
      }
    });

    return errors;
  }
};
