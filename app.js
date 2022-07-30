const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

app.use("/resources", express.static("plublic"));
app.use("/resources", express.static(__dirname + "/public"));

app.set("view engine", "ejs");

const bcryptjs = require("bcryptjs");

const session = require("express-session");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const conection = require("./database/db");
const { query, application } = require("express");
const { connect } = require("./database/db");

// app.get('/', (req, res) => {
//     res.render('index');
// });

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const name = req.body.name;
  const app = req.body.app;
  const apm = req.body.apm;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // Encryptamos la contraseña
  let passwordHaash = await bcryptjs.hash(password, 8);
  // const query = `INSERT INTO usuarios(Name, APP, APM, username, Email, Pass) VALUES(${name},${app},${apm},${username},${email},${passwordHaash})`

  conection.query(
    "INSERT INTO usuarios SET ?",
    {
      Name: name,
      APP: app,
      APM: apm,
      username: username,
      Email: email,
      Pass: passwordHaash,
    },
    (err, result, faild) => {
      if (err) {
        res.render('error')
      } else {
        res.render("register", {
          alert: true,
          alertTitle: "Registration",
          alertMenssage: "¡Successful Registration!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "",
        });
      }
    }
  );
});

app.post("/authe", async (req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  console.log(user);

  let pass = bcryptjs.hash(password, 8);

  if (user && password) {
    conection.query(
      "SELECT * FROM usuarios WHERE username = ?",
      [user],
      async (err, result) => {
        if(err) {
          res.render('error')
        } else {
          if (
            result.length == 0 ||
            !(await bcryptjs.compare(password, result[0].Pass))
          ) {
            console.log("¡Usuario y/o password incorrecto!");
            res.render("login", {
              alert: true,
              alertTitle: "Error",
              alertMenssage: "¡Usuario y/o password incorrecto!",
              alertIcon: "error",
              showConfirmButton: true,
              timer: false,
              ruta: "login",
            });
          } else {
            console.log("Autenticación correcta");
            req.session.loggedin = true;
            req.session.name = result[0].name;
            res.render("login", {
              alert: true,
              alertTitle: "Conexión exitosa",
              alertMenssage: "¡Successful Login!",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 1500,
              ruta: "",
            });
          }
        }
      }
    );
  } else {
    res.send("Por favor ingrese un usuario y/o contraseña");
  }
});

app.get("/", (req, res) => {
  if (req.session.loggedin) {
    res.render("index", {
      login: true,
      name: req.session.name,
    });
  } else {
    res.render("index", {
      login: false,
      name: "Debe de iniciar sesión",
    });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("login");
  });
});

app.post("/newCita", (req, res) => {
  const mascota = req.body.mascota;
  const propietario = req.body.propietario;
  const telefono = req.body.telefono;
  const fecha = req.body.fecha;
  const hora = req.body.hora;
  const sintomas = req.body.sintomas;


    conection.query(
      `INSERT INTO citas(Nombre_Mascota,Propietario,Telefono,FechaCita,HoraCita,Sintomas) VALUES("${mascota}","${propietario}","${telefono}",'${fecha}','${hora}:00',"${sintomas}")`, (err, result) => {
        if(err) {
          res.render('error')
        } else {
          res.send({ resultado: "Succesul" });
        }
      });
});

app.get("/citas", (req, res) => {
  try {
    conection.query("SELECT * FROM citas", (error, result) => {
      if (error) {
        res.render('error')
      } else {
        res.send(result);
      }
    });
  } catch {
    console.log("error");
  }
});

app.post("/deletecitas", (req, res) => {
  const id = req.body.id;

  conection.query(
    `DELETE FROM citas WHERE citas.id_cita = ${id}`,
    (error, result) => {
      if (error) {
        res.render('error')
      } else {
        console.log("Eliminado");
        console.log(result);
        res.send({ Result: "Exito" });
      }
    }
  );
});

app.post("/updatecita", (req, res) => {
  const Nombre_Mascota = req.body.mascota;
  const Propietario = req.body.propietario;
  const Telefono = req.body.telefono;
  const FechaCita = req.body.fecha;
  const HoraCita = req.body.hora;
  const Sintomas = req.body.sintomas;
  const id_cita = req.body.id;

  conection.query(
    `UPDATE citas SET Nombre_Mascota = "${Nombre_Mascota}", Propietario = "${Propietario}", Telefono = "${Telefono}", FechaCita = '${FechaCita}', HoraCita = '${HoraCita}:00', Sintomas = "${Sintomas}" WHERE id_cita = ${id_cita}`,
    (error, result) => {
      if (error) {
        res.render('error')
      } else {
        console.log("Actualizado");
        console.log(result);
        res.send({ Result: "Exito" });
      }
    }
  );
});

app.listen((process.env.PORT || 5000), (req, res) => {
  console.log("Server Running in http://localhost:3000");
  console.log(process.env.DB_USER);
  console.log(process.env.DB_HOST);
  console.log(process.env.DB_PASSWORD);
  console.log(process.env.DB_DATABASE);
});