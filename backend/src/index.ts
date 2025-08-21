import express from "express";
import type {Request, Response} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import authMiddleware, { type authRequest } from "./middlewares/authMiddleware.js";
import { TodoModel, UserModel } from "./db.js";
dotenv.config();

const DB_CONN_URL = process.env.DB_CONN_URL;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/v1/signup', async (req: Request, res: Response) => {

    const {username, password} = req.body;

    if(!username || !password){
       return  res.status(401).json({
        message: "required fields are missing!"
       });
    }

    const user = await UserModel.findOne({
        username
    });

    if(user){
        return res.status(409).json({
            message: "user already exists, login!!"
        });
    }


    try{
        const userCreated = await UserModel.create({
            username, 
            password
        });

        const userId = userCreated._id;

        return res.status(200).json({
            message:  "registration successful!!", 
            userId
        });
    }catch(e){
        console.log("server error", e);
        return res.status(500).json({
            error: e
        });
    }


});

app.post('/api/v1/signin', async (req: Request, res: Response) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(409).json({
            message: "credentials required!!!"
        })
    }

    try{
        const user = await UserModel.findOne({
            username
        });
    
        if(!user){
            return res.status(400).json({
                message: "no user found!! register user!!"
            });
        }
    
        const isVerified = await bcrypt.compare(password, user.password);
    
        if(!isVerified){
            return res.status(401).json({
                message: "wrong credentials"
            });
        }

        //jwt 
        const secret = process.env.JWT_SECRET;

        if(!secret){
            return res.json({
                message: "jwt secret is missing in env!!"
            })
        }

        const token = jwt.sign({id: user._id}, secret, {expiresIn: "10h"});

        return res.status(200).json({
            message: "sign in successful!!", 
            token: token
        });


    }catch(e){
        console.log("server error: ", e);
        return res.status(500).json({
            message: 'server error'+ e
        });
    }

})

app.get('/api/v1/todos', authMiddleware,  async (req: Request, res: Response) => {
    try{
        const userId = (req as authRequest).userId;
        
        const todos = await TodoModel.find({
            userId
        }).populate({path: "userId", select: "username"});

        return res.status(200).json({
            message: "success", 
            todos
        });

    }catch(e){
        console.log("error occured");
        return res.status(500).json({
            message: "internal server error"
        });
    }
});

app.post('/api/v1/todos', authMiddleware, async(req: Request, res: Response) => {
        const {title, description} = req.body;

        if(!title){
            return res.status(400).json({
                message: "todo must have a title!!"
            });
        }

        const userId = (req as authRequest).userId;
    try{ 
        const createdTodo = await TodoModel.create({
            title, 
            description, 
            userId, 
            done: false
        });

        return res.status(200).json({
            message:"todo created successfully!!", 
            createdTodo
        });

    } catch(e) {
        console.log("error occured on server: ", e);
        return res.status(500).json({
            message: "internal server error"
        });
    }
});

app.put('/api/v1/todos', authMiddleware, async(req: Request, res: Response) => {
    const userId = (req as authRequest).userId;
    const {todoId, title, description, done} = req.body;

    const updatedTodo = await TodoModel.findByIdAndUpdate({
       _id: todoId as mongoose.Types.ObjectId
    }, 
    {$set:{title, description, done}}, 
    {new: true}
    );

    
if (!updatedTodo) {
  return res.status(404).json({ message: "No todo found" });
}

return res.status(200).json({
    message: "todo updated successfully!!", 
    updatedTodo
});

});

app.delete('/api/v1/todos/:id', authMiddleware, async(req: Request, res: Response) => {
    const todoId = req.params.id;
    
    try{
        
        const result = await TodoModel.deleteOne({
            _id: todoId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
            message: "No such todo exists!!"
        });
}
        return res.status(200).json({
            message: "todo deleted successfully!!"
        });

    }catch(err){
        console.log("error: ", err);
        return res.status(500).json({
            message: "internal server error"
        });
    }
})


main();
async function main() {
    if(!DB_CONN_URL){
        console.error("db url missing!!");
        return;
    }

    await mongoose.connect(DB_CONN_URL);

    if(!PORT){
        console.error("no port env variable found");
        return;
    }
    app.listen(PORT, () => {
        console.log("connected");
    })
}
