import express, { Request, Response } from 'express'
import { router } from './routes';
import swaggerUi from 'swagger-ui-express'
import swagerjs from './swager.json'
import './database'

const app = express()
app.use(express.json())

app.get('/', (request: Request, response: Response) => {
	response.json({msg: 'hello323333222'})
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerjs));
app.use(router)


app.listen(3333, () => console.log('server listening on http://localhost:3333'))