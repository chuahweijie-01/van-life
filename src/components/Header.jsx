import { NavLink } from "react-router-dom";

export default function Header() {

    function fakeLogOut() {
        localStorage.removeItem("loggedIn");
    }

    return (
        <header>
            <NavLink to='/' className='site-logo'>#VanLife</NavLink>
            <nav>
                <NavLink to='/host' className={({ isActive }) => isActive ? "active-link" : null}>Host</NavLink>
                <NavLink to='/about' className={({ isActive }) => isActive ? "active-link" : null}>About</NavLink>
                <NavLink to="/vans" className={({ isActive }) => isActive ? "active-link" : null}>Vans</NavLink>
                <NavLink to="login" className="login-link">Login</NavLink>
                <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    )
}