import { db, addDoc, getDocs, getDoc, updateDoc, doc, collection, query, orderBy, where, deleteDoc } from './firebaseClient.service';
import { ServiceInterface } from '@/models/';

interface bodyService {
  id: string,
  status: 0 | 1 | 2;
}
export class service {

  addService = (serviceData: ServiceInterface) => new Promise(async (resolve, reject) => {
    addDoc(collection(db, "services"), serviceData)
      .then(() => { resolve(true) })
      .catch((error) => reject("Deu erro boy " + error))
  })


  serviceStatus = (data:bodyService) => new Promise((resolve, reject) => {
    const docRef = doc(db, 'services', data.id)
    updateDoc(docRef, {
      status: data.status
    }).then(() => {
      resolve(true);
    })
    .catch(() => {
      reject(false)
    })
    return;
  })


}