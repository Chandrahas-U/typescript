import { Component } from "react";
import "./ContactCard.css";
import EditEmployeeForm from "../Forms/EditEmployee";
import { EmployeeData } from "../Interface/EmployeeData";



interface EmployeeListProps {
  Employees: EmployeeData[];
  onEmployeeSelect: (employee: EmployeeData) => void;
  hideList: boolean;
}

class EmployeeList extends Component<EmployeeListProps> {
  render() {
    const { Employees, onEmployeeSelect, hideList } = this.props;
    return (
      <div className={`row pt-4 ${hideList ? 'd-none' : ''}`}>
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

export default EmployeeList;



interface DisplayFullContactProps {
  selectedEmployee: EmployeeData;
  onDeleteEmployee: any;
  onUpdateEmployee: (updatedEmployee: EmployeeData) => void;
  onCloseFullDetails:()=>void;
}
class DisplayFullContact extends Component <DisplayFullContactProps> {
  state = {
    showEditForm: false
  };

  runDeleteEmployee = () => {
    const { selectedEmployee, onDeleteEmployee } = this.props;
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete && selectedEmployee) {
      onDeleteEmployee(selectedEmployee.id);
    }
  };

  updateEmployee = (updatedEmployee: any) => {
    const { onUpdateEmployee } = this.props;
    onUpdateEmployee(updatedEmployee);
  };

  closeFullDetails = () => {
    const { onCloseFullDetails } = this.props;
    onCloseFullDetails();
  };

  runEditClick = () => {
    this.setState({ showEditForm: true });
  };

  render() {
    const { selectedEmployee } = this.props;
    const { showEditForm } = this.state;

    return selectedEmployee ? (
      <>
        <div className="full-details col-12 pt-4">
          <div className="row">
            <img id="fullPic" className="col-3" src="../src/assets/cat.png" alt="Full Profile" />
            <div className="employee-text-details col-4 ps-4">
              <h4>
                {selectedEmployee.fname} {selectedEmployee.lname}
              </h4>
              <br />
              <p>
                <b>Mail:</b> {selectedEmployee.email}
              </p>
              <p>
                <b>Job Title:</b> {selectedEmployee.jobTitle}
              </p>
              <p>
                <b>Location:</b> {selectedEmployee.office}
              </p>
              <p>
                <b>Department:</b> {selectedEmployee.department}
              </p>
              <p>
                <b>Mobile:</b> {selectedEmployee.mobile}
              </p>
              <p>
                <b>Skype ID:</b> {selectedEmployee.skype}
              </p>
              <br />
              <button className="editButton p-2 border" onClick={this.runEditClick}>
                Edit Employee
              </button>
              <button className="closeButton p-2 border" onClick={this.closeFullDetails}>
                Close
              </button>
              <button className="deleteButton p-2 border" onClick={this.runDeleteEmployee}>
                Delete Employee
              </button>
            </div>
            {showEditForm && (
              <EditEmployeeForm selectedEmployee={selectedEmployee} onUpdateEmployee={this.updateEmployee} onCloseForm={() => this.setState({ showEditForm: false })} />
            )}
          </div>
        </div>
      </>
    ) : null;
  }
}

export { EmployeeList, DisplayFullContact };
