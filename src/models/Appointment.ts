import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import User from './User'
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider_id: string
  // Quantos usuários o appointments tem? 1, o prestador de serviço
  // Quantos serviços o usuário pode prestar? Muitos
  // Como estamos dentro de agendamento então existem muitos agendamento ppara um provider
  @ManyToOne(() => User) // esta na documentação
  @JoinColumn({ name: 'provider_id' }) // qual coluna vai identifica qual o provider deste appointments
  provider: User

  @Column('time with time zone')
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
// O constructor serve para quando criar uma nova instancia de Appointments possamos passar os parametros

export default Appointment
