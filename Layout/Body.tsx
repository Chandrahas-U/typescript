import Header from "../Layout/Header";
import Sidebar from "./Sidebar";
import "./Layout.css";
import { AlphabetButtons, SearchBar } from "./Navbar";
import AddEmployeeForm from "./Form";
import { EmployeeList, DisplayFullContact } from "./ContactCard";
import { useState, useEffect } from "react";
// import {Employeedata } from "./Form";

const Body: React.FC = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(
    null
  );
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeData[]>(
    []
  );
  const [hideEmployeeList, setHideEmployeeList] = useState<boolean>(false);

  useEffect(() => {
    const storedData: EmployeeData[] = JSON.parse(
      localStorage.getItem("Employees") || "[]"
    );
    setEmployees(storedData);
    setFilteredEmployees(storedData);
  }, []);

  const handleSearchByLetter = (letter: string): void => {
    const filteredEmployeesByLetter: EmployeeData[] = employees.filter(
      (employee) => employee.fname.toUpperCase().startsWith(letter)
    );
    setFormVisible(false);
    setHideEmployeeList(false);
    setFilteredEmployees(filteredEmployeesByLetter);
    setSelectedEmployee(null);
  };

  const handleCountClick = (property: string, value: string): void => {
    const filteredEmployees: EmployeeData[] = employees.filter(
      (employee) => employee[property] === value
    );
    setFormVisible(false);
    setHideEmployeeList(false);
    setFilteredEmployees(filteredEmployees);
    setSelectedEmployee(null);
  };

  const handleAddEmployee = (newEmployee: EmployeeData): void => {
    setEmployees([...employees, newEmployee]);
    localStorage.setItem(
      "Employees",
      JSON.stringify([...employees, newEmployee])
    );
    setFilteredEmployees([...filteredEmployees, newEmployee]);
    setFormVisible(false);
    setHideEmployeeList(false);
    setSelectedEmployee(null);

    // setHideEmployeeList(false);
  };

  const handleDeleteEmployee = (employeeId: number): void => {
    const updatedEmployees: EmployeeData[] = employees.filter(
      (employee) => employee.id !== employeeId
    );
    setEmployees(updatedEmployees);
    localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
    setFilteredEmployees(updatedEmployees);
    setSelectedEmployee(null);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee): void => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    setEmployees(updatedEmployees);
    localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
    setFilteredEmployees(updatedEmployees);
    setSelectedEmployee(updatedEmployee);
    // setHideEmployeeList(false);
  };


  const handleSearchByText = (
    inputValue: string,
    selectValue: string
  ): void => {
    let filteredEmployees: EmployeeData[] = employees;
    if (inputValue) {
      const property = selectValue.toLowerCase();
      const searchText = inputValue.toLowerCase();
      filteredEmployees = filteredEmployees.filter((employee) => {
        const propertyValue =
          employee[property].toLowerCase();
        return propertyValue.includes(searchText);
      });
    }
    setFormVisible(false);
    setHideEmployeeList(false);
    setFilteredEmployees(filteredEmployees);
    setSelectedEmployee(null);
  };

  return (
    <div className="row">
      <Header />
      <Sidebar employees={employees} onCountClick={handleCountClick} />
      <div className="SearchFunctions col-10 ps-4">
        <AlphabetButtons searchByLetter={handleSearchByLetter} />
        <SearchBar
          addEmployee={() => {
            setFormVisible(!formVisible);
            setHideEmployeeList(true);
          }}
          searchByText={handleSearchByText}
        />
        {formVisible && (
          <AddEmployeeForm
            isVisible={formVisible}
            closeForm={() => {
              setFormVisible(!formVisible);
              setHideEmployeeList(false);
            }}
            onAddEmployee={handleAddEmployee}
          />
        )}
        {!hideEmployeeList && !selectedEmployee && (
          <EmployeeList
            Employees={filteredEmployees}
            onEmployeeSelect={setSelectedEmployee}
          />
        )}
        {selectedEmployee && (
          <DisplayFullContact
            selectedEmployee={selectedEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onCloseFullDetails={() => {
              setSelectedEmployee(null);
              // setHideEmployeeList(false);
            }}
            onUpdateEmployee={handleUpdateEmployee}
          />
        )}
      </div>
    </div>
  );
};

export default Body;
