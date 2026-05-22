import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { DB_TOKEN } from './db.constants';
import type { Db } from './db.module';
import { sql } from 'drizzle-orm';

@Injectable()
export class DbInitService implements OnModuleInit {
  private readonly logger = new Logger(DbInitService.name);

  constructor(@Inject(DB_TOKEN) private db: Db) {}

  async onModuleInit() {
    await this.db.execute(sql`
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_id INTEGER;
    `);
    await this.db.execute(sql`
      ALTER TABLE customers ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
      ALTER TABLE customers ADD COLUMN IF NOT EXISTS email_verification_token TEXT;
      ALTER TABLE customers ADD COLUMN IF NOT EXISTS email_verification_expires TIMESTAMP;
    `);
    await this.db.execute(sql`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id         SERIAL PRIMARY KEY,
        email      TEXT NOT NULL,
        token      TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        used       BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await this.db.execute(sql`
      CREATE TABLE IF NOT EXISTS partners (
        id            SERIAL PRIMARY KEY,
        name          TEXT NOT NULL,
        logo_url      TEXT,
        sector_en     TEXT NOT NULL DEFAULT '',
        sector_fr     TEXT NOT NULL DEFAULT '',
        products_en   TEXT DEFAULT '',
        products_fr   TEXT DEFAULT '',
        website       TEXT,
        display_order INTEGER DEFAULT 0,
        active        BOOLEAN DEFAULT TRUE,
        created_at    TIMESTAMP DEFAULT NOW()
      );
    `);
    await this.db.execute(sql`
      INSERT INTO partners (name, logo_url, sector_en, sector_fr, products_en, products_fr, website, display_order) VALUES
        ('TotalEnergies', 'https://logo.clearbit.com/totalenergies.com',     'Energy & Lubricants',     'Énergie & Lubrifiants',          'Lubricants, motor oils, industrial fluids, greases',                        'Lubrifiants, huiles moteur, fluides industriels, graisses',                      'https://totalenergies.com',    1),
        ('Shell',         'https://logo.clearbit.com/shell.com',             'Energy & Lubricants',     'Énergie & Lubrifiants',          'Engine oils, lubricants, industrial fluids, hydraulic oils',                 'Huiles moteur, lubrifiants, fluides industriels, huiles hydrauliques',           'https://shell.com',            2),
        ('Caterpillar',   'https://logo.clearbit.com/cat.com',               'Heavy Equipment',         'Équipement Lourd',               'Excavators, bulldozers, generators, spare parts, filters',                  'Excavatrices, bulldozers, générateurs, pièces détachées, filtres',              'https://cat.com',              3),
        ('Volvo',         'https://logo.clearbit.com/volvogroup.com',        'Transport & Equipment',   'Transport & Équipement',         'Trucks, construction equipment, engines, spare parts',                      'Camions, équipements de construction, moteurs, pièces détachées',               'https://volvogroup.com',       4),
        ('Komatsu',       'https://logo.clearbit.com/komatsu.com',           'Industrial Equipment',    'Équipement Industriel',          'Mining equipment, bulldozers, forklifts, spare parts',                     'Équipements miniers, bulldozers, chariots élévateurs, pièces détachées',        'https://komatsu.com',          5),
        ('Cummins',       'https://logo.clearbit.com/cummins.com',           'Engines & Generators',    'Moteurs & Groupes Électrogènes', 'Diesel generators, engines, alternators, filters, spare parts',              'Groupes électrogènes diesel, moteurs, alternateurs, filtres, pièces',           'https://cummins.com',          6),
        ('Maersk',        'https://logo.clearbit.com/maersk.com',            'Ocean Freight',           'Fret Maritime',                  'Container shipping, sea freight, logistics, port services',                 'Transport conteneurs, fret maritime, logistique, services portuaires',           'https://maersk.com',           7),
        ('CMA CGM',       'https://logo.clearbit.com/cma-cgm.com',          'Shipping & Logistics',    'Transport Maritime',             'Sea freight, container transport, port operations, supply chain',            'Fret maritime, transport conteneurs, opérations portuaires, chaîne logistique', 'https://cmacgm.com',           8),
        ('DHL',           'https://logo.clearbit.com/dhl.com',               'Express Logistics',       'Logistique Express',             'International express freight, customs clearance, warehousing',             'Fret express international, dédouanement, entreposage',                         'https://dhl.com',              9),
        ('Bolloré',       'https://logo.clearbit.com/bollore.com',           'Africa Logistics',        'Logistique Afrique',             'Port logistics, rail transport, warehousing, customs brokerage in Africa',  'Logistique portuaire, transport ferroviaire, entreposage, transitaire Afrique',  'https://bollore-logistics.com',10),
        ('Liebherr',      'https://logo.clearbit.com/liebherr.com',          'Cranes & Equipment',      'Grues & Équipement',             'Mobile cranes, tower cranes, construction machinery, refrigeration units',  'Grues mobiles, grues à tour, engins de construction, groupes frigorifiques',    'https://liebherr.com',        11),
        ('Eiffage',       'https://logo.clearbit.com/eiffage.com',           'Construction',            'Construction',                   'Civil works, building construction, infrastructure, industrial projects',    'Travaux civils, construction, infrastructures, projets industriels',             'https://eiffage.com',         12)
      ON CONFLICT DO NOTHING;
    `);
    /* Update logo URLs on existing partner rows (runs on every restart, idempotent) */
    await this.db.execute(sql`
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/totalenergies.com' WHERE name = 'TotalEnergies' AND (logo_url IS NULL OR logo_url = '');
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/shell.com'          WHERE name = 'Shell'         AND (logo_url IS NULL OR logo_url = '');
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/cat.com'            WHERE name = 'Caterpillar'   AND (logo_url IS NULL OR logo_url = '');
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/volvogroup.com'     WHERE name = 'Volvo'         AND (logo_url IS NULL OR logo_url = '');
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/komatsu.com'        WHERE name = 'Komatsu'       AND (logo_url IS NULL OR logo_url = '');
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/cummins.com'        WHERE name = 'Cummins'       AND (logo_url IS NULL OR logo_url = '');
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/maersk.com'         WHERE name = 'Maersk'        AND (logo_url IS NULL OR logo_url = '');
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/cma-cgm.com'        WHERE name = 'CMA CGM'       AND (logo_url IS NULL OR logo_url = '');
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/dhl.com'            WHERE name = 'DHL'           AND (logo_url IS NULL OR logo_url = '');
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/bollore.com'        WHERE name = 'Bolloré'       AND (logo_url IS NULL OR logo_url = '');
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/liebherr.com'       WHERE name = 'Liebherr'      AND (logo_url IS NULL OR logo_url = '');
      UPDATE partners SET logo_url = 'https://logo.clearbit.com/eiffage.com'        WHERE name = 'Eiffage'       AND (logo_url IS NULL OR logo_url = '');
    `);
    this.logger.log('Database tables verified');
  }
}
