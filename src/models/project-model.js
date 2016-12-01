import _ from 'lodash';
const {knex} = require('../util/db').connect();

import dummyData from './../../data/data';


var _makeProjectRow = function (project) {

  const dbRow = {
    'id': project.id,
    'name': project.name,
    'user_id': project.user
  };
  
  
  

  return dbRow;

};

// GET
var getAll = function () {

  return knex('projects')
      .select(
        '*'
      ).
      from('projects')
      .then(rows => {
        if (_.isEmpty(rows)) {

          return null;
        }

        return rows[0];
      });

};

// POST
var createOrUpdate = function (project) {
  const projectRow = _makeProjectRow(project);
  return knex('projects').returning('id').insert(projectRow);
};

// GET
var getById = function (id) {
  return dummyData;
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
