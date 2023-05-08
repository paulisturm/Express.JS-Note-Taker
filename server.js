const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const notes = require('./db/db.json')


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// localhost:3001/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

  app.get('/api/notes', (req, res) => {
    const currentNotes = JSON.parse(fs.readFileSync('./db/db.json'));
    console.log(currentNotes)
    res.status(200).json(currentNotes);
  });
//app.get add read from file
  app.post('/api/notes', (req, res) => {
 //app.post add read from file, append data, rewrite   
 const oldNotes = JSON.parse(fs.readFileSync('./db/db.json'));
 
    const {title, text} = req.body;

    if (title && text) {

        const newTask = {
            title: title,
            text: text,
        };
    oldNotes.push(newTask);
         const reviewString = JSON.stringify(oldNotes);

        fs.writeFile('./db/db.json', reviewString, (err) => 
        err
        ? console.error(err)
        : console.log(
            `New Note Created Succesfully`
          )
        );
        const response = {
            status: 'success',
            body: newTask,
          };
      
          console.log(response);
          res.status(201).json(response);
        } else {
            res.status(500).json('Error in posting task');
        }
    
  });

  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
