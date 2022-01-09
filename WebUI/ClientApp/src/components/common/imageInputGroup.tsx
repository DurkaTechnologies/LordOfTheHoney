import * as React from "react";

export interface ImageInputGroupProps {
  initialUrl: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

const ImageInputGroup = ({
  initialUrl,
  setFieldValue,
}: ImageInputGroupProps) => {
  const [imgSrc, setImgSrc] = React.useState<string>(initialUrl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgSrc(url);

      setFieldValue("formFile", file);

      // const reader = new FileReader();
      // reader.readAsBinaryString(file);
      // reader.onload = function () {
      //   const arr = new Uint8Array(reader.result as ArrayBuffer);
      // const binaryString = String.fromCharCode.apply(null, arr as Uint8Array);
      // var string = new TextDecoder().decode(arr);
      // var newString = btoa(reader.result as string);

      //   console.log("string: ", reader.result as string);
      //   setFieldValue("uploadRequest.extension", file.name.split(".").pop());
      //   setFieldValue("uploadRequest.data", reader.result as string);
      // };
    }
  };

  return (
    <>
      <label htmlFor="imageInput">
        <img
          src={imgSrc}
          alt="Add image to product"
          className="image is-128x128"
        />
      </label>
      <input
        id="imageInput"
        type="file"
        className="d-none"
        onChange={handleChange}
      />
    </>
  );
};

export default ImageInputGroup;
