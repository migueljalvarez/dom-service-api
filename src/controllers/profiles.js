import asyncWrap from "../utils/asyncWrap";
import Profile from "../services/profiles";

const create = asyncWrap(async (req, res) => {
  const profile = await Profile.create(req.body);
  res.json(profile);
});

const find = asyncWrap(async (req, res) => {
  if (!req.params.id) {
    const profiles = await Profile.findAll({
      ...req.query,
      withDeleted: req.query.withDeleted === "true" ? true : false,
      onlyDeleted: req.query.onlyDeleted === "true" ? true : false,
      all: req.query.all === "true" ? true : false,
    });
    res.json(profiles);
  } else {
    const profile = await Profile.find(req.params.id, {
      ...req.query,
      withDeleted: req.query.withDeleted === "true" ? true : false,
      onlyDeleted: req.query.onlyDeleted === "true" ? true : false,
    });
    res.json(profile);
  }
});

const patch = asyncWrap(async (req, res) => {
  const profile = await Profile.patch(req.params.id, req.body);
  res.json(profile);
});

const deleteOne = asyncWrap(async (req, res) => {
  const profile = await Profile.patch(req.params.id, {
    hardDelete: req.query.hardDelete === "true" ? true : false,
  });
  res.json(profile);
});

const restore = asyncWrap(async (req, res) => {
  const profile = await Profile.restore(req.params.id);
  res.json(profile);
});

const ProfileController = { create, find, patch, deleteOne, restore };
export default ProfileController;
