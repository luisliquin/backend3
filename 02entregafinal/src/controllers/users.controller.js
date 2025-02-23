import { usersService } from "../services/index.js";

const getAllUsers = async (req, res) => {
  const users = await usersService.getAll();
  res.send({ status: "success", payload: users });
};

const getUser = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersService.getUserById(userId);
  if (!user)
    return res.status(404).send({ status: "error", error: "Usuario no encontrado" });
  res.send({ status: "success", payload: user });
};

const updateUser = async (req, res) => {
  const updateBody = req.body;
  const userId = req.params.uid;
  const user = await usersService.getUserById(userId);
  if (!user)
    return res.status(404).send({ status: "error", error: "Usuario no encontrado" });
  const result = await usersService.update(userId, updateBody);
  res.send({ status: "success", message: "User updated" });
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.uid;

    const user = await usersService.getUserById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ status: "error", error: "Usuario no encontrado" });
    }

    await usersService.delete(userId);

    res.send({ status: "success", message: "User deleted" });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Error del server" });
  }
};

export default {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
};
