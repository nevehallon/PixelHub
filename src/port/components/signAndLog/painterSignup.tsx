import React from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { Form, PageHeader } from "../../common";
import { baseSchema, baseState } from "../../common/form";
import httpService from "../../services/httpService";
import { getCurrentUser, login } from "../../services/userService";

const url = process.env.GATSBY_API_URL;

class PainterSignup extends Form {
  state = { ...baseState };

  schema = baseSchema;

  doSubmit = async (): Promise<void> => {
    // eslint-disable-next-line prefer-const
    let { errors, formData } = this.state;
    const body = { ...formData, painter: true };

    try {
      await httpService.post(`${url}/users`, body);

      const { email, password } = body;
      await login({ email, password });

      toast.success("You have successfully registered painter account!!", {
        position: "top-center",
        autoClose: 2500,
      });

      setTimeout(() => {
        this.props.history.push("/create-drawing");
      }, 2500);
    } catch (error) {
      if (!error.response) throw error;
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
      <div className="sub-main">
        <PageHeader titleText="Painter Registration Form" />
        <div className="row text-center">
          <div className="col-12">
            <p>Open a new painter account</p>
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
              {this.renderButton("Next")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PainterSignup;
