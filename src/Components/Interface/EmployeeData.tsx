export interface EmployeeData {
    id: number;
    fname: string;
    lname: string;
    email: string;
    prefname: string;
    jobTitle: string;
    office: string;
    department: string;
    mobile: string;
    skype: string;
    [key: string]: string | number;
  }
  