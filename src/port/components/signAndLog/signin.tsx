import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import Joi from "joi";

import { Form, PageHeader } from "../../common";
import { baseSchema, baseState } from "../../common/form";
import { LoginArgs } from "../../interfaces/loginArgs";
import { getCurrentUser, login } from "../../services/userService";

class Signin extends Form {
  state = { ...baseState };

  schema = {
    ...baseSchema,
    name: Joi.optional(),
  };

  componentDidMount(): void {
    if (getCurrentUser()) return;
    localStorage.clear();
  }

  doSubmit = async (): Promise<void> => {
    // eslint-disable-next-line prefer-const
    let { errors, formData } = this.state;

    try {
      await login(formData as LoginArgs);
      setTimeout(() => {
        window.location.href = "/";
      }, 2200);
    } catch (error) {
      if (error.response === undefined) throw new Error(error);
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
        <PageHeader titleText="Sign in with your PixelHub account" />
        <div className="row text-center">
          <div className="col-12" />
        </div>
        <div className="mx-2">
          <div className="px-4 m-auto p-card form-container">
            <form
              className="p-card-content"
              noValidate
              onSubmit={this.handleSubmit}
            >
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password", {
                feedback: false,
              })}
              {this.renderButton("Sign In")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
