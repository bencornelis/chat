import postgresDB from '../db/postgres';

const USERS_TABLE = 'users';

const createUser = async ({ name, password }) => {
  try {
    await postgresDB(USERS_TABLE).insert({ name, password });
  } catch(error) {
    console.error('DB: could not create user with password', error);
    throw error;
  }
}

export default {
  createUser
};
