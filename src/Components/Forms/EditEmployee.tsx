
import React, { useState } from "react";
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

const EditEmployeeForm = ({ selectedEmployee, onUpdateEmployee, onCloseForm } : EditEmployeeFormProps) => {
  const [formData, setFormData] = useState<Employee>(selectedEmployee);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (): void => {
    onUpdateEmployee(formData);
    onCloseForm();
  };

  const handleCancel = (): void => {
    onCloseForm();
  };

  return (
    <form onSubmit={handleSubmit} className="col-5 ps-3">
      <div className="EditForm ">
      <div className="fw-bold">
        <label htmlFor="fname">First Name:</label>
        <input type="text" id="fname" value={formData.fname} onChange={handleChange} required />
      </div >
      <div className="fw-bold ">
        <label htmlFor="lname">Last Name:</label>
        <input type="text" id="lname" value={formData.lname} onChange={handleChange} required />
      </div>
      <div className="fw-bold">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="fw-bold">
        <label htmlFor="prefname">Preferred Name:</label>
        <input type="text" id="prefname" value={formData.prefname} onChange={handleChange} required />
      </div>
      <div className="fw-bold">
        <label htmlFor="jobTitle">Job Title:</label>
        <input type="text" id="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
      </div>
      <div className="fw-bold">
        <label htmlFor="office">Office Location:</label>
        <input type="text" id="office" value={formData.office} onChange={handleChange} required />
      </div>
      <div className="fw-bold">
        <label htmlFor="department">Department:</label>
        <input type="text" id="department" value={formData.department} onChange={handleChange} required />
      </div>
      <div className="fw-bold">
        <label htmlFor="mobile">Mobile:</label>
        <input type="text" id="mobile" value={formData.mobile} onChange={handleChange} required />
      </div>
      <div className="fw-bold">
        <label htmlFor="skype">Skype ID:</label>
        <input type="text" id="skype" value={formData.skype} onChange={handleChange} required />
      </div >
      <br></br>
      <div >
        <button className="px-3 py-1 btn btn-success" type="submit">Update</button>
        <button className="px-3 py-1 btn btn-danger" type="button" onClick={handleCancel}>Cancel</button>
      </div>
      </div>
 
    </form>
  );
};

export default EditEmployeeForm;
