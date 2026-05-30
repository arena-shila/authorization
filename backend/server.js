let MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const PORT = process.env.PORT || 3000;
let URL = process.env.DB_URL;
let http = require("http");

let server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Specify allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Correct header name
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }
  if (req.url == "/signup" && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      console.log(chunk.toString());
      body += chunk.toString();
    });
    req.on("end", async () => {
      body = JSON.parse(body);
      console.log(body);
      let con = await MongoClient.connect(URL);
      let dbo = await con.db("student");
      let result = await dbo
        .collection("stdata")
        .findOne({ email: body.email });
      if (result) {
        console.log("email already exists");
        res.end(
          JSON.stringify({ success: false, msg: "email already exists" }),
        );
      } else {
        result = await dbo.collection("stdata").insertOne(body);
        console.log(result);
        console.log("email not exists");
        res.end(
          JSON.stringify({ success: true, msg: "register successfully" }),
        );
      }
    });
  } else if (req.url == "/signin" && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      console.log(chunk.toString());
      body += chunk.toString();
    });
    req.on("end", async () => {
      body = JSON.parse(body);
      console.log("body", body);

      let con = await MongoClient.connect(URL);
      let dbo = await con.db("student");

      let user = await dbo.collection("stdata").findOne({
        email: body.email,
        password: body.password,
      });
      console.log("user", user);

      if (user) {
        res.end(
          JSON.stringify({
            success: true,
            msg: "Login successfull",
            user: { name: user.name, email: user.email },
          }),
        );
        // res.end(
        //   JSON.stringify({
        //     success: true,
        //     msg: "Login successfull",
        //     user: { name: user.name, email: user.email },
        //   })
        // );
      } else {
        res.end(JSON.stringify({ success: false, msg: "invalid user" }));
      }
    });
  } else if (req.url == "/contact" && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      console.log(chunk.toString());
    });
    req.on("end", async () => {
      body = JSON.parse(body);
      console.log(body);

      let connection = await MongoClient.connect(URL);
      let dbo = await connection.db("CreateContact");
      let user = await dbo.collection("Contact").insertOne(body);
      // let user = await dbo.collection("Contact").insertOne({
      //   name: body.name,
      //   email: body.email,
      //   phone: body.phone,
      //   note: body.note,
      // });
      console.log(user);

      res.end(
        JSON.stringify({
          success: true,
          msg: "contect saved",
        }),
      );
    });

    // } else if (req.URL == "/View" && req.method == "GET") {
    //   let body = "";
    //   req.on ("data", (chunk) =>{
    //     console.log(chunk.toString());
    //     body += chunk.toString();

    //   });

    //   req.on("end", async() => {
    //     body = JSON.parse(body);
    //     console.log(body);

    //     let  con = await MongoClient.connect(URL);
    //     let dbo = await con.db("CreateContact");

    //     let user = await dbo.collection("contect").findOne({}).toArray();
    //     // console.log(user);
    //     await connection.close();
    //    res.end(JSON.stringify({ success: true, data }));
    //   }) catch (err) {
    //     res.end(JSON.stringify({ success: false, msg: "error fetching data" }));
    //   }
    // }
  }
  // else if (req.url == "/view" && req.method == "GET") {
  //   // console.log(req);

  //   MongoClient.connect(URL).then((con) => {
  //     const dbo = con.db("CreateContact");

  //     dbo
  //       .collection("Contact")
  //       .find({})
  //       .toArray()
  //       .then((users) => {
  //         con.close();

  //         res.end(
  //           JSON.stringify({
  //             success: true,
  //             data: users,
  //           }),
  //         );
  //       });
  //   });
  // }
  else if (req.url == "/view" && req.method == "POST") {
    // console.log(req);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      console.log(chunk.toString());
    });
    req.on("end", async () => {
      body = JSON.parse(body);
      console.log("bodyvlue: ", body);

      let connection = await MongoClient.connect(URL);
      let dbo = await connection.db("CreateContact");
      let cusers = await dbo
        .collection("Contact")
        .find({ guseremail: body.email })
        .toArray();
      console.log(cusers);

      res.end(JSON.stringify({ data: cusers }));
    });
    // MongoClient.connect(URL).then((con) => {
    //   const dbo = con.db("CreateContact");

    //   dbo
    //     .collection("Contact")
    //     .find({})
    //     .toArray()
    //     .then((users) => {
    //       con.close();

    //       res.end(
    //         JSON.stringify({
    //           success: true,
    //           data: users,
    //         }),
    //       );
    //     });
    // });
  } else {
    res.end(JSON.stringify({ msg: "server is running..." }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
