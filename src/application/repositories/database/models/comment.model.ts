import { Optional } from 'sequelize'
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Entries } from './entries.model'
import { User } from './user.model'

interface CommentAttrs {
  id: number
  content: string
  userId: number
  blogId: number
  active?: boolean
}

interface CommentCreationAttrs extends Optional<CommentAttrs, 'id'> {}

@Table({ timestamps: true })
export class Comment extends Model<CommentAttrs, CommentCreationAttrs> {
  @Column({ allowNull: false, type: DataType.TEXT })
    content!: string

  @ForeignKey(() => User)
  @Column({ allowNull: false })
    userId!: number

  @ForeignKey(() => Entries)
  @Column({ allowNull: false })
    blogId!: number

  @Column({ defaultValue: true, allowNull: false })
    active?: boolean

  @BelongsTo(() => User)
    user!: User

  @BelongsTo(() => Entries)
    entry!: Entries
}
