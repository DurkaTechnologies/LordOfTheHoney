import * as React from "react";

import { useState, useRef } from "react";
import { IRegisterModel, RegisterError } from "./types";
import { useNavigate } from "react-router";

import { BulmaInput, BulmaButton } from "src/components/common/bulma";
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

import { useTypedSelector } from "src/hooks/useTypedSelector";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { Link } from "react-router-dom";

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
  const refFormik = useRef<FormikProps<IRegisterModel>>(null);

  const { isAuth } = useTypedSelector((redux) => redux.auth);

  const handleSubmit = async (
    values: IRegisterModel,
    actions: FormikHelpers<IRegisterModel>
  ) => {
    setLoading(true);
    try {
      if (isAuth) {
        toast.error("Logout first");
        clearFormik();
        return;
      }
      await registerUser(values);
      setLoading(false);
      toast.success(`User ${values.userName} are successfully registered`);
      navigator("/login");
    } catch (error) {
      clearFormik();
      toast.error("Registration with errors");
      const serverErrors = error as RegisterError;
      if (serverErrors.messages) {
        setServerError(serverErrors.messages.join(", "));
      }
      setLoading(false);
    }
  };

  const clearFormik = () => {
    refFormik.current?.setFieldTouched("email", false);
    refFormik.current?.setFieldTouched("userName", false);
    refFormik.current?.setFieldTouched("password", false);
    refFormik.current?.setFieldTouched("password_confirmation", false);
  };

  return (
    <div
      className="d-flex justify-content-center background"
      style={{ minHeight: "calc(100vh - 75px)" }}
    >
      <div className="card align-self-center p-3" style={{ width: "25rem" }}>
        <div className="card-body">
          <h1 className="card-title m-0 pb-2 display-3 fw-bolder text-center text-gradient">Sign Up</h1>
          
          {serverError && (
            <div className="alert alert-danger">{serverError}</div>
          )}
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationFields}
            innerRef={refFormik}
          >
            {(props: FormikProps<IRegisterModel>) => {
              const { values, errors, touched, handleChange, handleSubmit } =
                props;
              return (
                <Form onSubmit={handleSubmit}>
                  <BulmaInput
                    label="Email"
                    field="email"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    onChange={handleChange}
                  />
                  <BulmaInput
                    label="Nickname"
                    field="userName"
                    type="text"
                    value={values.userName}
                    error={errors.userName}
                    touched={touched.userName}
                    onChange={handleChange}
                  />
                  <BulmaInput
                    label="Password"
                    field="password"
                    type="password"
                    value={values.password}
                    error={errors.password}
                    touched={touched.password}
                    onChange={handleChange}
                  />
                  <BulmaInput
                    label="Password confirmation"
                    field="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    onChange={handleChange}
                  />
                  {/* <Button type="submit" label="confirm" disabled={loading} /> */}
                  <div className="d-flex justify-content-between">
                    <Link to="/login" className="button btnLogin">
                      Login
                    </Link>
                    <BulmaButton
                      label="Confirm"
                      loading={loading}
                      className="btnConfirm"
                      type="submit"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
