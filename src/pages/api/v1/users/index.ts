//Post UserAPI Rest 02/03/23
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserInterface } from '@/models/';
import { ValidateCadForm } from '@/services/validate.service';
import { userController } from '@/controller';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    try {
      const userData = req.body
      const trustedUserData = await ValidateCadForm(userData, true) as UserInterface; //Envia a filtragem de dados, as interface informa os valores pré definido de retorno.

      //Verifica se o email existe
      if (await userController.verifyUserEmail(trustedUserData.email)) {
        res.status(405).json({ error: "Esse email já está cadastrado no sistema" });
        return;
      }

      await userController.addUser(trustedUserData)
      res.status(200).json({ message: "Usuário cadastrado com sucesso" });
      return;

    } catch (error) {
      res.status(405).json({ error: "" + error });
    }
    return;
  }

  if (req.method == "DELETE") {
    try {
      const data: { userid: string, reason: string } = req.body
      await userController.removeUser(data)
      res.status(200).json({ message: "Usuario deletado com sucesso." })
    } catch (error) {
      res.status(400).json({ message: "Deu erro boy :d: " + error })
    }
  }

  if (req.method == "PATCH") {
    try {
      const data: { id: string, role: "senior" | "worker" | "guest" } = req.body;
      await userController.changeUserRole(data);
      res.status(200).json({ message: "Usuario modificado com sucesso." })
      return;
    } catch (error) {
      res.status(400).json({ message: "Ocorreu um erro ao modificar o cargo do usuário", reason: `${error}` })
    }
  }

  
  res.status(400).json({ message: "The specified method is not accepted" })
}