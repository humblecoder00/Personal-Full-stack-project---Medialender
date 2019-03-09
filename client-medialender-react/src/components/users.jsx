import React, { Component } from "react";
import { toast } from "react-toastify";
import UsersTable from "./usersTable";
import Pagination from "./common/pagination";
import Loader from "./common/loader";
import { getUsers, deleteUser } from "../services/userService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "isAdmin", order: "asc" },
    loading: true
  };

  async componentDidMount() {
    await this.handleRoles();
    const loading = false;
    this.setState({ loading: loading });
  }

  handleDelete = async user => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter(u => u._id !== user._id);
    this.setState({ users });

    try {
      await deleteUser(user._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This user has already been deleted.");

      this.setState({ users: originalUsers });
    }
  };

  handleRoles = async () => {
    const { data: filtered } = await getUsers();

    const users = filtered.filter(f => !f.isCustomer);
    users.map(user => {
      if (user.isAdmin) {
        return (user.isAdmin = "Admin");
      } else {
        return (user.isAdmin = "Editor");
      }
    });
    this.setState({ users });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      users: allUsers
    } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter(u =>
        u.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const users = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: users };
  };

  render() {
    const { length: count } = this.state.users;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (this.state.loading === false && count === 0) {
      return <p>There are no editors in the database.</p>;
    } else if (this.state.loading === true) {
      return <Loader />;
    }

    const { totalCount, data: users } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <p>Showing {totalCount} editors in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <UsersTable
            users={users}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Users;
