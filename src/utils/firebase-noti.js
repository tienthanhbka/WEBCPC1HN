import firebase from 'firebase'

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: '224723205949'
  })
}
export const askForPermissioToReceiveNotifications = async() => {
  try {
    const messaging = firebase.messaging()
    messaging.usePublicVapidKey('BIHOgNy0pYFpU9ePc0kS0BsUZmg_feJN5jPiZH3TuMRpzzJb-S9pM2iBCMNJYkCkALqrvmbuWHN9U33vlDX2Z3U')
    await messaging.requestPermission()
    const token = await messaging.getToken()
    console.log('token do usuário:', token)
    return token
  } catch (error) {
    console.error(error)
  }
}
