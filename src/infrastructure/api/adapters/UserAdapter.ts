import { User } from "../../../domain/models/User";
import { UserDTO } from "../dto/UserDTO";

export class UserAdapter {
  static toDomain(userDTO: UserDTO): User {
    return {
      id: userDTO.id,
      username: userDTO.username,
      email: userDTO.email,
      password: userDTO.password,
    };
  }

  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
