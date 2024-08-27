

const isValid=(req,res)=>{
  const {name}=req.body
   if(name.trim().length === 0){
    res.status(400).json({message:"Please enter a name"})
    return false;
   }
   return true;
}
export const leaveRequest=(req, res)=>{
  const { name } = req.body;
   if(isValid){
    res.status(201).json({message:"Leave created successfully"})
   }
}