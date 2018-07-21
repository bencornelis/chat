import postgresDB from '../db/postgres';

export const USERS_TABLE = 'users';

const create = async ({ username, password }) => {
  let id;
  try {
    [ id ] = await postgresDB.table(USERS_TABLE)
      .insert({ username, password })
      .returning('id');
  } catch(error) {
    console.error('DB: could not create user with password', error);
    throw error;
  }

  return id;
}

const findBy = async (params) => {
  let user;
  try {
    user = await postgresDB.first()
      .from(USERS_TABLE)
      .where(params);
  } catch(error) {
    console.error('DB: could not create user with password', error);
    throw error;
  }

  return user;
}

const getByIds = async (userIds) => {
  let users;
  try {
    users = await postgresDB.select()
      .from(USERS_TABLE)
      .whereIn('id', userIds);
  } catch(error) {
    console.error('DB: could not retrieve users', error);
    throw error;
  }

  return users;
}

export default {
  create,
  findBy,
  getByIds,
};
