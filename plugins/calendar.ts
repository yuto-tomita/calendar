import axios from 'axios'

// eslint-disable-next-line require-await
export const connectApi = async () => {
  axios.defaults.baseURL = 'http://localhost:3000'
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
  // const state = Math.random().toString(32).substring(2)
  // sessionStorage.setItem('state', state)
  // await axios.get(serviceAccount.auth_uri).then(res => console.log(res))

  // const params = {
  //   client_id: serviceAccount.client_id,
  //   redirect_uri: 'http://localhost:3000',
  //   response_type: 'token',
  //   scope,
  //   include_granted_scopes: 'true',
  //   state
  // }

  // await axios.post(serviceAccount.token_uri, params)
  //   .then(res => console.log(res))
  const apiUrl = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=https://www.googleapis.com/auth/calendar&include_granted_scopes=true&redirect_uri=http://localhost:3000/callback&client_id=513531115468-qkllk6l03aq2pa2rmcouju8hiu0mefdp.apps.googleusercontent.com'
  window.location.href = apiUrl
}
