import UserRepository from '../repositories/user-repository.js';

export default class ProvinceService {
  // Clase con lógica de negocio.
  getAllAsync = async () => {
    const repo = new UserRepository();
    const returnArray = await repo.getAllAsync();
    console.log('servicio', returnArray);
    return returnArray;
  }

  getByIdAsync = async (id) => {
    const repo = new UserRepository();
    const returnEntity = await repo.getByIdAsync(id);

    return returnEntity;

  }
    createAsync = async(entity)=> {
      const repo = new UserRepository()
      const returnArray = await repo.createAsync(entity)
      return returnArray
  }
  LoginAsync = async(entity)=> {
    const repo = new UserRepository()
    const returnArray = await repo.LoginAsync(entity)
    return returnArray
}
}

