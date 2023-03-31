var allAlbums = []

try {
    const fetchPromise = fetch('http://localhost:5000/api/albums', {
        method: 'GET',
    })
    fetchPromise.then(response => { // response message 
        return response.json();
    })
    .then(albums => { // the body of the fetch 
        allAlbums = albums

        const tbl = document.getElementById("albumTable");
        const tblBody = document.createElement("tbody");
        const row = document.createElement("tr")
        
        var data = { title: null, artist: null, year: null} // so we can iterate over the data we want to display 
        const tableHeaders = Object.keys(data)
        for (const tableHead of tableHeaders) {
            const cell = document.createElement("th")
            const cellText = document.createTextNode(tableHead);
            
            cell.appendChild(cellText);
            row.appendChild(cell);
            tblBody.appendChild(row);
        }
        for (const album of albums) {
            data = { title: album.title, artist: album.artist, year: album.year} // so we can iterate over the data we want to display 
            data = Object.values(data)
            
            const row = document.createElement("tr");
            
            for (const value of data) {
                const cell = document.createElement("td");
                const cellText = document.createTextNode(value);
                
                cell.appendChild(cellText);
                row.appendChild(cell);
                tblBody.appendChild(row);
            }
            deleteButton = document.createElement("button")
            deleteButton.innerText = "Delete"
            deleteButton.setAttribute("id", "delete")
            deleteButton.setAttribute("onclick", 'deleteAlbum(this)')
            
            updateButton = document.createElement("button")
            updateButton.innerText = "Update"
            updateButton.setAttribute("id", "update")
            updateButton.setAttribute("onclick", 'updateAlbum(this)')
            
            detailsButton = document.createElement("button")
            detailsButton.innerText = "Details"
            detailsButton.setAttribute("id", "details")
            detailsButton.setAttribute("onclick", 'details()')
            
            row.appendChild(deleteButton)
            row.appendChild(updateButton)
            row.appendChild(detailsButton)
            row.setAttribute("id", album._id)
        }
        tbl.appendChild(tblBody);
        document.body.appendChild(tbl);
    });   
} catch (error) {
    console.log(error);
}

function deleteAlbum(element) {  // gets the parent node and deletes it 
    const parent = element.parentNode;
    parent.remove()
    console.log("hello update ");
    try {
        const parent = element.parentNode
        parentId = parent.id 
        fetch(`http://localhost:5000/api/albums/${parentId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (error) {
        console.log(error);
    }
}

function updateAlbum(element) {
    const title = titleText.value
    var artist = artistText.value
    var year = yearText.value
    const data = {title: title, artist: artist, year: year}
    try {
        const parent = element.parentNode
        parentId = parent.id 
        fetch(`http://localhost:5000/api/albums/${parentId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error);
    }
}

function details() {
    const title = titleText.value
    if(title == "") {
        return
    }
    else {
        fetch(`http://localhost:5000/api/albums/${title}`, {
            method: "GET", 
        })
        .then(response => {
            return response.json()
        })
        .then(album => {
            console.log(album);
        })
    }
}

function addAlbum(){
    const title = titleText.value
    var artist = artistText.value
    var year = yearText.value
    const data = {title: title, artist: artist, year: year}

    fetch(`http://localhost:5000/api/albums`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    dataValues = Object.values(data)
}