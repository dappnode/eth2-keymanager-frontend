import { DropEvent, useDropzone } from "react-dropzone";
import { useMemo } from "react";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#424242",
  borderStyle: "dashed",
  backgroundColor: "#121212",
  color: "#f0f0f0",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "60%",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

interface Props {
  callback: <T extends File>(files: T[], event: DropEvent) => void;
}

export default function FileDrop({ callback }: Props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDropAccepted: callback, accept: "application/json" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const dropzone = (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drop JSON file here, or click to select file</p>
        )}
      </div>
    </div>
  );

  return dropzone;
}
