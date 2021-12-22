import logo   from '../images/logo-mesto.svg';
import {Link} from 'react-router-dom';

function Header({email, title, to, onClick}) {
    return (
        <header className="header">
            <img
                src={logo}
                alt="Логотип Место"
                className="header__logo"
            />
            <nav className="header__nav">
                <p className="header__email">{email}</p>
                <Link to={to} className="header__button" onClick={onClick}>{title}</Link>
            </nav>
        </header>
    )
}

export default Header