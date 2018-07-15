const cassandra = require('cassandra-driver');

const cassandraDb = new cassandra.Client({ contactPoints: ['cassandra'], keyspace: 'chat' });

cassandraDb.connect(err => {
  if (err) { console.error('could not connect to cassandra db', err); }
});

module.exports = cassandraDb;
