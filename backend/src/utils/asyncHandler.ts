import type {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import type { ParamsDictionary } from "express-serve-static-core";

const asyncHandler = <P extends ParamsDictionary = ParamsDictionary>(
  requestHandler: (
    req: Request<P>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>,
): RequestHandler<P> => {
  return (req: Request<P>, res: Response, next: NextFunction): void => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export default asyncHandler;
