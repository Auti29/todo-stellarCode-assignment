import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 5,
        maxLength: 50
    },
}, { timestamps: true });
//hash password everytime it hits db 
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});
export const UserModel = mongoose.model("users", UserSchema);
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 500,
        trim: true
    },
    done: { type: Boolean },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true });
export const TodoModel = mongoose.model("todos", TodoSchema);
//# sourceMappingURL=db.js.map