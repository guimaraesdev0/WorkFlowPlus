import { Workstation } from '@/models';
import { db, addDoc, getDocs, getDoc, updateDoc, doc, collection, query, orderBy, where, deleteDoc } from './firebaseClient.service';

export class workstation {
    async addWorkstation(){
        return new Promise(async (resolve, reject) => {
            try {
                const workstation:any = {
                    code: "asdasd",
                    collaborators: [
                        { email: 'guimaraesdev013@gmail.com', manager: true, whitelist:true },
                        { email: 'enzoka013@gmail.com', manager: true, whitelist:true },
                    ]
                }
                const cadastro = await addDoc(collection(db, "workstations"), workstation)
                resolve('deu certo, ' + cadastro)
                return;
            } catch (error) {
                reject(error)     
                return;
            }
    })
}

}

