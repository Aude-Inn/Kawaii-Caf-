const express = require("express");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kawaii.db",
});
connection.connect();
const newApp = express();
const path = require("path");
const port = 3007;
let bodyParser = require("body-parser");
let ejs = require("ejs");
const { title } = require("process");

// ___________________________________________________________________________________________________________________

// CONST :

// let coffees = [
//   {
//     id: 1,
//     model: "Coffee",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifAFRIXk3FeAjKh885e23LbwRTmZXsVKunA&s",
//     detail:
//       " Découvrez notre boisson signature, le 'Café Magique', une fusion parfaite entre douceur et mystère ! Infusé avec des arômes uniques et une touche secrète, chaque gorgée révèle des saveurs délicates, accompagnées de motifs enchanteurs sur la mousse. Une véritable expérience gustative qui éveillera vos sens dans un tourbillon de magie et de plaisir !",
//   },
//   {
//     id: 2,
//     model: "Chocolatecoffee",
//     image:
//       "https://www.creativefabrica.com/wp-content/uploads/2022/12/30/Coffee-Cup-Kawaii-Cartoon-Face-Valentines-Day-55365972-1.png",
//     detail:
//       "Laissez-vous envoûter par le Chocolatecoffee, une union parfaite entre l’intensité du café et la richesse du chocolat. Ce mariage gourmand crée une boisson veloutée et réconfortante, idéale pour les amateurs de douceurs cacaotées. Un plaisir chaud, crémeux, et irrésistible à chaque tasse.",
//   },
//   {
//     id: 3,
//     model: "Capuccino",
//     image:
//       "https://ih1.redbubble.net/image.5245266886.7960/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
//     detail:
//       "Le Capuccino est l’alliance parfaite entre un café expresso corsé, une mousse de lait veloutée et une pointe de chocolat en surface. Son goût équilibré et sa texture crémeuse en font la boisson idéale pour savourer un moment de douceur et de réconfort. Un classique qui plaît à tous les amoureux du café.",
//   },
//   {
//     id: 4,
//     model: "Expresso",
//     image:
//       "https://img.freepik.com/vecteurs-premium/tasse-cafe-illustration-vectorielle-style-kawaii-mignon_787461-1798.jpg",
//     detail:
//       "L’Expresso, c’est l’essence pure du café. Fort et intense, chaque gorgée vous plonge dans un monde de saveurs robustes et profondes. Préparé avec précision, il offre une expérience unique pour ceux qui aiment savourer la richesse de chaque grain de café dans sa forme la plus concentrée.",
//   },
//   {
//     id: 5,
//     model: "Latte",
//     image:
//       "https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D157421271W5002H10000/views/1,width=800,height=800,appearanceId=839,backgroundColor=F2F2F2/cafe-latte-glace-kawaii-autocollant.jpg",
//     detail:
//       "Le Latte, une fusion exquise entre un café expresso et une mousse de lait onctueuse, pour un goût doux et réconfortant. Il est parfait pour ceux qui cherchent à équilibrer la force du café avec une douceur lactée. Chaque tasse est une invitation à la détente, à savourer lentement pour apprécier ses nuances crémeuses.",
//   },
//   {
//     id: 6,
//     model: "Chocolatine",
//     image:
//       "https://ih1.redbubble.net/image.5543218971.5818/st,small,507x507-pad,600x600,f8f8f8.jpg",
//     detail:
//       "La Chocolatine est une touche sucrée parfaite pour accompagner votre café. Feuilletée, dorée et remplie de chocolat fondant, elle est l’alliée idéale pour une pause gourmande. Un classique français que l’on ne se lasse jamais de déguster, apportant à la fois texture et saveur à chaque bouchée.",
//   },
// ];
let users = [
  {
    email: "aude@gmail.fr",
    mdp: "aude15",
  },
  {
    email: "cyprien@gmail.fr",
    mdp: "cyprien15",
  },
  {
    email: "marius@gmail.fr",
    mdp: "marius15",
  },
];

// Middleware
// _____________________________________________________________________________________________________________________

newApp.use(express.static("public"));
newApp.set("views", path.join(__dirname, "views"));
newApp.set("view engine", "ejs");
newApp.use(bodyParser.urlencoded({ extended: true }));

// __________________________________________________________________________________________________________________
// Récupération des données via la base de donnée

