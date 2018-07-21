var express         = require("express"),
    jwt             = require('jsonwebtoken'),
    port            = process.env.PORT || 3000,
    app             = express();
const fs = require('fs');
    
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));    

let payload = {
iss: "FUXQZ62Z9M", // Issuer: Your Apple Developer Team ID */
iat: Date.now() / 1000, // Issued at: Current time in seconds */
exp: (Date.now() / 1000) + 1800, // Expiration: Time to expire in seconds */ origin: "https://yourdomain.com" /* (recommended - a domain restriction) */
};

let authKey = fs.readFileSync("AuthKey_249NJBN2JJ.p8");
//let keyFile = fs.readFileSync("AuthKey_249NJBN2JJ.p8");


let header = {
kid: "249NJBN2JJ", // Key Id: Your MapKit JS Key ID */ 
typ: "JWT", // Type of token 
alg: "ES256" // The hashing algorithm being used */
};

let authorizatonToken = jwt.sign(payload, authKey, { header: header });
console.log(authorizatonToken);

//JWT endpoint
// app.get("/token", (req, res) => { 
//     res.send(jwt.sign(payload, keyFile, { header: header }) );
// });    

app.get("/token", (req, res, next) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
}, (req, res) => {
    res.send(
        jwt.sign(payload, authKey, { header: header }));
});
    

// ROOT ROUTE
app.get("/", function(req, res){
    res.render("map");
});    
    
    
app.listen(port, function(){
    console.log("Mapkitjs Test Server has started!");
});    
    
    
    