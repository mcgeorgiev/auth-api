// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bodyParser = require("body-parser");
// const uuidv4 = require("uuid/v4");
// const bcrypt = require("bcrypt");
// const graphqlHTTP = require("express-graphql");
//
// const schema = require("./schema");
//
// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//
// const knex = require("knex")({
//   client: "pg",
//   connection: "postgres://postgres:postgres@localhost:5432/my_db"
// });
//
// class User {
//   constructor(id, email, password) {
//     this.id = id;
//     this.email = email;
//     this.password = password;
//   }
// }
//
// class Id {
//   constructor() {
//     this.id = uuidv4();
//   }
//
//   public toString() {
//     return this.id;
//   }
// }
//
// class UserRepository {
//   public find(email) {
//
//   }
//     public create(email, password) {
//
//   }
// }
//
// app.post("/auth", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//
//   fieldsExist(email, password, res.sendStatus(400));
//
//   try {
//     const user = await knex("users").select("id", "password")
//       .where("email", email)
//       .first();
//
//     const match = await bcrypt.compareSync(password, user.password);
//     if (user && match) {
//       const token = jwt.sign({ user: user.id },
//         "secretkey123",
//         { expiresIn: "24h"
//         }
//       );
//       res.json({
//         success: true,
//         message: "Authentication successful!",
//         token
//       });
//     } else {
//       res.sendStatus(403);
//     }
//   } catch (err) {
//     res.sendStatus(500);
//   }
// });
//
// // create()
//
// // class User {
// //   constructor (email, password) {
// //     const user = await knex('users').select('id', 'email', 'password')
// //       .where('email', email)
// //       .first()
// //
// //   }
// // }
//
// const fieldsExist = (email, password, error) => {
//   if (email === undefined || password === undefined) { error(); }
// };
//
// const generateId = () => uuidv4();
//
// const hashPassword = (password) => bcrypt.hashSync(password, 10);
//
// app.post("/signup", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//
//   if (email === undefined || password === undefined) { res.sendStatus(400); }
//
//   try {
//     const user = await knex("users")
//       .select("email")
//       .where("email", email)
//       .first();
//     if (!user) {
//       await knex("users").insert({ id: generateId(), email, password: hashPassword(password) });
//       res.sendStatus(201);
//     } else {
//       res.sendStatus(409);
//     }
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });
//
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: true
//   })
// );
//
import app from "./resource/app";

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
