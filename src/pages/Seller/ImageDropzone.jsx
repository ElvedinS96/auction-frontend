import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#D8D8D8',
    borderStyle: 'dashed',
    backgroundColor: '#fcfcfc',
    color: '#252525',
    fontSize: "0.8em",
    letterSpacing: "0.48px",
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: "100%",
    height: "16em"
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

function ImageDropzone(props) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone({ accept: 'image/jpeg, image/png', maxFiles: "5", onDropAccepted: acceptedFiles => { props.setSelectedPhotos(acceptedFiles) } });

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

    const listSelected = acceptedFiles.map((image) =>
        <div style={{ marginTop: "0.3em" }}>- {image.name} </div>
    )

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <label style={{ color: "#8367D8", cursor: "pointer" }}>Upload Photos <label style={{ marginLeft: "0.7em" }}>or just drag and drop</label></label>
                <p style={{ marginTop: "0.8em", marginBottom: "0.8em" }}>+ Add at least 3 photos and maximum 5</p>
                <div>
                    <label style={{ fontWeight: "bold" }}>{acceptedFiles.length == 0 ? "" : "Selected photos:"}</label>
                    {listSelected}
                </div>
            </div>
        </div>
    );
}

export default ImageDropzone