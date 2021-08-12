const update_options = (options)=>{
    const token = localStorage.getItem('access_token')
    if(token){
        options.headers = {'Authorization': token}
        return options
    }
    else{
        return options
    }
}

const auth_fetch = (url, options={}) =>{
    return fetch(url, update_options(options))
}

export default auth_fetch