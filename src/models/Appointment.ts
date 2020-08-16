import { uuid } from 'uuidv4'
class Appointment {
  id: string
  provider: string
  date: Date

  // A linha seguinte (como se fosse uma função) Omit<> recebe o primeiro parametro que é o tipo e o segundo a variavel que será omitido
  // serve para esse caso que estamos criando uma variavel estatica a partir de uma biblioteca externa
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid()
    this.provider = provider;
    this.date = date
  }
}
// O constructor serve para quando criar uma nova instancia de Appointments possamos passar os parametros

export default Appointment
