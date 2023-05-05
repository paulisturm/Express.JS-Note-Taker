const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const notes = require('./db/db.json')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

  app.get('/api/notes', (req, res) => {
    res.status(200).json(notes);
  });
//app.get add read from file
  app.post('/api/notes', (req, res) => {
 //app.post add read from file, append data, rewrite   
    const {title, text} = req.body;

    if (title && text) {

        const newTask = {
            title,
            text,
        };
    
         const reviewString = JSON.stringify(newTask);

        fs.writeFile('./db/db.json', reviewString, (err) => 
        err
        ? console.error(err)
        : console.log(
            `New Note Created Succesfully`
          )
        );
        const response = {
            status: 'success',
            body: newReview,
          };
      
          console.log(response);
          res.status(201).json(response);
        } else {
            res.status(500).json('Error in posting task');
        }
    
  });