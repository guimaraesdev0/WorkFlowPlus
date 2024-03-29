import { Workstation } from '@/models';
import { db, addDoc, getDocs, getDoc, updateDoc, doc, collection, query, orderBy, where, deleteDoc, QuerySnapshot } from './firebaseClient.service';
import { generateWorkstationInviteCode } from './generatecode.service';
import { DocumentData, arrayUnion } from 'firebase/firestore';

export class workstation {
    addWorkstation = (data: { email: string, workstationName: string, description: string, image: string }) => new Promise(async (resolve, reject) => {
        try {
            console.log(data)
            const worstationCode = generateWorkstationInviteCode();
            addDoc(collection(db, "workstation"), {
                code: worstationCode,
                workstationName: data.workstationName,
                description: data.description,
                image: data.image,
                collaborators: [
                    { email: data.email, manager: true, whitelist: true }
                ]
            });
            resolve({ message: 'O Workstation foi criado com sucesso', invite_code: worstationCode });
        } catch (error) {
            reject(error);
        }
    })

    getWorkstationIdByCode = (code:string) => new Promise(async (resolve, reject) => {
        try {
            const querySnapshot = await getDocs(query(collection(db, 'workstation'), where('code', '==', code)));
            if (!querySnapshot.empty) {
              resolve (querySnapshot.docs[0].id)
            }
        } catch (error) {
            console.error(`Erro ao buscar workstation por código: ${error}`);
        }
    })

    addColaborators = (user_email: string, workstation_id: string) => new Promise(async (resolve, reject) => {
        try {
            const docRef = doc(db, 'workstation', workstation_id)
            await updateDoc(docRef, {
                collaborators: arrayUnion({ email: user_email, manager: false, whitelist: true })
            })
            resolve (true)
        } catch (error) {
            reject(error);
        }
    })


    updateWhitelistUser = (email: string, workstation_id: string, whitelist: boolean) => new Promise(async (resolve, reject) => {
        try {
            const docRef = doc(db, 'workstation', workstation_id);
            const workstationDoc = await getDoc(docRef);
            if (!workstationDoc.exists) {
                reject(`O Workstation de ID: ${workstation_id} não foi encontrado.`)
            }

            const workstationData = workstationDoc.data() as Workstation;
            const collaborators = [...workstationData.collaborators];
            const index = collaborators.findIndex((collab: any) => collab.email === email)
            if (index < 0) {
                throw new Error(`O colaborador com email ${email} não foi encontrado na estação de trabalho com ID ${workstation_id}.`);
            }
            collaborators[index].whitelist = whitelist;
            await updateDoc(docRef, { collaborators });
            resolve('O nível de permissão do usuário foi alterado com sucesso');
        } catch (error) {
            reject(error);
        }
    })

    updateManagerUser = (email: string, workstation_id: string, manager: boolean) => new Promise(async (resolve, reject) => {
        try {
            const docRef = doc(db, 'workstation', workstation_id);
            const workstationDoc = await getDoc(docRef);
            if (!workstationDoc.exists) {
                reject(`O Workstation de ID: ${workstation_id} não foi encontrado.`)
            }

            const workstationData = workstationDoc.data() as Workstation;
            const collaborators = [...workstationData.collaborators];
            const index = collaborators.findIndex((collab: any) => collab.email === email);
            if (index < 0) {
                throw new Error(`O colaborador com email ${email} não foi encontrado na estação de trabalho com ID ${workstation_id}.`);
            }
            collaborators[index].manager = manager;

            await updateDoc(docRef, { collaborators });
            resolve('O nível de permissão do usuário foi alterado com sucesso');
        } catch (error) {
            reject(error);
        }
    });

    getAllWorkstation = async () => {
        try {
            const workstationRef = collection(db, 'workstation');
            const workstationQuery = query(workstationRef);
            const workstationSnapshot = await getDocs(workstationQuery);

            const workstations = workstationSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            return workstations;
        } catch (error) {
            throw error;
        }
    }

    getWorkstationbyID = (workstation_id: any) => new Promise(async (resolve, reject) => {
        try {
            const docRef = doc(db, 'workstation', workstation_id);
            const workstationDoc = await getDoc(docRef).then()
            const workstationData = workstationDoc.data() as Workstation;
            resolve (workstationData)
        } catch (error) {
            reject(error)
        }
    })

    validateWorkstationById = (workstation_id: any) => new Promise(async (resolve, reject) => {
        try {
            const workstationDocRef = doc(db, "workstation", workstation_id);
            const docSnapshot = await getDoc(workstationDocRef);
            if (!docSnapshot.data()) {
                // Foi encontrado um documento com o ID informado
                resolve(true);
            } else {
                // Não foi encontrado um documento com o ID informado
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}