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
import HOME_IMAGE from "./images/home.png";
import FOOTER_LOGOS from "./images/footer.png";
// Import WSO2 Identity Server OIDC JS module
import { IdentityAuth } from "@wso2/identity-oidc-js";

/* Need to allow URL in wso2-is-distrubution/repository/conf/tomcat/web.xml

    <filter>
        <filter-name>CORS</filter-name>
        <filter-class>com.thetransactioncompany.cors.CORSFilter</filter-class>
        <init-param>
            <param-name>cors.allowOrigin</param-name>
            <param-value>https://localhost:3000</param-value>
        </init-param>
        <init-param>
            <param-name>cors.supportedMethods</param-name>
            <param-value>GET, HEAD, POST, DELETE, OPTIONS, PATCH, PUT</param-value>
        </init-param>
        <init-param>
            <param-name>cors.exposedHeaders</param-name>
            <param-value>Location</param-value>
        </init-param>
    </filter>

    <filter-mapping>
        <filter-name>CORS</filter-name>
        <url-pattern>/*</url-pattern>
        <dispatcher>REQUEST</dispatcher>
        <dispatcher>FORWARD</dispatcher>
    </filter-mapping>
*/

const webAppOrigin = "http://localhost:3000";

/**
 * Initialize identityManager client
 * 
 * ( Need to register an application in WSO2 Identity Server and make changes in:
 *   Inbound Authentication Configuration > OAuth/OpenID Connect Configuration )
 * 
 *  Enable "Allow authentication without the client secret" in application OIDC settings to skip ClientSecret
 *  And select "Cookie Based" Access Token Binding Type
 */
const authConfig = {
    // Web App URL
    clientHost: webAppOrigin,

    // ClientID generated for the application
    clientID: "",

    // After login callback URL - We have use app root as this is a SPA 
    // (Add it in application OIDC settings "Callback Url")
    loginCallbackURL: webAppOrigin, 

    // After logout callback URL - We have use app root as this is a SPA 
    // (Add it in application OIDC settings "Callback Url")
    logoutCallbackURL: webAppOrigin,

    // WSO2 Identity Server URL
    serverOrigin: "https://localhost:9443",

    // Tenant Details: Enable if needed only
    // tenant: "demo.com",
    // tenantPath: "/t/demo.com"
};

const authClient = new IdentityAuth(authConfig);

const App = () => {

    const [ authenticateState, setAuthenticateState ] = useState({});
    const [ isAuth, setIsAuth ] = useState(false);

    const handleLogin = () => {
        // Add a check property to the session, so we can recall signin method upon redirect with autherization code.
        // autherization code grant type flow
        sessionStorage.setItem("isInitLogin", "true");
        authClient.signIn();
    };

    const handleLogout = () => {
        authClient.signOut(() => {
            setIsAuth(false);
        });
    };

    useEffect(() => {

        // Check if the page redirected by the signin method with autherization code, if it is recall singin method to
        // continue the sigin flow
        if ( JSON.parse(sessionStorage.getItem("isInitLogin")) ) {

            authClient.signIn().then((response) => {
    
                setAuthenticateState({
                    ...authenticateState,
                    displayName: response.displayName,
                    email: response.email ? response.email[0] : "",
                    username: response.username
                });
                
                setIsAuth(true);
                sessionStorage.setItem("isInitLogin", "false");
            });

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
                { isAuth ?
                    <>
                        <div className="header-title">
                            <h1>
                                Javascript Based React SPA Authentication Sample <br /> (OIDC - Autherization Code Grant)
                            </h1>
                        </div>
                        <div className="content">
                            <h3>Below are the basic details retrieve from the server on a successful login.</h3>
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
                            <img src={ HOME_IMAGE } className="home-image" />
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
