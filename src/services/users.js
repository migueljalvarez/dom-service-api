import user from "../models/users";
import profile from "../models/profiles";
import AplicationError from "../utils/AplicationError";
import { pick, omit } from "lodash";
import bcrypt from "bcryptjs";






const create = async (data) => {
  const passwordHash = bcrypt.hashSync(data.password, 10);
  const document = await user.create({ ...data, password: passwordHash });
  await profile.create({ ...data.Profiles, user: document._id });
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
  const document = await user.paginate(
    { ...pick(criteria, user.getAllowedProperties()) },
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
    document = await user.findOneWithDeleted({
      _id: id,
      ...pick(criteria, user.getAllowedProperties()),
    });
  } else if (onlyDeleted) {
    document = await user.findOneDeleted({
      _id: id,
      ...pick(criteria, user.getAllowedProperties()),
    });
  } else {
    document = await user.findOne({
      _id: id,
      ...pick(criteria, user.getAllowedProperties()),
    });
  }
  if (!document) {
    throw new AplicationError(
      `user  with id: ${id} has removed o disabled`,
      404
    );
  } else {
    return document;
  }
};

const patch = async (id, fields = {}) => {
  const document = await user.findOneAndUpdate(
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

const customFindOne = async ({
  withDeleted = false,
  onlyDeleted = false,
  ...criteria
} = {}) => {
  let document;
  if (withDeleted) {
    document = await user.findOneWithDeleted({
      ...pick(criteria, user.getAllowedProperties()),
    });
  } else if (onlyDeleted) {
    document = await user.findOneDeleted({
      ...pick(criteria, user.getAllowedProperties()),
    });
  } else {
    document = await user.findOne({
      ...pick(criteria, user.getAllowedProperties()),
    });
  }
  if (!document) {
    throw new AplicationError(
      `user  with id: ${id} has removed o disabled`,
      404
    );
  } else {
    return document;
  }
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

const User = { create, findAll, find, patch, deleteOne, restore, customFindOne };
export default User;
