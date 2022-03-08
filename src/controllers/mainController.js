const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const mainController={

    // MOSTRAR PAGINA HOME
    home: (req,res)=>{
        return res.render("home")
    },

    // MOSTRAR PAGINA TSHIRTS
    tshirts: (req,res)=>{
        return res.render("tshirts", {products})
        // return res.render("tshirts")
    },

    // MOSTRAR PAGINA SOCKS
    socks: (req,res)=>{
        return res.render("socks", {products})
    },

    // MOSTRAR PAGINA BAGS
    bags: (req,res)=>{
        return res.render("bags", {products})
    },

    // MOSTRART PAGINA HODDIES
    hoodies: (req,res)=>{
        return res.render("hoodies", {products})
    },

    // MOSTRAR PAGINA HATS
    hats: (req,res)=>{
        return res.render("hats", {products})
    },

    // BARRA DE BUSQUEDA
    search:(req,res)=>{
        // let busquedaDeUsuario=req.query.query
        // res.send(busquedaDeUsuario)
    },


    // MOSTRAR PAGINA LOGIN 
    login:(req,res)=>{
        return res.render("login")
    },
}

module.exports=mainController