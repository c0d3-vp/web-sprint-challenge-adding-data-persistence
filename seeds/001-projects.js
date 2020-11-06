exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('projects').del()
      .then(function () {
        // Inserts seed entries
        return knex('projects').insert([
          {id: 1, project_name: 'test project 1', completed: false, project_desc:"It is a thing that exists"},
          {id: 2, project_name: 'test project 2', completed: false, project_desc:"It is also a thing that exists"},
          {id: 3, project_name: 'test project 3', completed: false, project_desc:"It is not a thing that exists, you were lied to."}
        ]);
      });
  };  