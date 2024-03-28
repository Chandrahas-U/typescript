import { Component } from "react";
import "./EditForm.css";
import { departments, officeLocations } from "../../Constants/Constants";

interface IEmployee {
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

interface IEditEmployeeFormProps {
  selectedEmployee: IEmployee;
  onUpdateEmployee: (updatedEmployee: IEmployee) => void;
  onCloseForm: () => void;
}

interface IEditEmployeeFormState {
  formData: IEmployee;
}

class EditEmployeeForm extends Component<
  IEditEmployeeFormProps,
  IEditEmployeeFormState
> {
  constructor(props: IEditEmployeeFormProps) {
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
      <form onSubmit={this.handleSubmit} className="col-8 ps-3">
        <div className="EditForm row">
          <div className="fw-bold col-6">
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              id="fname"
              value={formData.fname}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="fw-bold col-6">
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
          <div className="fw-bold col-6">
            <label htmlFor="prefname">Preferred Name:</label>
            <input
              type="text"
              id="prefname"
              value={formData.prefname}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="fw-bold col-6">
            <label htmlFor="jobTitle">Job Title:</label>
            <input
              type="text"
              id="jobTitle"
              value={formData.jobTitle}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="fw-bold col-6">
            <label htmlFor="office">Office Location:</label>
            <select
              id="office"
              value={formData.office}
              onChange={this.handleChange}
              required
            >
              {officeLocations.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
          <div className="fw-bold col-6">
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              value={formData.department}
              onChange={this.handleChange}
              required
            >
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>
          <div className="fw-bold col-6">
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="text"
              id="mobile"
              value={formData.mobile}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="fw-bold col-6">
            <label htmlFor="skype">Skype ID:</label>
            <input
              type="text"
              id="skype"
              value={formData.skype}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="py-4 col-4 d-flex justify-content-around">
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

