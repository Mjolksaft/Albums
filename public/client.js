console.log("hello world");
// try {
//     const fetchPromise = fetch('http://localhost:5000/api/albums', {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//     fetchPromise.then(response => { // response message 
//         return response.json();
//     })
//     .then(albums => { // the body of the fetch 
//         const tbl = document.createElement("table");
//         const tblBody = document.createElement("tbody");
//         const row = document.createElement("tr")

//         var data = { title: null, artist: null, year: null} // so we can iterate over the data we want to display 
//         const tableHeaders = Object.keys(data)
//         for (const tableHead of tableHeaders) {
//             const cell = document.createElement("th")
//             const cellText = document.createTextNode(tableHead);
            
//             cell.appendChild(cellText);
//             row.appendChild(cell);
//             tblBody.appendChild(row);
//         }
//         for (const album of albums) {
//             data = { title: album.title, artist: album.artist, year: album.year} // so we can iterate over the data we want to display 
//             data = Object.values(data)

//             const row = document.createElement("tr");

//             for (const value of data) {
//                 const cell = document.createElement("td");
//                 const cellText = document.createTextNode(value);

//                 cell.appendChild(cellText);
//                 row.appendChild(cell);
//                 tblBody.appendChild(row);
//             }
//             const deleteButton = document.createElement("button")
//             deleteButton.innerText = "Delete"
//             const updateButton = document.createElement("button")
//             updateButton.innerText = "Update"
//             row.appendChild(deleteButton)
//             row.appendChild(updateButton)
//             row.setAttribute("id", album._id)
//         }
//         tbl.appendChild(tblBody);
//         document.body.appendChild(tbl);
//     });   
// } catch (error) {
//     console.log(error);
// }