
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {user_id: 1, title: 'Note Title 1', content: 'Note Content 1', completed: false, public: true},
        {user_id: 1, title: 'Note Title 2', content: 'Note Content 2', completed: false, public: true},
        {user_id: 1, title: 'Note Title 3', content: 'Note Content 3', completed: false, public: true}
      ]);
    });
};
