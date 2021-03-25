export const getPublicUrl = () => {
  if (window.location.port) {
    return `${window.location.protocol}//${window.location.hostname}:${window.location.port}/app/`
  }

  return `${window.location.protocol}//${window.location.hostname}/app/`
}
