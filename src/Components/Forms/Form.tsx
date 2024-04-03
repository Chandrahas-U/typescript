import React, { Component } from "react";
import { departments, officeLocations } from "../../Constants/Constants";
import "./AddForm.css";
import { getEmployees } from "../../Services/Sevices";
import { IEmployeeData } from "../../Interface/EmployeeData";

interface IAddEmployeeFormProps {
  isVisible: boolean;
  closeForm(): void;
  onAddEmployee(employee: IEmployeeData): void;
  initialFormData: IEmployeeData;
}

interface IAddEmployeeFormState {
  formData: IEmployeeData;
}

class AddEmployeeForm extends Component<
  IAddEmployeeFormProps,
  IAddEmployeeFormState
> {
  constructor(props: IAddEmployeeFormProps) {
    super(props);
    this.state = {
      formData: props.initialFormData || {
        id: 0,
        fname: "",
        lname: "",
        email: "",
        prefname: "",
        jobTitle: "",
        office: "",
        department: "",
        mobile: "",
        skype: "",
      },
    };
  }

  inputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.target;
    if (id === "mobile") {
      const regex = /^[0-9]*$/;
      if (!regex.test(value)) return;
    }
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [id]: value,
      },
    }));
  };

  generateID = () => {
    let highestId = 0;
    const storedData = getEmployees();
    storedData.forEach((employee) => {
      if (employee.id > highestId) {
        highestId = employee.id;
      }
    });
    return highestId + 1;
  };

  submitData = (e: React.FormEvent) => {
    e.preventDefault();
    const { formData } = this.state;

    if (formData.id === 0) {
      const id = this.generateID();
      const employeeData: IEmployeeData = { ...formData, id };
      this.props.onAddEmployee(employeeData);
    } else {
      this.props.onAddEmployee(formData);
    }

    this.setState({
      formData: {
        id: 0,
        fname: "",
        lname: "",
        email: "",
        prefname: "",
        jobTitle: "",
        office: "",
        department: "",
        mobile: "",
        skype: "",
      },
    });
    this.props.closeForm();
  };

  render() {
    const { formData } = this.state;

    return (
      <div className="full-screen">
        <div className="add-employee-form col-6 border px-4 py-3">
          <form id="contactForm" onSubmit={this.submitData}>
            <div className="row col-12">
              <div className="details row col-12">
                {formData.id === 0 ? (
                  <h2 className="pb-4">Add Employee</h2>
                ) : (
                  <h2 className="pb-4">Edit Employee</h2>
                )}

                <div className="mb-1 fw-bold col-6 pe-2 ">
                  <label htmlFor="fname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    placeholder="Enter your full name"
                    value={formData.fname}
                    onChange={this.inputChange}
                    required
                  />
                </div>
                <div className="mb-1 fw-bold col-6 pe-2">
                  <label htmlFor="lname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    placeholder="Enter your last name"
                    value={formData.lname}
                    onChange={this.inputChange}
                    required
                  />
                </div>
                <div className="mb-1 fw-bold">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={this.inputChange}
                    required
                  />
                </div>
                <div className="mb-1 fw-bold col-6 pe-2">
                  <label htmlFor="prefname" className="form-label">
                    Preferred Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="prefname"
                    placeholder="Enter your preferred name"
                    value={formData.prefname}
                    onChange={this.inputChange}
                    required
                  />
                </div>
                <div className="mb-1 fw-bold col-6 ps-2">
                  <label htmlFor="jobTitle" className="form-label">
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Enter your job title"
                    value={formData.jobTitle}
                    onChange={this.inputChange}
                    required
                  />
                </div>
                <div className="mb-1 fw-bold col-6 pe-2">
                  <label htmlFor="office" className="form-label">
                    Office Location
                  </label>
                  <select
                    id="office"
                    className="form-select"
                    value={formData.office}
                    onChange={this.inputChange}
                    required
                  >
                    {officeLocations.map((location) => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-1 fw-bold col-6 ps-2">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <select
                    id="department"
                    className="form-select"
                    value={formData.department}
                    onChange={this.inputChange}
                    required
                  >
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-1 fw-bold col-6 pe-2">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    placeholder="Enter only digits"
                    value={formData.mobile}
                    onChange={this.inputChange}
                    required
                  />
                </div>
                <div className="mb-1 fw-bold col-6 ps-2">
                  <label htmlFor="skype" className="form-label">
                    Skype Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="skype"
                    placeholder="Enter your Skype Id"
                    value={formData.skype}
                    onChange={this.inputChange}
                    required
                  />
                </div>
              </div>
              <div className="row col-12">
                <div className="edit-buttons d-flex justify-content-end">
                  {formData.id === 0 ? (
                    <button
                      type="submit"
                      className="btn btn-success px-4 py-1 rounded-0"
                      id="addButton"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-1 rounded-0"
                      id="updateButton"
                    >
                      Update
                    </button>
                  )}
                  <button
                    onClick={this.props.closeForm}
                    className="btn btn-danger px-3 py-1 rounded-0"
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddEmployeeForm;
