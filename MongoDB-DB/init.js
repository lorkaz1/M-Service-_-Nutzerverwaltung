db = db.getSiblingDB("Nutzerverwaltung");
db.Nutzer.insertMany(
    [
        {
            nutzer_id:  1001,
            name:       "Hans",
            passwort:   "Hi"
        },
        {
            nutzer_id:  1002,
            name:       "Renate",
            passwort:   "asdsdsdgasdg"
        },
        {
            nutzer_id:  1003,
            name:       "Otto",
            passwort:   "ssdfa"
        }
    ]
)
