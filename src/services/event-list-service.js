import EventListRepository from "../repositories/event-list-repository.js";

export default class EventListService {
    getAllAsync = async () => {
        const repo = new EventListRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getDetailsAsync = async (id) => {
        const repo = new EventListRepository();
        const returnArray = await repo.getDetailsAsync(id);
        return returnArray;
    }

    getParticipantsAsync = async (id, filters) => {
        const repo = new EventListRepository();
        const returnArray = await repo.getParticipantsAsync(id, filters);
        return returnArray;
    }

    searchEvents = async (query) => {
        const repo = new EventListRepository();
        const returnArray = await repo.searchEvents(query);
        return returnArray;
    }
}