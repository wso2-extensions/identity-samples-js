# WSO2 Identity Server - OIDC SDK Vanilla Javascript Usage Example

Vanilla JS authentication usage sample app

---

## Getting started

**NOTE:- Ignore this if you are connecting to Asgardio cloud. In Asgardio cloud you can add `http://localhost5000` to allow origins from the UI** 

First thing we need to do is let WSO2 Identity Server knows that we are accessing the server using a external origin (CORS). Add below lines to the **`[wso2-is]/repository/resources/conf/templates/repository/conf/tomcat/web.xml.j2`**

```xml
<filter>
    <filter-name>CORS</filter-name>
    <filter-class>com.thetransactioncompany.cors.CORSFilter</filter-class>
    <init-param>
        <param-name>cors.allowOrigin</param-name>
        <param-value>https://localhost:5000</param-value>
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
```

### Register an Application

Run Developer Portal and register a Web Application with minimal configuration. 
Give `http://localhost:5000` as the callback URL.

### Setup and run sample

1. Update your configurations in `index.html` with WSO2 Identity Server App Register details.

    E.g.

    ```javascript
    const authConfig = {
        ...
        // ClientID generated for the application. E.g. "uxRd9AqFa3Blp1ASvKYaUizU7pca"
        clientID: "",

        // WSO2 Identity Server URL. Default: https://localhost:9443
        "serverOrigin": "",

        // NOTE: Add below config if running on tenant mode
        "tenant": "", // E.g. "organization"
        "tenantPath": "" // E.g. "/t/organization"
    };
    ```

2. If this is the first time, run `yarn` to install dependencies. (Do only once)
3. Run `yarn start`
4. Navigate to `http://localhost:5000` from the browser

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
