drop keyspace if exists chat;

CREATE KEYSPACE chat
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

use chat;

CREATE TABLE messages (
  channel_id int,
  user_id int,
  content text,
  sent_time timeuuid,
  PRIMARY KEY(channel_id, sent_time)
);
