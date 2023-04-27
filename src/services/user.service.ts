/* 
    UserController WorkFlow 17/04/2023
    by: Guimaraes
*/
import { db, addDoc, getDocs, getDoc, updateDoc, doc, collection, query, orderBy, where, deleteDoc } from './firebaseClient.service';
import { UserInterface } from '@/models/';
import bcrypt from "bcrypt";

export class user {
    /* Método que adiciona o usuario e faz a encriptação da senha usando Bcrypt */
    addUser = (userData: UserInterface) => new Promise(async (resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err)
            } else {
                bcrypt.hash(userData.password, salt, async (err, hash) => {
                    if (err) {
                        reject(err)
                    } else {
                        userData.password = hash
                        userData.features = { role: "guest", administrator: false }
                        try {
                            await addDoc(collection(db, "users"), userData)
                            resolve(true)
                        } catch (error) {
                            reject(error)
                        }
                    }
                })
            }
        })
    })
    
    changeUserRole = (userData:{id:string, role: "senior" | "worker" | "guest"}) => new Promise(async (resolve, reject) => {
        if (userData.role != "senior" && userData.role != "worker" && userData.role != "guest") {
            reject("Role does not match");
        }else{
            const docRef = doc(db, 'users', userData.id)
            updateDoc(docRef, {
                features:{role: userData.role}
            }).then(() => {
                resolve(true)
            })
            .catch((error) => {
                reject(error)
            })
        }

    })

    removeUser = (data: { userid: string, reason: string }) => new Promise(async (resolve, reject) => {
        await deleteDoc(doc(db, "users", data.userid))
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                reject(error)
            })
    });

    verifyUserEmail = async (email: string) => {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return true;
        }
        return false;
    }

    userValidate = (userData: { email: string, password: string }) => new Promise(async (resolve, reject) => {
        // Verifica campos vazios
        if (!userData.email || !userData.email) {
            reject("Nenhum campo deve estar vazio!");
            return;
        }

        // Verifica a autenticidade do email fornecido pelo usuário
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(userData.email)) {
            reject("Email inválido");
            return;
        }

        try {
            const q = query(collection(db, 'users'), where('email', '==', userData.email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDataFromDb = querySnapshot.docs[0].data() as UserInterface;
                const passwordMatch = await bcrypt.compare(userData.password, userDataFromDb.password);
                if (passwordMatch) {
                    // Retorna o objeto com o ID do documento
                    resolve({ ...userDataFromDb, id: querySnapshot.docs[0].id });
                    return;
                }
            }
            reject("Email ou senha inválidos");
            return;
        } catch (error) {
            reject('Erro ao procurar usuário: ' + error);
            return;
        }
    });
}