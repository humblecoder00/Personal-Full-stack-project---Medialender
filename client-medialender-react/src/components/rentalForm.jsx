import React, { Component } from "react";
// import ReactDOM from "react-dom";
import auth from "../services/authService";
import { getMovie } from "../services/movieService";
import { saveRental, getRentals } from "../services/rentalService";
import _ from "lodash";
import Modal from "react-responsive-modal";

class RentalForm extends Component {
  state = {
    open: false,
    rental: {
      customer: {
        _id: "",
        name: "",
        email: ""
      },
      movie: {
        _id: "",
        title: "",
        dailyRentalRate: ""
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    this.doSubmit();
  };

  doSubmit = async () => {
    const rentalData = {
      customerId: this.state.rental.customer._id,
      movieId: this.state.rental.movie._id
    };
    await saveRental(rentalData);
    await this.onCloseModal();
    window.location.reload();
    this.props.history.push("/profile");
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  async componentDidMount() {
    await this.getRentalInfo();
  }

  onCloseModal = async () => {
    this.setState({ open: false });
  };

  cancelModal = () => {
    this.setState({ open: false });
  };

  getRentalInfo = async () => {
    const movieId = this.props.movieParams;
    const { data: selectedMovie } = await getMovie(movieId);
    const movieKeys = ["_id", "title", "dailyRentalRate"];
    const movie = _.pick(selectedMovie, movieKeys);

    const user = await auth.getCurrentUser();
    const userKeys = ["_id", "name", "email"];
    const customer = _.pick(user, userKeys);

    const rental = { customer, movie };
    this.setState({ rental });
    const { data: rentalObject } = await getRentals();
    const rentalKeys = [
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
  };

  render() {
    const { open, rental } = this.state;

    return (
      <div>
        <button onClick={this.onOpenModal} className="btn btn-primary">
          Rent this movie
        </button>
        <div className="modal fade">
          <Modal open={open} onClose={this.onCloseModal} center>
            <form onSubmit={event => this.handleSubmit(event)}>
              <div
                className="modal-dialog modal-dialog-centered-lg"
                role="document"
              >
                <div className="modal-content">
                  <h3 className="modal-title text-center m-2">Rent a Movie</h3>
                  <div className="modal-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Customer Information:</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Name:</th>
                          <td>{rental.customer.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">E-mail:</th>
                          <td>{rental.customer.email}</td>
                        </tr>
                      </tbody>
                      <thead>
                        <tr>
                          <th scope="col">Movie Information:</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Title:</th>
                          <td>{rental.movie.title}</td>
                        </tr>
                        <tr>
                          <th scope="row">Rate:</th>
                          <td>{rental.movie.dailyRentalRate}</td>
                        </tr>
                      </tbody>
                    </table>

                    <button
                      //   onClick={this.getRentalInfo}
                      className="btn btn-primary"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default RentalForm;
