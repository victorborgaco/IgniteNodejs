import { Router } from 'express';
import { categoriesRouter } from './CategoriesRoutes';
import { specificationRoutes } from './SpecificationRoutes';

const router = Router()

router.use('/categories', categoriesRouter)
router.use('/specifications', specificationRoutes)

export { router }

