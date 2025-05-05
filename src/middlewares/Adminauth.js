const AuthAdmin =  (req,res ,next)=>{
    const token = 12345
    const isAdmin = token===12345
    if(!isAdmin)
    {
        res.status(401).send('unauthorized Access')
    }
    else{
        console.log('Auth is checked');
        next()
    }
  }

  const Auth = (req,res,next)=>{
    const tokens = 'admin123'
    const checkauth = tokens === req.query.token
    if(!checkauth){
        res.status(401).send('Unable to access dashboard')
    }
    else{
        console.log('Your token is valid');
        next()
    }
  }

  const userAuth = (req,res,next)=>{
    const time =  new Date().toLocaleString();
   console.log(`user access to dashboard at ${time}`);
    next()
  
  }
  module.exports = {AuthAdmin ,userAuth ,Auth}