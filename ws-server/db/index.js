import cassandra from 'cassandra-driver';
export const TimeUuid = cassandra.types.TimeUuid;

const dbClient = new cassandra.Client({ contactPoints: ['cassandra'], keyspace: 'chat' });
dbClient.connect(err => {
  if (err) { console.error(err) }
});

export default dbClient;
