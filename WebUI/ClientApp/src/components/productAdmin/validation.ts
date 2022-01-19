import * as Yup from "yup";

export const validationFields = () => {
  return Yup.object().shape({
    name: Yup.string().required("Input product name"),
    description: Yup.string().required("Input description"),
    shopItemTypeId: Yup.number()
      .required("Choose item type")
      .test("Id more 0", "Choose item type", (x) => (x ? x > 0 : false)),
    cost: Yup.number()
      .required("Input price")
      .test("Is positive", "Input valid price more 0", (x) =>
        x ? x > 0 : false
      ),
  });
};
