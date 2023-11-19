export interface Schedule {
    id:          number;
    branch:      Branch;
    subJob:      SubJob;
    description: string;
    dateInit:    Date;
    dateEnd:     Date;
}

export interface Branch {
    id:     number;
    name:   string;
    client: Client;
}

export interface Client {
    id:           number;
    businessName: string;
    cuit:         string;
}

export interface SubJob {
    id:          number;
    description: string;
}