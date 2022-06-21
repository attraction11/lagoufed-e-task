module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});

// 采用线上的远程服务器的MySQL
// 注意在package.json中添加："mysql": "^2.18.1",
// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'bookshelf',
//       settings: {
//         client: 'mysql',
//         host: env('DATABASE_HOST', 'localhost'),
//         port: env.int('DATABASE_PORT', 3306),
//         database: env('DATABASE_NAME', 'blog'),
//         username: env('DATABASE_USERNAME', 'blog'),
//         password: env('DATABASE_PASSWORD', 'Aa123456'),
//       },
//       options: {},
//     },
//   },
// });

