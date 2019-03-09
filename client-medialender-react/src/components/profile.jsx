import React, { Component } from "react";
import auth from "../services/authService";
import _ from "lodash";
import { Link } from "react-router-dom";

class Profile extends Component {
  state = {
    user: {
      _id: "",
      name: "",
      email: "",
      isAdmin: "",
      isCustomer: ""
    }
  };

  async componentDidMount() {
    await this.getProfileInfo();
  }

  getProfileInfo = async () => {
    const current = await auth.getCurrentUser();

    const userKeys = ["_id", "name", "email", "isAdmin", "isCustomer"];
    const user = _.pick(current, userKeys);

    this.setState({ user });
  };

  render() {
    const user = auth.getCurrentUser();

    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User Information:</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Name:</th>
              <td>{this.state.user.name}</td>
            </tr>
            <tr>
              <th scope="row">E-mail:</th>
              <td>{this.state.user.email}</td>
            </tr>
            {!user.isAdmin && user.isCustomer && (
              <tr>
                <th scope="row">My Rentals:</th>
                <td>
                  <Link to="/rentals">
                    <button className="btn btn-primary">My Rentals</button>
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Profile;
