import * as React from "react";

import { useState, useRef } from "react";
import { ILoginModel } from "./types";
import { useNavigate } from "react-router";

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
    <div>
      {invalid && <div className="alert alert-danger">{invalid}</div>}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationFields}
        innerRef={refFormik}
      >
        {(props: FormikProps<ILoginModel>) => {
          const { values, errors, touched, handleChange, handleSubmit } = props;
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
              <BulmaButton
                type="submit"
                className="is-success"
                label="Confirm"
                loading={loading}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginPage;
