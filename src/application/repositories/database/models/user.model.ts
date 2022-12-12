import { Optional } from 'sequelize'
import { Table, Model, Column, HasMany } from 'sequelize-typescript'
import { Comment } from './comment.model'
import { Entries } from './entries.model'

interface UserAttrs {
  id: number
  name: string
  email: string
  password: string
  active?: boolean
}

interface UserCreationAttrs extends Optional<UserAttrs, 'id'> {}

@Table({ timestamps: true })
export class User extends Model<UserAttrs, UserCreationAttrs> {
  @Column({ allowNull: false })
    name!: string

  @Column({ unique: true, allowNull: false })
    email!: string

  @Column({ allowNull: false })
    password!: string

  @Column({ defaultValue: true, allowNull: false })
    active?: boolean

  @HasMany(() => Entries)
    entries!: Entries[]

  @HasMany(() => Comment)
    comments!: Comment[]
}
