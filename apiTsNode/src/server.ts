import express, { Request, Response } from 'express'
import { router } from './routes';

const app = express()
app.use(express.json())

app.get('/', (request: Request, response: Response) => {
	response.json({msg: 'hello'})
})

app.use(router)


app.listen(3333, () => console.log('server listening on http://localhost:3333'))