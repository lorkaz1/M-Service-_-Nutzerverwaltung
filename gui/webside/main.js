//Hauptmethoden
function erstellen(){
    waiting();

    const name = document.getElementById('txtName').value;
    const password = document.getElementById('txtPassword').value;
    
    try{eingabePruefung();} 
    catch (error) {return;}
    

    fetch('http://localhost:3001/nutzererstellen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            passwort: password
        })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("lblAntwort").textContent = "Hat funktioniert!";
            return response.json();
        }
        else {
            return response.json().then(err => {
                document.getElementById("lblAntwort").textContent = `Hat nicht funktioniert: ${err.message}`;
                throw new Error(err.message);
            });
        }
    })
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error: ', error);
        document.getElementById("lblAntwort").textContent = "Hat nicht funktioniert!";
    })

    textfelderLeeren();
}
function loeschen(){
    waiting();

    const name = document.getElementById('txtName').value;
    const password = document.getElementById('txtPassword').value;

    try{eingabePruefung();} 
    catch (error) {return;}

    fetch('http://localhost:3001/nutzerloeschen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            passwort: password
        
        })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("lblAntwort").textContent = "Hat funktioniert!";
            return response.json();
        }
        else {
            return response.json().then(err => {
                document.getElementById("lblAntwort").textContent = `Hat nicht funktioniert: ${err.message}`;
                throw new Error(err.message);
            });
        }
    })
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error: ', error);
        document.getElementById("lblAntwort").textContent = "Hat nicht funktioniert!";
    })

    textfelderLeeren();
}



//Hilfsmethoden
function waiting() {
    document.getElementById("lblAntwort").textContent = "Anfrage in bearbeitung ... "
}

function textfelderLeeren(){
    document.getElementById('txtName').value = "";
    document.getElementById('txtPassword').value = "";
}

function eingabePruefung(){
    if (document.getElementById('txtPassword').value === "" || document.getElementById('txtName').value === ""){
        document.getElementById("lblAntwort").textContent = "Bitte ein Name und Passwort eingeben!"
        throw new Error("Passwort fehlt!")
        return; 
    }
}


