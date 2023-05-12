/* 
WorkFlowPlus Validate By: Guimaraes 02/03/23
*/
import { UserInterface } from '@/models';
import { ServiceInterface } from '@/models';

export const ValidateServiceForm = (FormData: ServiceInterface) => new Promise((resolve, reject) => {
    //Verifica se os campos estão vazios
    if (!FormData.title || !FormData.description || !FormData.place || !FormData.created_date || !FormData.requester) {
        reject("Nenhum campo deve estar vazio")
        return
    }

    //Verifica o tamanho da descrição
    if (FormData.description.length < 30) {
        reject("A descrição precisa ser mais detalhada")
        return;
    }
    
    /* Define valores padrão para o status */
    const NewData = {
        title: FormData.title,
        description: FormData.description,
        place: FormData.place,
        created_date: FormData.created_date,
        requester: FormData.requester,
        priority: FormData.priority,
        status: 0
    } as ServiceInterface
    resolve(NewData)
    return;
})

export const ValidateCadForm = (userData: UserInterface, PassEncrypt: Boolean) => new Promise((resolve, reject) => {
    // Verifica campos vazios
    if (!userData.first_name || !userData.last_name || !userData.email || !userData.password) {
        reject("Nenhum campo deve estar vazio! retornou aqui");
        return;
    }

    // Verifica caracteres especiais
    const specialCharRegex = /[^\w\s]/;
    if (specialCharRegex.test(userData.first_name)) {
        reject("Caracteres especiais em nome não permitidos! " + specialCharRegex);
        return;
    }
    //Verifica o tamanho da senha
    if (userData.password.length < 6) {
        reject("A senha precisa conter no mínimo 6 caracteres")
        return;
    }

    //Verifica a autenticidade do email fornecido pelo usuario
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(userData.email)) {
        reject("Email invalido")
        return;
    }

    resolve(userData)
})
