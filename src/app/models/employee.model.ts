import { Company } from "./company.model";

export interface Employee {
    id: number,
    name: string,
    admissionDate: Date,
    company: Company
};