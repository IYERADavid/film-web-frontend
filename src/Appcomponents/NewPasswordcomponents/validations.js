const form_validations = (password_element , confirm_password_element) => {

    // Here by default if there is no error, number_of_errors = 0
    let errors = []
    let remove_errors = []
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

export default form_validations