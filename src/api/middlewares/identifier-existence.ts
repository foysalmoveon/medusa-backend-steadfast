import { NextFunction, Request, Response } from "express";

// Middleware for Work Details
export function processIdentifierMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    req.query.identifier = 'store_01HHC0WBHJVN4Z12Y74JQYJGWR'
    const identifier = req.query.identifier as string
    // console.log("identifier", identifier)
    if (identifier) {
        // Modify query to use store_id instead of identifier
        req.query.store_id = identifier
        //delete identifier form request
        delete req.query.identifier
        next()
    } else {
        // Send response indicating that identifier is required
        res.status(422).json({
            code: 422,
            type: "invalid_request_error",
            message: "Identifier is required in the query parameters.",
        })
    }
}
