import { rmSync } from 'fs';

const dirs = [
  './node_modules',
  './.venv',
  './frontend/node_modules',
  './frontend/dist',
  './frontend/coverage',
  './backend/.pytest_cache',
  './backend/.ruff_cache'
];

for (const dir of dirs) {
  rmSync(dir, { recursive: true, force: true });
}
