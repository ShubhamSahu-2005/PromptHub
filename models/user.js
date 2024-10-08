import {Schema,model,models} from 'mongoose';
const userSchema=new Schema({
    email:{
        type:String,
        unique:[true,'Email already Exists!!'],
        required:[true,'Email is Required!!']
    },
    username:{
        type:String,
        required:[true,'Username is required']
    },image:{
        type:String
    }
})

const User=models.User||model("User", userSchema)

export default User;