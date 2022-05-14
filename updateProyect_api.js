const fetch = require('node-fetch')

const request = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        "id": 6,
        "title": "JUEGOS DE TRONO",
        "link": "www.google.com",
        "logo": "PB",
        "img": "soy la imagen",
        "tec": "React, Node"
    }),
    redirect:"folow"
};


fetch(`http://localhost:3002/proyects`, request)
.then(response => response.text())
.then(data => console.log(data))
.catch(err => console.error(err))