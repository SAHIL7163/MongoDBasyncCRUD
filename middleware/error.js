const logevents =require('./logevent');

const errorhandler =(req,res,next,err)=>
{
    logevents(` ${err.name} ${err.message} `);

    console.log(`${req.method} ${req.path}`);
    res.status(500).send(err.message)
}

module.exports =errorhandler;