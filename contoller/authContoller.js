const User = require('../model/User');

const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const handleLogin = async(req,res)=>
{
  const { user, pwd } = req.body;
if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

const foundUser = await User.findOne({ username : user }).exec();
if(!foundUser) return res.sendStatus(401); ////unauthorized

 
///evaluate password
const match = await bcrypt.compare(pwd,foundUser.password);
if(match){
  //JWT
  //res.json({'success':`User ${user} is logged in`}) ;
  const roles = Object.values(foundUser.roles);

  const accesstoken = jwt.sign(
    {
      "UserInfo": {
          "username": foundUser.username,
          "roles": roles
      }
  },
    process.env.ACCESS_TOKEN_SECRET ,
    {expiresIn : '30s'}
  )

  const refreshToken =jwt.sign(
    {"username" : foundUser.username},
    process.env.REFRESH_TOKEN_SECRET ,
    {expiresIn : '1d'}
  )

///Saving refreshToken with current user
/* const currentUSer ={...foundUser ,refreshToken};
const otherUser = usersDB.users.filter(person => person.username !== foundUser.username);
usersDB.setUsers([...otherUser , currentUSer]);

await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),
     JSON.stringify(usersDB.users)); */
foundUser.refreshToken = refreshToken ;
const result = await foundUser.save();
console.log(result);

 res.cookie('jwt',refreshToken ,{ httpOnly : true, maxAge : 24*60*60*10000})
 res.json({accesstoken});
    }

else{
  res.sendStatus(401);
}


}

module.exports = {handleLogin}