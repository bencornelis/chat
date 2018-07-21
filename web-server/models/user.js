import postgresDB from '../db/postgres';
import * as R from 'ramda';
import bcrypt from 'bcryptjs';

export const USERS_TABLE = 'users';
const CREATE_FIELDS = [ 'username', 'password' ];

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

const createMany = async (usersData) => {
  const pickFields   = R.pick(CREATE_FIELDS);
  const hashPassword = password => bcrypt.hashSync(password, 8);
  const withHashedPassword = userData => {
    return R.assoc('password', hashPassword(userData.password))(userData)
  };

  const prepareUserData = R.pipe(
    pickFields,
    withHashedPassword
  );

  const usersInsertData = R.map(prepareUserData)(usersData);
  let ids;
  try {
    ids = await postgresDB
      .insert(usersInsertData)
      .into(USERS_TABLE)
      .returning('id');
  } catch(error) {
    console.error('DB: could not create users', usersInsertData, error);
    throw error;
  }

  return ids;
}

const create = async (userData) => {
  const [ id ] = await createMany(userData);
  return id;
}

export default {
  findBy,
  getByIds,
  createMany,
  create,
};
