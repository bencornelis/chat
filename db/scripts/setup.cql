drop keyspace if exists chat;

CREATE KEYSPACE chat
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

use chat;

CREATE TABLE messages (
  channel_id text,
  content text,
  sent_time timeuuid,
  PRIMARY KEY(channel_id, sent_time)
);

CREATE TABLE channels (
  channel_id text,
  channel_name text,
  PRIMARY KEY(channel_id)
);

INSERT INTO channels (channel_id, channel_name) VALUES ('g', 'general');
INSERT INTO channels (channel_id, channel_name) VALUES ('j', 'jobs');
INSERT INTO channels (channel_id, channel_name) VALUES ('r', 'ruby');
