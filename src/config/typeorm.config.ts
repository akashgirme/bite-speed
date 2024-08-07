import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const commonTypeOrmConfig: DataSourceOptions = {
  logging: true,
  type: 'postgres',
  entities: [],
  synchronize: false,
  ssl: true,
  extra: {
    rejectUnauthorized: false,
  },
};

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<DataSourceOptions> => {
  return {
    ...commonTypeOrmConfig,
    url: configService.get<string>('DB_URL'),
  };
};

const datasource = new DataSource({
  ...commonTypeOrmConfig,
  url: '',
  migrations: ['db/migrations/*{.ts,.js}'],
});

export default datasource;
