import React, { useState } from 'react';
import { uploadFile } from '../firebase/config';

function ImageUpload({ onImageUpload }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <input
            type="file"
            name=""
            id=""
            onChange={handleFileChange}
        />
    );
}

export default ImageUpload;
