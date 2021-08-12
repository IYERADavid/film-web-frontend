import { createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './Appcomponents/PrivateRoute'
import Signup from './Appcomponents/Signup'
import Signin from './Appcomponents/Signin'
import Home from './Appcomponents/Home'

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
  
  return (
    <>
    { !LoadingData &&
    <Appcontext.Provider value={{current_user : current_user, setcurrent_user : setcurrent_user, setflash_msg : setflash_msg }}>
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
        <PrivateRoute exact path="/home" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Router>
    </div>
    </Appcontext.Provider>}
    </>
  );
}

export default App