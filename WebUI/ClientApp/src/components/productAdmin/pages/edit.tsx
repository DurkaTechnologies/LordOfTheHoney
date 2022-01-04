import * as React from "react";
import { useState } from "react";
import * as qs from "qs";

import { useSearchParams } from "react-router-dom";
import { IProduct } from "../types";

const EditProduct = () => {
  const [searchParams] = useSearchParams();

  const initialValuesFromParams: IProduct = {
    id: searchParams.get("id") ? +(searchParams?.get("id") as string) : 0,
    name: searchParams.get("name") ? searchParams.get("name") : "",
    description: searchParams.get("description")
      ? searchParams.get("description")
      : "",
    itemType: searchParams.get("itemType")
      ? +(searchParams?.get("itemType") as string)
      : 0,
    imageSrc: searchParams.get("imageSrc") ? searchParams.get("imageSrc") : "",
  };

  const [product, setProduct] = useState<IProduct>(initialValuesFromParams);

  console.log(window.location.href);
  console.log(
    qs.parse(
      window.location.href.slice(window.location.href.lastIndexOf("?") + 1)
    )
  );

  return (
    <>
      <h1>edit</h1>
      <h2>Id {product.id}</h2>
      <h2>Name {product.name}</h2>
      <h2> Desc {product.description}</h2>
      <h2>barcode{product.barcode}</h2>
    </>
  );
};

export default EditProduct;
