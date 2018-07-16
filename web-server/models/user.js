import postgresDB from '../db/postgres';

const USERS_TABLE = 'users';

const create = async ({ username, password }) => {
  let id;
  console.log('CREATING USER', username, password)
  try {
    [ id ] = await postgresDB(USERS_TABLE)
      .returning('id')
      .insert({ username, password });
  } catch(error) {
    console.error('DB: could not create user with password', error);
    throw error;
  }

  return id;
}

const findBy = async (params) => {
  let user;
  try {
    user = await postgresDB(USERS_TABLE)
      .first()
      .where(params);
  } catch(error) {
    console.error('DB: could not create user with password', error);
    throw error;
  }

  return user;
}

export default {
  create,
  findBy,
};
