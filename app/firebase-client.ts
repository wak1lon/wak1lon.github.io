import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAy1rhV1m5pMCRmigkJ1udLhWh4d313B2o",
  authDomain: "painel-site-wakilon-gestor.firebaseapp.com",
  projectId: "painel-site-wakilon-gestor",
  storageBucket: "painel-site-wakilon-gestor.firebasestorage.app",
  messagingSenderId: "712301686471",
  appId: "1:712301686471:web:0c7c79e5a090911bdf18e2",
  measurementId: "G-Y5DPN7FXFT",
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
