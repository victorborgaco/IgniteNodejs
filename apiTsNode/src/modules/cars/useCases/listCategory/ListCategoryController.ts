import { ListCategoryUseCase } from './ListCategoryUseCase';
import { Request, Response } from 'express';


class ListCategoryController {
	constructor(private listCategoryUseCase: ListCategoryUseCase){}
	handle(request: Request, response:Response) {
		const list = this.listCategoryUseCase.execute()
		return response.status(200).json(list)
	}

}

export {ListCategoryController}