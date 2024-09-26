const express = require('express');
const { MongoClient } = require('mongodb');
const axios = require('axios');

const app = express();
const port = 3007;

app.use(express.json());

const client = new MongoClient('mongodb://root:password@Nutzer-DB:27017');
let db;

async function connectToDB() {
    try{
        await client.connect();
        db = client.db('Nutzerverwaltung');
        console.log("Verbindung erstellt!");
    }

    catch (err) {
        console.error('Verbindung zur Datenbank konnte nicht hergestellt werden! [1]', err);
    }
}

connectToDB();


app.post('/nutzererstellen', async (req, res) => {
    const { nutzer_id, name, passwort } = req.body;
    if(!nutzer_id) {
        return res.status(400).json({error: "Eine Nutzer ID muss übergeben werden!"});

    }
    if(!name) {
        return res.status(400).json({error: "Ein Nutzername muss übergeben werden!"});

    }
    if(!passwort) {
        return res.status(400).json({error: "Ein Passwort muss übergeben werden!"});

    }
    try {
        const response = await axios.post('http://nutzervorhanden:3006/nutzervorhanden', { name });
        const message = response.data.message;
        if(message === "yes") {
            console.log(1);
            return res.status(404).json({ message: 'Bereits vorhanden!' });
        }
        
            
        const result = await db.collection('Nutzer').insertOne({nutzer_id, name, passwort});
        return res.status(201).json({message: "Hat funktioniert"});
        
    }

    catch (error) {
        console.error("Fehler bei der Anfrage:", error.message);
        return res.status(500).send("Interner Serverfehler");
    }
});

app.get('/', (req, res) => {
    res.send('Hi Erstellen');
});

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});
