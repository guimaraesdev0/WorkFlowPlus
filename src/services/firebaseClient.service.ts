import * as firebase from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, QuerySnapshot, DocumentData, getDoc, doc, updateDoc, query, orderBy, where, deleteDoc } from 'firebase/firestore';
import 'firebase/analytics'

export const firebaseConfig = {
    apiKey: "AIzaSyCJosQy9RNBrZXrorBjLACoQYjQ4ISKZUk",
    authDomain: "workflowplus-f03ff.firebaseapp.com",
    projectId: "workflowplus-f03ff",
    storageBucket: "workflowplus-f03ff.appspot.com",
    messagingSenderId: "533738013326",
    appId: "1:533738013326:web:3d5635bae3218bc4bb7fdf",
    measurementId: "G-4F4FD1MB7P"
};

const app = firebase.initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db, addDoc, collection, getDocs, QuerySnapshot, getDoc, updateDoc, doc, query, orderBy, where, deleteDoc }