import cassandraDB from '../db/cassandra';
import postgresDB from '../db/postgres';
import { camelCaseKeys } from '../utils/case';
import * as R from 'ramda';

const convertKeys = R.map(camelCaseKeys);

export const CHANNELS_TABLE = 'channels';

const getAll = async () => {
  let channels;
  try {
    channels = await postgresDB.select().from(CHANNELS_TABLE);
  } catch(error) {
    console.error('DB: getting all channels', error);
    throw error;
  }

  return channels;
}

const getByNames = async (channelNames) => {
  let channels;
  try {
    channels = await postgresDB.select()
      .whereIn('name', channelNames)
      .from(CHANNELS_TABLE);
  } catch(error) {
    console.error('DB: getting channels with names', channelNames, error);
    throw error;
  }

  return channels;
}

const getMessages = async (channelId) => {
  const query = 'SELECT * FROM messages WHERE channel_id = ? ORDER BY sent_time ASC';

  let result;
  try {
    result = await cassandraDB.execute(query, [ channelId ], { prepare : true });
  } catch(error) {
    console.error(`DB: getting all messages for channel ${channelId}`, error);
    throw error;
  }

  const messages = convertKeys(result.rows);
  return messages;
}

const createMany = async (channelNames) => {
  const existingChannels = await getByNames(channelNames);
  if (!R.isEmpty(existingChannels)) {
    throw `Channels with names ${existingChannels.map(R.prop('name'))} already exist`;
  }

  const channelsData = channelNames.map(name => ({ name }));
  let ids;
  try {
    ids = await postgresDB.insert(channelsData)
      .into(CHANNELS_TABLE)
      .returning('id');
  } catch(error) {
    console.log('DB: could not insert channels', channelNames, error);
    throw error;
  }

  return ids;
}

const create = async (channelName) => {
  const [ id ] = await createMany([ channelName ]);
  return id;
}

export default {
  getAll,
  getMessages,
  getByNames,
  createMany,
  create,
};
