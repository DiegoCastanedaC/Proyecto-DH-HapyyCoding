const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../data/userDataBase.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const { validationResult } = require("express-validator");

const userController={


    // MUSTRA PAGINA LOGIN
    index:(req,res)=>{
        return res.render("login")
    },

    // CREAMOS NUEVO PRODUCTO
    create:(req,res)=>{
      let errors=validationResult(req) //CODIGO NECESARIO PARA VALIDAR LOS ERRORES DE EXPRESS VALIDATOR
      // COMPARADOR PARA VERIFICAR SI TENEMOS ERRORES EN EL LOGIN
      if(errors.isEmpty()){
        const {username1,email1, pass1, pass2}=req.body
       const nuevouser={
         id: users.length,
         username:username1,
         email:email1,
         pass1:pass1,
         pass2:pass2,
       }

       console.log(nuevouser)

       users.push(nuevouser)
       fs.writeFile(userFilePath, JSON.stringify(users, null, ' '),(err)=>{
        if (err) {
            console.log("Fallo en la creación del usuario");
          } else {
            console.log("Usuario creado exitosamente");
          }
        });
         res.redirect("/");
      }
      else{
        let validador =1
        return res.render("login",{errors:errors.errors, validador})
      }
    },


    // LOGUEAMOS AL USUARIO
    login:(req,res)=>{

      let errors=validationResult(req) //CODIGO NECESARIO PARA VALIDAR LOS ERRORES DE EXPRESS VALIDATOR
      // COMPARADOR PARA VERIFICAR SI TENEMOS ERRORES EN EL LOGIN
      if(errors.isEmpty()){
      }
      else{
        let validador =1
        return res.render("login",{errors:errors.errors, validador})
      }
    },


    // EDITAMOS AL USUARIO
    edit: (req, res) => {
      let id = req.params.id
      let productToEdit = users.find(product => product.id == id)

      res.render('productEdit', {productToEdit})
    },

    update: (req, res) => {
      
      let id = req.params.id;
      console.log(req.body.name)
		  let productToEdit = users.find(product => product.id == id)

      let image

      if(req.files[0] != undefined){
      	image = req.files[0].filename
      } else {
      	image = productToEdit.image
      }

      productToEdit = {
        id: productToEdit.id,
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        description:req.body.description,
        image: req.file ? req.file.filename : productToEdit.image
      };

      let newusers = users.map(product => {
        if (product.id == productToEdit.id) {
          return product = {...productToEdit};
        }
        return product;
      })
  
      fs.writeFileSync(userFilePath, JSON.stringify(newusers, null, ' '));
      res.redirect('/');

    }, 

    detail:(req,res)=>{

      console.log("entra a detail")
      let id = req.params.id
      console.log(id)
      let product = users.find(product => product.id == id)
      console.log(product)
      res.render('productDetail.ejs', {product})
    },
    
    delete:(req,res)=>{
        let id = req.params.id;
        let finalusers = users.filter(product => product.id != id);
        fs.writeFileSync(userFilePath, JSON.stringify(finalusers, null, ' '));
        res.redirect('/');
    },


}

module.exports=userController