//importar a dependente do sqlite3
//verboso loga as msgs
const sqlite3 = require("sqlite3").verbose()

//criar o objeto  que irá fazer operações no banco de dados
/* 1º forma:
const db = {
    propriedade: "valor"
}*/
/*2º forma: usando constructor/classe*/
const db = new sqlite3.Database("./src/database/database.db")

//exportar o objeto db da linha acima
module.exports = db

//utilizar o objeto de banco de dados, para nossas operações
/*db.serialize(() => {
    //com comandos SQL eu vou:

    //1 criar uma tabela
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

    //2 inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        )
        VALUES(?,?,?,?,?,?,?);
    `

    const values = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }
    
    //afterInsertData executa só depois da query, values
    //afterInsertData(err) executa ao mesmo tempo, e não queremos isso 
    db.run(query, values, afterInsertData)


    //3 consultar os dados da tabela:
   /* db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })*/ 

    //4 deletar um dado da tabela
    //mudar id no array para o dado que quer deletar
    /*db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso   : ")
        console.log(this)
    })*/

    //5 atualizar um dado da tabela
    /*db.run(`UPDATE places SET city= "Rio do Sul"`, function(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Registro atualizado com sucesso   : ")
        console.log(this)
    })    / 

})*/
