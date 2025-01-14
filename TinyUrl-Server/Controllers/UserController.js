import UserModel from "../Models/UserModel.js"


const UserController = {

    getList: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.json({ users });
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    getById: async (req, res) => {
        const userId = req.params.id
        try {
            const user = await UserModel.findById(userId).populate('links');;
            res.json({ user })
        }
        catch (e) {
            res.status(400).json({ message: e.message })
        }
    },

    add: async (req, res) => {

        const { name, email, password } = req.body;
        try {
            const newUser = await UserModel.create({ name, email, password });
            res.json(newUser);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    
    update: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
            res.json(updatedUser);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await UserModel.findByIdAndDelete(id);
            res.json(deleted);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

}
export default UserController;