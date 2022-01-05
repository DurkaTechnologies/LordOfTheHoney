import * as React from "react";

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import { validationFields } from "../validation";

import { IProduct, IProductType } from "../types";
import { useTypedSelector } from "src/hooks/useTypedSelector";

import ImageInputGroup from "src/components/common/imageInputGroup";

import "bulma/css/bulma.css";
import BulmaInput from "src/components/common/bulma/bulmaInput";
import BulmaTextarea from "src/components/common/bulma/bulmaTextarea";
import BulmaSelect from "src/components/common/bulma/bulmaSelect";
import { useNavigate } from "react-router";
import { useActions } from "src/hooks/useActions";

const AddProduct = () => {
  const initialValues: IProduct = {
    id: 0,
    name: "",
    description: "",
    barcode: "",
    itemType: 0,
    imageSrc: null,
  };
  const initialUrl = "https://static.thenounproject.com/png/3752804-200.png";

  // const [product, setProduct] = React.useState<IProduct>(initialValues);
  const { types } = useTypedSelector((redux) => redux.itemShop);
  const { addProduct } = useActions();
  const navigator = useNavigate();

  React.useEffect(() => {}, []);

  const handleSubmit = (values: IProduct, actions: FormikHelpers<IProduct>) => {
    values.barcode = generateBarcode(values);
    // console.log("Product: ", values);
    addProduct(values);
    navigator("/admin/product/list");
  };

  // const handleChange = (event: React.ChangeEvent<any>) => {
  //   //HTMLInputElement
  //   setProduct({
  //     ...product,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const generateBarcode = (values: IProduct) => {
    let itemTypeStr = "notype";
    if (values.itemType) {
      itemTypeStr = types
        .filter((x) => x.id == values.itemType)[0]
        .name.toLowerCase();
    }

    return itemTypeStr.concat(
      ":",
      values.name ? values.name.toLowerCase() : "noname"
    );
  };

  return (
    <>
      <h1 className="title is-1">Add product</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationFields}
      >
        {(props: FormikProps<IProduct>) => {
          const {
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <BulmaInput
                value={values.name}
                field="name"
                onChange={handleChange}
                label="Name"
                error={errors.name}
                touched={touched.name}
              />
              <BulmaTextarea
                value={values.description}
                field="description"
                onChange={handleChange}
                label="Description"
                error={errors.description}
                touched={touched.description}
              />

              <BulmaSelect
                value={values.itemType}
                field="itemType"
                onChange={handleChange}
                label="Item type"
                error={errors.itemType}
                touched={touched.itemType}
                values={types}
              />

              <ImageInputGroup
                initialUrl={initialUrl}
                setFieldValue={setFieldValue}
              />

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link" type="submit">
                    Submit
                  </button>
                </div>
                <div className="control">
                  <button className="button is-link is-light">Cancel</button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddProduct;
