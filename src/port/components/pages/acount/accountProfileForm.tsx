import { toast } from "react-toastify";

import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
} from "@material-ui/core";
import Joi from "joi";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

import { Form } from "../../../common";
import { baseSchema, baseState } from "../../../common/form";
import { GOP } from "../../../interfaces/genericObjectProps";
import { UserDetails } from "../../../interfaces/UserDetails";
import httpService from "../../../services/httpService";
import { getCurrentUserDetails } from "../../../services/userService";
import InputFeedback from "../../drawingActions/inputTextFeedback";

const url = process.env.GATSBY_API_URL;

class AccountProfileDetails extends Form {
  state = {
    ...baseState,
    formData: {
      ...this.props.user,
      // name: "",
      // lastName: "",
      // email: "",
      // phone: "",
      // state: "",
      // country: "",
    },
  };

  schema = { ...baseSchema, password: Joi.allow() };

  doSubmit = async (): Promise<void> => {
    // eslint-disable-next-line prefer-const
    let { errors, formData } = this.state;
    const body = { ...formData, painter: false, strategy: "local" };

    try {
      await httpService.patch(`${url}/users/${body._id}`, body);
      const { history } = this.props;
      history.replace("/me");
      toast.success("Account information updated!!", {
        position: "top-center",
        autoClose: 4000,
      });
    } catch (error) {
      if (!error.response) return console.log(error);

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

  gridProps = {
    item: true,
    md: 6,
    xs: 12,
  };

  render(): JSX.Element {
    const {
      formData: { name, phone, email, country },
    } = this.state;
    return (
      <form
        autoComplete="off"
        className="p-card-content"
        noValidate
        onSubmit={this.handleSubmit}
      >
        <Card>
          <CardContent>
            <CardHeader subheader="Information can be edited" title="Profile" />
            <Divider />
            <Grid container spacing={3}>
              <Grid {...(this.gridProps as any)}>
                <InputFeedback
                  currentValue={name}
                  label="Name"
                  maxLength={26}
                  renderInput={(rest: GOP) =>
                    this.renderInput("name", "Name", "", {
                      ...rest,
                    })
                  }
                />
              </Grid>
              <Grid {...(this.gridProps as any)}>
                <InputFeedback
                  currentValue={email}
                  label="Email"
                  maxLength={26}
                  renderInput={(rest: GOP) =>
                    this.renderInput("email", "Email", "email", {
                      ...rest,
                    })
                  }
                />
              </Grid>
              {/* {this.renderInput("password", "Password", "password", {
              feedback: true,
          })} */}
              <Divider />
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 2,
                }}
              >
                <CardActions>{this.renderButton("Save details")}</CardActions>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </form>
    );
  }
}

export default AccountProfileDetails;
