import * as React from "react";
import * as qs from "qs";

import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { IProduct } from "../types";

import { Formik, Form, FormikProps } from "formik";

import {
  BulmaInput,
  BulmaTextarea,
  BulmaSelect,
  BulmaButton,
} from "src/components/common/bulma";
import ImageInputGroup from "src/components/common/imageInputGroup";

import { validationFields } from "../validation";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

const EditProduct = () => {
  const [initialValues, setInitialValues] = React.useState<IProduct>({
    id: 0,
    name: "",
    itemType: 0,
    imageSrc: "",
    description: "",
    barcode: "",
  });

  const navigator = useNavigate();
  const { types } = useTypedSelector((redux) => redux.itemShop);
  const { editProduct } = useActions();

  React.useEffect(() => {
    const str = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1
    );
    const parsed = qs.parse(str);
    const product: IProduct = {
      id: +(parsed.id as string),
      name: parsed.name as string,
      description: parsed.description as string,
      imageSrc: parsed.imageSrc as string,
      itemType: +(parsed.itemType as string),
    };
    setInitialValues(product);
  }, []);

  const handleSubmit = (values: IProduct, action: any) => {
    editProduct(values);
    navigator("/admin/product/list");
  };

  return (
    <>
      {initialValues.id !== 0 && (
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
                  initialUrl={initialValues.imageSrc as string}
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
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default EditProduct;
