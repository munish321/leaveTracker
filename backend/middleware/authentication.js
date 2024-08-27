import jwt from 'jsonwebtoken';

export const authMiddleWare = async (req,res,next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token ===null) return res.status(401).json({message:"Unauthorized user"}) 
   jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
     if(err) return res.status(401).json({message:"Unauthorized user",data:err})
      req.user = decoded; // Assuming decoded token contains user information
    console.log('req.user',req.user)
      next();
   })
}