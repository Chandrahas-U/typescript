import React, { Component } from "react";
import "./Navbar.css";

interface IAlphabetButtonsProps {
  searchByLetter(letter: string): void;
  Clearall(): void;
}

class AlphabetButtons extends Component<IAlphabetButtonsProps> {
  alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  SearchBy = (letter: string): void => {
    this.props.searchByLetter(letter);
  };

  Clearall = (): void => {
    this.props.Clearall();
  };

  render() {
    return (
      <div className="body-2 pt-4">
        <div className="alphabet-buttons pb-3 d-flex justify-content-between">
          <button className="alpha-buttons border-0" onClick={this.Clearall}>
            <i className="fa fa-user"></i>
          </button>
          {this.alphabet.map((letter) => (
            <button
              key={letter}
              className="alpha-buttons border-0"
              onClick={() => this.SearchBy(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

interface ISearchBarProps {
  addEmployee(): void;
  searchByText(keyword: string, filterBy: string): void;
}

class SearchBar extends Component<ISearchBarProps> {
  state = {
    searchKeyword: "",
    filterBy: "fname",
  };

  clearSearch = (): void => {
    this.setState({ searchKeyword: "" });
    this.props.searchByText("", this.state.filterBy);
  };

  filtering = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedFilter: string = e.target.value;
    this.setState({ filterBy: selectedFilter });
    this.props.searchByText(this.state.searchKeyword, selectedFilter);
  };

  InputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: string = e.target.value;
    this.setState({ searchKeyword: inputValue });
    this.props.searchByText(inputValue, this.state.filterBy);
  };

  render() {
    return (
      <div className="search-filters d-flex justify-content-between">
        <div className="searchBar d-flex ">
          <span className="pt-2 fw-bold pe-2"> Search </span>
          <input
            type="text"
            id="myInput"
            value={this.state.searchKeyword}
            onChange={this.InputChange}
            placeholder="&#128269; Enter any Keyword"
          />
          <button
            className="clear-button ms-4 px-4 rounded-0 border-0 text-white fw-bold btn btn-success"
            onClick={this.clearSearch}
          >
            Clear
          </button>

          <div className="dropdown border-0 ">
            <span className="ps-4 pe-1">Filter by</span>
            <select
              className="p-2"
              onChange={this.filtering}
              id="filter"
              value={this.state.filterBy}
            >
              <option value="fname">First Name</option>
              <option value="department">Department</option>
              <option value="office">Office Location</option>
            </select>
          </div>
        </div>
        <button
          className="alpha-buttons border-0 "
          onClick={this.props.addEmployee}
        >
          Add Employee
        </button>
      </div>
    );
  }
}

export { AlphabetButtons, SearchBar };
