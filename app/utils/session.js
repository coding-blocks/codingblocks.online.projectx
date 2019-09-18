import env from "codingblocks-online/config/environment";
import { getPublicUrl } from "codingblocks-online/utils/browser"


/* Thanks to ~senpai~ :) */

export const forceLogin = function () {
  const url = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${env.clientId}&redirect_uri=${getPublicUrl()}`
  localStorage.setItem('redirectionPath', window.location.pathname.replace("/app", "/"))
  window.location.href = url
}