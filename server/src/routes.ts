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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         idProduct:
 *                  type: integer
 *                  description: The product ID.
 *                  example: 1
 *         name:
 *                  type: string
 *                  description: The product name.
 *                  example: Monitor 24 Pulgadas
 *         price:
 *                  type: number
 *                  description: The product price
 *                  example: 280
 *         availability:
 *                  type: boolean
 *                  description: The product availability
 *                  example: true
 */


/**
 * 
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                               type: array
 *                               items:
 *                                  $ref:  '#/components/schemas/Product'      
 * 
 *          
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{idProducts}:
 * 
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return an object like product
 *      parameters:
 *        - in: path
 *          name: idProducts
 *          description: The ID of the product to receive
 *          required: true
 *          schema:
 *              type: integer
 * 
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          404: 
 *              description: Product not found
 *          400:
 *              description: Bad Request - Invalid
 *              
 *          
 * 
 */

router.get('/:idProducts',

    param('idProducts').isInt().withMessage('ID No valido'),

    handleInputErrors,

    getProductById
);


/**
 * 
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new Product
 *      tags: 
 *          - Products
 *      description: Returns a new Record in the database
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo"
 *                          price:
 *                              type: number
 *                              example: 200
 *      responses:
 *          201:
 *              description: Product created successfully
 *          400:
 *              description: Bad Request - Invalid input data
 *          
 * 
 */
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

/**
 * @swagger
 * /api/products/{idProducts}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Products
 *     description: Updates a product's information based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: idProducts
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: "Product name"
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 100.50
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     msg:
 *                       type: string
 *                       example: "Producto Actualizado"
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid ID or invalid data
 */


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

/**
 * @swagger
 * /api/products/{idProducts}:
 *   patch:
 *     summary: Update the availability of a product by ID
 *     tags:
 *       - Products
 *     description: Updates the availability status of a product based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: idProducts
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - availability
 *             properties:
 *               availability:
 *                 type: boolean
 *                 description: The availability status of the product
 *                 example: true
 *     responses:
 *       200:
 *         description: Availability updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Actualizado Correctamente"
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid ID or product not found
 *         
 */


router.patch('/:idProducts',
    //validar el ID
    param('idProducts').isInt().withMessage('ID no valido'),
    //
    handleInputErrors,
    //
    updateAvailability
);

/**
 * @swagger
 * /api/products/{idProducts}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     description: Deletes a product based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: idProducts
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Producto eliminado correctamente"
 *       400:
 *         description: Bad Request - Invalid ID or product not found
 *         
 */


router.delete('/:idProducts',
    //validar el ID
    param('idProducts').isInt().withMessage('ID no valido'),
    //
    handleInputErrors,
    //
    deleteProduct
)


export default router;