
exports.up = function(knex, Promise) {

  return knex.schema.createTable('types', function(table) {
    table.increments('id').primary().index();
    table.string('name').notNullable().index();
  }).
  then(() => {

    return knex.schema.createTable('sounds', function(table) {
      table.bigIncrements('id').primary().index();
      table.string('name').notNullable().index();
      table.string('orginalname').notNullable();
      table.string('mimetype').notNullable().index();
      table.string('filename').unique().notNullable();
      table.integer('size').notNullable();
      table.integer('type_id').nullable();
    });

  }).
  then(() => {

    return knex.schema.createTable('patterns', function(table) {
      table.bigIncrements('id').primary().index();
      table.string('name').notNullable().index();
    });

  }).
  then(() => {

    return knex.schema.createTable('pattern_sounds', function(table) {
      table.bigIncrements('id').primary().index();
      table.integer('sound_id').unsigned().notNullable();
      table.foreign('sound_id')
        .references('id')
        .inTable('sounds')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.integer('pattern_id').unsigned().notNullable();
      table.foreign('pattern_id')
        .references('id')
        .inTable('patterns')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    });

  }).
  then(() => {

    return knex.schema.createTable('users', function (table) {
      table.bigIncrements('id').primary().index();
      table.string('uuid').notNullable().unique().index();
      table.string('name').notNullable();
      table.timestamp('created_at').index().notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').index().notNullable().defaultTo(knex.fn.now());
    });

  }).
  then(() => {

    return knex.schema.createTable('projects', function (table) {
      table.bigIncrements('id').primary().index();
      table.string('name').notNullable().index();
      table.decimal('tempo').notNullable();
      table.json('tracks').nullable();
      table.integer('pattern_sounds_id').unsigned().index();
      table.foreign('pattern_sounds_id')
        .references('id')
        .inTable('pattern_sounds')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

      table.integer('user_id').unsigned().index();
      table.foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

      table.timestamp('created_at').index().notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').index().notNullable().defaultTo(knex.fn.now());

    });

  });
};

exports.down = function(knex, Promise) {

  return knex.schema.dropTableIfExists('projects').

  then(()=>{

    return knex.schema.dropTableIfExists('users');

  }).
  then(()=>{

    return knex.schema.dropTableIfExists('pattern_sounds');

  }).
  then(()=>{

    return knex.schema.dropTableIfExists('patterns');

  }).
  then(()=>{

    return knex.schema.dropTableIfExists('sounds');

  }).
  then(()=>{

    return knex.schema.dropTableIfExists('types');

  });

};
