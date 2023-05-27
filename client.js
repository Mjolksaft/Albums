const apiUrl = "http://localhost:5000/api/albums";

function fetchAlbums() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(albums => displayAlbums(albums))
        .catch(error => console.log(error));
}

function displayAlbums(albums) {
    const table = document.getElementById("albumTable");
    const tableBody = document.createElement("tbody");

    const tableHeaders = ["Title", "Artist", "Year"];

    const headerRow = document.createElement("tr");
    for (const tableHeader of tableHeaders) {
        const th = document.createElement("th");
        th.textContent = tableHeader;
        headerRow.appendChild(th);
    }
    tableBody.appendChild(headerRow);

    for (const album of albums) {
        const albumRow = document.createElement("tr");
        const albumData = [album.title, album.artist, album.year];

        for (const albumValue of albumData) {
            const td = document.createElement("td");
            td.textContent = albumValue;
            albumRow.appendChild(td);
        }

        const deleteButton = createButton("Delete", "deleteAlbum");
        const updateButton = createButton("Update", "updateAlbum");
        const detailsButton = createButton("Details", "details");

        albumRow.appendChild(deleteButton);
        albumRow.appendChild(updateButton);
        albumRow.appendChild(detailsButton);
        albumRow.setAttribute("id", album._id);

        tableBody.appendChild(albumRow);
    }

    table.appendChild(tableBody);
}

function createButton(text, onclickFunction) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", () => window[onclickFunction](button));
    return button;
}

function deleteAlbum(button) {
    const albumRow = button.parentNode;
    const albumId = albumRow.getAttribute("id");
    const confirmation = confirm("You are about to delete an album");

    if (confirmation) {
        albumRow.remove();

        fetch(`${apiUrl}/${albumId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        }).catch(error => console.log(error));
    }
}

function updateAlbum(button) {
    const albumRow = button.parentNode;
    const albumId = albumRow.getAttribute("id");

    const title = prompt("Enter new title");
    const artist = prompt("Enter new artist");
    const year = prompt("Enter new year");

    const data = { title, artist, year };

    fetch(`${apiUrl}/${albumId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error));
}

function details(button) {
    const albumRow = button.parentNode;
    const albumId = albumRow.getAttribute("id");


    console.log(albumId);
    fetch(`${apiUrl}/${albumId}`, {
        method: "GET"
    })
    .then(response => response.json())
    .then(album => confirm(`${album[0].title + " " + album[0].artist + " " + album[0].year}`))
    .catch(error => console.log(error));
}

function addAlbum() {
    const title = prompt("Enter album title");
    const artist = prompt("Enter artist");
    const year = prompt("Enter year");
    const data = { title, artist, year };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error));
}

fetchAlbums();