import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './showTable.css';


const ShowTable = () => {
  const { tableName } = useParams();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3012/table-data/${tableName}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erreur dans la table :', error);
      });
  }, [tableName]);

  const handleMoveToTrash = (id) => {
    axios.delete(`http://localhost:3012/move/${tableName}/${id}`)
      .then(response => {
        console.log(`Donnée déplacée avec succès.`);
        const updatedTableData = data.filter(item => item.id !== id);
        setData(updatedTableData);
      })
      .catch(error => {
        console.error(`Erreur lors du déplacement`, error);
      });
  };

  
  const filteredData = data.filter(item => {
    return item.nom.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="table-container">
      <h2>
        <Link to={`/add-data/${tableName}`} className="add-data-button">
          Ajouter un nouveau produits
        </Link>
      </h2>
      <div className="recherche">
      <input
      
        type="text"
        placeholder="    Rechercher par nom"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Image</th>
            <th>Taille</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nom}</td>
              <td>{item.description}</td>
              <td>
                <img src={item.image} alt={item.nom} />
              </td>
              <td>{item.taille}</td>
              <td>{item.prix}</td>
              <td className="actions">
                <button className="update" onClick={() => {
                  navigate(`/table-data/${tableName}/${item.id}`);
                }}>Update</button>
                <button className="delete" onClick={() => handleMoveToTrash(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTable;
