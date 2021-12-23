import * as Yup from "yup";

export const validationFields = () => {
  return Yup.object().shape({
    nickname: Yup.string().required("Input nickname"),
    email: Yup.string().email("Input valid email").required("Input email"),
    password: Yup.string()
      .required("Input password")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
        "Please valid password. 8 symbols. One uppercase, one lowercase, one special character and no spaces"
      ),
    password_confirmation: Yup.string()
      .required("Confirm password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
};
