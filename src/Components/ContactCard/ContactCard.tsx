import { Component } from "react";
import "./ContactCard.css";
// import EditEmployeeForm from "../Forms/EditEmployee";
import { IEmployeeData } from "../../Interface/EmployeeData";

interface EmployeeListProps {
  Employees: IEmployeeData[];
  onEmployeeSelect: (employee: IEmployeeData) => void;
  // hideList: boolean;
}

export class EmployeeList extends Component<EmployeeListProps> {
  render() {
    const { Employees, onEmployeeSelect } = this.props;
    return (
      <div className="row pt-4">
        {Employees.length > 0 ? (
          Employees.map((employee, id) => (
            <div key={id} className="col-3 p-1">
              <div
                className="contact-card employee-card d-flex px-2 py-2"
                onClick={() => onEmployeeSelect(employee)}
              >
                <div className="employee-pic">
                  <img
                    id="profilePic"
                    src="..\src\assets\cat.png"
                    alt="Profile"
                  />
                </div>
                <div className="employee-info ps-2">
                  <p>{employee.fname}</p>
                  <p>{employee.jobTitle}</p>
                  <p>{employee.department}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <h1>No employee found</h1>
          </div>
        )}
      </div>
    );
  }
}

// export default EmployeeList;


