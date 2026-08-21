export interface Topic {
    id: string;
    name: string;
    description?: string;
    deadline?: string;
    completed: boolean;
}

export interface Subject {
    id: string;
    name: string;
    deadline?: string;
    topics: Topic[];
}

export interface Exam {
    id: string;
    name: string;
    subjects: Subject[];
}