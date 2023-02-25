import { merge } from 'lodash-es';
import path from 'path';
import * as process from 'process';
import { generateApi } from 'swagger-typescript-api';
import * as config from './config/index';

const cwd = process.cwd();
const templatesDir = path.resolve(cwd, './templates');

const gen = async () => {
  const API_HOST = JSON.parse((config as any).default(merge).defineConstants.CONST_API_HOST);
  console.log(`${API_HOST}/v3/api-docs/%E7%B3%BB%E7%BB%9F%E6%A8%A1%E5%9D%97`);

  await generateApi({
    url: `${API_HOST}/v3/api-docs/%E7%B3%BB%E7%BB%9F%E6%A8%A1%E5%9D%97`,
    output: path.resolve(cwd, './src/services/system'),
    templates: templatesDir,
    modular: true,
    cleanOutput: true,
  });

  process.exit();
};

gen().catch(console.error);
