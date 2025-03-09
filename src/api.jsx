import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyABe8tStW5mZdReJvzeCtkosM-_Ivg6XxM",
    authDomain: "react-van-life-c3847.firebaseapp.com",
    projectId: "react-van-life-c3847",
    storageBucket: "react-van-life-c3847.firebasestorage.app",
    messagingSenderId: "721720368664",
    appId: "1:721720368664:web:88f012287b6ba758926d6d",
    measurementId: "G-DR7J3GQ96K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getVans() {
    const vansCollectionRef = collection(db, "van");
    const querySnapshot = await getDocs(vansCollectionRef);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    return dataArr;
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        // eslint-disable-next-line
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        // eslint-disable-next-line
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}