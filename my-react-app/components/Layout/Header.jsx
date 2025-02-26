import { Link, NavLink } from "react-router";
export default function Header(){

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "none",
        color: "#222224",
    }

    const inactiveStyle = {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: '#fdfdfd'
    }

    return (
        <header className="header-component" id="header-component">
            
            <div className="left-header-section">
                <Link to='/'>
                    Home
                </Link>
            </div>
            <div className="middle-header-section">
                <ul className="header-list">
                    <li>
                        <NavLink to='/' style={({isActive}) => isActive ? activeStyle: inactiveStyle} >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/pokedex' style={({isActive}) => isActive ? activeStyle: inactiveStyle} >Pokedex</NavLink>
                    </li>
                    <li>
                        <NavLink to='/about' style={({isActive}) => isActive ? activeStyle: inactiveStyle}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to='/help' style={({isActive}) => isActive ? activeStyle: inactiveStyle}>Help </NavLink>
                    </li>
                </ul>
            </div>
            <div className="right-header-section">

            </div>
        </header>
    )
}