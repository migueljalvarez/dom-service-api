import asyncWrap from "../utils/asyncWrap";
import User from "../services/users";
import { buildUserDto } from "../dto/userDto";
const create = asyncWrap(async (req, res) => {
  const user = await User.create(req.body);
  const userDto = await buildUserDto(user);
  res.json(userDto);
});

const find = asyncWrap(async (req, res) => {
  if (!req.params.id) {
    const users = await User.findAll({
      ...req.query,
      withDeleted: req.query.withDeleted === "true" ? true : false,
      onlyDeleted: req.query.onlyDeleted === "true" ? true : false,
      all: req.query.all === "true" ? true : false,
    });
    res.json(users);
  } else {
    const user = await User.find(req.params.id, {
      ...req.query,
      withDeleted: req.query.withDeleted === "true" ? true : false,
      onlyDeleted: req.query.onlyDeleted === "true" ? true : false,
    });
    res.json(user);
  }
});

const patch = asyncWrap(async (req, res) => {
  const user = await User.patch(req.params.id, req.body);
  res.json(user);
});

const deleteOne = asyncWrap(async (req, res) => {
  const user = await User.patch(req.params.id, {
    hardDelete: req.query.hardDelete === "true" ? true : false,
  });
  res.json(user);
});

const restore = asyncWrap(async (req, res) => {
  const user = await User.restore(req.params.id);
  res.json(user);
});

const UserController = { create, find, patch, deleteOne, restore };
export default UserController;
