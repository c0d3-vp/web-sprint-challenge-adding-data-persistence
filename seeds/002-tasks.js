exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('tasks').del()
      .then(function () {
        // Inserts seed entries
        return knex('tasks').insert([
          {id: 1, task_name: 'task 1', task_desc: 'A task', completed: false, notes: "do it", project_id: 1},
          {id: 2, task_name: 'task 2', task_desc: 'Another task', completed: false, notes: "do it", project_id: 2},
          {id: 3, task_name: 'task 3', task_desc: 'Lies', completed: false, notes: "do not do", project_id: 1}
        ]);
      });
  };