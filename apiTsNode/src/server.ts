import express, { Request, Response } from 'express'
import { router } from './routes';
import swaggerUi from 'swagger-ui-express'
import swagerjs from './swager.json'
const app = express()
app.use(express.json())

app.get('/', (request: Request, response: Response) => {
	response.json({msg: 'hello'})
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerjs));
app.use(router)


app.listen(3333, () => console.log('server listening on http://localhost:3333'))