import CustomerRepository from "./customerRepository.js";


const customerRepository = new CustomerRepository();

export default class CustomerApi{

    async getAll(req, res){
        const customers =  await customerRepository.getAll();
        res.status(200).json({customers});
    }

    async getById(req, res){
        const customer =  await customerRepository.getById(req.params.id);
        res.status(200).json({customer});
    }

    async createCustomer(req, res){
        const insertId =  await customerRepository.createCustomer(req.body);
        res.status(200).json(insertId);
    }

    async updateCustomer(req, res){
        const affectedRow =  await customerRepository.updateCustomer(req.params.id, req.body);
        res.status(200).json(affectedRow);
    }

    async deleteCustomer(req, res){
        const affectedRow =  await customerRepository.deleteCustomer(req.params.id);
        res.status(200).json(affectedRow);
    }
}