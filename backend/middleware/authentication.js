import jwt from 'jsonwebtoken';

export const authMiddleWare = async (req,res,next) => {
  const excludePaths = ["/api/login","/api/signup"]
  if(excludePaths.includes(req.path)){
    return next()
  } 
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token ===null) return res.status(401).json({message:"Unauthorized user"}) 
   jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
     if(err) return res.status(401).json({message:"Unauthorized user"})
      req.user = decoded; // Assuming decoded token contains user information
      next();
   })
}