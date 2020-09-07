import { join } from 'path';
import { readFileSync } from 'fs';

export function getFixture(name) {
  return readFileSync(join(__dirname, 'fixtures', `${name}.html`), 'utf8');
}
