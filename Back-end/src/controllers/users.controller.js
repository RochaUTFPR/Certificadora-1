const UserModel = require("../model/user.model");

const notPermissionMessage = {
    error: "@user/not-Permission",
    message: "user not permission",
};


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

const  getByLogged = async(request, response) => {

    try {
        const userId = request.user._id;

        const user = await UserModel.findById(userId, { password: 0 });

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

        const userExistem = await UserModel.findOne({ name })

        if (userExistem) {
            throw new Error();
        }


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
    const { id } = request.params;
    const { name, password, profile, level, punctuation } = request.body;

    if (!(request.user._id.toString() === id)) {
        return response.status(401).json(notPermissionMessage);
    }

    try {

        const userUpdated = await UserModel.findByIdAndUpdate(
            id,
            {
                name,
                password,
                profile,
                level,
                punctuation,
            },
        );

        if (!userUpdated) {
            throw new Error();
        }

        return response.json(userUpdated);
        
    } catch (err) {
        return response.status(400).json({
            error: "@users/update",
            message: err.message || `User not found ${id}`,
        });
        
    }
};

const remove = async(request, response) => {
    const { id } = request.params;

    if (!(request.user._id.toString() === id)) {
        return response.status(401).json(notPermissionMessage);
    }

    try {
        const userDeleted = await UserModel.findByIdAndDelete(id);

        if (!userDeleted) {
            throw new Error();
        }

        return response.status(204).send();
        
    } catch (err) {
        return response.status(400).json({
            error: "@users/remove",
            messaage: err.message || `User not found ${id}`,
        });
        
    }
};

module.exports = {
    list,
    getById,
    create,
    getByLogged,
    update,
    remove,
  };