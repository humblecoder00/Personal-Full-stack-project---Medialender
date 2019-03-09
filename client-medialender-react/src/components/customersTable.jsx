import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import CustomerIcon from "../components/common/customerIcon";

class CustomersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: customer => (
        <Link to={`/customers/${customer._id}`}>
          <CustomerIcon />
          {customer.name}
        </Link>
      )
    },
    { path: "email", label: "E-mail" },
    { path: "isGold", label: "Membership" }
  ];

  deleteColumn = {
    key: "delete",
    content: customer => (
      <button
        onClick={() => this.props.onDelete(customer)}
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
    const { customers, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomersTable;
