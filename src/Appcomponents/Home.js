import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import auth_fetch from  './authfetch'

const Home = () => {
    const [LoadingData, setLoadingData] = useState(true)
    const [LoadingDataError, setLoadingDataError] = useState(false)
    const [UserInfo, setUserInfo] = useState(null)
    const { push } = useHistory()
    
    useEffect(()=>{
        const result = get_user_data()
        result.then((datas) =>{
            if(datas.status === "success"){
               setUserInfo(datas.body)
               setLoadingData(false)
            }else{
                push("/signin")
            }
        }).catch(()=>{
            setLoadingDataError(true)
        })
    },[push])

    const get_user_data = async () => {
        const response = await auth_fetch("/home")
        const data = await response.json()
        return data
    }
    const logout_current_user = () => {
        localStorage.removeItem('access_token')
        push("/signin")
    }
    
    return (
        <>
        { LoadingData ?
        <div id="load">
            {LoadingDataError ?
            <div className="text-center">
                <h4 className="mb-3">Something went wrong</h4>
                <a href="/home" className="btn btn-dark">TRY AGAIN</a>
            </div> :
            <div id="load_circle" className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
            </div>
            }
        </div> :
        <div className="main_div text-center">
            <h4>user id : {UserInfo.user_id}</h4>
            <h4>user first name : {UserInfo.first_name}</h4>
            <h4>user last name : {UserInfo.last_name}</h4>
            <h4>user email : {UserInfo.email}</h4>
            <button onClick={logout_current_user} className="signout mt-3 btn btn-success">Logout</button>
        </div>}
        </>
    )
}

export default Home