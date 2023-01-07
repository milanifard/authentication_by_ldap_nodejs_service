const { authenticate } = require('ldap-authentication')
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config/config.env" });

exports.auth = async (username, password) =>
{
    let ldapInfo = {
        ldapOpts: { url: process.env.LDAP_URL },
        userDn: `uid=${username},ou=Sadaf,ou=ServicesInfo,dc=um,dc=ac,dc=ir`,
        userPassword: password,
        userSearchBase: 'ou=Sadaf,ou=ServicesInfo,dc=um,dc=ac,dc=ir',
        username: username,        
      }
    try
    {
        let authenticated = await authenticate(ldapInfo);
        return authenticated;
    }
    catch(e)
    {
        console.log(e);
    }
    return false;
}