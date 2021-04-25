/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, FormEvent } from "react";
import { toast } from "react-toastify";

import Joi from "joi";
import { Button } from "primereact/button";

import { Input } from ".";
import { GOP } from "../interfaces/genericObjectProps";

export interface SignupState extends GOP {
  formData: {
    name: string;
    password: string;
    email: string;
  } & GOP;
  errors: GOP;
}

export const baseState: SignupState = {
  formData: {
    name: "",
    password: "",
    email: "",
  },
  errors: {},
};
export const baseSchema = {
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .min(5),
  password: Joi.string().required().min(6),
  name: Joi.string().required().min(2),
};

class Form extends Component<{ [x: string]: any }, { [x: string]: any }> {
  schema!: {
    [key: string]: Joi.StringSchema | Joi.ArraySchema | Joi.AnySchema;
  };

  doSubmit!: () => Promise<void>;

  convert2image!: () => Promise<string>;

  handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (this.state.grid) {
      toast.dark("One moment please", {
        position: "top-center",
        autoClose: 2500,
      });
      const dataUrl = await this.convert2image();
      // eslint-disable-next-line react/no-unused-state
      this.setState({ dataUrl });
    }

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors !== null && errors?.grid) {
      toast.error("Canvas can not be blank", {
        position: "top-center",
        autoClose: 2500,
      });
    }

    if (!errors) this.doSubmit();
  };

  validateProperty = (name: string, value: string): string | null => {
    const schema = Joi.object({ [name]: this.schema[name] })!;

    const obj = { [name]: value };

    const { error } = schema.unknown().validate(obj, {
      abortEarly: false,
    });
    return error ? error.details[0].message : null;
  };

  validate = (): any => {
    const {
      state: { formData },
      schema,
    } = this;
    const { error } = Joi.object(schema).unknown()!.validate(formData, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors: { [name: string]: any } = {};
    error.details.forEach(({ path, message }: any) => {
      errors[path[0]] = message;
    });

    return errors;
  };

  handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { errors, formData } = this.state;

    // validate input
    const errorsCopy = { ...errors } || {};
    const errorMessage = this.validateProperty(name, value);

    // if (errorMessage) {
    errorsCopy[name] = errorMessage;
    // } else {
    //   delete errorsCopy[name];
    // }

    // formData
    const updatedFormData = { ...formData };
    updatedFormData[name] = value;

    // update state
    this.setState({ formData: updatedFormData, errors: errorsCopy });
  };

  renderInput = (
    name: string,
    label: string,
    type = "text",
    { ...rest }: GOP = { val: undefined }
  ): React.ReactNode => {
    const { formData, errors } = this.state;
    return (
      <Input
        error={errors && errors[name]}
        label={label}
        name={name}
        onChange={this.handleChange}
        type={type}
        value={formData[name]}
        {...rest}
      />
    );
  };

  renderButton(label = ""): React.ReactNode {
    return (
      <div className="text-center">
        <Button
          className="btn-block p-button-outlined p-button-rounded"
          disabled={this.validate()}
          label={label}
          type="submit"
        />
      </div>
    );
  }
}

export default Form;
