import * as migration_20261006_105338_baseline from './20261006_105338_baseline';
import * as migration_20261006_110258_pages_and_site_settings from './20261006_110258_pages_and_site_settings';
import * as migration_20261006_112024_block_display_options from './20261006_112024_block_display_options';

export const migrations = [
  {
    up: migration_20261006_105338_baseline.up,
    down: migration_20261006_105338_baseline.down,
    name: '20261006_105338_baseline',
  },
  {
    up: migration_20261006_110258_pages_and_site_settings.up,
    down: migration_20261006_110258_pages_and_site_settings.down,
    name: '20261006_110258_pages_and_site_settings',
  },
  {
    up: migration_20261006_112024_block_display_options.up,
    down: migration_20261006_112024_block_display_options.down,
    name: '20261006_112024_block_display_options'
  },
];
