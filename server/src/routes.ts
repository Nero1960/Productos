import { Router } from 'express';
import { body, param } from 'express-validator';
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateAvailability,
    updateProduct
} from './handlers/products';
import { handleInputErrors } from './middleware';

const router = Router();

//Routing
router.get('/', getProducts);

router.get('/:idProducts',

     param('idProducts').isInt().withMessage('ID No valido'),

     handleInputErrors,

     getProductById
);

router.post('/',
    //validación name
    body('name')
        .notEmpty().withMessage('El campo nombre es obligatorio'),
    //validación price
    body('price')
        .isNumeric().withMessage('El valor no es valido')
        .custom(value => value > 0).withMessage('El precio no es valido')
        .notEmpty().withMessage('El campo precio es obligatorio'),
    //
    handleInputErrors,
    //
    createProduct
);

router.put('/:idProducts', 
    //validar el ID
    param('idProducts').isInt().withMessage('ID no valido'),

    //validación name
    body('name')
        .notEmpty().withMessage('El campo nombre es obligatorio'),

    //validación price
    body('price')
        .isNumeric().withMessage('El valor no es valido')
        .custom(value => value > 0).withMessage('El precio no es valido')
        .notEmpty().withMessage('El campo precio es obligatorio'),
    //
    handleInputErrors,
    //
    updateProduct
);

router.patch('/:idProducts', 
    //validar el ID
    param('idProducts').isInt().withMessage('ID no valido'),
    //
    handleInputErrors,
    //
    updateAvailability
);

router.delete('/:idProducts', 
    //validar el ID
    param('idProducts').isInt().withMessage('ID no valido'),
    //
    handleInputErrors,
    //
    deleteProduct
)


export default router;