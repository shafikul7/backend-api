const  {Schema, model}  = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name must required'],
        trim: true,
        minLength: [4, 'Name must be 4 character'],
        maxLength: [20, "Name below 20 characters"],

    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'password must be 4 character']
    }
});


const User = model('User', userSchema);

export {User};



