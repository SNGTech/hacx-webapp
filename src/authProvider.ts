// import { MsalAuthProvider, LoginType } from 'react-aad-msal';
// import "regenerator-runtime"

import { LogLevel } from "@azure/msal-browser";
// // Msal Configurations
// const config = {
//   auth: {
//     authority: 'https://login.microsoftonline.com/common',
//     clientId: 'cc80f89e-5090-4b06-b9e9-aea689773628',
//     redirectUri: 'http://localhost:3000/callback'
//   },
//   cache: {
//     cacheLocation: "localStorage",
//     storeAuthStateInCookie: true
//   }
// };
 
// // Authentication Parameters
// const authenticationParameters = {
//   scopes: [
//     'user.read'
//   ]
// }
 
// // Options
// const options = {
//   loginType: LoginType.Popup,
//   tokenRefreshUri: window.location.origin + '/auth.html'
// }
 
// export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)
const msalConfig = {
    auth: {
      clientId: "cc80f89e-5090-4b06-b9e9-aea689773628",
      authority: "https://login.microsoftonline.com/ac20add1-ffda-45c1-adc5-16a0db15810f",
      knownAuthorities: ["https://analysis.windows.net/powerbi/api"],
      redirectUri: "/",
      postLogoutRedirectUri: "/",
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        loggerCallback: (
          level: LogLevel,
          message: string,
          containsPii: boolean
        ): void => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
          }
        },
        piiLoggingEnabled: false,
      },
      windowHashTimeout: 60000,
      iframeHashTimeout: 6000,
      loadFrameTimeout: 0,
    },
  };

  export default msalConfig;