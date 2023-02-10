const Validation =(values) =>{
    const validPassword =  new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
    let errors ={}
    var re = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
   
    if (!validPassword.test(values.password) ) {
        errors.password = "Passwords must have at least 8 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers, and symbols"
    }
return errors
}
export default Validation;