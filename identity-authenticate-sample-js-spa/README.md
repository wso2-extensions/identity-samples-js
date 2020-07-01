# WSO2 Identity Server - OIDC JS SDK React SPA Usage Example

React JS authentication JS SDK usage sample app

---

## Getting started

First thing we need to do is let WSO2 Identity Server knows that we are accessing the server using a external origin (CORS). Add below lines to the **`[wso2-is]/repository/resources/conf/templates/repository/conf/tomcat/web.xml.j2`**

```xml
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
```

### Runnig the sample

1. Run `yarn install`
2. Update your configurations in `src/app.js` with WSO2 Identity Server App Register details.

    E.g.

    ```javascript
    const authConfig = {
        ...
        // ClientID generated for the application
        clientID: "uxRd9AqFa3Blp1ASvKYaUizU7pca",
    };
    ```

3. run `yarn start`
4. Visit `http://localhost:3000` on browser

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
