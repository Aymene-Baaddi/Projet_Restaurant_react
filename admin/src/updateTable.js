import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./update.css";

function UpdateTable() {
  const { id, tableName } = useParams();
  const navigate = useNavigate();

  const [, setProduit] = useState({
    nom: "",
    description: "",
    prix: "",
    image: "",
    taille: "",
  });

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newtaille, setNewtaille] = useState("");

  const getProduits = useCallback(() => {
    Axios.get(`http://localhost:3012/table-data/${tableName}/${id}`).then(
      (response) => {
        setProduit(response.data[0]);

        setNewName(response.data[0].nom);
        setNewDescription(response.data[0].description);
        setNewPrice(
          response.data[0].prix !== null ? response.data[0].prix.toString() : ""
        );
        setNewImage(response.data[0].image);
        setNewtaille(response.data[0].taille);
      }
    );
  }, [tableName, id]);

  useEffect(() => {
    getProduits();
  }, [getProduits]);

  const updateProduits = () => {
    const parsedPrice = newPrice !== undefined ? newPrice.toString() : "";

    Axios.put(
      `http://localhost:3012/table-data/update/${tableName}/${id}`,
      {
        nom: newName || "",
        description: newDescription || "",
        prix: parsedPrice,
        image: newImage || "",
        taille: newtaille || "",
      }
    ).then(() => {
      navigate(`/table-data/${tableName}`);
    });
  };

  return (
    <div className="App">
      <h2>Update your data</h2>
      <br />
      <div className="Home">
        <div className="information">
          <label>taille:</label>
          <input
            type="text"
            value={newtaille}
            onChange={(e) => setNewtaille(e.target.value)}
          />
          <label>Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <label>Description:</label>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <label>Price:</label>
          <input
            type="text"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <label>Image:</label>
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
          />

          <button onClick={updateProduits}>Update data</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateTable;
