import env from "codingblocks-online/config/environment";

/* Thanks to ~senpai~ :) */

export const forceLogin = function () {
  const url = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${env.clientId}&redirect_uri=${env.publicUrl}`
  localStorage.setItem('redirectionPath', window.location.pathname)
  window.location.href = url
}