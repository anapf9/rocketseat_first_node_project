import { Router, response } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateApointmentService'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()

  return res.json(appointments)
})

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider, date } = req.body

    // const parsedDate = startOfHour(parseISO(date))
    const parsedDate = parseISO(date)

    const createAppointmentService = new CreateAppointmentService()

    const appointment = await createAppointmentService.execute({ date: parsedDate, provider })

    return res.json(appointment)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
})

export default appointmentsRouter
