import TravelRepository from "./travelRepository.js";


const travelRepository = new TravelRepository();

export default class TravelApi{

    async getAll(req, res){
        const travels =  await travelRepository.getAll();
        res.status(200).json({travels});
    }

    async getById(req, res){
        const travel =  await travelRepository.getById(req.params.id);
        res.status(200).json({travel});
    }

    async createTravel(req, res){
        const insertId =  await travelRepository.createTravel(req.body);
        res.status(200).json(insertId);
    }

    async updateTravel(req, res){
        const affectedRow =  await travelRepository.updateTravel(req.params.id, req.body);
        res.status(200).json(affectedRow);
    }

    async deleteTravel(req, res){
        const affectedRow =  await travelRepository.deleteTravel(req.params.id);
        res.status(200).json(affectedRow);
    }
}