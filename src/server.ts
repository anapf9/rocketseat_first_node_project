import 'reflect-metadata'
import express from 'express'
import routes from './routes'
import './database/index'
import uploadConfig from './config/upload'

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

// app.get('/', (request, response) => {
//   return response.json({ message: 'Oie mudei' })
// })

app.listen(3333, () => {
  console.log('aki 😀')
})
