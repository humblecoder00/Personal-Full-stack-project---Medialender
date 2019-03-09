import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import RentalIcon from "../components/common/rentalIcon";

class RentalsTable extends Component {
  columns = [
    {
      path: "dateOut",
      label: "Date Out",
      content: rental => (
        <Link to={`/rentals/${rental._id}`}>
          <RentalIcon />
          {rental.dateOut}
        </Link>
      )
    },
    {
      path: "customer[name]",
      label: "Customer name"
    },
    { path: "movie[title]", label: "Movie Title" },
    { path: "customer[isGold]", label: "Membership" }
  ];

  deleteColumn = {
    key: "delete",
    content: rental => (
      <button
        onClick={() => this.props.onDelete(rental)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { rentals, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={rentals}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default RentalsTable;
