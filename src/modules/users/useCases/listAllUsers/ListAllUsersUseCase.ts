import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.list();
   
    const userAdm = user.find(user => user.id === user_id);

    if(userAdm.admin === false){
      throw new Error("User is not an administrator!");
    }

    if(!userAdm){
      throw new Error("User does not exist!");
    }
    
    return user;
  }
}

export { ListAllUsersUseCase };
