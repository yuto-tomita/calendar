// import axios from 'axios'

// eslint-disable-next-line require-await
export const connectApi = async () => {
  const apiUrl = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=https://www.googleapis.com/auth/calendar&include_granted_scopes=true&redirect_uri=http://localhost:3000/callback&client_id=513531115468-qkllk6l03aq2pa2rmcouju8hiu0mefdp.apps.googleusercontent.com'
  window.location.href = apiUrl
}
