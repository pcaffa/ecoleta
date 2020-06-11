const express = require("express")
const server = express() //executando o express

//pegar o banco de dados
//essa constante está recebendo o export do arquivo db.js
const db = require("./database/db.js")

//configurar pastas publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação
//pagina inicial
//req: requisição/pedido
//res: respostas
server.get("/", (req, res) => {
   return res.render("index.html", { title: "Um título" })
})

server.get("/create-point", (req, res) => {

    //req.query: Query Strings da nossa url
    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: o corpo do formulario
    //console.log(req.body)

    //inserir dados no banco de dados
    const query = `
        INSERT INT places (
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.render("create-point.html", {error: true})
            //res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }
    
    //afterInsertData executa só depois da query, values
    //afterInsertData(err) executa ao mesmo tempo, e não queremos isso 
    db.run(query, values, afterInsertData)
    
})



server.get("/search", (req, res) => {

    const search = req.query.search
    if(search == "") {
        //pesquida vazia
        return res.render("search-results.html", { total: 0})
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        //total de linhas da tabela parece ser usado no titulo de x pontos encontrados
        const total = rows.length

        //console.log("Aqui estão seus registros: ")
        //console.log(rows)
        
        //enivar os dados para o arquivo
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    }) 
   
})

/*sem o nujunks
server.get("/search-results", (req, res) => {
    res.sendFile(__dirname + "/views/search-results.html")
})*/

//Ligar o servidor
server.listen(3000)