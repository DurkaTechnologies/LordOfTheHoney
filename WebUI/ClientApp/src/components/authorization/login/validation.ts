import * as Yup from "yup";

export const validationFields = () => {
  return Yup.object().shape({
    email: Yup.string().required("Input email"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,20}\S$/,
        "Invalid password format"
      )
      .required("Input password"),
  });
};
