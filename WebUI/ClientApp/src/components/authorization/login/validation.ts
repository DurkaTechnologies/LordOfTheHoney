import * as Yup from "yup";

export const validationFields = () => {
    return Yup.object().shape({
        nickname: Yup.string()
            .required('Input nickname'),
        password: Yup.string()
        // .matches(
        //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,20}\S$/,
        //     "Please valid password. One uppercase, one lowercase, one special character and no spaces"
        // )
        .required(
            'Input password'
        ),
});   
}