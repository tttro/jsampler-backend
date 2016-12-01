var databaseConfig = require('../../knexfile');
var knex = null;


function connect() {
  if (knex === null) {
    knex = require('knex')(databaseConfig);
  }

  function close(cb) {
    cb = cb || function() {};

    logger.info('Closing database connection ..');
    knex.destroy(function(err) {
      logger.info('Knex pool destroyed');
      cb(err);
    });
  }

  return {
    knex: knex,
    close: close,
    // Return config for convenience
    config: databaseConfig
  };
}

module.exports = {
  connect: connect,
  config: databaseConfig
};
