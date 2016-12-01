import _ from 'lodash';
import crypto from 'crypto';
const {knex} = require('../util/db').connect();


var _makeSoundRow = function (file) {
console.log(file);
  const dbRow = {
    'name': file.originalname,
    'type_id': file.typeId || null,
    'orinalname': file.filename,
    'filename': crypto.createHash('md5').update(file.filename).digest("hex"),
    'size': file.size,

  };

  return dbRow;

};

// GET
var getAll = function () {

  return knex('sounds')
    .select(
      'sounds.*'
    )
    .then(rows => {
      if (_.isEmpty(rows)) {

        return null;
      }

      return rows[0];
    });

};

// POST
var createOrUpdate = function (file) {

  const soundRow = _makeSoundRow(file);

  return knex('sounds').returning('id').insert(soundRow)
    .then(rows => {
      if (_.isEmpty(rows)) {
        throw new Error('User row creation failed: ' + soundRow);
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
