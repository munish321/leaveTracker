import role from "../models/role.js";

const isValid = (req,res)=>{
    const {name, code} = res.body
    if(name.trim().length ===0){
        res.status(400).json({message:"Please enter a name"})
        return false;
    }
    if(code.trim().length ===0){
        res.status(400).json({message:"Code is a required field."})
        return false;
    }

}
export const createRole = async (req, res) => {
  const { name, code } = req.body;
  if(isValid){
    const newRole = new role({ name, code });
    const savedRole = await newRole.save();
    res.status(201).json({message:'Role created sucessfully',savedRole});
  }

}

export const getRoles = async(req,res)=>{
    const data = await role.find();
    res.status(200).json({message:"data fetched successfully",data});
}

export const deleteRole = async(req,res)=>{
  try {
    const id = req.params.id;
    const roleExists= await role.findById({_id:id})
    if(!roleExists){
      return res.status(400).json({message:"Role does not exists."})
    }
    let data = await role.deleteOne({_id:id})
    if(data.deletedCount === 1){
      res.status(200).json({message:"Role deleted successfully.",data})
    }else{
      res.status(400).json({message:"Role is not deleted"})
    }
    } catch(error){
      res.status(500).json({message:"Something went wrong while deleting role"})
    }
}