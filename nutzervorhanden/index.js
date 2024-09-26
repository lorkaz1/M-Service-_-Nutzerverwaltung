const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3006;

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

app.post('/nutzervorhanden', async (req, res) => {
    const { name } = req.body;

    if(!name) {
        return res.status(400).json({error: "Ein Nutzername muss übergeben werden!"});

    }

    try{
        const collection = db.collection('Nutzer');

        const nutzer = await collection.findOne({ name });
        if(nutzer) {
            return res.status(200).json({ message: 'yes' });
        }
        else{
            return res.status(204).json({ message: 'false' });
        }
    }

    catch (err) {
        console.error('Fehler mit der Überprüfung des Nutzers (DB - zugriff fehlgeschlagen [2])!');
        return res.status(500).json({ error: 'Fehler! Datenbank zugriff Fehlegeschlagen [2]'});
    }
    
});


app.get('/', (req, res) => {
    res.send('Hi Vorhanden');
});

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});