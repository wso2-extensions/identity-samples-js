# WSO2 Identity Server - OIDC JS SDK React SPA Usage Example

React JS authentication JS SDK usage sample app

---

## Getting started

First thing we need to do is let WSO2 Identity Server knows that we are accessing the server using a external origin (CORS). 
Add below lines to the **`[wso2-is]/repository/resources/conf/templates/repository/conf/tomcat/web.xml.j2`**

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

### 1. Register an Applications

Run Developer Portal and register a Single Page Application with minimal configuration. 
Give `http://localhost:5000` as the callback URL.

### 2. Setup the sample

* Run `yarn` or `npm install`
* Update configuration file `src/config.json` with your registered app details

    __REFERENCE__

    ```javascript
    {
        ...
        // ClientID generated for the application. E.g. "uxRd9AqFa3Blp1ASvKYaUizU7pca"
        "clientID": "",

        // WSO2 Identity Server URL. Default: https://localhost:9443
        "serverOrigin": "",

        // NOTE: Add below config if running on tenant mode
        "tenant": "", // E.g. "organization.com"
        "tenantPath": "" // E.g. "/t/organization.com"
    };
    ```

### 3. Run

* Run `yarn start` or `npm start` if you use `npm` instead `yarn` for dependencies install.
* Navigate to `http://localhost:5000` from the browser

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
