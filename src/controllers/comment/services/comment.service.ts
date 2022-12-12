/* models */
import { Comment, User, Entries } from '@app/repositories/database/models'

/* dtos */
import { IComment, ICommentByBlogs } from './dtos/comment.dto'

class CommentService {
  async saveComment ({ userId, blogId, content }: IComment): Promise<Comment> {
    const data = await Comment.create({ userId, blogId, content })
    return data
  }

  async findCommmentsByEntry ({ id }: ICommentByBlogs): Promise<Comment[]> {
    const data = await Comment.findAll({ include: [User, { model: Entries, where: { id } }] })
    return data
  }
}

const commentService = new CommentService()
export default commentService
