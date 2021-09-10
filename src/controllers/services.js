import asyncWrap from "../utils/asyncWrap";
import Service from "../services/services";

const create = asyncWrap(async (req, res) => {
  const service = await Service.create(req.body);
  res.json(service);
});

const find = asyncWrap(async (req, res) => {
  if (!req.params.id) {
    const services = await Service.findAll({
      ...req.query,
      withDeleted: req.query.withDeleted === "true" ? true : false,
      onlyDeleted: req.query.onlyDeleted === "true" ? true : false,
      all: req.query.all === "true" ? true : false,
    });
    res.json(services);
  } else {
    const service = await Service.find(req.params.id, {
      ...req.query,
      withDeleted: req.query.withDeleted === "true" ? true : false,
      onlyDeleted: req.query.onlyDeleted === "true" ? true : false,
    });
    res.json(service);
  }
});

const patch = asyncWrap(async (req, res) => {
  const service = await Service.patch(req.params.id, req.body);
  res.json(service);
});

const deleteOne = asyncWrap(async (req, res) => {
  const service = await Service.patch(req.params.id, {
    hardDelete: req.query.hardDelete === "true" ? true : false,
  });
  res.json(service);
});

const restore = asyncWrap(async (req, res) => {
  const service = await Service.restore(req.params.id);
  res.json(service);
});

const ServiceController = { create, find, patch, deleteOne, restore };
export default ServiceController;
