const express = require('express');
const path = require('path');
const axios = require('axios');
const { randomInt } = require('crypto');


const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'webside')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/webside/main.html'));
});

app.post('/nutzerloeschen', async (req, res) => {
  const { name, passwort } = req.body;
  const nutzer_id = 900;
  if(!name  || !passwort) {
      return res.status(405).json({error: "Ein Name und Passwort muss übergeben werden!"});
  }

  try{
    const response = await axios.post('http://nutzerloeschen:3008/nutzerloeschen', { nutzer_id, name,  passwort});
    const message = response.data.message;
        if(message === 'Nicht vorhanden!' ) {
          return res.status(404).json({ message: 'Nicht vorhanden!' });
        }
  }
  catch (error) {
    console.error("Fehler bei der Anfrage:", error.message);
    return res.status(500).send("Interner Serverfehler");
  }
  return res.status(200).json({ message: 'Hat geklappt!'});
  
});

app.post('/nutzererstellen', async (req, res) => {
  const { name, passwort } = req.body;
  const nutzer_id = randomInt(9999);
  if(!name  || !passwort) {
      return res.status(405).json({error: "Ein Name und Passwort muss übergeben werden!"});
  }

  try{
    const response = await axios.post('http://nutzererstellen:3007/nutzererstellen', { nutzer_id, name,  passwort});
    const message = response.data.message;
        if(message === 'Bereits vorhanden!') {
          return res.status(404).json({ message: 'Bereits vorhanden!' });
        }
  }
  catch (error) {
    console.error("Fehler bei der Anfrage:", error.message);
    return res.status(500).send("Interner Serverfehler");
  }
  return res.status(200).json({ message: 'Hat geklappt!'});
});



app.listen(port, () => {
  console.log(`App läuft unter http://localhost:${port}`);
});
