import { serviceModel as services } from "../models/services";
import AplicationError from "../utils/AplicationError";
import { pick, omit } from "lodash";

const create = async (data) => {
  const document = await services.create(data);
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

  const document = await services.paginate(
    { ...pick(criteria, services.getAllowedProperties()) },
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
    document = await services.findOneWithDeleted({
      _id: id,
      ...pick(criteria, services.getAllowedProperties()),
    });
  } else if (onlyDeleted) {
    document = await services.findOneDeleted({
      _id: id,
      ...pick(criteria, services.getAllowedProperties()),
    });
  } else {
    document = await services.findOne({
      _id: id,
      ...pick(criteria, services.getAllowedProperties()),
    });
  }
  if (!document) {
    throw new AplicationError(
      `services  with id: ${id} has removed o disabled`,
      404
    );
  } else {
    return document;
  }
};

const patch = async (id, fields = {}) => {
  const document = await services.findOneAndUpdate(
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

const Service = { create, findAll, find, patch, deleteOne, restore };
export default Service;
