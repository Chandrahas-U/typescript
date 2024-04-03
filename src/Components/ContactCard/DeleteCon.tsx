import { Component } from "react";
import "./Delete.css";

interface DeletePopupProps {
  onDeleteConfirmed(): void;
  onCancelDelete(): void;
}

export class DeletePopup extends Component<DeletePopupProps> {
  render() {
    const { onDeleteConfirmed, onCancelDelete } = this.props;

    return (
      <div className="full-screen">
        <div className="delete-popup">
          <h3 className="pb-5 p-2">
            Are you sure you want to delete this employee?
          </h3>
          <div className="d-flex col-12 justify-content-around pb-3">
            <button
              className="p-2 btn btn-danger border-0"
              onClick={onDeleteConfirmed}
            >
              Yes, Delete
            </button>
            <button
              className="p-2 btn btn-secondary border-0"
              onClick={onCancelDelete}
            >
              No,Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
