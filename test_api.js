const fetch = require('node-fetch')

const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        "title": "Juego de tronos",
        "link": "www.google.com",
        "logo": "PB",
        "img": "soy la imagen",
        "tec": "React, Node"
    }),
    redirect:"folow"
};


fetch(`https://nv-portfolio.herokuapp.com/proyects`, request)
.then(response => response.text())
.then(data => console.log(data))
.catch(err => console.error(err))