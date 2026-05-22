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
      INSERT INTO partners (name, sector_en, sector_fr, products_en, products_fr, website, display_order) VALUES
        ('TotalEnergies', 'Energy & Lubricants',    'Énergie & Lubrifiants',        'Lubricants, motor oils, industrial fluids, greases',                       'Lubrifiants, huiles moteur, fluides industriels, graisses',                     'https://totalenergies.com', 1),
        ('Shell',         'Energy & Lubricants',    'Énergie & Lubrifiants',        'Engine oils, lubricants, industrial fluids, hydraulic oils',                'Huiles moteur, lubrifiants, fluides industriels, huiles hydrauliques',          'https://shell.com',         2),
        ('Caterpillar',   'Heavy Equipment',        'Équipement Lourd',             'Excavators, bulldozers, generators, spare parts, filters',                 'Excavatrices, bulldozers, générateurs, pièces détachées, filtres',             'https://cat.com',           3),
        ('Volvo',         'Transport & Equipment',  'Transport & Équipement',       'Trucks, construction equipment, engines, spare parts',                     'Camions, équipements de construction, moteurs, pièces détachées',              'https://volvogroup.com',    4),
        ('Komatsu',       'Industrial Equipment',   'Équipement Industriel',        'Mining equipment, bulldozers, forklifts, spare parts',                    'Équipements miniers, bulldozers, chariots élévateurs, pièces détachées',       'https://komatsu.com',       5),
        ('Cummins',       'Engines & Generators',   'Moteurs & Groupes Électrogènes','Diesel generators, engines, alternators, filters, spare parts',           'Groupes électrogènes diesel, moteurs, alternateurs, filtres, pièces',          'https://cummins.com',       6),
        ('Maersk',        'Ocean Freight',          'Fret Maritime',                'Container shipping, sea freight, logistics, port services',                'Transport conteneurs, fret maritime, logistique, services portuaires',          'https://maersk.com',        7),
        ('CMA CGM',       'Shipping & Logistics',   'Transport Maritime',           'Sea freight, container transport, port operations, supply chain',           'Fret maritime, transport conteneurs, opérations portuaires, chaîne logistique','https://cmacgm.com',        8),
        ('DHL',           'Express Logistics',      'Logistique Express',           'International express freight, customs clearance, warehousing',            'Fret express international, dédouanement, entreposage',                        'https://dhl.com',           9),
        ('Bolloré',       'Africa Logistics',       'Logistique Afrique',           'Port logistics, rail transport, warehousing, customs brokerage in Africa', 'Logistique portuaire, transport ferroviaire, entreposage, transitaire Afrique', 'https://bollore-logistics.com', 10),
        ('Liebherr',      'Cranes & Equipment',     'Grues & Équipement',           'Mobile cranes, tower cranes, construction machinery, refrigeration units', 'Grues mobiles, grues à tour, engins de construction, groupes frigorifiques',   'https://liebherr.com',      11),
        ('Eiffage',       'Construction',           'Construction',                 'Civil works, building construction, infrastructure, industrial projects',   'Travaux civils, construction, infrastructures, projets industriels',            'https://eiffage.com',       12)
      ON CONFLICT DO NOTHING;
    `);
    this.logger.log('Database tables verified');
  }
}
