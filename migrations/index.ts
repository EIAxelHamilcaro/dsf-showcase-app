import * as migration_20261006_105338_baseline from './20261006_105338_baseline';
import * as migration_20261006_110258_pages_and_site_settings from './20261006_110258_pages_and_site_settings';
import * as migration_20261006_112024_block_display_options from './20261006_112024_block_display_options';
import * as migration_20261006_113012_feature_cards_spacing from './20261006_113012_feature_cards_spacing';
import * as migration_20261006_113015_testimonial_block_rating from './20261006_113015_testimonial_block_rating';
import * as migration_20261006_113018_faq_text_and_legal_blocks from './20261006_113018_faq_text_and_legal_blocks';
import * as migration_20261006_113022_seed_pages_and_site_identity from './20261006_113022_seed_pages_and_site_identity';
import * as migration_20261006_120701_blois_testimonial_rating from './20261006_120701_blois_testimonial_rating';

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
    name: '20261006_112024_block_display_options',
  },
  {
    up: migration_20261006_113012_feature_cards_spacing.up,
    down: migration_20261006_113012_feature_cards_spacing.down,
    name: '20261006_113012_feature_cards_spacing',
  },
  {
    up: migration_20261006_113015_testimonial_block_rating.up,
    down: migration_20261006_113015_testimonial_block_rating.down,
    name: '20261006_113015_testimonial_block_rating',
  },
  {
    up: migration_20261006_113018_faq_text_and_legal_blocks.up,
    down: migration_20261006_113018_faq_text_and_legal_blocks.down,
    name: '20261006_113018_faq_text_and_legal_blocks',
  },
  {
    up: migration_20261006_113022_seed_pages_and_site_identity.up,
    down: migration_20261006_113022_seed_pages_and_site_identity.down,
    name: '20261006_113022_seed_pages_and_site_identity',
  },
  {
    up: migration_20261006_120701_blois_testimonial_rating.up,
    down: migration_20261006_120701_blois_testimonial_rating.down,
    name: '20261006_120701_blois_testimonial_rating',
  },
];
