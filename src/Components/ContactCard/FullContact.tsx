import { Component } from "react";
import { IEmployeeData } from "../../Interface/EmployeeData";
import AddEmployeeForm from "../Forms/Form";
import { DeletePopup } from "./DeleteCon";

interface DisplayFullContactProps {
  selectedEmployee: IEmployeeData;
  onDeleteEmployee: any;
  onUpdateEmployee (updatedEmployee: IEmployeeData) : void;
  onCloseFullDetails() : void;
}

interface DisplayFullContactState {
  showEditForm: boolean;
  showDeletePopup: boolean;
}

class DisplayFullContact extends Component<
  DisplayFullContactProps,
  DisplayFullContactState
> {
  constructor(props: DisplayFullContactProps) {
    super(props);
    this.state = {
      showEditForm: false,
      showDeletePopup: false,
    };
  }

  runDeleteEmployee = () => {
    const { onDeleteEmployee, selectedEmployee } = this.props;
    onDeleteEmployee(selectedEmployee.id);
    this.closeDeletePopup();
  };

  openDeletePopup = () => {
    this.setState({ showDeletePopup: true });
  };

  closeDeletePopup = () => {
    this.setState({ showDeletePopup: false });
  };

  closeFullDetails = () => {
    const { onCloseFullDetails } = this.props;
    onCloseFullDetails();
  };

  runEditClick = () => {
    this.setState({ showEditForm: true });
  };

  render() {
    const { selectedEmployee, onUpdateEmployee } = this.props;
    const { showEditForm, showDeletePopup } = this.state;

    return (
      <>
        <div className="full-details col-12 pt-4">
          <div className="row">
            <img
              id="fullPic"
              className="col-3"
              src="../src/assets/cat.png"
              alt="Full Profile"
            />
            {!showEditForm && (
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

                <div>
                  <button
                    className="editButton p-2 border"
                    onClick={this.runEditClick}
                  >
                    Edit Employee
                  </button>
                  <button
                    className="closeButton p-2 border"
                    onClick={this.closeFullDetails}
                  >
                    Close
                  </button>
                  <button
                    className="deleteButton p-2 border"
                    onClick={this.openDeletePopup}
                  >
                    Delete Employee
                  </button>
                </div>
              </div>
            )}
            {showEditForm && (
              <AddEmployeeForm
                isVisible={true}
                closeForm={() => this.setState({ showEditForm: false })}
                onAddEmployee={onUpdateEmployee}
                initialFormData={selectedEmployee}
              />
            )}
          </div>
        </div>
        {showDeletePopup && (
          <DeletePopup
            onDeleteConfirmed={this.runDeleteEmployee}
            onCancelDelete={this.closeDeletePopup}
          />
        )}
      </>
    );
  }
}

export { DisplayFullContact };
