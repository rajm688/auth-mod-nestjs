const _dbConfig = {
  ssl: process.env.NODE_ENV == 'production',
  extra: {
    ssl:
      process.env.NODE_ENV == 'production'
        ? { rejectUnauthorized: false }
        : null,
  },
  applicationName: 'EquipMe',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'raj123',
  database: 'auth-mod',
  entities: ['dist/entities/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  seeds: ['dist/db/seeds/*.js'],
  factories: ['dist/db/factories/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
    seedsDir: 'src/db/seeds',
    factoriesDir: 'src/db/factories',
  },
};

switch ('development') {
  case 'development':
    break;
  case 'production':
    Object.assign(_dbConfig, { migrationsRun: true });
    break;
  default:
    throw new Error('Unknown environment');
}

module.exports = _dbConfig;
