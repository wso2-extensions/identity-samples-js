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

var authClient = new IdentityOIDC.IdentityAuth(authConfig);

var state = {
    isAuth: false,
    displayName: "",
    email: "",
    username: ""
};

function updateView() {
    if (state.isAuth) {
        document.getElementById("text-display-name").innerHTML = state.displayName;
        document.getElementById("text-userame").innerHTML = state.username;
        document.getElementById("text-email").innerHTML = state.email;

        document.getElementById("logged-in-view").style.display = "block";
        document.getElementById("logged-out-view").style.display = "none";
    } else {
        document.getElementById("logged-in-view").style.display = "none";
        document.getElementById("logged-out-view").style.display = "block";
    }
}

function handleLogin() {
    // Add a check property to the session, so we can recall signin method upon redirect with autherization code.
    // autherization code grant type flow
    sessionStorage.setItem("isInitLogin", "true");
    authClient.signIn();
}

function handleLogout() {
    authClient.signOut(function() {
        state.isAuth = false;
    }).then(function() {
        updateView();
    });
}

if (authConfig.clientID === "") {
    document.getElementById("missing-config").style.display = "block";
} else {
    // Check if the page redirected by the signin method with autherization code, if it is recall singin method to
    // continue the sigin flow
    if ( JSON.parse(sessionStorage.getItem("isInitLogin")) ) {

        authClient.signIn().then(function(response) {

            state.displayName = response.displayName;
            state.email = response.email ? response.email[0] : "";
            state.username = response.username;
            state.isAuth = true;

            sessionStorage.setItem("isInitLogin", "false");

            updateView();
        });

    } else {

        if ( sessionStorage.getItem("username") ) {

            state.displayName = sessionStorage.getItem("display_name");
            state.email = JSON.parse(sessionStorage.getItem("email")) ?
                JSON.parse(sessionStorage.getItem("email"))[0] : "";
            state.username = sessionStorage.getItem("username");
            state.isAuth = true;

            updateView();
        } else {
            updateView();
        }
    }
}
