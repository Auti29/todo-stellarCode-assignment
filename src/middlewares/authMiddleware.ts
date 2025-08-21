import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload }  from "jsonwebtoken";

export interface authRequest extends Request{
    userId?: string | JwtPayload
}


export default function authMiddleware(req: authRequest, res: Response, next: NextFunction) {
    try{
        // @ts-ignore
        const authHeader: string = req.get('authorization');
    
        if(!authHeader){
            return res.status(403).json({
                message: "no auth header"
            });
        }
    
        const token = authHeader.split(' ')[1]; // auth-header: "Bearer token"
    
        if(!token){
                return res.status(403).json({
                message: "no token"
            });
    
        }
        
    
        const secret = process.env.JWT_SECRET;
    
        if(!secret){
            return res.json({
                message: "no jwt secret"
            });
        }
    
    
        const decoded = jwt.verify(token, secret) as JwtPayload;
    
        req.userId = decoded.id;
    
        next();

    }catch(e){
        console.log("server error > ", e);
        return res.status(500).json({
            message: "internal server error!!"
        });
    }

}