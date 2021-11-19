import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { Response, Request } from 'express';

class ImportCategoryController {
	constructor (private importCategoryUseCase: ImportCategoryUseCase) {
	}

	async handle (request: Request, response: Response): Promise<Response> {
		const {file} = request
		await this.importCategoryUseCase.execute(file)

		return response.json()
	}
}

export { ImportCategoryController }