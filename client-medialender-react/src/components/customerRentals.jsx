import React, { Component } from "react";
import { toast } from "react-toastify";
import RentalsTable from "./rentalsTable";
import Pagination from "./common/pagination";
import { getRentals } from "../services/rentalService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Rentals extends Component {
  state = {
    rentals: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "dateOut", order: "asc" }
  };

  async componentDidMount() {
    await this.handleRoles();
  }

  handleDelete = async rental => {
    const originalRentals = this.state.rentals;
    const rentals = originalRentals.filter(r => r._id !== rental._id);
    this.setState({ rentals });

    try {
      await deleteRental(rental._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This rental has already been deleted.");

      this.setState({ rentals: originalRentals });
    }
  };

  handleRoles = async () => {
    const { data: rentalObject } = await getRentals();
    const rentalKeys = [
      "_id",
      "dateOut",
      "customer[name]",
      "movie[title]",
      "customer[isGold]"
    ];

    let rentals = [];

    for (let i = 0; i < rentalObject.length; i++) {
      rentals.push(_.pick(rentalObject[i], rentalKeys));
    }

    rentals.map(rental => {
      if (rental.customer.isGold) {
        return (rental.customer.isGold = "Gold");
      } else {
        return (rental.customer.isGold = "Basic");
      }
    });

    rentals.map(rental => {
      let date = new Date(rental.dateOut);
      return (rental.dateOut = date.toUTCString());
    });

    this.setState({ rentals });
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
      rentals: allRentals
    } = this.state;

    let filtered = allRentals;
    if (searchQuery)
      filtered = allRentals.filter(r =>
        r.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const rentals = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: rentals };
  };

  render() {
    const { length: count } = this.state.rentals;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no rentals in the database.</p>;

    const { totalCount, data: rentals } = this.getPagedData();

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
          <p>Showing {totalCount} rentals in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <RentalsTable
            rentals={rentals}
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

export default Rentals;
