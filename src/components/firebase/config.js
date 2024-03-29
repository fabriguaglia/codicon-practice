// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm1sXGPskNLd_y6sLKM_KMMCVrVR_82Jg",
  authDomain: "codicon-practice.firebaseapp.com",
  projectId: "codicon-practice",
  storageBucket: "codicon-practice.appspot.com",
  messagingSenderId: "1061057171698",
  appId: "1:1061057171698:web:754e826893a452f7ed806b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file)
{
    // Guarda las fotos ahora en la carpeta fotosMascotas
    const storageRef = ref(storage, 'fotosMascotas/' + file.name)
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  return getDownloadURL(storageRef);
}