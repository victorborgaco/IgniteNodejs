import { Category } from '../../model/Category';
import { ICreateCategoryRepository } from '../ICategoryRepository';

class CategoriesRepository implements ICreateCategoryRepository {
	private readonly categories: Category[]

	private static INSTANCE: CategoriesRepository

	constructor () {
		this.categories = []
	}

	public static getInstance (): CategoriesRepository {
		if (!CategoriesRepository.INSTANCE) {
			CategoriesRepository.INSTANCE = new CategoriesRepository()
		}
		return CategoriesRepository.INSTANCE
	}

	create ({name, description}): void {
		const category = new Category()

		Object.assign(category, {name, description, created_at: new Date()})

		this.categories.push(category)
	}

	list (): Category[] {
		return this.categories
	}

	findByName (name: string): Category {
		return this.categories.find(category => category.name === name)
	}
}

export { CategoriesRepository }