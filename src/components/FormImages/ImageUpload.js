import React, { useState } from 'react';
import { uploadFile } from '../firebase/config';

function ImageUpload({ onImageUpload }) {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await uploadFile(file);
            console.log(result);
            onImageUpload(result); // Llamando a la función de devolución de llamada con la URL de la imagen
        } catch (err) {
            console.error(err);
            alert('Fallo al subir la imagen, intente más tarde');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                name=""
                id=""
                onChange={(e) => setFile(e.target.files[0])}
            />
            <button>Upload</button>
        </form>
    );
}

export default ImageUpload;
