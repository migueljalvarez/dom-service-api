import { profileModel as profile } from "../models/profiles";
import AplicationError from "../utils/AplicationError";
import { pick, omit } from "lodash";

const create = async (data) => {
  const document = await profile.create(data);
  return document;
};

const findAll = async ({
  withDeleted = false,
  onlyDeleted = false,
  offset = 0,
  limit = 10,
  sort = "createdAt _id",
  all = false,
  ...criteria
} = {}) => {

  const document = await profile.paginate(
    { ...pick(criteria, profile.getAllowedProperties()) },
    {
      offset,
      limit: all ? 99999999 : limit,
      sort,
      customFind: withDeleted
        ? "findWithDeleted"
        : onlyDeleted
        ? "findDeleted"
        : "find",
      customCount: withDeleted
        ? "countDocumentsWithDeleted"
        : onlyDeleted
        ? "countDocumentsDeleted"
        : "countDocuments",
    }
  );
  return document;
};

const find = async (
  id,
  { withDeleted = false, onlyDeleted = false, ...criteria } = {}
) => {
  let document;
  if (withDeleted) {
    document = await profile.findOneWithDeleted({
      _id: id,
      ...pick(criteria, profile.getAllowedProperties()),
    });
  } else if (onlyDeleted) {
    document = await profile.findOneDeleted({
      _id: id,
      ...pick(criteria, profile.getAllowedProperties()),
    });
  } else {
    document = await profile.findOne({
      _id: id,
      ...pick(criteria, profile.getAllowedProperties()),
    });
  }
  if (!document) {
    throw new AplicationError(
      `profile  with id: ${id} has removed o disabled`,
      404
    );
  } else {
    return document;
  }
};

const patch = async (id, fields = {}) => {
  const document = await profile.findOneAndUpdate(
    { _id: id },
    omit(fields, ["_id"]),
    {
      new: true,
    }
  );
  if (!document) {
    throw new AplicationError(
      `document  with id: ${id} has removed o disabled`,
      404
    );
  } else {
    return document;
  }
};

const deleteOne = async (id, { hardDelete = false } = {}) => {
  const document = await find(id, { withDeleted: true });
  let response = null;
  if (document) {
    if (hardDelete) {
      response = document.remove();
    } else {
      response = document.delete();
    }
  } else {
    throw new AplicationError(
      `document with id: ${id} has removed o disabled`,
      404
    );
  }
  return response;
};

const restore = async (id) => {
  const document = await find(id, { onlyDeleted: true });
  let response = null;
  if (document) {
    response = await document.restore();
  } else {
    throw new AplicationError(
      `document with id: ${id} has removed o disabled`,
      404
    );
  }
  return response;
};

const Prfile = { create, findAll, find, patch, deleteOne, restore };
export default Prfile;
