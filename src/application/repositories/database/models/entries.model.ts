import { Optional } from 'sequelize'
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './user.model'

interface EntriesAttrs {
  id: number
  image: string
  title: string
  content: string
  authorId: number
  active?: boolean
}

interface EntriesCreationAttrs extends Optional<EntriesAttrs, 'id'> {}

@Table({ timestamps: true })
export class Entries extends Model<EntriesAttrs, EntriesCreationAttrs> {
  @Column({ allowNull: false, type: DataType.TEXT })
    image!: string

  @Column({ allowNull: false })
    title!: string

  @Column({ allowNull: false, type: DataType.TEXT })
    content!: string

  @ForeignKey(() => User)
  @Column({ allowNull: false })
    authorId!: number

  @Column({ defaultValue: true, allowNull: false })
    active?: boolean

  @BelongsTo(() => User)
    user!: User
}
