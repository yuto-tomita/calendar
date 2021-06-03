import firebase from 'firebase'

export const firebaseConfig = {
  apiKey: 'AIzaSyAqjuKbtr23H7v3Zh8OLazIWSZtY4AGHD0',
  authDomain: 'share-schedule-eee11.firebaseapp.com',
  projectId: 'share-schedule-eee11',
  storageBucket: 'share-schedule-eee11.appspot.com',
  messagingSenderId: '1011525982726',
  appId: '1:1011525982726:web:bf21f653d4949c443c8187',
  measurementId: 'G-J44X1FR5X2'
}

export const initializeApplication = firebase.initializeApp(firebaseConfig)

export default firebase
