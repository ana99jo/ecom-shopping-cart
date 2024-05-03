import express from "express"
import mysql2 from "mysql2"
import cors from "cors"
import mongoose from "mongoose"

import User from './models/userModel.js'
import Category from './models/categoryModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import OrderItem from './models/orderItemModel.js'

 const URI="mongodb+srv://ana:passpass123@prodajabeletehnike.6kyczbf.mongodb.net/Shop?retryWrites=true&w=majority"

//mongodb+srv://ana:<password>@prodajabeletehnike.6kyczbf.mongodb.net/
//Shop
//ana
//passpass123


const app = express()


app.use(express.json())
app.use(cors(
))



app.get("/", (req, res) => {
  res.json("hello, this is backend")
})


//PRODUCTS

app.post('/products', async(req, res) => {
  try{
    const product= await Product.create(req.body)
    res.status(200).json(product)

  }catch(err){
    console.log(err)
    res.status(500)
  }
});


app.get('/products',async(req,res)=>{
  try{
    const products= await Product.find({})
    res.status(200).json(products)

  } catch(err){
    res.status(500)
  }
})


app.get("/products/:id", async(req, res) => {
  try{
  const {id} = req.params;
  const product = await Product.findById(id)
  res.status(200).json(product)
  } catch (err) {
      res.status(500)
  }
})

app.put("/update/:id", async(req, res) => {
  try{
  const {id} = req.params;
  const product = await Product.findByIdAndUpdate(id,req.body)
  if(!product){
    return res.status(404)
  }
  res.status(200).json(product)
  } catch (err) {
      res.status(500)
  }
})

app.delete("/delete/:id", async(req, res) => {
  try{
  const {id} = req.params;
  const product = await Product.findByIdAndDelete(id,req.body)
  if(!product){
    return res.status(404)
  }
  res.status(200).json(product)
  } catch (err) {
      res.status(500)
  }
})

//LOGIN&REGISTER

app.post('/register', async(req, res) => {
  try{
    const user= await User.create(req.body)
    res.status(200).json(user)

  }catch(err){
    console.log(err)
    res.status(500)
  }
});

