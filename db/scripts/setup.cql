drop keyspace if exists chat;

CREATE KEYSPACE chat
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

use chat;

CREATE TABLE messages (
  content text,
  sent_time timeuuid,
  PRIMARY KEY(sent_time)
);

INSERT INTO messages (content, sent_time) VALUES('helloo', now());

SELECT * from messages;
