import React from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { Form, PageHeader } from "../../common";
import { baseSchema } from "../../common/form";
import httpService from "../../services/httpService";
import { getCurrentUser } from "../../services/userService";

const { API_URL } = process.env;

class Signup extends Form {
  schema = baseSchema;

  doSubmit = async (): Promise<void> => {
    // eslint-disable-next-line prefer-const
    let { errors, formData } = this.state;
    const body = { ...formData, painter: false, strategy: "local" };

    try {
      await httpService.post(`${API_URL}/users`, body);
      (this.props as any).history.replace("/sign-in");
      toast.success("You have successfully signed up!!", {
        position: "top-center",
        autoClose: 4000,
      });
    } catch (error) {
      const {
        response,
        response: { data },
      } = error;

      if (response && data.code) {
        toast.error(data.message, {
          position: "top-center",
          autoClose: data.message.length * 120,
        });
        errors = { name: "", password: "", email: "" };
        errors[data.message.split('"')[1]] = data.message;

        this.setState({ errors, formData });
      }
    }
  };

  render(): React.ReactNode {
    if (getCurrentUser()) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container sub-main">
        <PageHeader titleText="Signup for PixelHub" />
        <div className="row text-center">
          <div className="col-12">
            <p>You can open a new account for free</p>
          </div>
        </div>
        <div className="mx-2">
          <div className="px-4 m-auto p-card form-container">
            <form
              className="p-card-content"
              noValidate
              onSubmit={this.handleSubmit}
            >
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("name", "Name")}
              {this.renderInput("password", "Password", "password", {
                feedback: true,
              })}
              {this.renderButton("Sign Up")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