app.post('/login', async (req, res) => {
  try {
    const { korisnicko_ime, lozinka } = req.body;
    const user = await User.findOne({ korisnicko_ime, lozinka });
    if (!user) {
      return res.status(401);
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

//get users data
app.get("/user/:id", async(req, res) => {
  try{
  const {id} = req.params;
  const user = await User.findById(id)
  res.status(200).json(user)
  } catch (err) {
      res.status(500)
  }
})

// CART AND ORDERS



app.post('/cart', async(req, res) => {
  try{
    const cart= await Order.create(req.body)
    res.status(200).json(cart)

  }catch(err){
    console.log(err)
    res.status(500)
  }
});

app.post('/cartItems', async(req, res) => {
  try{
    const cart= await OrderItem.create(req.body)
    res.status(200).json(cart)

  }catch(err){
    console.log(err)
    res.status(500)
  }
});


app.post("/category", async(req, res) => {
  try{
    const category= await Category.create(req.body)
    res.status(200).json(category)

  }catch(err){
    console.log(err)
    res.status(500)
  }
});


app.get('/category',async(req,res)=>{
  try{
    const category= await Category.find({})
    res.status(200).json(category)

  } catch(err){
    res.status(500)
  }
})



mongoose.connect(URI).then(()=>{
  console.log("Connected to MongoDB")
  app.listen(8000, () => {
    console.log("Connected to backend!")
  })
}).catch((err)=>{
  console.log(err)
})



//MYSQL

// app.post("/category", (req, res) => {
//   const q = "INSERT INTO kategorije (`naziv`) VALUES (?)";
//   const value = req.body.naziv;
//   db.query(q, [value], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("Kategorija uspješno dodana!");
//   });
// });


//MYSQL
// app.post('/register', (req, res) => {
//   const q =
//     "INSERT INTO korisnici (ime, prezime, adresa, email, korisnicko_ime, lozinka,tip) VALUES (?, ?, ?, ?, ?, ?,?)";
//   const values = [
//     req.body.ime,
//     req.body.prezime,
//     req.body.adresa,
//     req.body.email,
//     req.body.korisnicko_ime,
//     req.body.lozinka,
//     req.body.tip
//   ];
//   db.query(q, values, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

//MYSQL

// app.get("/products/:id", (req, res) => {
//   const productId = req.params.id;
//   const q = "SELECT * from proizvodi WHERE id_proizvod=?"
//   db.query(q, [productId], (err, data) => {
//     if (err) return res.json(err)
//     return res.json(data)
//   })
// })

//MYSQL
// app.get("/products", (req, res) => {
//   const q = "SELECT * from proizvodi"
//   db.query(q, (err, data) => {
//     if (err) return res.json(err)
//     return res.json(data)
//   })
// })
//MYSQL
// app.post("/products", (req, res) => {
//   const q =
//     "INSERT INTO proizvodi (naziv, opis, cena, dostupna_kolicina, slika, id_kategorija) VALUES (?, ?, ?, ?, ?, ?)";
//   const values = [
//     req.body.naziv,
//     req.body.opis,
//     req.body.cena,
//     req.body.dostupna_kolicina,
//     req.body.slika,
//     req.body.id_kategorija,
//   ];
//   db.query(q, values, (err, data) => {
//     if (err) return res.json(err);
//     return res.json("Proizvod uspesno dodat!");
//   });
// });
//app.put('/update/:id', (req, res) => {
  //   const productId = req.params.id;
  //   const q = "UPDATE proizvodi SET `naziv`= ?, `opis`= ?, `cena`= ?, `dostupna_kolicina`= ?, `slika`= ?, `id_kategorija`= ? WHERE id_proizvod = ?"
  //   const values = [
  //     req.body.naziv,
  //     req.body.opis,
  //     req.body.cena,
  //     req.body.dostupna_kolicina,
  //     req.body.slika,
  //     req.body.id_kategorija,
  //   ];
  
  //   db.query(q, [...values, productId], (err, data) => {
  //     if (err) return res.json(err);
  //     return res.json("Proizvod uspesno izmenejen!");
  //   });
  // })


// app.delete('/delete/:id', (req, res) => {

//   const productId = req.params.id;
//   const q = "DELETE FROM proizvodi WHERE id_proizvod =?"

//   db.query(q, [productId], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("Proizvod uspesno izbrisan!");
//   });
// })

//app.post('/login', (req, res) => {
  //   const q = "SELECT * FROM korisnici WHERE korisnicko_ime= ? AND lozinka= ?"
  //   const value1 = [
  //     req.body.korisnicko_ime
  //   ];
  //   const value2 = [
  //     req.body.lozinka
  //   ]
  
  //   db.query(q, [value1, value2], (err, data) => {
  //     if (err) return res.json(err)
  //     return res.json(data)
  //   })
  // })
 // app.post("/cart", (req, res) => {
    //   const q = "INSERT INTO narudzbine(datum, id_korisnik) VALUES (?, ?)";
    //   const values = [
    //     req.body.datum,
    //     req.body.id_korisnik,
    //   ];
    //   db.query(q, values, (err, data) => {
    //     if (err) return res.json(err);
    //     return res.json(data);
    //   });
    // });


// app.post("/cartItems", (req, res) => {
//   const q = "INSERT INTO stavka_narudzbine (id_narudzbina, id_proizvod, kolicina, ukupna_cena) VALUES (?, ?, ?, ?)";
//   const values = [
//     req.body.id_narudzbina,
//     req.body.id_proizvod,
//     req.body.kolicina,
//     req.body.ukupna_cena,
//   ];
//   db.query(q, values, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });


// const db = mysql2.createConnection({
//   host: "localhost",
//   user: "ana",
//   password: "password",
//   database: "ProdajaBeleTehnike"
// })
