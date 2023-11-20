export interface ClientGet {
    id:           number;
    businessName: string;
    cuit:         string;
    branches:     Branch[];
}

export interface Branch {
    id:       number;
    name:     string;
    address:  Address;
    contacts: Contact[];
}

export interface Address {
    id:        number;
    street:    string;
    number:    number;
    floor:     string;
    zipCode:   string;
    apartment: string;
    city:      string;
}

export interface Contact {
    id:      number;
    name:    string;
    surname: string;
    email:   string;
    phones:  Phone[];
}

export interface Phone {
    id:     number;
    number: number;
}
