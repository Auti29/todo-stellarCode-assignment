import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
export interface authRequest extends Request {
    userId?: string | JwtPayload;
}
export default function authMiddleware(req: authRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authMiddleware.d.ts.map