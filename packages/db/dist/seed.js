"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const index_1 = require("./schema/index");
dotenv.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
async function main() {
    const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
    const db = (0, node_postgres_1.drizzle)(pool);
    console.log('Seeding database...');
    // Categories
    const cats = await db.insert(index_1.categories).values([
        {
            nameEn: 'Timber & Logs',
            nameFr: 'Bois & Grumes',
            slug: 'timber-logs',
            descriptionEn: 'Premium certified tropical timber and logs for international markets',
            descriptionFr: 'Bois tropicaux certifiés premium pour les marchés internationaux',
            imageUrl: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&auto=format&fit=crop&q=70',
        },
        {
            nameEn: 'Industrial Generators',
            nameFr: 'Générateurs Industriels',
            slug: 'generators',
            descriptionEn: 'Diesel and gas generators for industrial and commercial use',
            descriptionFr: 'Générateurs diesel et gaz pour usage industriel et commercial',
            imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=70',
        },
        {
            nameEn: 'Lubricants',
            nameFr: 'Lubrifiants',
            slug: 'lubricants',
            descriptionEn: 'Total, Shell and OEM-grade industrial lubricants',
            descriptionFr: 'Lubrifiants industriels Total, Shell et OEM',
            imageUrl: 'https://images.unsplash.com/photo-1635859890085-ec8cb5466806?w=800&auto=format&fit=crop&q=70',
        },
        {
            nameEn: 'Filters',
            nameFr: 'Filtres',
            slug: 'filters',
            descriptionEn: 'Oil, air and industrial filters for all equipment types',
            descriptionFr: "Filtres à huile, à air et industriels pour tous types d'équipements",
            imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=70',
        },
        {
            nameEn: 'General Industrial',
            nameFr: 'Industriel Général',
            slug: 'general-industrial',
            descriptionEn: 'Heavy industrial materials and miscellaneous equipment',
            descriptionFr: 'Matériaux industriels lourds et équipements divers',
            imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=70',
        },
    ]).returning();
    const [timber, generators, lubricants, filters, general] = cats;
    // Products
    await db.insert(index_1.products).values([
        // Timber
        {
            nameEn: 'African Iroko Timber',
            nameFr: 'Bois Iroko Africain',
            slug: 'african-iroko-timber',
            descriptionEn: 'Premium grade African Iroko timber, kiln-dried and certified for international export. Ideal for high-end construction, furniture, and flooring applications.',
            descriptionFr: "Bois Iroko africain de première qualité, séché au four et certifié pour l'export international.",
            categoryId: timber.id,
            imageUrl: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&auto=format&fit=crop&q=70',
            specifications: 'Grade: Export A\nMoisture Content: < 12%\nLength: 3-6m\nCertification: PEFC/FSC',
            featured: true,
            available: true,
        },
        {
            nameEn: 'Tropical Hardwood Logs',
            nameFr: 'Grumes de Bois Dur Tropical',
            slug: 'tropical-hardwood-logs',
            descriptionEn: 'Round logs of certified tropical hardwood species, suitable for sawmilling, veneer production, and export.',
            descriptionFr: 'Grumes rondes d\'essences tropicales certifiées pour scierie, placage et export.',
            categoryId: timber.id,
            imageUrl: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&auto=format&fit=crop&q=70',
            specifications: 'Species: Mixed tropical hardwoods\nMinimum diameter: 40cm\nCertification: FLEGT',
            featured: false,
            available: true,
        },
        {
            nameEn: 'Teak Planks Export Grade',
            nameFr: 'Planches de Teck Export',
            slug: 'teak-planks-export',
            descriptionEn: 'High-quality teak planks, sawn and dressed for export. Suitable for marine, outdoor furniture, and luxury flooring.',
            descriptionFr: 'Planches de teck de haute qualité, sciées et rabotées pour l\'export.',
            categoryId: timber.id,
            imageUrl: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&auto=format&fit=crop&q=70',
            specifications: 'Grade: Prime\nThickness: 25mm, 50mm\nWidth: 100-300mm',
            featured: false,
            available: true,
        },
        // Generators
        {
            nameEn: '50kVA Diesel Generator',
            nameFr: 'Groupe Électrogène Diesel 50kVA',
            slug: '50kva-diesel-generator',
            descriptionEn: 'Industrial-grade 50kVA diesel generator with automatic voltage regulation, suitable for commercial and light industrial use.',
            descriptionFr: 'Groupe électrogène diesel industriel 50kVA avec régulation automatique de tension.',
            categoryId: generators.id,
            imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=70',
            specifications: 'Power Output: 50kVA / 40kW\nFuel Type: Diesel\nVoltage: 400V / 230V\nFrequency: 50Hz\nNoise Level: 72dB',
            featured: true,
            available: true,
        },
        {
            nameEn: '100kVA Industrial Generator',
            nameFr: 'Groupe Électrogène Industriel 100kVA',
            slug: '100kva-industrial-generator',
            descriptionEn: 'Heavy-duty 100kVA industrial generator for continuous power supply in demanding environments.',
            descriptionFr: 'Groupe électrogène industriel robuste 100kVA pour alimentation continue.',
            categoryId: generators.id,
            imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=70',
            specifications: 'Power Output: 100kVA / 80kW\nFuel Type: Diesel\nRuntime: 8h at 75% load\nCooling: Liquid-cooled',
            featured: false,
            available: true,
        },
        {
            nameEn: '200kVA Standby Generator',
            nameFr: 'Groupe Électrogène de Secours 200kVA',
            slug: '200kva-standby-generator',
            descriptionEn: 'Enterprise-grade 200kVA standby generator with automatic transfer switch for critical installations.',
            descriptionFr: 'Groupe électrogène de secours 200kVA avec commutateur automatique pour installations critiques.',
            categoryId: generators.id,
            imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=70',
            specifications: 'Power Output: 200kVA / 160kW\nAutomatic Transfer Switch: Included\nFuel Tank: 500L\nEmissions: Stage IIIA',
            featured: true,
            available: true,
        },
        // Lubricants
        {
            nameEn: 'Total Rubia TIR 10W-40',
            nameFr: 'Total Rubia TIR 10W-40',
            slug: 'total-rubia-tir-10w40',
            descriptionEn: 'Premium heavy-duty engine oil for diesel engines in trucks and buses. Total authorized distributor.',
            descriptionFr: 'Huile moteur premium pour moteurs diesel lourds. Distributeur Total agréé.',
            categoryId: lubricants.id,
            imageUrl: 'https://images.unsplash.com/photo-1635859890085-ec8cb5466806?w=800&auto=format&fit=crop&q=70',
            specifications: 'Viscosity: 10W-40\nAPI: CI-4/SL\nAEAS: E7\nPackaging: 20L, 208L drums',
            featured: true,
            available: true,
        },
        {
            nameEn: 'Shell Rimula R6 M 10W-40',
            nameFr: 'Shell Rimula R6 M 10W-40',
            slug: 'shell-rimula-r6-m-10w40',
            descriptionEn: 'Shell fully synthetic heavy-duty diesel engine oil for demanding applications.',
            descriptionFr: 'Huile moteur diesel synthétique Shell pour applications intensives.',
            categoryId: lubricants.id,
            imageUrl: 'https://images.unsplash.com/photo-1635859890085-ec8cb5466806?w=800&auto=format&fit=crop&q=70',
            specifications: 'Viscosity: 10W-40\nBase: Full synthetic\nAPI: CK-4\nPackaging: 5L, 20L, 208L',
            featured: false,
            available: true,
        },
        {
            nameEn: 'Industrial Hydraulic Oil ISO 46',
            nameFr: 'Huile Hydraulique Industrielle ISO 46',
            slug: 'industrial-hydraulic-oil-iso46',
            descriptionEn: 'High-performance hydraulic oil for industrial machinery, mining, and construction equipment.',
            descriptionFr: 'Huile hydraulique haute performance pour machines industrielles.',
            categoryId: lubricants.id,
            imageUrl: 'https://images.unsplash.com/photo-1635859890085-ec8cb5466806?w=800&auto=format&fit=crop&q=70',
            specifications: 'ISO Grade: 46\nViscosity Index: > 100\nAnti-wear: ZDDP-based\nPackaging: 20L, 208L',
            featured: false,
            available: true,
        },
        // Filters
        {
            nameEn: 'Heavy Duty Oil Filter HF-150',
            nameFr: 'Filtre à Huile Robuste HF-150',
            slug: 'heavy-duty-oil-filter-hf150',
            descriptionEn: 'OEM-equivalent heavy-duty oil filter for diesel engines in construction and mining equipment.',
            descriptionFr: 'Filtre à huile robuste équivalent OEM pour moteurs diesel.',
            categoryId: filters.id,
            imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=70',
            specifications: 'Type: Spin-on\nThread: 3/4"-16\nMedia: Synthetic blend\nMicron: 25\nCompatibility: CAT, Komatsu, Volvo',
            featured: true,
            available: true,
        },
        {
            nameEn: 'Industrial Air Filter AF-200',
            nameFr: 'Filtre à Air Industriel AF-200',
            slug: 'industrial-air-filter-af200',
            descriptionEn: 'High-capacity radial seal air filter for heavy equipment engines in dusty environments.',
            descriptionFr: 'Filtre à air à joint radial pour moteurs en environnement poussiéreux.',
            categoryId: filters.id,
            imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=70',
            specifications: 'Type: Primary air filter\nEfficiency: 99.9%\nService Life: 500 hours\nApplication: Generators, Excavators',
            featured: false,
            available: true,
        },
        {
            nameEn: 'Fuel Filter Set FF-300',
            nameFr: 'Kit Filtre à Carburant FF-300',
            slug: 'fuel-filter-set-ff300',
            descriptionEn: 'Complete fuel filtration set including primary and secondary filters for diesel engines.',
            descriptionFr: 'Kit complet de filtration carburant primaire et secondaire pour moteurs diesel.',
            categoryId: filters.id,
            imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=70',
            specifications: 'Includes: Primary + Secondary filter\nMicron: 10 (primary), 2 (secondary)\nWater separator: Yes',
            featured: false,
            available: true,
        },
        // General Industrial
        {
            nameEn: 'Industrial Safety Equipment Kit',
            nameFr: 'Kit Équipements de Sécurité Industrielle',
            slug: 'industrial-safety-equipment-kit',
            descriptionEn: 'Comprehensive industrial safety equipment package including PPE, signage, and safety tools for construction and industrial sites.',
            descriptionFr: 'Kit complet d\'équipements de sécurité industrielle incluant EPI et outils de sécurité.',
            categoryId: general.id,
            imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=70',
            specifications: 'Contents: Hard hats, Safety vests, Gloves, Safety boots, Goggles\nStandard: EN ISO 20345\nQuantity: 10-person kit',
            featured: true,
            available: true,
        },
        {
            nameEn: 'Steel Pipes & Fittings Bundle',
            nameFr: 'Lot Tuyaux & Raccords en Acier',
            slug: 'steel-pipes-fittings-bundle',
            descriptionEn: 'Industrial-grade steel pipes and fittings for construction, oil & gas, and water infrastructure projects.',
            descriptionFr: 'Tuyaux et raccords en acier industriel pour construction et infrastructures.',
            categoryId: general.id,
            imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=70',
            specifications: 'Material: Carbon steel ASTM A106\nDiameters: 1/2" to 12"\nPressure Rating: ANSI 150-600\nFinish: Black/galvanized',
            featured: false,
            available: true,
        },
        {
            nameEn: 'Construction Aggregate Materials',
            nameFr: 'Matériaux Granulats de Construction',
            slug: 'construction-aggregate-materials',
            descriptionEn: 'Crushed stone, gravel, and sand aggregates for civil engineering and construction projects.',
            descriptionFr: 'Pierre concassée, gravier et sable pour projets de génie civil.',
            categoryId: general.id,
            imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=70',
            specifications: 'Types: Crushed limestone, River gravel, Washed sand\nGradations: 0/4, 4/8, 8/16, 16/32mm\nMin order: 20 tons',
            featured: false,
            available: true,
        },
    ]);
    // Sample order for tracking demo
    await db.insert(index_1.orders).values([
        {
            trackingNumber: 'TRK-2024-001',
            clientName: 'Demo Client International',
            clientEmail: 'demo@example.com',
            origin: 'Douala, Cameroon',
            destination: 'Rotterdam, Netherlands',
            description: 'Industrial generators and spare parts — 3 units 100kVA',
            status: 'in-transit',
            estimatedDelivery: '2024-02-15',
            timeline: [
                {
                    status: 'processing',
                    date: '2024-01-20T08:00:00Z',
                    description: 'Order received and processing initiated at LTIC SARL warehouse.',
                    location: 'Douala, Cameroon',
                },
                {
                    status: 'customs-cleared',
                    date: '2024-01-25T14:30:00Z',
                    description: 'Customs clearance completed. All documentation approved.',
                    location: 'Port of Douala, Cameroon',
                },
                {
                    status: 'in-transit',
                    date: '2024-01-28T06:00:00Z',
                    description: 'Cargo loaded aboard MV Atlantic Carrier. Vessel departed Port of Douala.',
                    location: 'Atlantic Ocean',
                },
            ],
        },
    ]);
    // Sample news articles
    await db.insert(index_1.news).values([
        {
            titleEn: 'LTIC SARL Expands Operations to 5 New Countries',
            titleFr: 'LTIC SARL Étend ses Opérations dans 5 Nouveaux Pays',
            slug: 'ltic-sarl-expands-operations',
            summaryEn: 'LTIC SARL announces major expansion of its logistics network to 5 new markets across West and Central Africa, strengthening its position as a leading regional logistics provider.',
            summaryFr: 'LTIC SARL annonce une expansion majeure de son réseau logistique vers 5 nouveaux marchés en Afrique de l\'Ouest et Centrale.',
            contentEn: `LTIC SARL is proud to announce the expansion of its operational footprint to five new countries across West and Central Africa. This strategic move reinforces the company\'s commitment to providing seamless logistics solutions across the African continent.

The new markets include Senegal, Ivory Coast, Democratic Republic of Congo, Niger, and Chad — all strategically positioned trade hubs that will enable LTIC SARL to serve a growing base of international clients requiring reliable logistics and industrial supply services in these regions.

"This expansion represents a significant milestone in LTIC SARL\'s growth strategy," said the company\'s Operations Director. "We have established partnerships with local logistics operators and secured warehouse facilities in each new market to ensure we can deliver the same high standard of service our clients expect."

The expansion was supported by significant investment in regional infrastructure, including new warehouse facilities, fleet additions, and the recruitment of over 50 logistics professionals across the five countries. LTIC SARL now operates in more than 35 countries across Africa, Europe, the Middle East, and North America.

Clients can expect expanded service coverage effective immediately, with full operational capacity in all new markets within Q2 2024.`,
            contentFr: `LTIC SARL est fière d\'annoncer l\'extension de son empreinte opérationnelle à cinq nouveaux pays d\'Afrique de l\'Ouest et Centrale. Cette décision stratégique renforce l\'engagement de l\'entreprise à fournir des solutions logistiques fluides à travers le continent africain.

Les nouveaux marchés comprennent le Sénégal, la Côte d\'Ivoire, la République Démocratique du Congo, le Niger et le Tchad — tous des pôles commerciaux stratégiquement positionnés.

"Cette expansion représente une étape majeure dans la stratégie de croissance de LTIC SARL," a déclaré le Directeur des Opérations. "Nous avons établi des partenariats avec des opérateurs logistiques locaux et sécurisé des entrepôts dans chaque nouveau marché."`,
            imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=70',
            category: 'Company News',
            published: true,
        },
        {
            titleEn: 'Understanding Phytosanitary Requirements for Timber Export',
            titleFr: 'Comprendre les Exigences Phytosanitaires pour l\'Export de Bois',
            slug: 'phytosanitary-requirements-timber-export',
            summaryEn: 'A comprehensive guide to international phytosanitary regulations for timber and log exporters, covering ISPM 15 compliance, fumigation requirements, and certification processes.',
            summaryFr: 'Guide complet des réglementations phytosanitaires internationales pour les exportateurs de bois et grumes.',
            contentEn: `For companies involved in the international trade of timber and wood products, understanding and complying with phytosanitary regulations is not optional — it is essential for smooth customs clearance and maintaining market access.

**What Are Phytosanitary Requirements?**

Phytosanitary measures are regulations designed to protect plants and plant products from pests and diseases during international trade. For timber exporters, the key international standard is ISPM 15 (International Standards for Phytosanitary Measures No. 15), which governs the treatment of wood packaging materials.

**Key Compliance Requirements**

1. **Heat Treatment (HT)**: Wood must be heated to a core temperature of 56°C for a minimum of 30 continuous minutes.
2. **Methyl Bromide Fumigation (MB)**: An alternative treatment method, though increasingly restricted due to environmental concerns.
3. **Dielectric Heating (DH)**: Treatment using microwave energy to achieve required temperature throughout the wood.
4. **Official Marking**: Treated wood must bear the official IPPC mark (wheat sheaf symbol) with country code, producer/treatment provider code, and treatment type.

**LTIC SARL\'s Phytosanitary Services**

LTIC SARL provides comprehensive phytosanitary treatment and certification services for timber and agricultural product exporters. Our team coordinates with accredited treatment facilities and national plant protection organizations to ensure full compliance with importing country requirements.

Contact our team to learn how we can support your timber export compliance requirements.`,
            contentFr: `Pour les entreprises impliquées dans le commerce international du bois et des produits du bois, comprendre et respecter les réglementations phytosanitaires est essentiel pour le dédouanement et le maintien de l\'accès aux marchés.

**Que sont les exigences phytosanitaires?**

Les mesures phytosanitaires sont des réglementations conçues pour protéger les plantes et les produits végétaux contre les ravageurs et les maladies lors du commerce international. Pour les exportateurs de bois, la norme internationale clé est la NIMP 15.

**Services phytosanitaires de LTIC SARL**

LTIC SARL fournit des services complets de traitement phytosanitaire et de certification pour les exportateurs de bois. Notre équipe coordonne avec les installations de traitement agréées pour assurer la conformité complète avec les exigences des pays importateurs.`,
            imageUrl: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&auto=format&fit=crop&q=70',
            category: 'Industry Insights',
            published: true,
        },
        {
            titleEn: 'LTIC SARL Partners with Leading OEM Brands for Industrial Supply',
            titleFr: 'LTIC SARL Partenaire des Grandes Marques OEM pour la Fourniture Industrielle',
            slug: 'ltic-sarl-oem-partnerships',
            summaryEn: 'LTIC SARL strengthens its industrial supply portfolio through new authorized partnerships with leading OEM brands, including Total, Shell, and major equipment manufacturers.',
            summaryFr: 'LTIC SARL renforce son portefeuille de fournitures industrielles avec de nouveaux partenariats autorisés avec Total, Shell et d\'autres fabricants OEM.',
            contentEn: `LTIC SARL is pleased to announce the formalization of authorized distribution agreements with several leading industrial brands, further cementing its position as a trusted industrial supply partner across its markets.

The new partnerships include distribution agreements for Total lubricants and specialty chemicals, Shell industrial products, and equipment from several major OEM manufacturers. These agreements provide LTIC SARL\'s clients with guaranteed access to genuine products with full manufacturer warranty coverage.

"Quality assurance is at the core of our industrial supply offering," said the company\'s Supply Chain Director. "These authorized partnerships ensure our clients receive certified, genuine products — not substitutes — backed by the full support of the manufacturer."

The company now maintains strategic stock of key industrial supplies across its warehouse network, enabling rapid fulfillment for urgent requirements in the mining, construction, oil & gas, and manufacturing sectors.`,
            contentFr: `LTIC SARL est heureuse d\'annoncer la formalisation d\'accords de distribution autorisée avec plusieurs grandes marques industrielles, renforçant sa position de partenaire de fourniture industrielle de confiance.

Les nouveaux partenariats comprennent des accords de distribution pour les lubrifiants Total, les produits industriels Shell et les équipements de plusieurs grands fabricants OEM.

"La garantie de qualité est au cœur de notre offre de fournitures industrielles," a déclaré le Directeur de la Chaîne d\'Approvisionnement.`,
            imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=70',
            category: 'Company News',
            published: true,
        },
    ]);
    // Settings (social links)
    await db.insert(index_1.settings).values([
        { key: 'social_facebook', value: 'https://facebook.com/lticsarl' },
        { key: 'social_twitter', value: 'https://twitter.com/lticsarl' },
        { key: 'social_linkedin', value: 'https://linkedin.com/company/lticsarl' },
        { key: 'social_instagram', value: 'https://instagram.com/lticsarl' },
        { key: 'social_youtube', value: '' },
        { key: 'social_whatsapp', value: 'https://wa.me/2376XXXXXXXX' },
        { key: 'social_tiktok', value: '' },
    ]);
    console.log('Seed complete!');
    await pool.end();
}
main().catch(console.error);
