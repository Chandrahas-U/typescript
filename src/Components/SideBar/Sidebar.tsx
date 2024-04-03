import { Component } from "react";
import "./Sidebar.css";
import { IEmployeeData } from "../../Interface/EmployeeData";


interface ISidebarProps {
  employees: IEmployeeData[];
  onCountClick(property: string, value: string) : void;
}

class Sidebar extends Component<ISidebarProps> {
  getCounts(field: string) {
    const counts: { [key: string]: number } = {};
    this.props.employees.forEach((employee) => {
      const fieldValue = employee[field]
      if (counts[fieldValue]) {
        counts[fieldValue] = counts[fieldValue] + 1;
      }
      else {
        counts[fieldValue] = 1;
      }
    });
    return counts;
  }

  displayCounts(counts: { [key: string]: number }, property: string) {
    return (
      <div>
        {Object.entries(counts).map(([value, count]) => (
          <p key={value} onClick={() => this.props.onCountClick(property, value)}>
            {value} ({count})
          </p>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="employeeCount col-2 pt-4">
        <h6 className="pb-1">Departments</h6>
        <div id="departmentCount" className="departments pb-4">
          {this.displayCounts(this.getCounts("department"), "department")}
        </div>

        <h6 className="pb-1">Offices</h6>
        <div id="officeCount" className="offices pb-4">
          {this.displayCounts(this.getCounts("office"), "office")}
        </div>

        <h6 className="pb-1">Job Titles</h6>
        <div id="titlesCount" className="job-titles pb-4">
          {this.displayCounts(this.getCounts("jobTitle"), "jobTitle")}
        </div>
      </div>
    );
  }
}

export default Sidebar;
