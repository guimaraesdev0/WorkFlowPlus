import { Workstation } from "@/models";

const workstation:Workstation = {
    id: "1203adkaso",
    code: "asdasd",
    collaborators: [
        { email: 'guimaraesdev013@gmail.com', manager: true, whitelist:true },
        { email: 'guimaraesdev013@gmail.com', manager: true, whitelist:true },
    ]
}

if (workstation.collaborators[1].email == "guimaraesdev013@gmail.com") {
    
}