// Importar a depêndencia do sqlite3
const sqlite3 = require('sqlite3').verbose();

// Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db');

/* node src/database/db.js  Somente uma vez para criarmos o banco */


// Chamamos de método todos as funções que se encontram dentro de um objeto

module.exports = db;

/* db.serialize(() => {

    // Com comandos SQL vamos:

    // 1° Criar tabelas
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    
    // 2° Inserir dados na tabela
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
        "https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "Paperside",
        "Guilherme Gembala, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log('Cadastrado com sucesso')
        console.log(this)
    }

    // db.run(query, values, afterInsertData)    

    // 3° Consultar dados de uma tabela

  /*  db.all('SELECT name FROM places', function(err, rows){
        if(err){
            return console.log(err)
        }

        console.log('Aqui estão os seus registros:')
        console.log(rows)
    }) */

    // 4° Deletar um dado da tabela

   /* db.run('DELETE FROM places WHERE id = ?', [1], function(err){
        if(err){
            return console.log(err)
        }

        console.log('Registro deletado com sucesso:')
        console.log(this)
    }) */
// }) 

