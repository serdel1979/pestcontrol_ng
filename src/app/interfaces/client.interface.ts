import { Contact } from "./contact.interface";

export interface Client {
    id?: number;
    businessName: string;
    cuit: string;
    contact: Contact;
}