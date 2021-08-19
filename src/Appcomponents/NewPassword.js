import { useRef, useContext, useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { Appcontext } from '../App'
import Input from './ResetPasswordcomponents/Input'
import form_validations from './NewPasswordcomponents/validations'


const NewPassword = () => {
    const app_context = useContext(Appcontext)
    const setflash_msg = app_context.setflash_msg
    const [LoadingData, setLoadingData] = useState(true)
    const [LoadingDataError, setLoadingDataError] = useState(false)
    const { token } = useParams()
    const { push } = useHistory()
    const password_ref = useRef(null)
    const confirm_password_ref = useRef(null)

    const UnAuthfetch = app_context.UnAuthfetch
    const verify_token = useCallback(async() => {
        const response = await UnAuthfetch("/new_password/" + token)
        const data = await response.json()
        return data
    }, [UnAuthfetch, token])

    useEffect(()=>{
        const result = verify_token()
        result.then((datas) =>{
            if(datas.status === "success"){
               setLoadingData(false)
            }
            else{
                const flash_msg = "It looks like your password reset request was expired instead you can try again here"
                setflash_msg(flash_msg)
                push("/reset_password")
            }
        }).catch(()=>{
            setLoadingDataError(true)
        })
    },[push, verify_token, setflash_msg])

    const post_user_data = async (form) => {
        setLoadingData(true)
        const response = await app_context.UnAuthfetch("/new_password/" + token, {method : "POST", body : form })
        const data = await response.json()
        return data
    }

    const handle_valid_response = (result) => {
        console.log(result)
        if(result.status === "success"){
            const flash_msg = "You have successful changed your password"
            app_context.setflash_msg(flash_msg)
            push("/signin")
        }
        else if(result.status === "invalid_token"){
            const flash_msg = "It looks like your password reset request was expired instead you can try again here"
            app_context.setflash_msg(flash_msg)
            push("/reset_password")
        }
        else{
            const flash_msg = "Sorry Dear, we encountered a system mantainance problem"
            app_context.setflash_msg(flash_msg)
            setLoadingData(false)
        }
    }

    const send_user_data = (event) => {
        event.preventDefault()
        const validation_result =  form_validations(
            password_ref.current,confirm_password_ref.current)
        if (validation_result.errors.length > 0){
            console.log(validation_result.errors)
            const errors = validation_result.errors
            errors.forEach( (error) => {
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
            })
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
        const remove_errors = validation_result.remove_errors
        remove_errors.forEach((error_id) => {
            if(document.getElementById(error_id)){
                const error_element = document.getElementById(error_id);
                error_element.remove(); 
            }
        })
    }

    return (
        <>
            { LoadingData ?
            <div id="load">
                {LoadingDataError ?
                <div className="text-center">
                    <h4 className="mb-3">Something went wrong</h4>
                    <a href={"/new_password/" + token} className="btn btn-dark">TRY AGAIN</a>
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

                            <div className="form-header mb-5">
                                <h2>Now your password reset request was confirmed</h2>
                                <h5>Change it here</h5>
                            </div>
                            <div className="my-2">
                                <label htmlFor="assword_input" className="form-label">Password</label>
                                <Input ref={password_ref} type="password" name="password" class_name="form-control" placeholder="Password" />
                            </div>
                            <div className="my-2">
                                <label htmlFor="confirm_password_input" className="form-label">Confirm password</label>
                                <Input ref={confirm_password_ref} type="password" name="confirm_password" class_name="form-control" placeholder="Re enter password" />
                            </div>
                            <div className="form_footer py-4 mb-5">
                                <button className="btn btn-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default NewPassword