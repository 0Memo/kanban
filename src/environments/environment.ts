export const firebaseConfig = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyASU-41wRb8Hfn7FxTErQtv_bjYD6C7zgc",
    authDomain: "kanban-ca28d.firebaseapp.com",
    databaseURL: "https://kanban-ca28d-default-rtdb.firebaseio.com",
    projectId: "kanban-ca28d",
    storageBucket: "kanban-ca28d.firebasestorage.app",
    messagingSenderId: "429632893423",
    appId: "1:429632893423:web:d93c861b67726315bc061a",
    measurementId: "G-R0360YZ2R8"
  }
};

/*
{
  "rules": {
    ".read": "auth != null && auth.uid === 'OwL6v9hMzDaslbAVaN3sVFMAUSP2'",  // Only authenticated users can read
    ".write": "auth != null && auth.uid === 'OwL6v9hMzDaslbAVaN3sVFMAUSP2'"  // Only authenticated users can write
  }
}
*/

/*
{
  "rules": {
    "kanbanBoard": {
      ".read": true,
      ".write": "newData.child('columns').exists() && !data.exists() && root.child('users').child('OwL6v9hMzDaslbAVaN3sVFMAUSP2').exists()" // Only allow writes if 'myUID' exists in the 'users' node
    },
    "users": {
      "OwL6v9hMzDaslbAVaN3sVFMAUSP2": {
        ".write": "auth != null"  // You can only write to 'myUID' user data if you are authenticated
      }
    }
  }
}
*/
