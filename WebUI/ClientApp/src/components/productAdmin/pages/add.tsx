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
import {
  BulmaInput,
  BulmaTextarea,
  BulmaSelect,
  BulmaButton,
} from "src/components/common/bulma";
import { useNavigate } from "react-router";
import { useActions } from "src/hooks/useActions";
import { toast } from "react-toastify";

const AddProduct = () => {
  const initialValues: IProduct = {
    id: 0,
    name: "",
    description: "",
    barcode: "",
    shopItemTypeId: 0,
    picturePath: null,
    cost: 0,
    formFile: null,
  };
  const initialUrl = "https://static.thenounproject.com/png/3752804-200.png";

  const { types } = useTypedSelector((redux) => redux.itemShop);
  const { addProduct, getProductTypes } = useActions();
  const navigator = useNavigate();

  React.useEffect(() => {
    async function fetch() {
      try {
        await getProductTypes();
      } catch (error) {
        toast.error(error as string);
      }
    }
    fetch();
  }, []);

  const handleSubmit = (values: IProduct, actions: FormikHelpers<IProduct>) => {
    async function add() {
      try {
        console.log("values: ", values);
        values.barcode = generateBarcode(values);
        await addProduct(values);
        toast.success(`Product ${values.name} was successfully added`);
        navigator("/admin/product/list");
      } catch (error) {
        toast.error(error as string);
      }
    }
    add();
  };

  const generateBarcode = (values: IProduct) => {
    let itemTypeStr = "notype";
    if (values.shopItemTypeId) {
      itemTypeStr = types
        .filter((x) => x.id == values.shopItemTypeId)[0]
        .name.toLowerCase();
    }

    return itemTypeStr.concat(
      ":",
      values.name ? values.name.toLowerCase() : "noname"
    );
  };

  return (
    <>

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
            <div className="admin-container">
              <h1 className="title is-1">Add product</h1>
              <Form onSubmit={handleSubmit}>
                <BulmaInput
                  value={values.name}
                  field="name"
                  onChange={handleChange}
                  label="Name"
                  error={errors.name}
                  touched={touched.name}
                />
                <BulmaInput
                  value={values.cost}
                  field="cost"
                  onChange={handleChange}
                  label="Cost"
                  error={errors.cost}
                  touched={touched.cost}
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
                  value={values.shopItemTypeId}
                  field="shopItemTypeId"
                  onChange={handleChange}
                  label="Item type"
                  error={errors.shopItemTypeId}
                  touched={touched.shopItemTypeId}
                  values={types}
                />

                <ImageInputGroup
                  initialUrl={initialUrl}
                  setFieldValue={setFieldValue}
                />

                <div className="field is-grouped">
                  <div className="control">
                    {/* <button className="button is-link" type="submit">
                    Submit
                  </button> */}
                    <BulmaButton
                      label="Confirm"
                      type="submit"
                      className="is-link"
                    />
                  </div>
                  <div className="control">
                    {/* <button className="button is-link is-light">Cancel</button> */}
                    <BulmaButton
                      label="Cancel"
                      type="submit"
                      className="is-link is-light"
                      onClick={() => {
                        navigator("/admin/product/list");
                      }}
                    />
                  </div>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default AddProduct;