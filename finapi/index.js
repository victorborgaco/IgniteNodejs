const express = require('express')
const {v4: uuid} = require('uuid')
const app = express()

app.use(express.json())

const customers = []

function verifyIfExistsAccountCpf(req, res, next) {
    const {cpf} = req.headers

    const customer = customers.find((customer) => customer.cpf === cpf)

    if (!customer) {
        return res.status(400).json({error: 'Usuario não encontrato!'})
    }

    req.customer = customer

    return next()

}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.ammount
        } else {
            return acc - operation.ammount
        }
    }, 0)
    return balance
}

app.post('/account', async (req, res) => {
    const {cpf, name} = req.body

    const costumersAlheadingExists = customers.some((customer) => customer.cpf === cpf)
    if (costumersAlheadingExists) {
        return res.status(400).json({error: 'Customer already exists!'})
    }
    const data = {
        id: uuid(),
        cpf,
        name,
        statement: []
    }

    customers.push(data)

    return res.status(200).json(data)
})

app.get('/account', verifyIfExistsAccountCpf, async (req, res) => {
    const {customer} = req
    return res.status(200).json(customer)
})

app.put('/account', verifyIfExistsAccountCpf, async (req, res) => {
    const {customer} = req
    const {name} = req.body

    customer.name = name

    res.status(200).send()
})

app.delete('/account', verifyIfExistsAccountCpf, async (req, res) => {
    const {customer} = req

    customers.splice(customer, 1)

    return res.status(200).json(customers)
})

app.get('/balance',verifyIfExistsAccountCpf, (req, res) => {
    const {customer} = req

    const balance = getBalance(customer.statement)

    return res.status(200).json(balance)
})

app.get('/statement', verifyIfExistsAccountCpf, async (req, res) => {
    const {customer} = req

    return res.json(customer.statement)
})

app.get('/statement/todate', verifyIfExistsAccountCpf, async (req, res) => {
    const {customer} = req
    const {date} = req.query
    const dateformat = new Date(date + ' 00:00')

    const statementdate = customer.statement.filter((statement) => new Date(dateformat).toDateString() === statement.created_at.toDateString())

    return res.status(200).json(statementdate)
})

app.post('/deposit', verifyIfExistsAccountCpf, async (req, res) => {
    const {description, ammount} = req.body

    req.customer.statement.push({description, ammount, created_at: new Date(), type: 'credit'})

    return res.status(200).json(req.customer.statement)
})

app.post('/withdraw', verifyIfExistsAccountCpf, async (req, res) => {
    const {ammount} = req.body
    const {customer} = req
    const balance = getBalance(customer?.statement)

    if (balance < ammount) {
        return res.status(400).json(
        {
            err: 'Sado insuficiente!'
        })
    }

    customer.statement.push({ammount, created_at: new Date(), type: 'debit'})

    return res.status(200).json(customer.statement)
})
app.listen(3000, () => {
    console.log('server running http://localhost:3000')
})

