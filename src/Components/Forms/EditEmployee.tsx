import { Component } from "react";
import "./EditForm.css";

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

interface EditEmployeeFormProps {
  selectedEmployee: Employee;
  onUpdateEmployee: (updatedEmployee: Employee) => void;
  onCloseForm: () => void;
}

interface EditEmployeeFormState {
  formData: Employee;
}

class EditEmployeeForm extends Component<
  EditEmployeeFormProps,
  EditEmployeeFormState
> {
  constructor(props: EditEmployeeFormProps) {
    super(props);
    this.state = {
      formData: props.selectedEmployee,
    };
  }

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [id]: value },
    }));
  };

  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    this.props.onUpdateEmployee(this.state.formData);
    this.props.onCloseForm();
  };

  handleCancel = (): void => {
    this.props.onCloseForm();
  };

  render() {
    const { formData } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="col-5 ps-3">
        <div className="EditForm">
          <div className="fw-bold">
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              id="fname"
              value={formData.fname}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="fw-bold">
            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              id="lname"
              value={formData.lname}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="fw-bold">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="fw-bold">
            <label htmlFor="prefname">Preferred Name:</label>
            <input
              type="text"
              id="prefname"
              value={formData.prefname}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="fw-bold">
            <label htmlFor="jobTitle">Job Title:</label>
            <input
              type="text"
              id="jobTitle"
              value={formData.jobTitle}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="fw-bold">
            <label htmlFor="office">Office Location:</label>
            <select
              id="office"
              value={formData.office}
              onChange={this.handleChange}
              required
            >
              <option value="">Select Office Location</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Banglore">Banglore</option>
              <option value="USA">USA</option>
            </select>
          </div>
          <div className="fw-bold">
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              value={formData.department}
              onChange={this.handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="fw-bold">
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="text"
              id="mobile"
              value={formData.mobile}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="fw-bold">
            <label htmlFor="skype">Skype ID:</label>
            <input
              type="text"
              id="skype"
              value={formData.skype}
              onChange={this.handleChange}
              required
            />
          </div>
          <br />
          <div>
            <button className="px-3 py-1 btn btn-success" type="submit">
              Update
            </button>
            <button
              className="px-3 py-1 btn btn-danger"
              type="button"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditEmployeeForm;
