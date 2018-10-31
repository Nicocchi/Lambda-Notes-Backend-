// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev/notes.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
        directory: './data/dev/migrations',
    },
    seeds: {
        directory: './data/dev/seeds',
    },
  }

};
