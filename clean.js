import { rmSync } from 'fs';

const dirs = [
  './node_modules',
  './frontend/node_modules',
  './frontend/dist',
  './frontend/coverage',
  './backend/node_modules',
  './backend/dist'
];

for (const dir of dirs) {
  rmSync(dir, { recursive: true, force: true });
}
