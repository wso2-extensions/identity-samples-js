/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import "./app.css";
import REACT_LOGO from "./images/react-logo.png";
import JS_LOGO from "./images/js-logo.png";
import FOOTER_LOGOS from "./images/footer.png";
// Import WSO2 Identity Server OIDC JS module
import { Hooks, IdentityClient } from "@asgardio/oidc-js";
import * as authConfig from "./config.json";

const authClient = IdentityClient.getInstance();

const App = () => {

    const [ authenticateState, setAuthenticateState ] = useState({});
    const [ isAuth, setIsAuth ] = useState(false);

    authClient.on(Hooks.SignOut, (response) => {
        setAuthenticateState({
            ...authenticateState,
            displayName: response.displayName,
            email: response.email ? response.email[0] : "",
            username: response.username
        });

        setIsAuth(true);
        sessionStorage.setItem("isInitLogin", "false");
    });

    authClient.on(Hooks.SignOut, () => {
        setIsAuth(false);
        sessionStorage.setItem("isInitLogin", "false");
    });

    const handleLogin = () => {
        // Add a check property to the session, so we can recall sign-in method upon redirect with authorization code.
        // authorization code grant type flow
        sessionStorage.setItem("isInitLogin", "true");
        authClient.signIn();
    };

    const handleLogout = () => {
        authClient.signOut();
    };

    useEffect(() => {

        authClient.initialize(authConfig.default);

        // Check if the page redirected by the sign-in method with authorization code, if it is recall sing-in method to
        // continue the sign-in flow
        if ( JSON.parse(sessionStorage.getItem("isInitLogin")) ) {

            authClient.signIn();

        } else {

            if ( sessionStorage.getItem("username") ) {

                setAuthenticateState({
                    ...authenticateState,
                    displayName: sessionStorage.getItem("display_name"),
                    email: JSON.parse(sessionStorage.getItem("email")) ?
                        JSON.parse(sessionStorage.getItem("email"))[0] : "",
                    username: sessionStorage.getItem("username")
                });

                setIsAuth(true);
            }
        }
  
    }, []);

    return (
        <>
            <div className="container">
                { authConfig.default.clientID === "" ?
                    <div className="content">
                        <h2>You need to update the Client ID to proceed.</h2>
                        <p>Please open "src/config.json" file using an editor, and update the <code>clientID</code> value with the registered app clientID.</p>
                        <p>Visit repo <a href="https://github.com/wso2-extensions/identity-samples-js/tree/master/identity-authenticate-sample-js-spa">README</a> for more details.</p>
                    </div>
                : isAuth ?
                    <>
                        <div className="header-title">
                            <h1>
                                Javascript Based React SPA Authentication Sample <br /> (OIDC - Autherization Code Grant)
                            </h1>
                        </div>
                        <div className="content">
                            <h3>Below are the basic details retrieves from the server on a successful login.</h3>
                            <div>
                                <ul className="details">
                                    <li><b>Name:</b> { authenticateState.displayName }</li>
                                    <li><b>Username:</b> { authenticateState.username }</li>
                                    <li><b>Email:</b> { authenticateState.email }</li>
                                </ul>
                            </div>
                            <button className="btn primary" onClick={ handleLogout }>Logout</button>
                        </div>
                    </>
                :
                    <>
                        <div className="header-title">
                            <h1>
                                Javascript Based React SPA Authentication Sample <br /> (OIDC - Autherization Code Grant)
                            </h1>
                        </div>
                        <div className="content">
                            <div className="home-image">
                                <img src={ JS_LOGO } className="js-logo-image logo" />
                                <span className="logo-plus">+</span>
                                <img src={ REACT_LOGO } className="react-logo-image logo" />
                            </div>
                            <h3>
                                Sample demo to showcase how to authenticate a simple client side application using <b>WSO2 Identity Server</b> with the <a href="https://github.com/wso2-extensions/identity-sdks-js/tree/master/identity-oidc-js" 
                                    target="_blank">OIDC JS SDK</a>
                            </h3>
                            <button className="btn primary" onClick={ handleLogin }>Login</button>
                        </div>
                    </>
                }
            </div>

            <img src={ FOOTER_LOGOS } className="footer-image" />
        </>
    );

}

ReactDOM.render( (<App />), document.getElementById("root") );
