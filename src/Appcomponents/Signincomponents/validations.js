const form_validations = (email_element, password_element) => {
    // Here by default if there is no error, number_of_errors = 0
    let errors = []
    let remove_errors = []
    // Validating email, if any error occurs, number_of_error += 1
    if(email_element.value === ''){
        const error = {input_element : email_element, error_msg : "You must fillout this field!",
        error_id : 'error-4'}
        errors.push(error);
    }else if(valid_email(email_element.value) === false){
        const error = {input_element : email_element, error_msg : "Your email is not valid!",
        error_id : 'error-4'}
        errors.push(error);
    }else if(email_element.value.length >= 322){
        const error = {input_element : email_element, error_msg : "your email must be less than 322 characters!",
        error_id : 'error-4'}
        errors.push(error);
    } else{
        remove_errors.push('error-4');
    }

    // Validating password, if any error occurs, number_of_error += 1
    if(password_element.value === ''){
        const error = {input_element : password_element, error_msg : "You must fillout this field!",
        error_id : 'error-5'}
        errors.push(error);
    } else if(password_element.value.length <= 5){
        const error = {input_element : password_element, error_msg : "Your password must be greater than 5 characters",
        error_id : 'error-5'}
        errors.push(error);
    } else{
        remove_errors.push('error-5');
    }
    return ({ errors : errors, remove_errors : remove_errors })

}

// Validating if it is real email from https://www.w3resource.com/javascript/form/email-validation.php
const valid_email = (email) =>{
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

export default form_validations