const mongoose=require('mongoose');
const{ObjectId}=mongoose.Schema.Types

const PostSchema=new mongoose.Schema
(
    {
        caption:{type:String,required:true},
        imageUrl:{type:String,required:true},
        likes:[{type:ObjectId,ref:"User"}],
        comments:[{
            text:String,
            PostedBy:{type:ObjectId,ref:"User"}
        }],
        PostedBy:{type:ObjectId,ref:"User"}
    },{timestamps:true}
)

mongoose.model("Post",PostSchema);