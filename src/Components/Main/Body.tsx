import { Component } from "react";
import Header from "./Header";
import Sidebar from "../SideBar/Sidebar";
import "./Layout.css";
import { AlphabetButtons, SearchBar } from "../Navbar/Navbar";
import AddEmployeeForm from "../Forms/Form";
import { EmployeeList } from "../ContactCard/ContactCard";
import { IEmployeeData } from "../../Interface/EmployeeData";
import { getEmployees, setEmployees } from "../../Services/Sevices";
import { DisplayFullContact } from "../ContactCard/FullContact";

interface IBodyState {
  isformVisible: boolean;
  selectedEmployee: IEmployeeData | any;
  employees: IEmployeeData | any;
  filteredEmployees: IEmployeeData | any;
  hideEmployeeList: boolean;
  isEditing: boolean;
}

class Body extends Component<{}, IBodyState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isformVisible: false,
      selectedEmployee: null,
      employees: [],
      filteredEmployees: [],
      hideEmployeeList: false,
      isEditing: false,
    };

    this.CountClick = this.CountClick.bind(this);
    this.Clearall = this.Clearall.bind(this);
  }

  componentDidMount() {
    const storedData = getEmployees();
    this.setState({
      employees: storedData,
      filteredEmployees: storedData,
    });
  }

  SearchByLetter = (letter: string) => {
    const filteredEmployeesByLetter = this.state.employees.filter(function (employee: {
      fname: string;
    }) {
      return employee.fname.toUpperCase().startsWith(letter);
    });
    this.setState({
      isformVisible: false,
      hideEmployeeList: false,
      filteredEmployees: filteredEmployeesByLetter,
      selectedEmployee: null,
    });
  };

  Clearall() {
    this.setState({
      filteredEmployees: this.state.employees,
    });
  }

  CountClick(property: string , value: string | any) {
    const filteredEmployees = this.state.employees.filter(
      (employee: { [x: string]: IEmployeeData }) => employee[property] === value
    );
    this.setState({
      isformVisible: false,
      hideEmployeeList: false,
      filteredEmployees: filteredEmployees,
      selectedEmployee: null,
    });
    document.getElementById('myInput')?.setAttribute('value', '');
  }

  AddEmployee = (newEmployee: IEmployeeData) => {
    const employees = this.state.employees;
    const updatedEmployees = [...employees, newEmployee];
    this.setState({
      employees: updatedEmployees,
      filteredEmployees: updatedEmployees,
      isformVisible: false,
      hideEmployeeList: false,
      selectedEmployee: null,
    });
    setEmployees(updatedEmployees);
  };

  DeleteEmployee = (employeeId: number) => {
    const updatedEmployees = this.state.employees.filter(
      (employee: { id: number }) => employee.id !== employeeId
    );
    this.setState({
      employees: updatedEmployees,
      filteredEmployees: updatedEmployees,
      selectedEmployee: null,
    });
    setEmployees(updatedEmployees);
  };

  UpdateEmployee = (updatedEmployee: { id: number }) => {
    const employees = this.state.employees;
    const updatedEmployees = employees.map((emp: { id: number }) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    this.setState({
      employees: updatedEmployees,
      filteredEmployees: updatedEmployees,
      selectedEmployee: updatedEmployee,
    });
    setEmployees(updatedEmployees);
  };

  SearchByText = (inputValue: string, selectValue: string) => {
    let filteredEmployees = this.state.employees;
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
      isformVisible: false,
      hideEmployeeList: false,
      filteredEmployees: filteredEmployees,
      selectedEmployee: null,
    });
  };

  AddOrEditEmployee = (employee: IEmployeeData) => {
    if (this.state.isEditing) {
      this.UpdateEmployee(employee);
    } else {
      this.AddEmployee(employee);
    }
    this.setState({ isformVisible: false, isEditing: false });
  };

  render() {
    const {
      isformVisible,
      selectedEmployee,
      employees,
      filteredEmployees,
      hideEmployeeList,
    } = this.state;

    return (
      <div className="row">
        <Header />
        <Sidebar employees={employees} onCountClick={this.CountClick} />
        <div className="SearchFunctions col-10 ps-4">
          <AlphabetButtons
            searchByLetter={this.SearchByLetter}
            Clearall={this.Clearall}
          />
          <SearchBar
            addEmployee={() => {
              this.setState({
                isformVisible: !isformVisible,
                hideEmployeeList: true,
                selectedEmployee: null,
                isEditing: false,
              });
            }}
            searchByText={this.SearchByText}
          />
          {isformVisible && (
            <AddEmployeeForm
              isVisible={isformVisible}
              closeForm={() => {
                this.setState({
                  isformVisible: !isformVisible,
                  hideEmployeeList: false,
                  isEditing: false,
                });
              }}
              onAddEmployee={this.AddOrEditEmployee}
              initialFormData={selectedEmployee}
            />
          )}
          {!hideEmployeeList && !selectedEmployee && (
            <EmployeeList
              Employees={filteredEmployees}
              onEmployeeSelect={(employee: IEmployeeData) =>
                this.setState({ selectedEmployee: employee, isEditing: true })
              }
            />
          )}
          {selectedEmployee && (
            <DisplayFullContact
              selectedEmployee={selectedEmployee}
              onDeleteEmployee={this.DeleteEmployee}
              onCloseFullDetails={() =>
                this.setState({
                  selectedEmployee: null,
                  isEditing: false,
                })
              }
              onUpdateEmployee={this.AddOrEditEmployee}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Body;
