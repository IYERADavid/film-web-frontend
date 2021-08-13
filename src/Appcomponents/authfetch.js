const base_url = "https://vendor-videos-api.herokuapp.com"
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
    return fetch(base_url + url, update_options(options))
}

export default auth_fetch