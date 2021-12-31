import * as React from "react";

import { useState } from "react";
import { IRegisterModel, RegisterError } from "./types";
import { useNavigate } from "react-router";

import InputGroupFormik from "../../common/inputGroupFormik";
import Button from "../../common/button";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import { validationFields } from "./validation";
import { registerUser } from "./service";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const initialValues: IRegisterModel = {
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    activateUser: true,
    autoConfirmEmail: true,
  };
  const [serverError, setServerError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const handleSubmit = async (
    values: IRegisterModel,
    actions: FormikHelpers<IRegisterModel>
  ) => {
    setLoading(true);
    try {
      await registerUser(values);
      setLoading(false);
      toast.success(`User ${values.userName} are successfully registered`);
      navigator("/login");
    } catch (error) {
      toast.error("Registration with errors");
      const serverErrors = error as RegisterError;
      if (serverErrors.messages) {
        setServerError(serverErrors.messages.join(", "));
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationFields}
      >
        {(props: FormikProps<IRegisterModel>) => {
          const { values, errors, touched, handleChange, handleSubmit } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <InputGroupFormik
                label="Email"
                field="email"
                type="email"
                value={values.email}
                error={errors.email}
                touched={touched.email}
                onChange={handleChange}
              />
              <InputGroupFormik
                label="Nickname"
                field="userName"
                type="text"
                value={values.userName}
                error={errors.userName}
                touched={touched.userName}
                onChange={handleChange}
              />
              <InputGroupFormik
                label="Password"
                field="password"
                type="password"
                value={values.password}
                error={errors.password}
                touched={touched.password}
                onChange={handleChange}
              />
              <InputGroupFormik
                label="Password confirmation"
                field="confirmPassword"
                type="password"
                value={values.confirmPassword}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                onChange={handleChange}
              />
              <Button type="submit" label="confirm" disabled={loading} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterPage;
