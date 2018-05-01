var express = require('express');
var app = express();
app.use(express.static('./MantenimientoTPI-web'))

app.listen(3000, ()=>
    console.log('servidor iniciado')
);
