const UserModel = require("../model/user.model");


const list = async(request, response) => {

    try {
        const users = await UserModel.find({}, { password: 0 });

        return response.json(users);
        
    } catch (err) {
        return response.status(400).json({
            error: "users/list",
            message: "Failed to list users",
        });
        
    }
};

const  getById = async(request, response) => {
    const { id } = request.params;

    try {
        const user = await UserModel.findById(id, { password: 0 });

        if (!user) {
          throw new Error();
        }
    
        return response.json(user);
        
    } catch (err) {
        return response.status(400).json({
            error: "@users/getById",
            message: err.message || `User not found ${id}`,
        });
    }
};

const create = async(request, response) => {
    const { name, password, profile } = request.body;

    try {
        const user = await UserModel.create({
            name,
            password,
            profile,
            level: 1,
            punctuation: 0,
        });
        return response.status(201).json(user);
        
    } catch (err) {
        return response.status(400).json({
            error: "@users/create",
            message: err.message || "Failed to create user",
        });
        
    }
};

const update = async(request, response) => {

    try {
        
    } catch (err) {
        
    }
};

const remove = async(request, response) => {

    try {
        
    } catch (err) {
        
    }
};