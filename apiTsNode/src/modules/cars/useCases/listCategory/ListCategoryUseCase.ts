import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

class ListCategoryUseCase {
	constructor(private categoriesRepository: CategoriesRepository) {}

	execute() {
		return this.categoriesRepository.list()
	}
}

export {ListCategoryUseCase}