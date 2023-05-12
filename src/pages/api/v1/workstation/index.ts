//Workstation API for WorkflowFlow +
//By GuimaSpace
import { workstationController } from '@/controller'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        try {
            await workstationController.addWorkstation;
            res.status(200).json({ success: 'Workstation cadastrado com sucesso.'})
        } catch (error) {
            res.status(400).json({ error: 'ocorreu um erro'})
        }
    }
}