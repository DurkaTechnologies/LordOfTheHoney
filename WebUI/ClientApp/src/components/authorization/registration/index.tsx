import * as React from "react";

import { useState } from "react";
import { IRegisterModel } from "./types";
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

const RegisterPage = () => {
  const initialValues: IRegisterModel = {
    email: "",
    nickname: "",
    password: "",
    password_confirmation: "",
  };
  const [invalid, setInvalid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const handleSubmit = async (
    values: IRegisterModel,
    actions: FormikHelpers<IRegisterModel>
  ) => {
    try {
      setLoading(true);
      await navigator("/login");
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
              <InputGroupFormik
                label="Password confirmation"
                field="password_confirmation"
                type="password"
                value={values.password_confirmation}
                error={errors.password_confirmation}
                touched={touched.password_confirmation}
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

export default RegisterPage;
