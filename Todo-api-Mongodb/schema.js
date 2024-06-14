const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
     },
    email: {
         type: String,
          required: true, 
          unique: true 
        },
    password: { 
        type: String,
         required: true
         }
});

module.exports = mongoose.model('User', userSchema);

const todoSchema = new mongoose.Schema({
    title: { type: String,
         required: true
         },
    status: {
         type: String,
          enum: ['completed', 'uncompleted'],
           default: 'uncompleted' },
    dateCreated: {
         type: Date, 
        default: Date.now 
    },
    dateCompleted: {
         type: Date 
        },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User', 
         required: true
         }
});

module.exports = mongoose.model('Todo', todoSchema);



// const mongoose = require('mongoose');

// const todo = new mongoose.Schema({
//     title: {
//         type: String,
//         require: true,
//         unique:true
//     },
//     status:{

//     }
//     date: {
//         type: Date,
//         default: Date.now,
//         require: true
//     },
//     time: {
//         type: Number,
//         default: (new Date()).getTime(),
//         require: true
//      },
//      author: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//       },

// });

// const listTodo = new mongoose.model("list", todo) ;
