import { Component } from "react";
import Header from "./Header";
import Sidebar from "../SideBar/Sidebar";
import "./Layout.css";
import { AlphabetButtons, SearchBar } from "../Navbar/Navbar";
import AddEmployeeForm from "../Forms/Form";
import { EmployeeList, DisplayFullContact } from "../ContactCard/ContactCard";
import { EmployeeData } from "../Interface/EmployeeData";

interface BodyState {
  formVisible: boolean;
  selectedEmployee: any;
  employees: EmployeeData | any;
  filteredEmployees: EmployeeData | any;
  hideEmployeeList: boolean;
}

class Body extends Component<{}, BodyState> {
  constructor(props: BodyState) {
    super(props);
    this.state = {
      formVisible: false,
      selectedEmployee: null,
      employees: [],
      filteredEmployees: [],
      hideEmployeeList: false,
    };
  }

  componentDidMount() {
    const storedData = JSON.parse(localStorage.getItem("Employees") || "[]");
    this.setState({
      employees: storedData,
      filteredEmployees: storedData,
    });
  }

  runSearchByLetter = (letter: string) => {
    const employees = this.state.employees;
    const filteredEmployeesByLetter = employees.filter(function (employee: {
      fname: string;
    }) {
      return employee.fname.toUpperCase().startsWith(letter);
    });
    this.setState({
      formVisible: false,
      hideEmployeeList: false,
      filteredEmployees: filteredEmployeesByLetter,
      selectedEmployee: null,
    });
  };

  runCountClick = (property: string | number, value: any) => {
    const employees = this.state.employees;
    const filteredEmployees = employees.filter(
      (employee: { [x: string]: any }) => employee[property] === value
    );
    this.setState({
      formVisible: false,
      hideEmployeeList: false,
      filteredEmployees: filteredEmployees,
      selectedEmployee: null,
    });
  };

  runAddEmployee = (newEmployee: any) => {
    const employees = this.state.employees;
    const updatedEmployees = [...employees, newEmployee];
    this.setState({
      employees: updatedEmployees,
      filteredEmployees: updatedEmployees,
      formVisible: false,
      hideEmployeeList: false,
      selectedEmployee: null,
    });
    localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
  };

  runDeleteEmployee = (employeeId: number) => {
    const employees = this.state.employees;
    const updatedEmployees = employees.filter(
      (employee: { id: number }) => employee.id !== employeeId
    );
    this.setState({
      employees: updatedEmployees,
      filteredEmployees: updatedEmployees,
      selectedEmployee: null,
    });
    localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
  };

  runUpdateEmployee = (updatedEmployee: { id: any }) => {
    const employees = this.state.employees;
    const updatedEmployees = employees.map((emp: { id: any }) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    this.setState({
      employees: updatedEmployees,
      filteredEmployees: updatedEmployees,
      selectedEmployee: updatedEmployee,
    });
    localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
  };

  runSearchByText = (inputValue: string, selectValue: string) => {
    const employees = this.state.employees;
    let filteredEmployees = employees;
    if (inputValue) {
      const property = selectValue.toLowerCase();
      const searchText = inputValue.toLowerCase();
      filteredEmployees = filteredEmployees.filter(
        (employee: { [x: string]: string }) => {
          const propertyValue = employee[property].toLowerCase();
          return propertyValue.includes(searchText);
        }
      );
    }
    this.setState({
      formVisible: false,
      hideEmployeeList: false,
      filteredEmployees: filteredEmployees,
      selectedEmployee: null,
    });
  };

  render() {
    const {
      formVisible,
      selectedEmployee,
      employees,
      filteredEmployees,
      hideEmployeeList,
    } = this.state;
    return (
      <div className="row">
        <Header />
        <Sidebar employees={employees} onCountClick={this.runCountClick} />
        <div className="SearchFunctions col-10 ps-4">
          <AlphabetButtons searchByLetter={this.runSearchByLetter} />
          <SearchBar
            addEmployee={() => {
              this.setState({
                formVisible: !formVisible,
                hideEmployeeList: true,
                selectedEmployee: null,
              });
            }}
            searchByText={this.runSearchByText}
          />
          {formVisible && (
            <AddEmployeeForm
              isVisible={formVisible}
              closeForm={() => {
                this.setState({
                  formVisible: !formVisible,
                  hideEmployeeList: false,
                });
              }}
              onAddEmployee={this.runAddEmployee}
            />
          )}
          {!hideEmployeeList && !selectedEmployee && (
            <EmployeeList
              Employees={filteredEmployees}
              onEmployeeSelect={(employee: any) =>
                this.setState({ selectedEmployee: employee })
              }
              hideList={false}
            />
          )}
          {selectedEmployee && (
            <DisplayFullContact
              selectedEmployee={selectedEmployee}
              onDeleteEmployee={this.runDeleteEmployee}
              onCloseFullDetails={() =>
                this.setState({
                  selectedEmployee: null,
                })
              }
              onUpdateEmployee={this.runUpdateEmployee}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Body;
