/* sequelize */
import { Op } from 'sequelize'

/* models */
import { User, Entries } from '@app/repositories/database/models'

/* dtos */
import { IEntry, IFindTitle } from './dtos/blog.dto'
import { translateText } from '@app/utils/translate.util'

class BlogService {
  async saveEntry ({ title, content, authorId, image }: IEntry): Promise<Entries> {
    const data = await Entries.create({ title, content, authorId, image })
    return data
  }

  async findTitle ({ title }: IFindTitle): Promise<Entries[]> {
    const translated = await translateText(title)
    const data = await Entries.findAll({ include: [User], where: { title: { [Op.like]: `%${translated}%` } } })
    return data
  }
}

const blogService = new BlogService()
export default blogService
