import StayRepository from "./stayRepository.js";


const stayRepository = new StayRepository();

export default class StayApi{

    async getAll(req, res){
        const stays =  await stayRepository.getAll();
        res.status(200).json({stays});
    }

    async getById(req, res){
        const stay =  await stayRepository.getById(req.params.id);
        res.status(200).json({stay});
    }

    async createStay(req, res){
        const insertId =  await stayRepository.createStay(req.body);
        res.status(200).json(insertId);
    }

    async updateStay(req, res){
        const affectedRow =  await stayRepository.updateStay(req.params.id, req.body);
        res.status(200).json(affectedRow);
    }

    async deleteStay(req, res){
        const affectedRow =  await stayRepository.deleteStay(req.params.id);
        res.status(200).json(affectedRow);
    }
}