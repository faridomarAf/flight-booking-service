const {StatusCodes} = require('http-status-codes');
const { AppError } = require('../utils');

class CrudRepository {
    constructor(model){
        this.model = model
    }


    async create(data){
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data){
        const response = await this.model.destroy({
            where:{
                id: data
            }
        });

        if(!response){
            throw new AppError('Not able to find the resource!', StatusCodes.NOT_FOUND);
        }

        return response;
    }

    async get(data){
        const response = await this.model.findByPk(data);// findByPk: means find by primary-key
        if(!response){
            throw new AppError('Not able to find the resource!', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll(){
        const response = await this.model.findAll();
        return response;
    }
    
    async update(id, data) {
        const [affectedRows] = await this.model.update(data, {
            where: { id: id },
        });
    
        if (affectedRows === 0) {
            throw new AppError('Not able to find the resource!', StatusCodes.NOT_FOUND);
        }
    
        // Fetch and return the updated record
        const updatedRecord = await this.model.findByPk(id);
        return updatedRecord;
    }
    
    
    
    
};

module.exports = CrudRepository;