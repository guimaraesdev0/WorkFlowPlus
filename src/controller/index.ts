import { user } from "@/services/user.service";
import { service } from "@/services/services.service";
import { workstation } from "@/services/workstations.service";

export const userController = new user;
export const serviceController = new service;
export const workstationController = new workstation;