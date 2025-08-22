import mongoose from "mongoose";
export interface Todo {
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    _id: mongoose.Types.ObjectId;
    description: String;
    done?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface userInterface {
    username: string;
    password: string;
    _id: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const UserModel: mongoose.Model<userInterface, {}, {}, {}, mongoose.Document<unknown, {}, userInterface, {}, mongoose.DefaultSchemaOptions> & userInterface & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, mongoose.Schema<userInterface, mongoose.Model<userInterface, any, any, any, mongoose.Document<unknown, any, userInterface, any, {}> & userInterface & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, userInterface, mongoose.Document<unknown, {}, mongoose.FlatRecord<userInterface>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<userInterface> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>>;
export declare const TodoModel: mongoose.Model<Todo, {}, {}, {}, mongoose.Document<unknown, {}, Todo, {}, mongoose.DefaultSchemaOptions> & Todo & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, mongoose.Schema<Todo, mongoose.Model<Todo, any, any, any, mongoose.Document<unknown, any, Todo, any, {}> & Todo & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Todo, mongoose.Document<unknown, {}, mongoose.FlatRecord<Todo>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Todo> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>>;
//# sourceMappingURL=db.d.ts.map