import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import SelectMember from "./common/selectMember";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterCustomer extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
      isCustomer: true,
      isGold: false
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
    isCustomer: Joi.boolean(),
    isGold: Joi.boolean()
  };

  members = [{ key: 1, text: "Basic" }, { key: 2, text: "Gold" }];

  handleMember = async ({ currentTarget: input }) => {
    let data = { ...this.state.data };
    if (input.value === "Basic") {
      data.isGold = false;
    }
    if (input.value === "Gold") {
      data.isGold = true;
    }
    this.setState({ data });
  };

  doSubmit = async () => {
    // Call the server
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h2>Register as Customer</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          <SelectMember
            options={this.members}
            onChange={value => this.handleMember(value)}
          />
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterCustomer;
