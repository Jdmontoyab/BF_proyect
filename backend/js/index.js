const express = require('express');

const app = express();
app.use(express.json());
const port = 5000;

const helmet = require('helmet');
app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: "by-content-type"}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
});

const routerUsers = require("./routes/users");
const routerContacts = require("./routes/contacts");
const routerRCC = require("./routes/rcc");
const routerCompanies = require("./routes/companies")

app.use("/users", routerUsers);
app.use("/contacts", routerContacts);
app.use("/rcc", routerRCC);
app.use("/companies", routerCompanies);

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});