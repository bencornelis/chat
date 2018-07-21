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
  } catch (error) {
    console.error('DB: getting all channels', error);
    throw error;
  }

  return channels;
}

const getMessages = async (channelId) => {
  const query = 'SELECT * FROM messages WHERE channel_id = ? ORDER BY sent_time ASC';

  let result;
  try {
    result = await cassandraDB.execute(query, [ channelId ], { prepare : true });
  } catch (error) {
    console.error(`DB: getting all messages for channel ${channelId}`, error);
    throw error;
  }

  const messages = convertKeys(result.rows);
  return messages;
}

export default {
  getAll,
  getMessages,
};
