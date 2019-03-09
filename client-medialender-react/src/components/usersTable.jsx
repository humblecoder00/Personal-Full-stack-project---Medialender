import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import UserIcon from "../components/common/userIcon";

class UsersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: user => (
        <Link to={`/users/${user._id}`}>
          <UserIcon />
          {user.name}
        </Link>
      )
    },
    { path: "email", label: "E-mail" },
    { path: "isAdmin", label: "Role" }
  ];

  deleteColumn = {
    key: "delete",
    content: user => (
      <button
        onClick={() => this.props.onDelete(user)}
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
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UsersTable;
