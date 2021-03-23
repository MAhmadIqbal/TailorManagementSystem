const {Schema,model}=require('mongoose')
const userSchema = new Schema(
    {
    name:{
        type:String,
        trim:true,
        required:true   
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true},
    role:{type:String,
        default:'client',
        enum:['client','tailor','admin']
    },
    Image:{type:String},
    username:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    password:{type:String,required:true}
},{timestamps:true}
);

module.exports= model('Users',userSchema);