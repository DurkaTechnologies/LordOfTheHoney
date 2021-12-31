import * as React from "react";

import { useState } from "react";
import { ILoginModel } from "./types";
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
import { useActions } from "src/hooks/useActions";
import { validationFields } from "./validation";
import { toast } from "react-toastify";

const LoginPage = () => {
  const initialValues: ILoginModel = { email: "", password: "" };
  const [invalid, setInvalid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const { loginUser } = useActions();

  const handleSubmit = async (
    values: ILoginModel,
    actions: FormikHelpers<ILoginModel>
  ) => {
    setLoading(true);
    try {
      await loginUser(values);
      setLoading(false);
      navigator("/");
    } catch (errors) {
      setLoading(false);
      setInvalid("Invalid password or email");
      toast.error("Error in login values");
    }
  };

  return (
    <div>
      {invalid && <div className="alert alert-danger">{invalid}</div>}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationFields}
      >
        {(props: FormikProps<ILoginModel>) => {
          const { values, errors, touched, handleChange, handleSubmit } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <InputGroupFormik
                label="Email"
                field="email"
                type="text"
                value={values.email}
                error={errors.email}
                touched={touched.email}
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
              <Button type="submit" label="confirm" disabled={loading} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginPage;
