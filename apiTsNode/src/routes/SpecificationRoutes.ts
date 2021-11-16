import { Router } from 'express'
import { SpecificationRepository } from '../modules/cars/repositories/implementations/SpecificationRepository';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationRoutes = Router()
const specificationRepository = SpecificationRepository.getInstance()

specificationRoutes.post('/', (request, response) => {
	return createSpecificationController.handle(request, response)
})

specificationRoutes.get('/', (request, response) => {

	return response.status(200).json(specificationRepository.list())
})


export { specificationRoutes }