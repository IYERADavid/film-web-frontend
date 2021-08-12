const form_validations = (
    first_name_element, last_name_element, middle_name_element, email_element,
    password_element , confirm_password_element) => {

    // Here by default if there is no error, number_of_errors = 0
    let errors = []
    let remove_errors = []
    // Validating first_name, if any error occurs, number_of_error += 1
    if(first_name_element.value === ''){
        const error = {input_element : first_name_element, error_msg : "You must fillout this field!",
        error_id : 'error-1'}
        errors.push(error)
    } else if(first_name_element.value.length >= 26){
        const error = {input_element : first_name_element, error_msg : "Your name must be less than 26 characters!",
        error_id : 'error-1'}
        errors.push(error)
    }else{
        remove_errors.push('error-1') 
    }

    // Validating last_name, if any error occurs, number_of_error += 1
    if(last_name_element.value === ''){
        const error = {input_element : last_name_element, error_msg : "You must fillout this field!",
        error_id : 'error-2'}
        errors.push(error);
    } else if(last_name_element.value.length >= 26){
        const error = {input_element : last_name_element, error_msg : "Your name must be less than 26 characters!",
        error_id : 'error-2'}
        errors.push(error)
    } else{
        remove_errors.push('error-2');
    }

    // Validating middle_name, if any error occurs, number_of_error += 1
    if(middle_name_element.value.length >= 16){
        const error = {input_element : middle_name_element, error_msg : "Your name must be less than 16 characters!",
        error_id : 'error-3'}
        errors.push(error)
    } else{
        remove_errors.push('error-3');
    }

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

    // Validating confirm_password, if any error occurs, number_of_error += 1
    if(confirm_password_element.value === ''){
        const error = {input_element : confirm_password_element, error_msg : "You must fillout this field!",
        error_id : 'error-6'}
        errors.push(error);
    } else if(password_element.value !== confirm_password_element.value){
        const error = {input_element : confirm_password_element, error_msg : "Your passwords does not match!",
        error_id : 'error-6'}
        errors.push(error);
    } else{
        remove_errors.push('error-6');
    }
    
    return ({ errors : errors, remove_errors : remove_errors })

}

// Validating if it is real email from https://www.w3resource.com/javascript/form/email-validation.php
const valid_email = (email) =>{
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

export default form_validations