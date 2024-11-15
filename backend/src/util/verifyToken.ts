import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// for the custom request object to include the user property
interface CustomRequest extends Request {
  user?: any; //  based on user object structure
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  console.log("Token received:", token);  // Debug log

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You're not authorized",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: VerifyErrors | null, user: any) => {
    if (err) {
      console.log("Token verification error:", err);  // Debug log
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    console.log("Token verified successfully, user:", user);  // Debug log
    req.user = user;
    next();
  });
};
export const verifyUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    const userIdFromToken = req.user?.id;
    const userIdFromRequest = req.body.userId || req.params.id;

    console.log("User ID from token:", userIdFromToken);
    console.log("User ID from request:", userIdFromRequest);

    if (userIdFromToken === userIdFromRequest || req.user.role === 'admin') {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You're not authenticated",
      });
    }
  });
};

export const verifyAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, (err?: any) => {
    if (err) {
      return next(err);
    }

    if (req.user.role === 'admin') {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You're not authorized"
      });
    }
  });
};