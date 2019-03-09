import React, { Component } from "react";
import { toast } from "react-toastify";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import Loader from "./common/loader";
import { getCustomers, deleteCustomer } from "../services/customerService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
    loading: true
  };

  async componentDidMount() {
    await this.handleRoles();
    const loading = false;
    this.setState({ loading: loading });
  }

  handleDelete = async customer => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter(c => c._id !== customer._id);
    this.setState({ customers });

    try {
      await deleteCustomer(customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This customer has already been deleted.");

      this.setState({ customers: originalCustomers });
    }
  };

  handleRoles = async () => {
    const { data: filtered } = await getCustomers();

    const customers = filtered.filter(f => f.isCustomer === true);

    customers.map(customer => {
      if (customer.isGold) {
        return (customer.isGold = "Gold");
      } else {
        return (customer.isGold = "Basic");
      }
    });
    this.setState({ customers });
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
      customers: allCustomers
    } = this.state;

    let filtered = allCustomers;
    if (searchQuery)
      filtered = allCustomers.filter(c =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };

  render() {
    const { length: count } = this.state.customers;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (this.state.loading === false && count === 0) {
      return <p>There are no customers in the database.</p>;
    } else if (this.state.loading === true) {
      return <Loader />;
    }

    const { totalCount, data: customers } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          {/* {user && (
            <Link
              to="/users/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New User
            </Link>
          )} */}
          <p>Showing {totalCount} customers in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CustomersTable
            customers={customers}
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

export default Customers;
