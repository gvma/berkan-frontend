import { Company } from "./company.model";

export interface Contract {
    id: number,
    initialDate: Date,
    endDate: Date,
    hiringCompany: Company,
    hiredCompany: Company
};