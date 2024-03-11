import React, { useState, useEffect } from "react";
import "./Form.css";
import { uploadFile } from "../firebase/config";

function PostForm() {
    const [user, setUser] = useState({
        name: '',
        date: '',
        imageUrl: '',
        phoneNumber: '',
    });

  const [file, setFile] = useState(null);

  const [usersList, setUsersList] = useState([]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  //Maneja el estado de el archivo de imagen que se sube en ImageUpload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadFile(file);
      setUser({ ...user, imageUrl });
      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
          name: user.name,
          date: user.date,
          imageUrl: imageUrl
        },
      };
      const res = await fetch(
          'https://codicon-practice-default-rtdb.firebaseio.com/UserData.json',
          options
      );
      if (res.ok) {
          alert('Data saved successfully');
      } else {
          alert('Error occurred while saving data');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred");
    }
  };

  useEffect(() => {
    console.info(user); // Log updated user state
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://codicon-practice-default-rtdb.firebaseio.com/UserData.json"
        );
        const data = await response.json();
        if (data) {
          const users = Object.values(data);
          setUsersList(users);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="titulo">Red de adopción</h1>
      <div className="form">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <input
              id="name"
              placeholder="Nombre"
              type="text"
              value={user.name}
              autoComplete="off"
              required
              onChange={handleChange}
            />
            <input
              id="date"
              placeholder="Fecha de nacimiento"
              type="date"
              value={user.date}
              autoComplete="off"
              required
              onChange={handleChange}
            />
            <input 
                type="tel" 
                placeholder='Número de telefono'
                name="phone"
                id="phoneNumber"
            />
            <input type="file" name="" id="" onChange={handleFileChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="user-table">
        <h2 className="subtitle">Mascotas</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de nacimiento</th>
              <th>Número de telefono</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.date}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <img src={user.imageUrl} alt="UserImage" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PostForm;
