import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Corbeille.css';

const Corbeille = () => {
  const [corbeilleData, setCorbeilleData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3012/corbeille-data')
      .then((response) => {
        setCorbeilleData(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des données de la corbeille :', error);
      });
  }, []);

  const handleRestore = (categorie, id) => {
    axios.post(`http://localhost:3012/restore-from-corbeille/${categorie}/${id}`)
      .then(response => {
        console.log(`Donnée avec l'ID ${id} restaurée avec succès.`);
        setCorbeilleData(corbeilleData.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error(`Erreur lors de la restauration de la donnée :`, error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3012/delete-from-corbeille/${id}`)
      .then(response => {
        console.log(`Donnée avec l'ID ${id} supprimée avec succès.`);
        setCorbeilleData(corbeilleData.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error(`Erreur lors de la suppression de la donnée :`, error);
      });
  };

  const filteredCorbeilleData = corbeilleData.filter(item => {
    return item.nom.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <h2>Corbeille</h2>
      <input
        type="text"
        placeholder="Rechercher par nom"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Image</th>
            <th>Taille</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCorbeilleData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nom}</td>
              <td>{item.description}</td>
              <td>
                <img src={item.image} alt={item.nom} className="product-image" />
              </td>
              <td>{item.taille}</td>
              <td>{item.prix}</td>
              <td>
                <button onClick={() => handleRestore(item.categorie, item.id)}>Restaurer</button>
                <button onClick={() => handleDelete(item.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Corbeille;
