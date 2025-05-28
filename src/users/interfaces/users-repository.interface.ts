import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface UsersRepository {
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User | undefined>;
  addUser(user: CreateUserDto): Promise<User>;
  updateUserFields(id: string, updatedFields: Partial<User>): Promise<User>;
  updateUserPasword(id: string, password: string): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
  isUserPasswordCorrect(id: string, password: string): Promise<boolean | null>;
}
