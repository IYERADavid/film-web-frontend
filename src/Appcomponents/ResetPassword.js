import { useRef, useContext, useState } from 'react'
import { Appcontext } from '../App'
import Input from './ResetPasswordcomponents/Input'
import form_validations from './ResetPasswordcomponents/validations'

const ResetPassword = () => {
    const app_context = useContext(Appcontext)
    const email_ref = useRef(null)
    const [LoadingData, setLoadingData] = useState(false)
    const [LoadingDataError, setLoadingDataError] = useState(false)

    const post_user_data = async (form) => {
        setLoadingData(true)
        const response = await app_context.UnAuthfetch(
            "/reset_password", {method : "POST", body : form,
            headers : {password_reset_url: "https://vendor-videos.netlify.app/new_password/"} })
        const data = await response.json()
        return data
    }

    const handle_valid_response = (result) => {
        if(result.status === "success"){
            const flash_msg = "Check your email inbox to confirm password reset"
            app_context.setflash_msg(flash_msg)
        }
        else if(result.status === "invalid_email"){
            const flash_msg = "The email you entered is invalid"
            app_context.setflash_msg(flash_msg)
        }
        else{
            const flash_msg = "Sorry Dear, we encountered a system mantainance problem"
            app_context.setflash_msg(flash_msg)
        }
        setLoadingData(false)
    }

    const send_user_data = (event) =>{
        event.preventDefault()
        const validation_result = form_validations(email_ref.current)
        if (validation_result.error.length > 0){
            console.log(validation_result.error)
            const error = validation_result.error
            if(document.getElementById(error.error_id)){
                const span = document.getElementById(error.error_id)
                span.innerText = error.error_msg
            }
            else{
            const parent_element = error.input_element.parentElement
            const span = document.createElement("span")
            span.innerText = error.error_msg
            span.style.color = 'red'
            span.id = error.error_id
            parent_element.appendChild(span)
            }
        }
        else{
            const form = new FormData(event.target)
            const res = post_user_data(form)
            res.then(
                (result) => handle_valid_response(result)
            ).catch(
                () => {
                    setLoadingDataError(true)
                }
            )
        }
        const error_id = validation_result.remove_errors
        if(document.getElementById(error_id)){
            const error_element = document.getElementById(error_id);
            error_element.remove(); 
        }
    }

    return (
        <>
        { LoadingData ?
        <div id="load">
            {LoadingDataError ?
            <div className="text-center">
                <h4 className="mb-3">Something went wrong</h4>
                <a href="/reset_password" className="btn btn-dark">TRY AGAIN</a>
            </div> :
            <div id="load_circle" className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
            </div>
            }
        </div> :
        <div className="container bg-light">
            <div className="form min-vh-100 d-flex justify-content-center">
                <div className="d-flex align-items-center">
                    <form noValidate className="text-center" onSubmit={send_user_data}>
                        <div className="form-header">
                            <h2>HI You are about to change you password</h2>
                            <h5 className="pt-3 pb-5">If you really want to do so hit request</h5>
                        </div>
                        <div className="form-body mt-5">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Input ref={email_ref} type="email" name="email" class_name="form-control" placeholder="Email" />
                        </div>
                        <div className="form_footer py-4 mb-5">
                            <button className="btn btn-info">Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
        } 
        </>
    )
}

export default ResetPassword