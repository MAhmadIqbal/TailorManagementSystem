const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    
    name:{
        type:String,
        trim:true,
        required:true   
    },
    email : {   type : String , 
                required : true ,
                trim:true, 
                unique : true, 
                match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            },
    username:{
        type:String,
            trim:true,
            unique:true,
            required:true
            },
    password : {type: String, required : true},
    role: {type:String,
            default:'customer',
            enum:['customer','tailor','admin']
        },
},{timestamps:true});
userSchema.pre("save",async (next)=>{
    if(!this.isModified("password")){
        return next()
    }
    const hash = await bcrypt.hash(this.password,Number(12));
    this.password = hash
    next();
})
module.exports = mongoose.model('User' , userSchema);