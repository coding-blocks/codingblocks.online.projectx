import JwtAuthenticator from 'ember-simple-auth-token/authenticators/jwt';

// extend the JWTAuthenticator to authenticate with jwt and refresh_token directly
export default JwtAuthenticator.extend({
  authenticate(creds, headers) {
    return Promise.resolve(this.handleAuthResponse(creds))
  }
})