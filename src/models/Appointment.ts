import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider: string

  @Column('time with time zone')
  date: Date
}
// O constructor serve para quando criar uma nova instancia de Appointments possamos passar os parametros

export default Appointment
