import { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Appcontext } from '../../App'
import Input from './Bodycomponents/Input'
import home_img from '../home.jpg'
import form_validations from './validations'

const Body = (props) => {
    const app_context = useContext(Appcontext)
    const firstname_ref = useRef(null) 
    const lastname_ref = useRef(null) 
    const middlename_ref = useRef(null) 
    const email_ref = useRef(null) 
    const password_ref = useRef(null)
    const confirm_password_ref = useRef(null)
    const { push } = useHistory()

    const post_user_data = async (form) => {
        const response  = await fetch("/signup",{method : "POST", body : form })
        const data = await response.json()
        return data
    }

    const handle_valid_response = (result) => {
        console.log(result)
        if(result.status === "success"){
            const user = result.body
            const usernames = user.first_name + " " + user.last_name
            const flash_msg = "Account successful created for " + usernames
            app_context.setflash_msg(flash_msg)
            push("/signin")
        }
        else if(result.status === "email_exist_error"){
            const flash_msg = "Incorrect email, Dear the email you entered already exist here try another"
            app_context.setflash_msg(flash_msg)
        }
        else{
            const flash_msg = "Sorry Dear, we encountered a system mantainance problem"
            app_context.setflash_msg(flash_msg) 
        }
    }

    const send_user_data = (event) => {
        event.preventDefault()
        const validation_result =  form_validations(firstname_ref.current, lastname_ref.current,
            middlename_ref.current,email_ref.current,password_ref.current,confirm_password_ref.current)
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
                    const flash_msg = "Sorry Dear, we encountered a system mantainance problem"
                    app_context.setflash_msg(flash_msg)
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
        <div className="container">
            <div className="row first-row no-gutters">
                <div className="col-md-4 col-lg-6">
                    <img className="img-fluid" src={home_img} alt="side_image" />
                </div>
                <div className="col-md-8 col-lg-6 signup-main px-3">
                    <div className="row">
                        <div className="col">
                            <h3>register now</h3>
                        </div>
                        <div className="col">
                            <i className="fas fa-address-book fa-3x"></i>
                        </div>
                    </div>
                    <br/>
                    <form id="form" noValidate onSubmit={send_user_data}>
                        <div className="row">
                            <label className="label col-md-4 control-label">First name</label>
                            <div className="col-md-6">
                                <Input ref={firstname_ref} type="text" name="first_name" class_name="form-control" placeholder="First name" />
                            </div>
                        </div>
                        <div className="row">
                            <label className="label col-md-4 control-label">Last name</label>
                            <div className="col-md-6">
                                <Input ref={lastname_ref} type="text" name="last_name" class_name="form-control" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="row">
                            <label className="label col-md-4 control-label">Middle name</label>
                            <div className="col-md-6">
                                <Input ref={middlename_ref} type="text" name="middle_name" class_name="form-control" placeholder="Middle name" />
                            </div>
                        </div>
                        <div className="row">
                            <label className="label col-md-4 control-label">E-mail</label>
                            <div className="col-md-6">
                                <Input ref={email_ref} type="email" name="email" class_name="form-control" placeholder="Email" />
                            </div>
                        </div>
                        <div className="row">
                            <label className="label col-md-4 control-label">Password</label>
                            <div className="col-md-6">
                                <Input ref={password_ref} type="password" name="password" class_name="form-control" placeholder="Password" />
                            </div>
                        </div>
                        <div className="row">
                            <label className="label col-md-4 control-label">Confirm-Password</label>
                            <div className="col-md-6">
                                <Input ref={confirm_password_ref} type="password" name="confirm_password" class_name="form-control" placeholder="Re enter password" />
                            </div>
                        </div>
                        <br/>
                        <button className="btn btn-info text-white" type="submit">Singup</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Body
