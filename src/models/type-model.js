import _ from 'lodash';
const {knex} = require('../util/db').connect();


var _makeTypeRow = function () {

  const dbRow = {
    'name': 'drums',
  };

  return dbRow;

};

// GET
var getAll = function () {

  return knex('types')
    .select(
      '*'
    ).
    from('types')
    .then(rows => {
      if (_.isEmpty(rows)) {

        return null;
      }

      return rows[0];
    });

};

// POST
var createOrUpdate = function () {

  const typeRow = _makeTypeRow();

  return knex('types').returning('id').insert(typeRow)
    .then(rows => {
      if(_.isEmpty(rows)) {
        throw new Error('Type row creation failed: ' + typeRow);
      }

      return rows.length;
    });
};

// GET
var getById = function (id) {

};

// DELETE
var deleteById = function (id) {

};



export {
  getAll,
  createOrUpdate,
  getById,
  deleteById
};
