import React, {userState, userContext} from "react";
import { AuthContext } from "./index";
import * as firebase from "firebase"

const Login = () => {
    const [email, setEmail] = userState("");
    const [password, setPassword] = userState("");
    const [error, setErrors] = userState("");

    const Auth = userContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then (res => {
                if (res.user) Auth.setLoggedIn(true);
            })
            .catch(e => {
                setErrors(e.message);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={e => handleForm(e)}>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="email"
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                />
                <hr />
                <button class="googleBtn" type="button">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commonst/5/53/Google_%22G%22_Logo.svg"
                        alt="logo"
                    />
                    Login With Google
                </button>
                <button type="submit">Login</button>
                <span>{error}</span>
            </form>
        </div>
    );
};

export default Login;