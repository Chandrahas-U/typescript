



import "./Navbar.css";
import { useState } from "react";

interface AlphabetButtonsProps {
  searchByLetter: (letter: string) => void;
}

const AlphabetButtons: React.FC<AlphabetButtonsProps> = ({ searchByLetter }) => {
  const alphabets: string[] = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const handleSearchBy = (letter: string): void => {
    searchByLetter(letter);
  };

  return (
    <div className="body-2 pt-4">
      <div className="alphabet-buttons pb-3 d-flex justify-content-between">
        {alphabets.map((letter) => (
          <button
            key={letter}
            className="alpha-buttons border-0"
            onClick={() => handleSearchBy(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

interface SearchBarProps {
  addEmployee: () => void;
  searchByText: (keyword: string, filterBy: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ addEmployee, searchByText }) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("fname");

  const clearSearch = (): void => {
    setSearchKeyword("");
    searchByText("", filterBy);
  };

  const filtering = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedFilter: string = e.target.value;
    setFilterBy(selectedFilter);
    searchByText(searchKeyword, selectedFilter);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: string = e.target.value;
    setSearchKeyword(inputValue);
    searchByText(inputValue, filterBy);
  };

  return (
    <div className="search-filters d-flex justify-content-between">
      <div className="searchBar d-flex ">
        <span className="pt-2 fw-bold pe-2"> Search </span>
        <input
          type="text"
          id="myInput"
          value={searchKeyword}
          onChange={handleInputChange}
          placeholder="Enter any Keyword"
        />
        <button
          className="clear-button ms-4 px-4 rounded-0 border-0 text-white fw-bold btn btn-success"
          onClick={clearSearch}
        >
          Clear all filters
        </button>

        <div className="dropdown border-0 ">
          <span className="ps-4 pe-1">Filter by</span>
          <select
            className="p-2"
            onChange={filtering}
            id="filter"
            value={filterBy}
          >
            <option value="fname">First Name</option>
            <option value="department">Department</option>
            <option value="office">Office Location</option>
          </select>
        </div>
      </div>
      <button className="alpha-buttons border-0 " onClick={addEmployee}>
        Add Employee
      </button>
    </div>
  );
};

export { AlphabetButtons, SearchBar };

