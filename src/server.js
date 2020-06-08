const express = require('express');
const server = express();


// Pegar o banco de dados
const db = require('./database/db');

// Configurar pasta publica
server.use(express.static('public'));


// Habilitando o request.body na nossa aplicação
server.use(express.urlencoded({ extends: true }))

// Usando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//Configurar caminhos da minha aplicação

server.get('/', (request, response) => {
    return response.render("index.html")
})


server.get('/create-point', (request, response) => {

    // request.query - Query strings da nossa URL
   // console.log(request.query)


    return response.render("create-point.html")
})

server.post('/savepoint', (request, response) => {
    // request.body - Corpo do nosso formulário
    // console.log(request.body);


    // Inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        request.body.image,
        request.body.name,
        request.body.address,
        request.body.address2,
        request.body.state,
        request.body.city,
        request.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return response.render('create-point.html', {error: true})
        }

        console.log('Cadastrado com sucesso')
        console.log(this)

        return response.render('create-point.html', { saved: true });
    }

     db.run(query, values, afterInsertData) 

  
})

server.get('/search-results', (request, response) => {

    const { search } = request.query;

    if(search == ""){
        return response.render("search-results.html", {  total: 0 })
    }


    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length;

        // Mostrar a página com os dados do database
        
         return response.render("search-results.html", { places: rows, total })
    }) 

})

// Ligar o servidor
server.listen(3000);