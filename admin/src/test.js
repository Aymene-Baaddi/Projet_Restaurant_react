import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './test.css';

const Test = () => {
  const [table, setTable] = useState('');
  const [List, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3012/tables')
      .then(response => {
        console.log(response.data);
        setList(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des tables :', error);
      });
  }, []);

  const CreateTable = () => {
    axios.post('http://localhost:3012/create', { name: table })
      .then(response => {
        console.log(response.data);
        setList([...List, table]);
        setTable('');
      })
      .catch(error => {
        console.error('Erreur lors de la création de la table :', error);
      });
  };

  const DeleteTable = (Delete) => {
    axios.delete(`http://localhost:3012/delete/${Delete}`)
      .then(response => {
        console.log(response.data);
        setList(List.filter(table => table !== Delete));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la table :', error);
      });
  };
  

 

  return (
    <div className="container">
     
      <div className="background-image">
         <div className="input-container">
        <input
          type="text"
          placeholder="    Entrer votre Catégorie"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
        <button onClick={CreateTable} disabled={!table}>Créer</button>
      </div>
      </div>
     
      <h2>Liste des catégories </h2>
      <ul className="card-list">
      <img src="imagesjpg" alt="" />
        {List.map((table, index) => (
          <li key={index} className="card">
              
              <h6><Link to={`/table-data/${table}`}>{table}</Link></h6>
              <button onClick={() => DeleteTable(table)}>Supprimer</button>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
