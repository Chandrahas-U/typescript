import React from "react";
import "./ContactCard.css";
import EditEmployeeForm from "../Forms/EditEmployee";

interface Employee {
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
}

interface EmployeeListProps {
  Employees: Employee[];
  onEmployeeSelect: (employee: Employee) => void;
  hideList?: boolean;
}

export function EmployeeList({ Employees, onEmployeeSelect, hideList }: EmployeeListProps) {
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

interface DisplayFullContactProps {
  selectedEmployee: Employee | null;
  onDeleteEmployee: (id: number) => void;
  onUpdateEmployee: (updatedEmployee: Employee) => void;
  onCloseFullDetails: () => void;
}

export function DisplayFullContact({ selectedEmployee, onDeleteEmployee, onUpdateEmployee, onCloseFullDetails }: DisplayFullContactProps) {
  const handleDeleteEmployee = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete && selectedEmployee) {
      onDeleteEmployee(selectedEmployee.id);
    }
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    onUpdateEmployee(updatedEmployee);
  };

  const closeFullDetails = () => {
    onCloseFullDetails();
  };

  const [showEditForm, setShowEditForm] = React.useState<boolean>(false);

  const handleEditClick = (): void => {
    setShowEditForm(true);
  };

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
            <button className="editButton p-2 border" onClick={handleEditClick}>
              Edit Employee
            </button>
            <button className="closeButton p-2 border" onClick={closeFullDetails}>
              Close
            </button>
            <button className="deleteButton p-2 border" onClick={handleDeleteEmployee}>
              Delete Employee
            </button>
          </div>
          {showEditForm && (
            <EditEmployeeForm selectedEmployee={selectedEmployee} onUpdateEmployee={updateEmployee} onCloseForm={() => setShowEditForm(false)} />
          )}
        </div>

      </div>

    </>
  ) : null;
}
