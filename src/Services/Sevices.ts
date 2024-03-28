import { IEmployeeData } from "../Interface/EmployeeData";

export function getEmployees(): IEmployeeData[] {
  const Employees = JSON.parse(localStorage.getItem("Employees") || "[]");
  return Employees;
}

export function setEmployees(updatedEmployees: IEmployeeData[]) {
  
  localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
}
