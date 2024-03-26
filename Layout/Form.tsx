
import React, { useState, ChangeEvent } from "react";

interface EmployeeData {
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

interface AddEmployeeFormProps {
  isVisible: boolean;
  closeForm: () => void;
  onAddEmployee: (employee: EmployeeData) => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ isVisible, closeForm, onAddEmployee }) => {
  const [formData, setFormData] = useState<EmployeeData>({
    fname: "",
    lname: "",
    email: "",
    prefname: "",
    jobTitle: "",
    office: "",
    department: "",
    mobile: "",
    skype: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const generateID = () => {
    let highestId = 0;
    const storedData: EmployeeData[] = JSON.parse(localStorage.getItem("Employees") || "[]");
    storedData.forEach((employee) => {
      if (employee.id > highestId) {
        highestId = employee.id;
      }
    });
    return highestId + 1;
  };

  const submitData = () => {
    const id = generateID();
    const employeeData: EmployeeData = { ...formData, id };
    onAddEmployee(employeeData);
    setFormData({
      fname: "",
      lname: "",
      email: "",
      prefname: "",
      jobTitle: "",
      office: "",
      department: "",
      mobile: "",
      skype: "",
    });
    closeForm(); 
  };

  return (
    <div
      className={`add-employee-form col-12 border px-4 py-3 ${
        isVisible ? "d-block" : "d-none"
      }`}
    >
      <form id="contactForm"  onSubmit={submitData} >
        <div className="row col-12">
          <div className="details row col-10">
            <div className="mb-1 fw-bold col-6 pe-2">
              <label htmlFor="fname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="Enter your full name"
                value={formData.fname}
                onChange={handleChange} required
              />
            </div>
            <div className="mb-1 fw-bold col-6 ps-2">
              <label htmlFor="lname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lname"
                placeholder="Enter your last name"
                value={formData.lname}
                onChange={handleChange} required
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
                onChange={handleChange} required
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
                onChange={handleChange} required
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
                onChange={handleChange} required
              />
            </div>
            <div className="mb-1 fw-bold col-6 pe-2">
              <label htmlFor="office" className="form-label">
                Office Location
              </label>
              <input
                type="text"
                className="form-control"
                id="office"
                placeholder="Enter your office location"
                value={formData.office}
                onChange={handleChange} required
              />
            </div>
            <div className="mb-1 fw-bold col-6 ps-2">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <input
                type="text"
                className="form-control"
                id="department"
                placeholder="Enter your department"
                value={formData.department}
                onChange={handleChange} required
              />
            </div>
            <div className="mb-1 fw-bold col-6 pe-2">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                placeholder="Enter your mobile"
                value={formData.mobile}
                onChange={handleChange} required
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
                onChange={handleChange} required
              />
            </div>
          </div>
          <div className="row col-12">
            <div className="edit-buttons d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-success px-4 py-1 rounded-0"
                id="addButton"
      
              >
                Add
              </button>
              <button
                onClick={closeForm}
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
  );
};

export default AddEmployeeForm;
