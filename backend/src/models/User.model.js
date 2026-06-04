import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
        select: false
    },
    role:{
        type: String, 
        enum: ["customer", "admin"],
        default: "customer"
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})

// FOR PASSWORD
userSchema.pre("save", async function(){
    if(!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)
export default User