import { PickerOverlay } from "filestack-react";
import React from "react";

const UploadImage = (props) => {
  const { setPhoto, setIsPicker, setDisabled } = props;
  return (
    <>
      <PickerOverlay
        apikey={process.env.REACT_APP_FILESTACK_API_KEY}
        onSuccess={(res) => {
          setPhoto(res.filesUploaded[0].url);
          setIsPicker(false);
          setDisabled(true);
        }}
        onError={(res) => alert(res)}
        pickerOptions={{
          maxFiles: 1,
          accept: ["image/*"],
          errorsTimeout: 2000,
          maxSize: 1 * 1000 * 1000,
        }}
      />
    </>
  );
};

export default UploadImage;
