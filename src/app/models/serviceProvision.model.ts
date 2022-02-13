import { Employee } from 'src/app/models/employee.model';
import { Company } from "./company.model";

export interface ServiceProvision {
    id: number,
    employee: Employee,
    hiredCompany: Company
};