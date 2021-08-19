const form_validations = (email_element) => {
    let error = []
    let remove_error = []
    if(email_element.value === ''){
        const error = {input_element : email_element, error_msg : "You must fillout this field!",
        error_id : 'error-4'}
        error.push(error);
    }else if(valid_email(email_element.value) === false){
        const error = {input_element : email_element, error_msg : "Your email is not valid!",
        error_id : 'error-4'}
        error.push(error);
    }else if(email_element.value.length >= 322){
        const error = {input_element : email_element, error_msg : "your email must be less than 322 characters!",
        error_id : 'error-4'}
        error.push(error);
    } else{
        remove_error.push('error-4');
    }

    return ({ error : error, remove_error : remove_error })

}

// Validating if it is real email from https://www.w3resource.com/javascript/form/email-validation.php
const valid_email = (email) =>{
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

export default form_validations