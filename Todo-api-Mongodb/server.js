const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT | 8001;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [4, "Name must be 4 character"],
    maxLength: [20, "Name below 20 characters"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [4, "password must be 4 character"],
  },
});

const userModel = mongoose.model("User", userSchema);

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "uncompleted"],
      default: "uncompleted",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("Todo", todoSchema);

// connect mongoose
mongoose
  .connect("mongodb://localhost:27017/todo-api-mongodb")
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((error) => console.log(error));

// VerifyToken
const verifyToken = async (req, res, next) => {
  try {
    // console.log({ req: req.headers.authorization })
    const token = req?.headers?.authorization?.split(" ")[1]
    if (!token) {
      res.status(201).json({
        message: "Token not found"
      })
    }
    jwt.verify(token, 'your_jwt_secret', function (err, decoded) {
      if (!decoded) {
        return res.status(201).json({
          message: "Invalid user"
        })
      }
      req.user = decoded;
      next()
    });

    console.log("token", token)
  } catch (err) {
    return res.status(500).json({
      message: "Internal  server error"
    })
  }
}
const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, "your_jwt_secret", {
    expiresIn: "1h",
  });
  return token;
}

// Registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(404).json({ message: "Please input valid information" });
  }
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "User already exist!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await userModel.create({ name, email, password: hashedPassword });
    // console.log('user', user);
    const newUser = await user.save();
    console.log("new=user", newUser);
    res.status(200).json({ message: "User Successfully Created", newUser });
  } catch (error) {
    res.status(400).send(err, "Error registering user");
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = generateToken(user.id);

    res.status(200).json({ message: "Login Successful", token, data: user });
  } catch (error) {
    res.status(400).send("Error logging in");
  }
});

// New To-Do List
app.post("/todos", verifyToken, async (req, res) => {
  const { title, status, userId } = req.body;
  try {
    const todo = await todoModel({
      ...req.body,
      userId: ObjectId(userId)

    });
    // console.log(todo);
    // console.log("todo", todo);
    const savedTodo = await todo.save();
    res.status(201).json({ savedTodo });


  } catch (err) {
    res.status(400).send(err);
  }
});

// Update To-Do List

app.put("/todos/:id", verifyToken, async (req, res) => {
  try {
    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    // const token = generateToken(user.id);
    if (!updatedTodo) return res.status(404).send("To-Do not found.");
    res.send(updatedTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete To-Do List 

app.delete("/todos/:id", verifyToken, async (req, res) => {
  try {

    // const deletedTodo = await Todo.findOneAndRemove({

    const { id: todoId } = req.params;

    // console.log({id: todoId});


    if (!todoId) {
      return res.status(200).json({ message: "Todo id is required" });
    }


    const todoResult = await todoModel.findById(todoId)

    if (!todoResult) {
      return res.status(200).json({ message: "Todo is not found" });
    }


    const deletedTodo = await todoModel.deleteOne({
      _id: ObjectId(todoId),
    });

    return res.status(404).json({ message: 'deleted successfully', data: deletedTodo });

  } catch (err) {
    res.status(400).send(err);
  }
});

// Get To-Do List by User ID

app.get("/users/:userId/todos", verifyToken, async (req, res) => {

  try {
    const todos = await todoModel.find({ userId: req.params.userId });
    const user = await userModel.findOne(req.user.userId);
    // console.log(user);

    // const token = generateToken(user.id);
    if (!todos) return res.status(404).send("No to-dos found for this user.");

    const response = todos?.map(todo => {
      return {
        ...todo._doc,
        user: {
          name: user.name,
          email: user.email,
        }
      }
    })

    res.status(200).json(response)
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
