
export const validate = (names, args) => {

  let errors = "";
  if (names && names.length > 0) {

    names.map((name) => {
      if (!args[name]) {
        return (errors = `${name} field is required`)
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

export const validatenested = (main, names, args) => {

  let errors = "";
  if (names && names.length > 0) {

    names.map((name) => {

      if (!args[main]) {
        return (errors = `${main} is required`);
      }

      if (!args[main][name]) {


        return (errors = `${name} is required`);
      }


      if (!args[main][name]) {
        return (errors = `${name} field is required`)
      }


    })
  }
  return errors;
};