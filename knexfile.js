
var connection = process.env.DATABASE_URL + '?charset=utf-8';

var databaseConfig = {
  client: 'pg',
  connection: connection,
  debug: true,
  pool: {
    min: 2,
    max: 10,
  }
};

console.log('DATABASE_URL=' + databaseConfig.connection);

module.exports = databaseConfig;
