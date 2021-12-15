import './App.css';
import { Box, Button, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Dropzone, { DropEvent, useDropzone } from 'react-dropzone'
import { useCallback, useMemo } from 'react';
import { width } from '@mui/system';
import { callbackify } from 'util';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#666666',
  borderStyle: 'dashed',
  backgroundColor: '#323232',
  color: '#f0f0f0',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  width: '60%'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

interface Props {
  callback: <T extends File>(files: T[], event: DropEvent) => void
}

export default function FileDrop({ callback }: Props) {

  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  // }, [])
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDropAccepted: callback, accept: 'application/json' });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const files = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name}
    </li>
  ));

  const dropzone = (
    <div className="container">
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drop keystore JSON files here, or click to select files</p>
      }
    </div>
    </div>
  )

  return (
    dropzone
  );
}

