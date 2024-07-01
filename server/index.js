const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors");



app.use(cors());
app.use(express.json());

const db= mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "AYMENEbd10-",
  database: "restaurant",
});

app.post("/create", (req, res) => {
  const name = req.body.name;

  const sql = `CREATE TABLE ${name} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    image VARCHAR(400),
    taille VARCHAR(5),
    categorie VARCHAR(50),
    prix INT
);`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la création de la table");
    } else {
      res.send("Table créée avec succès");
    }
  });
});

app.get("/tables", (req, res) => {
  const sql = "SHOW TABLES FROM restaurant WHERE Tables_in_restaurant NOT LIKE 'corbeille' AND Tables_in_restaurant NOT LIKE 'users'";
  ;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des tables");
    } else {
      const tables = result.map((table) => table.Tables_in_restaurant);
      res.json(tables);
    }
  });
});

app.delete("/delete/:table", (req, res) => {
  const table = req.params.table;
  const val = [table];

  db.query("DROP TABLE ??", val, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.get("/table-data/:tableName", (req, res) => {
  const tableName = req.params.tableName;

  const sql = `SELECT * FROM ${tableName}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.delete("/move/:tableName/:id", (req, res) => {
  const tableName = req.params.tableName;
  const id = req.params.id;

  const selectSql = `SELECT * FROM ${tableName} WHERE id = ?`;
  const deleteSql = `DELETE FROM ${tableName} WHERE id = ?`;
  const insertSql = `INSERT INTO corbeille (nom, description, image, taille, prix, categorie) VALUES (?,?,?,?,?,?)`;

  db.query(selectSql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(`Erreur lors de la récupération`);
    } else {
      const data = result[0]; 

      db.query(deleteSql, [id], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Erreur lors de la suppression`);
        } else {
          db.query(insertSql, [data.nom, data.description, data.image, data.taille, data.prix, data.categorie], (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send(`Erreur lors du déplacement`);
            } else {
              res.send(`Donnée avec l'ID ${id} déplacée avec succès vers la corbeille`);
            }
          });
        }
      });
    }
  });
});



app.put("/table-data/update/:tableName/:id", (req, res) => {
  const id = req.params.id;
  const { nom, description, prix, image, taille} = req.body;
  const tableName = req.params.tableName;
 db.query(
    `UPDATE ${tableName} SET nom = ?, description = ?, prix = ?, image = ?, taille = ?  WHERE id = ?`,
    [nom, description, prix, image, taille, id],
    (err, result) => {
      if (err) {
        console.error("Error", err);
        
      } else {
       res.send(result);
      }
    }
  );
});

app.get("/table-data/:tableName/:id", (req, res) => {
  const tableName = req.params.tableName;
  const id = req.params.id;

  const sql = `SELECT * FROM ${tableName} WHERE id = ?`;

  db.query(sql,id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post("/add-data/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  const { nom, description, image, taille, prix, categorie } = req.body;

  const sql = `INSERT INTO ${tableName} (nom, description, image, taille, prix, categorie) VALUES (?,?,?, ?, ?,?)`;
  const values = [nom, description, image, taille, prix, categorie];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur");
    } else {
      res.send("Données");
    }
  });
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/corbeille-data', (req, res) => {
  const sql = 'SELECT * FROM corbeille';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors du chargement des données de la corbeille');
    } else {
      res.send(result);
    }
  });
});

app.post('/restore-from-corbeille/:tableName/:id', (req, res) => {
  const tableName = req.params.tableName;
  const id = req.params.id;
  const selectSql = 'SELECT * FROM corbeille WHERE id = ?';
  const insertSql = `INSERT INTO ${tableName} (nom, description, image, taille, prix, categorie) VALUES (?,?,?,?,?,?)`;


  db.query(selectSql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(`Erreur lors de la récupération`);
    } else {
      const data = result[0];

      db.query(insertSql, [data.nom, data.description, data.image, data.taille, data.prix, data.categorie], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Erreur lors de la restauration`);
        } else {
          db.query('DELETE FROM corbeille WHERE id = ?', [id], (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send(`Erreur lors de la suppression`);
            } else {
              res.send(`Donnée avec l'ID ${id} restaurée avec succès`);
            }
          });
        }
      });
    }
  });
});


app.delete("/delete-from-corbeille/:id", (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM corbeille WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(`Erreur lors de la suppression`);
    } else {
      res.send(`supprimée de la corbeille avec succès`);
    }
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  
  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(401).json({ message: 'Email not found' });
      } else {
        const user = results[0];
        if (password === user.password) {
         
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Password is incorrect' });
        }
      }
    }
  );
});




app.listen(3012, () => {
  console.log("Yey, your server is running");
});