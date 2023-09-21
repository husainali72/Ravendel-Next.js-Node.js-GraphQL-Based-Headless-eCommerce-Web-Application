import { PhoneNumberUtil } from 'google-libphonenumber';
export const validate = (names, args) => {
  let errors = "";
  if (names && names.length > 0) {
    names.map((name) => {
      if (args[name] === '') {
        const txt = name.replaceAll('_', ' ') + " is required"
        const str = txt.charAt(0).toUpperCase() + txt.slice(1);
        return (errors = str)
      }
      if (Array.isArray(args[name])) {
        if (args[name].length <= 0) {
          return (errors = `Category  field is required`)
        }
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
          console.log(obj[main][name], 'obj[main][name]', key)
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
      args[main].map((obj) => {
        names.map((name) => {
          if (obj[name] === '' && name === 'handle') {
            let msg = obj.name.charAt(0).toUpperCase() + obj.name.slice(1)
            return (errors = `${msg} Link is required`);
          } else if (key && obj[name] === '') {
            let msg = `${key} ${name.charAt(0).toUpperCase() + name.slice(1)}`
            return (errors = `${msg}  is required`);
          } else if (obj[name] === '') {
            let msg = main.charAt(0).toUpperCase() + main.slice(1)
            return (errors = `${msg?.replace('_', ' ')} is required`);
          }
        }
        )
      })
    } else {
      names.map((name) => {
        if (args[main] === '') {
          return (errors = `${main.charAt(0).toUpperCase() + main.slice(1)} is required`);
        }
        if (args[main][name] === '') {
          return (errors = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`);
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

        return (errors = "Phone number is required")
      }
      try {
        let valid = false
        const phone = args[name].replace(/^(\d{2})(\d{5})(\d{5})$/, '+$1 $2-$3')
        const phoneUtil = PhoneNumberUtil.getInstance();
        valid = phoneUtil.isValidNumber(phoneUtil.parse(phone));
        if (!valid) {
          return (errors = "Phone number is invalid")
        }
      } catch (err) {
        return (errors = "Phone number is invalid")
      }
    })
  }
  return errors;
};
export const validateNestedPhone = (main, names, args) => {
  let errors = "";
  if (names && names.length > 0) {
    names.map((name) => {
      if (!args[main][name] || args[main][name] === "+") {
        return (errors = "Phone number is required")
      }
      try {
        let valid = false
        const phone = args[main][name].replace(/^(\d{2})(\d{5})(\d{5})$/, '+$1 $2-$3')
        const phoneUtil = PhoneNumberUtil.getInstance();

        valid = phoneUtil.isValidNumber(phoneUtil.parse(phone));
        if (!valid) {
          return (errors = "Phone number is invalid")
        }
      } catch (err) {
        return (errors = "Phone number is invalid")
      }
    })
  }
  return errors;
};