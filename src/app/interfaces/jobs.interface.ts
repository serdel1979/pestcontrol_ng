export interface Job {
    id:          number;
    description: string;
    jobType:     JobType;
    subJobs:     SubJob[];
}

export interface JobType {
    id:          number;
    description: string;
}

export interface SubJob {
    id:          number;
    description: string;
}
