import { Contact } from "./contact.interface";

export interface Client {
    id?: number;
    businessName: string;
    cuit: string;
    contacts?: Contact;
    branches?: Branch[];
}


export interface Branch {
    id?: number;
    name:    string;
    address: Address;
}

export interface Address {
    street:    string;
    number:    number;
    floor:     string;
    zipCode:   string;
    apartment: string;
    city:      string;
}
