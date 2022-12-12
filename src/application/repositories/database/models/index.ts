import { AppDatabaseRepo } from '../index'
/* models */
import { User } from './user.model'
import { Entries } from './entries.model'
import { Comment } from './comment.model'

AppDatabaseRepo.addModels([User, Entries, Comment])

export { User, Entries, Comment }
