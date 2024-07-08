import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

const handleInputErrors = (request: Request, response: Response, next: NextFunction) => {
    let errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() })
    }

    next();

}

export {
    handleInputErrors
}