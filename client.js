try {
    const fetchPromise = fetch('http://localhost:5000/api/albums', { // mode: 'cors', is set as default but can be changed to change the request moed
        method: 'GET',
    })
    fetchPromise.then(response => { // response message 
        return response.json();
    }).then(albums => { // the body of the fetch 
        console.log(albums);
        const tbl = document.createElement("table");
        const tblBody = document.createElement("tbody");
        for (const album of albums) {
            data = Object.values(album)
            const row = document.createElement("tr");
            for (const value of data) {
                const cell = document.createElement("td");
                const cellText = document.createTextNode(value);
                cell.appendChild(cellText);
                row.appendChild(cell);
                tblBody.appendChild(row);
            }
            row.setAttribute("id", album._id)
        }
        tbl.appendChild(tblBody);
        document.body.appendChild(tbl);
    });   
} catch (error) {
    console.log(error);
}