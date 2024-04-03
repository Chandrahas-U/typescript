import { Component } from "react";
import "./ContactCard.css";
import { IEmployeeData } from "../../Interface/EmployeeData";

interface IEmployeeListProps {
  Employees: IEmployeeData[];
  onEmployeeSelect: (employee: IEmployeeData) => void;
}

export class EmployeeList extends Component<IEmployeeListProps> {
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
                  <p className="fw-bold">{employee.fname}</p>
                  <p>{employee.jobTitle}</p>
                  <p>{employee.department}</p>
                  <i className="fa-solid fa-phone iconSize pe-1"></i>
                  <i className="fa-brands fa-facebook iconSize pe-1"></i>
                  <i className="fa-brands fa-instagram iconSize pe-1"></i>
                  <i className="fa-solid fa-heart iconSize"></i>
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
