const path = require('path')
const express = require('express')

const AppError = require('./utils/appError')
const rootRouter = require('./routes/rootRouter');
const clientRouter = require('./routes/clientRouter');
const tokenRouter = require('./routes/tokenRouter');
const transactionRouter = require('./routes/transactionRouter');

const app = express()

app.use(express.static(path.join(__dirname, '../public')))

if (process.env.NODE_ENV === 'development') {
  // Development notifications
  // And tools
}

// If it is need to limit on our side
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// })
// app.use('/api', limiter)

app.use(express.json({ limit: '10kb' }))

// Our core middleware
app.use((req, res, next) => {
  // req.requestTime = new Date().toISOString();
  next()
})

app.use('/', rootRouter)
app.use('/api/v1/clients', clientRouter)
app.use('/api/v1/token', tokenRouter)
app.use('/api/v1/transaction', transactionRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
