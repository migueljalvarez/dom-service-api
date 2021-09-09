import { categoryModel as category } from "../models/categories";
import AplicationError from "../utils/AplicationError";
import { pick, omit } from "lodash";

const create = async (data) => {
  const document = await category.create(data);
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

  const document = await category.paginate(
    { ...pick(criteria, category.getAllowedProperties()) },
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
    document = await category.findOneWithDeleted({
      _id: id,
      ...pick(criteria, category.getAllowedProperties()),
    });
  } else if (onlyDeleted) {
    document = await category.findOneDeleted({
      _id: id,
      ...pick(criteria, category.getAllowedProperties()),
    });
  } else {
    document = await category.findOne({
      _id: id,
      ...pick(criteria, category.getAllowedProperties()),
    });
  }
  if (!document) {
    throw new AplicationError(
      `category  with id: ${id} has removed o disabled`,
      404
    );
  } else {
    return document;
  }
};

const patch = async (id, fields = {}) => {
  const document = await category.findOneAndUpdate(
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

const Category = { create, findAll, find, patch, deleteOne, restore };
export default Category;
