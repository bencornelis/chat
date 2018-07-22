import dbClient, { TimeUuid } from '../db';

const write = (msg) => {
  const { channelId, userId, content } = msg;

  const query = 'INSERT INTO messages (channel_id, user_id, content, sent_time) VALUES(?, ?, ?, ?)';
  try {
    await dbClient.execute(
      query,
      [ channelId, userId, content, TimeUuid.now() ],
      { prepare : true }
    );
  } catch (error) {
    console.error('ERROR: inserting message', error);
  }
}

export default {
  write
}
