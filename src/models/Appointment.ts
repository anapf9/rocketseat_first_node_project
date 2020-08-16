import { uuid } from 'uuidv4'
class Appointment {
  id: string
  provider: string
  date: Date

  constructor(provider: string, date: Date) {
    this.id = uuid()
    this.provider = provider;
    this.date = date
  }
}
// O constructor serve para quando criar uma nova instancia de Appointments possamos passar os parametros

export default Appointment
