mongosh "mongodb://root:password@localhost:27017"


Mit docker-compose up --build wird dieser Dockercontainer erstellt und gestartet

curl -X POST http://localhost:3006/nutzervorhanden -H "Content-Type: application/json" -d '{"name": "Hans"}'



curl -X POST http://localhost:3007/nutzererstellen -H "Content-Type: application/json" -d '{ "nutzer_id":  "1001", "name": "Hans", "passwort": "Hi"}'


curl -X POST http://localhost:3007/nutzererstellen \
-H "Content-Type: application/json" \
-d '{"nutzer_id": "1001", "name": "Hans", "passwort": "Hi"}'


curl -X POST http://localhost:3008/nutzerloeschen -H "Content-Type: application/json" -d '{"nutzer_id": "1001", "name": "Hans", "passwort": "Hi"}'