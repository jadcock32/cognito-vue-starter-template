import store from '../../../store/store';
import API from '../api-service';

const baseUrl = 'authentication';

function cacheTokens({ idToken, accessToken }) {
  const keyPrefix = 'CognitoIdentityServiceProvider';
  const idTokenKey = `${keyPrefix}.idToken`;
  const accessTokenKey = `${keyPrefix}.accessToken`;

  localStorage.setItem(idTokenKey, idToken);
  localStorage.setItem(accessTokenKey, accessToken);
}

function clearCache() {
  const key = 'CognitoIdentityServiceProvider';
  localStorage.removeItem(`${key}.idToken`);
  localStorage.removeItem(`${key}.accessToken`);
}

export default {
  register(body) {
    return API.post(`${baseUrl}/register`, body);
  },
  confirmRegistration(body) {
    return API.post(`${baseUrl}/confirmRegistration`, body);
  },
  authenticate(body) {
    return API.post(`${baseUrl}/authenticate`, body).then(res => {
      const tokens = {
        idToken: res.AuthenticationResult.IdToken,
        accessToken: res.AuthenticationResult.AccessToken,
      };
      cacheTokens(tokens);
    });
  },
  authenticated() {
    return API.post(`${baseUrl}/authenticated`);
  },
  logout() {
    const body = {
      username: store.getters.cognitoInfo.email,
    };
    clearCache();
    return API.post(`${baseUrl}/logout`, body);
  },
};
