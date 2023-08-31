export interface Contact {
    id?: number;
    name: string;
    surname: string;
    email: string;
    phones: Phone[];
  }
  
  export interface Phone {
    id?: number;
    number: number;
  }