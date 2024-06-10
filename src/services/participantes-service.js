import EventRepository from '../repositories/participantes-repository.js'

export default class EventService
{
    getAllAsync = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync();
        console.log('servicio', returnArray);
        return returnArray;
    }
    getByIdAsync = async (id) => {
        const repo = new EventRepository();
        const returnEntity = await repo.getByIdAsync(id);
        return returnEntity;
    }
    createAsync = async(entity)=> {
        const repo = new EventRepository()
        const returnArray = await repo.createAsync(entity)
        return returnArray
    }

}