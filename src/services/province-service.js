import ProvinceRepository from '../repositories/province-repository.js';

const repo = new ProvinceRepository()
export default class ProvinceService {
  getAllAsync = async () => {
    const returnArray = await repo.getAllAsync();
    console.log('servicio', returnArray);
    return returnArray;
  }

  getByIdAsync = async (id) => {
    const returnEntity = await repo.getByIdAsync(id);
    return returnEntity;
  }

  createAsync = async(entity)=> {
      const returnArray = await repo.createAsync(entity)
      return returnArray
  }

  updateAsync = async(entity)=> {
      const returnArray = await repo.updateAsync(entity)
      return returnArray
  }

  DeleteByIdAsync = async(id)=> {
      const returnArray = await repo.DeleteByIdAsync(id)
      return returnArray
  }
}

