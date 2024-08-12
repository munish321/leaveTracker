import jwt from 'jsonwebtoken';

export const auth = async (req,res) => {
  const {token} = req.body
  if(token){
    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
        res.status(200).json({auth:true,message:"user is authenticated",data:decoded})
    } catch (error) {
       res.status(400).json({auth:false,measage:error.measage})
    } 
  }else{
    res.status(400).json({auth:false,measage:"Invalid token"})
  }
}