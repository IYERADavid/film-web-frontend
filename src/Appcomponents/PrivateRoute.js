import { useContext } from 'react'
import { Route, useHistory } from 'react-router-dom';
import { Appcontext } from '../App'

const PrivateRoute = ({ component : Component, ...rest }) => {

    const appcontext = useContext(Appcontext)
    const current_user = appcontext.current_user
    const { push } = useHistory()
    return (
        <Route {...rest} render={ (props) => (
            current_user ? 
            <Component  {...props} /> :
            push("/signin")
        )} />
    )
}

export default PrivateRoute