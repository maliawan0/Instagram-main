const mongoose=require('mongoose');
const{ObjectId}=mongoose.Schema.Types

const UserSchema=new mongoose.Schema
(
    {
        email:{type:String,required:true},
        username:{type:String,required:true},
        password:{type:String,required:true},
        followers:[{type:ObjectId,ref:"User"}],
        following:[{type:ObjectId,ref:"User"}]
    }
)

mongoose.model("User",UserSchema);