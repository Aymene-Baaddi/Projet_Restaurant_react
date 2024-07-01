import React, { useState } from 'react';
import axios from 'axios';
import { useParams, } from 'react-router-dom';
import './Add.css'; 

const AddData = () => {
  const { tableName } = useParams();
  

  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [taille, setTaille] = useState('');
  const [image, setImage] = useState('');
  const [categorie, setCategorie] = useState(tableName);

  const handleAddData = () => {
    const dataToAdd = {
      nom,
      description,
      image,
      taille,
      prix,
      categorie,
    };

    axios.post(`http://localhost:3012/add-data/${tableName}`, dataToAdd)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Erreur :', error);
      })
      .then(() => {
      
    });
  };

  return (
    <div className="add-data-container">
      <h2>Add Data to Table</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Taille"
          value={taille}
          onChange={(e) => setTaille(e.target.value)}
        />
      </div>
      <div className="input-container">
      <input
        type="text"
        placeholder="Image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      </div>
      <div className="input-container">
      <input
          type="text"
          placeholder="Catégorie"
          value={categorie}
          readOnly
          onChange={(e) => setCategorie(e.target.value)}
        />
      </div>
      <button className="add-data-button" onClick={handleAddData}>Add Data</button>
    </div>
  );
};

export default AddData;