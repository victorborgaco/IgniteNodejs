import fs from 'fs'
import { parse } from 'csv-parse'
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportCategory {
	name: string
	description: string
}

class ImportCategoryUseCase {

	constructor (private CategoriesRepository: CategoriesRepository) {
	}

	loadCategory (file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path)
			const categories: IImportCategory[] = []

			const parsefile = parse({delimiter: ';'})

			stream.pipe(parsefile)

			parsefile.on('data', async (line) => {
				const [name, description] = line
				categories.push({name, description})
			}).on('end', () => {
				fs.promises.unlink(file.path)
				resolve(categories)
			}).on('error', (err) => {
				reject(err)
			})
		})

	}

	async execute (file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategory(file)

		categories.map(async (category) => {
			const {name, description} = category
			const existingCategory = this.CategoriesRepository.findByName(name)


			if (!existingCategory) {
				this.CategoriesRepository.create({name, description})
			}
		})

	}

}

export { ImportCategoryUseCase }