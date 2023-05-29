//Workstation API for WorkflowFlow +
//By GuimaSpace
import { workstationController } from '@/controller'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Workstation } from '@/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        try {
            const body: { email: string, workstationName : string, description: string, image: string } = req.body;
            workstationController.addWorkstation(body).then((success) => {
                res.status(200).json(success)
            })

        } catch (error) {
            res.status(500).json({ error: 'ocorreu um erro' })
        }
    }

    if (req.method == "GET") {
        const action = req.query.action;
        if (action == "getAllWorkstationUserByEmail") {
            try {
                const email = String(req.query.email);
                const data:Workstation[] = await workstationController.getAllWorkstation() as Workstation[];
                const filteredData = data.filter(workstation => workstation.collaborators.some(collaborator => collaborator.email === email));
                res.status(200).json(filteredData)
            } catch (error) {
                res.status(500).json({ error: 'ocorreu um erro' })
            }
        }

        if (action == "getWorkstationById") {
            try {
                const workstationId = String(req.query.workstationId)
                await workstationController.getWorkstationbyID(workstationId).then((success) => {
                    res.status(200).json(success)
                }).then((error) => {
                    
                }) as Workstation
            } catch (error) {
                res.status(500).json({ error: 'ocorreu um erro' })
            }
        }

        if (action == "validateWorkstationById") {
            try {
                const workstationid = String(req.query.workstationid);
                await workstationController.validateWorkstationById(workstationid);
                res.status(200).json({ message: 'O Workstation é válido.' });
            } catch (error) {
                res.status(500).json({ message: `O ID do Workstation é inválido`, error: error })
            }
        }

        if (action == null) {
            res.status(500).json({ message: 'Invalid action.' })
        }
    }

    if (req.method == "PATCH") {
        const body: { action: string } = req.body;

        if (body.action == "addColaborators") {
            try {
                const body: { email: string, workstation_id: string } = req.body;
                workstationController.addColaborators(body.email, body.workstation_id);
                res.status(200).json({ success: 'Usuario adicionado com sucesso.' });
            } catch (error) {
                res.status(500).json({ error: 'ocorreu um erro' })
            }
        }

        if (body.action == "updateWhitelistUser") {
            try {
                const body: { email: string, workstation_id: string, whitelist: boolean } = req.body;
                await workstationController.updateWhitelistUser(body.email, body.workstation_id, body.whitelist);
            } catch (error) {
                res.status(500).json({ error: 'ocorreu um erro' })
            }
        }

        if (body.action == "updateManagerUser") {
            try {
                const body: { email: string, workstation_id: string, manager: boolean } = req.body;
                await workstationController.updateManagerUser(body.email, body.workstation_id, body.manager)
                res.status(200).json({ success: 'Ocorreu tudo certo' })
            } catch (error) {
                res.status(500).json({ error: 'ocorreu um erro ' + error })
            }
        }
    }
}