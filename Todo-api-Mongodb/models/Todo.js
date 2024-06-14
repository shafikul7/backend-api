const  {Schema, model}  = require('mongoose');

const todoSchema = new Schema({
    title: {
        type: String,
        require: [true, 'title must required'],
        minLength: [4, 'Name must be 4 character'],
        

    },
    content:{
        type: String,
        required: true,
       
    },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subTodo: [{
    type: Schema.Types.ObjectId,
    ref: 'SubTodo',
    required: true,
  }]
});


const Todo = model('Todo', todoSchema);

export {Todo};
