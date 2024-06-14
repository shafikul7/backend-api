const  {Schema, model}  = require('mongoose');

const subTodo = new Schema({
    title: {
        type: String,
        require: [true, 'title must required'],
        minLength: [4, 'Name must be 4 character'], 

    },
    content:{
        type: String,
        required: true,
       
    },

});


const SubTodo = model('SubTodo', subTodo);

export {SubTodo};
