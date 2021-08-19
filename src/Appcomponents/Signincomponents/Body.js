import { useRef, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Appcontext } from '../../App'
import Input from './Bodycomponents/Input'
import form_validations from './validations'
import home_img from '../home.jpg' 

const Body = (props) => {
    const app_context = useContext(Appcontext)
    const email_ref = useRef(null) 
    const password_ref = useRef(null)
    const remember_me_ref = useRef(null)
    const [LoadingData, setLoadingData] = useState(false)
    const [LoadingDataError, setLoadingDataError] = useState(false)
    const { push } = useHistory()
    
    const post_user_data = async (form) => {
        setLoadingData(true)
        const response = await app_context.UnAuthfetch("/signin", {method : "POST", body : form })
        const data = await response.json()
        return data
    }

    const handle_valid_response = (result) => {
        if(result.status === "success"){
            const user = result.body.user
            const token = result.body.access_token
            localStorage.setItem('access_token', token)
            app_context.setcurrent_user(true)
            const flash_msg = "Hey Dear, " + user.last_name + " you have successful logged in"
            app_context.setflash_msg(flash_msg)
            push("/home")
        }
        else if(result.status === "invalid_credentials"){
            const flash_msg = "The email or password you entered is invalid"
            app_context.setflash_msg(flash_msg)
            setLoadingData(false)
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
            email_ref.current, password_ref.current)
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
                    (problem) => {
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
                <a href="/signin" className="btn btn-dark">TRY AGAIN</a>
            </div> :
            <div id="load_circle" className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
            </div>
            }
        </div> :
        <section className="form vertical-center">
            <div className="container">
                <div className="row login-main no-gutters">
                <div className="col-md-4 col-lg-6">
                    <img className="img-fluid" src={home_img} alt="side_img"/>
                </div>
                <div className="col-md-8 col-lg-6 px-5 py-3">
                    <h1 className="font-weight-bold py-3">Vendor Videos</h1>
                    <h4>signin to your acoount</h4>
                    <form id="form" noValidate onSubmit={send_user_data}>
                        
                        <div className="row my-2">
                            <label className="label col-md-4">E-mail</label>
                            <div className="col-md-6">
                                <Input ref={email_ref} type="email" name="email" class_name="login-form-control" placeholder="Email" />
                            </div>
                        </div>
                        <div className="row my-2">
                            <label className="label col-md-4">Password</label>
                            <div className="col-md-6">
                                <Input ref={password_ref} type="password" name="password" class_name="login-form-control" placeholder="Password" />
                            </div>
                        </div>
                        <div className="row my-2">
                            <label className="label col-md-4">remember me</label>
                            <div className="col-md-6 pt-md-3">
                                <Input ref={remember_me_ref} type="checkbox" name="remember_me" class_name="remember_me" placeholder="" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">Signin</button>
                        <div className="row">
                            <a className="link1 col-md-12" href="/reset_password">Forget password</a>
                            <p className="col-md-12">Need an account? <a href="/signup">signup here</a></p>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </section>
        }
        </>
    )
}

export default Body