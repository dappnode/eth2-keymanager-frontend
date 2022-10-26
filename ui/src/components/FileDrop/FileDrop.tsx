import { DropEvent, useDropzone } from "react-dropzone";
import { useMemo } from "react";
import {
  baseStyle,
  acceptStyle,
  activeStyle,
  rejectStyle,
} from "../../Styles/fileDropStyles";

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
