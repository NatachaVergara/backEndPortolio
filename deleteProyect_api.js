const fetch = require('node-fetch')

const request = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        "id": 7      
    }),
    redirect:"folow"
};


fetch(`http://localhost:3002/proyects`, request)
.then(response => response.text())
.then(data => console.log(data))
.catch(err => console.error(err))