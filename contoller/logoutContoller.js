/* const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
  }
 */
const User = require('../model/User');

  const handlelogOut  = async(req,res)=>
  {   //on Client  ,also delete the accessToken

    const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);   /// successful but not sending content
  const refreshToken = cookies.jwt;

  console.log(cookies.jwt);

  const foundUser = await User.findOne({refreshToken}).exec();
  if(!foundUser) 
  {  res.clearCookie('jwt' ,{httpOnly : true, maxAge : 24*60*60*10000});
    return res.sendStatus(204);
   }  
   
   ///now delete refreshToken
   /* const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
   const currentUser ={ ...foundUser ,refreshToken : ' '};
   usersDB.setUsers([ ...otherUsers , currentUser]);

   await fsPromises.writeFile(path.join(__dirname ,'..','model','users.json'),
   JSON.stringify(usersDB.users)
   ); */
   foundUser.refreshToken = '';
   const result = await foundUser.save();
   console.log(result);

   res.clearCookie('jwt' ,{httpOnly : true, maxAge : 24*60*60*10000});
  res.sendStatus(204);

}
  module.exports = {handlelogOut}