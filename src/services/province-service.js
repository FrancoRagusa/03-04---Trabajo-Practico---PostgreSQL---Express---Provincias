import ProvinceRepository from '../repositories/province-repository.js';

export default class ProvinceService {
  // Clase con lógica de negocio.
  getAllAsync = async () => {
    const repo = new ProvinceRepository();
    const returnArray = await repo.getAllAsync();
    console.log('servicio', returnArray);
    return returnArray;
  }

  getByIdAsync = async (id) => {
    const repo = new ProvinceRepository();
    const returnEntity = await repo.getByIdAsync(id);

    return returnEntity;

  }
  //createAsync = async (entity) => {.../* hacerlo */...}
  //updateAsync = async (entity) => {.../* hacerlo */...}
  //deleteByIdAsync = async (id) => {.../* hacerlo */...}
}
