/**
 * @file Middleware for allowing only specific HTTP methods on an endpoint.
 * @see https://github.com/undrash/next.js-api-middleware/blob/main/demo-api-routes/src/pages/middleware/method.ts
 */
import {NextApiRequest, NextApiResponse} from 'next';
import {Middleware, NextFunction} from './handler';

type HttpVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const allowMethods =
    (allowedMethods: HttpVerb[]): Middleware =>
        async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
            if (allowedMethods.includes(req.method as HttpVerb)) {
                next();
            } else {
                res.status(405).send({
                    error: `Endpoint does not support requests of type '${req.method}'.`,
                });
            }
        };