export interface UserInterface {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    image: string;
    features: {
        administrator?: boolean;
        role: "senior" | "worker" | "guest"
    };
}

export interface ServiceInterface {
    data: any;
    id: string;
    workstationid: string;
    title: string;
    description: string;
    place: string;
    created_date: string;
    requester: string;
    priority: 0 | 1 | 2
    status: number | 0
}

export interface Collaborator {
    email: string;
    manager: boolean;
    whitelist: boolean;
}

export interface Workstation {
    id: string;
    code: string;
    collaborators: Collaborator[];
}
