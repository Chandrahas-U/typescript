
// import { EmployeeData } from "./types";

interface SidebarProps {
  employees: EmployeeData[];
  onCountClick: (property: string, value: string) => void;
}

const Sidebar = ({ employees, onCountClick }: SidebarProps) => {
  const getCounts = (field: string) => {
    const counts: { [key: string]: number } = {};
    employees.forEach((employee) => {
      counts[employee[field]] = (counts[employee[field]] || 0) + 1;
    });
    return counts;
  };

  const displayCounts = (counts: { [key: string]: number }, property: string) => {
    return (
      <div>
        {Object.entries(counts).map(([value, count]) => (
          <p key={value} onClick={() => onCountClick(property, value)}>
            {value} ({count})
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="employeeCount col-2 pt-4">
      <h6 className="pb-1">Departments</h6>
      <div id="departmentCount" className="departments pb-4">
        {displayCounts(getCounts("department"), "department")}
      </div>

      <h6 className="pb-1">Offices</h6>
      <div id="officeCount" className="offices pb-4">
        {displayCounts(getCounts("office"), "office")}
      </div>

      <h6 className="pb-1">Job Titles</h6>
      <div id="titlesCount" className="job-titles pb-4">
        {displayCounts(getCounts("jobTitle"), "jobTitle")}
      </div>
    </div>
  );
};

export default Sidebar;

