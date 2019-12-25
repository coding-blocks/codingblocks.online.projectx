export function initialize(appInstance) {
  appInstance.inject('service', 'authenticator', 'authenticator:jwt');
}

export default {
  initialize
};
