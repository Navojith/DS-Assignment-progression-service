import { readFileSync } from 'fs';
import { join } from 'path';
import { AppConfig } from './app-config';

const configFile = join(process.cwd(), './src/config/config.json'); // Update the path if necessary

// Read and parse the config file synchronously
const configData: AppConfig = JSON.parse(readFileSync(configFile, 'utf-8'));

export default configData;
