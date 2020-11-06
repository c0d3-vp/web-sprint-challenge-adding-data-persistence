exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('resources').del()
      .then(function () {
        // Inserts seed entries
        return knex('resources').insert([
          {id: 1, resource_name: 'Food', resource_desc: "Edible"},
          {id: 2, resource_name: 'Not Food', resource_desc: "Maybe Edible?"},
          {id: 3, resource_name: 'Poison', resource_desc: "DO NOT EAT"}
        ]);
      });
  };