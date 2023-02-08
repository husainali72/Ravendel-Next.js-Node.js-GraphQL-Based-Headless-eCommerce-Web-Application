const Validation =(values) =>{
    const validPassword =  new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
    let errors ={}

    // if(!values.first_name){
    //     errors.first_name = "Name Required"
    // }
    // if(!values.last_name){
    //     errors.last_name = "Last Name Required"
    // }
    // if(!values.email){
    //     errors.email = "Email Required"
    // }
    // if(!values.password){
    //     errors.password = "password Required"
    // }
    var re = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
   
    if (!validPassword.test(values.password) ) {
        
        errors.password = "Passwords must have at least 8 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers, and symbols"
    }

  
    // if(values.password.length < 8){
    //     errors.password = "Passwords must have at least 8 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers, and symbols"
    // }
return errors
}
export default Validation;