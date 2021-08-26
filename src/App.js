import { createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Appcomponents/PrivateRoute'
import Signup from './Appcomponents/Signup'
import Signin from './Appcomponents/Signin'
import Home from './Appcomponents/Home'
import ResetPassword from './Appcomponents/ResetPassword'
import NewPassword from './Appcomponents/NewPassword'

export const Appcontext = createContext(null) 

const App = () => {

  const [LoadingData, setLoadingData] = useState(true)
  const [current_user, setcurrent_user] = useState(false)
  const [flash_msg, setflash_msg] = useState(null)

  useEffect(() => {
    if(localStorage.getItem('access_token')){
      setcurrent_user(true)
    }
    setLoadingData(false)
  }, [])
  
  const base_url = "https://vendor-videos-api.herokuapp.com"
  const UnAuthfetch = (url, options={}) => {
    return fetch(base_url + url, options)
  }
  
  return (
    <>
    { !LoadingData &&
    <Appcontext.Provider value={{current_user : current_user, setcurrent_user : setcurrent_user, setflash_msg : setflash_msg,
    UnAuthfetch: UnAuthfetch }}>
    <div className="main_container">
      <Router>
        {flash_msg  &&
        <div className="alert alert-info alert-dismissible fade show">
          <strong>{flash_msg}</strong>
          <button onClick={() => setflash_msg(null)} className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        }
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/reset_password" component={ResetPassword} />
          <Route exact path="/new_password/:token" component={NewPassword} />
          <Route>
            <h1>The url you requested not found </h1>
          </Route>
        </Switch>
      </Router>
    </div>
    </Appcontext.Provider>}
    </>
  );
}

export default App