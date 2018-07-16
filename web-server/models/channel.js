import cassandraDB from '../db/cassandra';
import postgresDB from '../db/postgres';
import { camelCaseKeys } from '../utils/case';
import * as R from 'ramda';

const convertKeys = R.map(camelCaseKeys);

const getAll = async () => {
  const query = 'SELECT * FROM channels';

  let result;
  try {
    result = await cassandraDB.execute(query);
  } catch (error) {
    console.error('DB: getting all channels', error);
    throw error;
  }

  const channels = convertKeys(result.rows);
  return channels;
}

const getMessages = async (channelId) => {
  const query = 'SELECT * FROM messages WHERE channel_id = ? ORDER BY sent_time ASC';

  let result;
  try {
    result = await cassandraDB.execute(query, [ channelId ]);
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
