import * as React from "react";

import { useState, useRef } from "react";
import { ILoginModel } from "./types";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import InputGroupFormik from "../../common/inputGroupFormik";
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
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { validationFields } from "./validation";
import { toast } from "react-toastify";

import "./style.css";

const LoginPage = () => {
  const initialValues: ILoginModel = { email: "", password: "" };
  const [invalid, setInvalid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigator = useNavigate();
  const refFormik = useRef<FormikProps<ILoginModel>>(null);

  const { loginUser } = useActions();
  const { isAuth } = useTypedSelector((redux) => redux.auth);

  const handleSubmit = async (
    values: ILoginModel,
    actions: FormikHelpers<ILoginModel>
  ) => {
    setLoading(true);
    try {
      if (isAuth) {
        toast.error("Logout first");
        clearFormik();
        return;
      }
      await loginUser(values);
      setLoading(false);
      navigator("/");
    } catch (errors) {
      setLoading(false);
      setInvalid("Invalid password or email");
      toast.error("Error in login values");
      clearFormik();
    }
  };

  const clearFormik = () => {
    refFormik.current?.setFieldTouched("email", false);
    refFormik.current?.setFieldTouched("password", false);
  };

  return (
    <div
      className="d-flex justify-content-center background"
      style={{ minHeight: "calc(100vh - 75px)" }}
    >
      <div className="card align-self-center p-3" style={{ width: "25rem" }}>
        <div className="card-body">
          <h2 className="card-title title is-2">Login</h2>
          {invalid && <div className="alert alert-danger">{invalid}</div>}
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationFields}
            innerRef={refFormik}
          >
            {(props: FormikProps<ILoginModel>) => {
              const { values, errors, touched, handleChange, handleSubmit } =
                props;
              return (
                <Form onSubmit={handleSubmit}>
                  <BulmaInput
                    label="Email"
                    field="email"
                    type="text"
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
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
                  {/* <Button type="submit" label="confirm" disabled={loading} /> */}
                  <div className="d-flex justify-content-between">
                    <Link to="/register" className="button btnRegister">
                      Register
                    </Link>
                    <BulmaButton
                      type="submit"
                      className="btnConfirm border-0"
                      label="Confirm"
                      loading={loading}
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

export default LoginPage;
