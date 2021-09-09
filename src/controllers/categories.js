import asyncWrap from "../utils/asyncWrap";
import Category from "../services/categories";

const create = asyncWrap(async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
});

const find = asyncWrap(async (req, res) => {
  if (!req.params.id) {
    const categories = await Category.findAll({
      ...req.query,
      withDeleted: req.query.withDeleted === "true" ? true : false,
      onlyDeleted: req.query.onlyDeleted === "true" ? true : false,
      all: req.query.all === "true" ? true : false,
    });
    res.json(categories);
  } else {
    const category = await Category.find(req.params.id, {
      ...req.query,
      withDeleted: req.query.withDeleted === "true" ? true : false,
      onlyDeleted: req.query.onlyDeleted === "true" ? true : false,
    });
    res.json(category);
  }
});

const patch = asyncWrap(async (req, res) => {
  const category = await Category.patch(req.params.id, req.body);
  res.json(category);
});

const deleteOne = asyncWrap(async (req, res) => {
  const category = await Category.patch(req.params.id, {
    hardDelete: req.query.hardDelete === "true" ? true : false,
  });
  res.json(category);
});

const restore = asyncWrap(async (req, res) => {
  const category = await Category.restore(req.params.id);
  res.json(category);
});

const CategoryController = { create, find, patch, deleteOne, restore };
export default CategoryController;
