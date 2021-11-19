import { Router } from 'express'
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';
import multer from 'multer';
import { importCategoryController } from '../modules/cars/useCases/importCategory';

const upload = multer({dest: './tmp'})
const categoriesRouter = Router()

categoriesRouter.post('/', (request, response) => {

	return createCategoryController.handle(request, response)
})

categoriesRouter.get('/', (request, response) => {
	return listCategoryController.handle(request, response)
})

categoriesRouter.post('/import', upload.single('file'), (request, response) => {
	return importCategoryController.handle(request, response)
})

export { categoriesRouter }