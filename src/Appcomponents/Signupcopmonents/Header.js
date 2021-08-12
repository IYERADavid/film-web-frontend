import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
        <nav className="navbar navbar-expand-sm bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand active">VENDOR VIDEOS</Link>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#collapse-target">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="collapse-target">
                    <ul className="navbar-nav"> 
                        <li className="nav-item">
                            <Link to="#" className="nav-link">contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">about</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/signin" className="nav-link btn btn-warning">signin</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Header
