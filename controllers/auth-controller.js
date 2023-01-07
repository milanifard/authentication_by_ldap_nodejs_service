const dotEnv = require("dotenv");
const { auth } = require('../services/uldap');
const path = require('path');
const appRootPath = require('app-root-path');
const fs   = require('fs');
const jwt  = require('jsonwebtoken');

dotEnv.config({ path: "./config/config.env" });

var privateKEY  = fs.readFileSync( path.join(appRootPath.path, "config", "private.key"), 'utf8');
var publicKEY  = fs.readFileSync( path.join(appRootPath.path, "config", "public.key"), 'utf8');

var signOptions = {
    issuer:  process.env.JWT_ISSUER,
    expiresIn:  process.env.JWT_EXPIRE_TIME,
    algorithm:  "RS256"
};       

var verifyOptions = {
    issuer:  process.env.JWT_ISSUER,
    expiresIn:  process.env.JWT_EXPIRE_TIME,
    algorithm:  ["RS256"]
};    

exports.getToken = async (req, res)=> { 
    // #swagger.tags = ['Security']
    // #swagger.summary = 'authenticate by ldap and return token if user is valid'
    // #swagger.produces = ['application/json']
    var payload = {
        username: req.body.username,

       };
    try
    {
        isLogin = await auth(req.body.username, req.body.password);
        var token = jwt.sign(payload, privateKEY, signOptions);
        if(isLogin)
            res.set(200).send(`{ authenticated: "${isLogin}", token: "${token}" }`) 
        else
            res.set(400).send(`{ authenticated: "${isLogin}" }`) 
    }
    catch(e)
    {
        console.log(e.message);
        res.set(500).send(e.error);
    }
} 

exports.validateToken = (req, res)=> { 
    // #swagger.tags = ['Security']
    // #swagger.summary = 'verify the token and return decoded payload object, you can add decoded payload to an object in req'
    // #swagger.produces = ['application/json']

    token = req.body.token;
    try
    {
        legit = jwt.verify(token, publicKEY, verifyOptions);
    }
    catch (err)
    {
        res.set(404).send(`{ result: "invalid" }`) 
        return;
    }    
    res.set(200).send(`{ result: "${JSON.stringify(legit)}" }`) 
} 