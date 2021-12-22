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
import { validationFields } from "./validation";

const LoginPage = () => {
  const initialValues: ILoginModel = { nickname: "", password: "" };
  const [invalid, setInvalid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const handleSubmit = async (
    values: ILoginModel,
    actions: FormikHelpers<ILoginModel>
  ) => {
    try {
      setLoading(true);
      // await LoginUser(values);
      await navigator("/");
    } catch (errors) {}
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
                label="Nickname"
                field="nickname"
                type="text"
                value={values.nickname}
                error={errors.nickname}
                touched={touched.nickname}
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
              <Button type="submit" label="confirm" />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginPage;