// let coffees = [];

// connection.query("SELECT * FROM coffees", (err, rows, fields) => {
//   if (err) throw err;

//   coffees = rows;

//   connection.end();
// });
// console.log("Toutes les données récupérées : ", coffees);
// __________________________________________________________________________________________________________________

// Page d'accueil TroOp Kawaii
// __________________________________________________________________________________________________________________

newApp.get("/", (req, res) => {
  res.render("index", {
    title: "Kawaii Café",
    message: "Bienvenue dans notre café mignon ! 🌸☕",
    description:
      "Venez déguster des boissons mignonnes et profitez d'une ambiance chaleureuse et kawaii !",
  });
});

// Liste des Cafés troOp Kawaiii Bref le Menu quoi
// __________________________________________________________________________________________________________________________

newApp.get("/menu", (req, res) => {
  connection.query("SELECT * FROM coffees", (err, rows, fields) => {
    if (err) throw err;
    coffees = rows;

    res.render("menu", {
      coffee: coffees,
      title: "Kawaii Café",
      message: "un petit café ? avec une petite chocolatine ! 🌸☕",
      description:
        "Venez déguster des boissons mignonnes et profitez d'une ambiance chaleureuse et kawaii !",
    });

    // connection.end();
  });
});

// Je prends ta petite commande troOp Kawaiii
// _____________________________________________________________________________________________________________________

newApp.get("/commande", (req, res) => {
  const title = "Ma commande de café";
  let coffeeModel = coffees.map((coffee) => coffee.model);
  res.render("commande", {
    title: title,
    coffee: coffeeModel,
  });
});

// Résultat de ta petite commande troOp Kawaiii
// __________________________________________________________________________________________________________________________

newApp.post("/commande", (req, res) => {
  const { coffeeType, quantity } = req.body;
  const title = "Ta commande Kawaii 🌸☕";
  res.render("commande_prise", { coffeeType, quantity, title });
});

// Ajouter un café au menu
// _________________________________________________________________________________________________________________________

newApp.get("/ajout_menu", (req, res) => {
  const title = "J'ajoute une nouvelle boisson au Menu 🌸";
  connection.query("SELECT * FROM coffees", (err, rows, fields) => {
    if (err) throw err;
    coffees = rows;

    res.render("ajout_menu", {
      title: title,
      coffee: coffees,
    });
  });
});

newApp.post("/ajout_menu", (req, res) => {
  const { model, img, describe } = req.body;

  const query =
    "INSERT INTO coffees (model, img, `describe`) VALUES ( ?, ?, ?)";

  connection.query(query, [model, img, describe], (err, result) => {
    if (err) {
      console.error("Erreur d'insertion dans la base de données :", err);
      return res
        .status(500)
        .send("Erreur lors de l'ajout de la boisson au menu");
    }

    res.redirect("/menu");
  });
});

// Page de détail individuel
// ________________________________________________________________________________________________________________________

newApp.get("/page_detail/:id", (req, res) => {
  const title = "Plus de détails 🌸";
  const coffeeId = req.params.id;
  const query = "SELECT * FROM coffees WHERE id = ?";
  connection.query(query, [coffeeId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression du café :", err);
    }

    const oneCoffee = result[0];
    res.render("page_detail", {
      title,
      detailBoisson: oneCoffee,
    });
  });
});
// Delete le faux ajout
// __________________________________________________________________________________________________________________________________

newApp.post("/page_detail/:id", (req, res) => {
  const coffeeId = req.params.id;

  const query = "DELETE FROM coffees WHERE id = ?";

  connection.query(query, [coffeeId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression du café :", err);
    }

    res.redirect("/menu");
  });
});

// login page
newApp.get("/login", (req, res) => {
  const title = "Log in🌸";
  res.render("login", {
    title,
  });
});
newApp.post("/login", (req, res) => {
  const { email, mdp } = req.body;
  const user = users.find((u) => u.email === email && u.mdp === mdp);
  if (user) {
    res.redirect("/menu");
  } else {
    let title = "Erreur de connexion";
    res.render("error", {
      title: title,
      errorMessage: "Nom d'utilisateur ou mot de passe incorrect",
    });
  }
});

newApp.listen(port, () => console.log(`listening on http://localhost:${port}`));
