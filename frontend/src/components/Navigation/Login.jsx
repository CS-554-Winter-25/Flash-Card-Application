import {useIsAuthenticated} from "../../hooks/isAuthenitcated.jsx";
import {Link} from 'react-router-dom';

export function Login() {
    const isAuthenticated = useIsAuthenticated();
    return (
        <div className="navbar-login">
        {isAuthenticated ? (
                <Link
                    className="login-button"
                    to="http://127.0.0.1:5000/auth/logout"
                >
                    Log out
                </Link>
            ) : (
                <Link
                    className="login-button"
                    to="http://127.0.0.1:5000/auth/login"
                >
                    Log in
                </Link>
            )}
        </div>
    );
}