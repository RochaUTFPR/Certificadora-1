const questionModel = require("../model/question.model");

const list = async(request, response) => {

    const { order } = request.query;

    try {

        orderint = parseInt(order)

        if(orderint === 1){

            const questions = await questionModel.find().sort({levelQuestion:-1});
            return response.json(questions);

        }else if(orderint === 2){
            const questions = await questionModel.find().sort({levelQuestion: 1 });
            return response.json(questions);

        }else{
            return response.json("ERRO");
        }
        
    } catch (err) {
        return response.status(400).json({
            error: "questions/list",
            message: "Failed to list questions",
        });
        
    }
};

const  getById = async(request, response) => {
    const { id } = request.params;

    try {
        const question = await questionModel.findById(id);

        if (!question) {
          throw new Error();
        }
    
        return response.json(question);
        
    } catch (err) {
        return response.status(400).json({
            error: "@questions/getById",
            message: err.message || `User not found ${id}`,
        });
    }
};

const  getByNumberLevel = async(request, response) => {
    const { num, lev } = request.query;

    

    try {

        numint = parseInt(num);
        levint = parseInt(lev)

        const question = await questionModel.find({number: numint, levelQuestion: levint});

        if (!question) {
          throw new Error();
        }
    
        return response.json(question);
        
    } catch (err) {
        return response.status(400).json({
            error: "@questions/getById",
            message: err.message || `User not found ${id}`,
        });
    }
};

const create = async(request, response) => {
    const { number, description, levelQuestion, result } = request.body;

    try {

        const question = await questionModel.create({
            number,
            description,
            levelQuestion,
            result,
        });
        return response.status(201).json(question);
        
    } catch (err) {
        return response.status(400).json({
            error: "@questions/create",
            message: err.message || "Failed to create questions",
        });
        
    }
};

const update = async(request, response) => {
    const { id } = request.params;
    const { number, description, levelQuestion, result } = request.body;

    try {

        const questionUpdated = await questionModel.findByIdAndUpdate(
            id,
            {
                number,
                description,
                levelQuestion,
                result,
            },
        );

        if (!questionUpdated) {
            throw new Error();
        }

        return response.json(questionUpdated);
        
    } catch (err) {
        return response.status(400).json({
            error: "@questions/update",
            message: err.message || `question not found ${id}`,
        });
        
    }
};

const remove = async(request, response) => {
    const { id } = request.params;

    try {
        const questionDeleted = await questionModel.findByIdAndDelete(id);

        if (!questionDeleted) {
            throw new Error();
        }

        return response.status(204).send();
        
    } catch (err) {
        return response.status(400).json({
            error: "@question/remove",
            messaage: err.message || `question not found ${id}`,
        });
        
    }
};

module.exports = {
    list,
    getById,
    create,
    getByNumberLevel,
    update,
    remove,
};