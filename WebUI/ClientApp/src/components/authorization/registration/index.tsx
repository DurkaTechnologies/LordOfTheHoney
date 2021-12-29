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

import { useActions } from "../../../hooks/useActions";

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

  const { registerUser } = useActions();

  const handleSubmit = async (
    values: IRegisterModel,
    actions: FormikHelpers<IRegisterModel>
  ) => {
    setLoading(true);
    await registerUser(values).then(
      (value) => {
        setLoading(false);
        navigator("/login");
      },
      (reason) => {
        const serverErrors = reason as RegisterError;
        console.log("serverErrors: ", serverErrors);
        if (serverErrors.messages) {
          setServerError(serverErrors.messages.join(", "));
        }
        setLoading(false);
      }
    );
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
              {/* <Button type="submit" label="confirm" /> */}
              <button type="submit">Confirm</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterPage;
