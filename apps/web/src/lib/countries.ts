export interface CountryInfo {
  name: string;
  code: string;
  dial: string;
  flag: string;
  /** Regex tested against the local digits only (no dial code, no spaces) */
  pattern: RegExp;
  /** Placeholder example shown in the phone input */
  example: string;
}

export const COUNTRY_DATA: CountryInfo[] = [
  // ── Africa ────────────────────────────────────────────────────────────────
  { name: 'Algeria',       code: 'DZ', dial: '+213', flag: '🇩🇿', pattern: /^\d{9}$/,     example: '551 23 45 67' },
  { name: 'Angola',        code: 'AO', dial: '+244', flag: '🇦🇴', pattern: /^\d{9}$/,     example: '923 456 789' },
  { name: 'Benin',         code: 'BJ', dial: '+229', flag: '🇧🇯', pattern: /^\d{8}$/,     example: '90 12 34 56' },
  { name: 'Botswana',      code: 'BW', dial: '+267', flag: '🇧🇼', pattern: /^\d{7,8}$/,   example: '71 234 567' },
  { name: 'Burkina Faso',  code: 'BF', dial: '+226', flag: '🇧🇫', pattern: /^\d{8}$/,     example: '70 12 34 56' },
  { name: 'Cameroon',      code: 'CM', dial: '+237', flag: '🇨🇲', pattern: /^[6-9]\d{8}$/, example: '671 23 45 67' },
  { name: 'Cape Verde',    code: 'CV', dial: '+238', flag: '🇨🇻', pattern: /^\d{7}$/,     example: '991 1234' },
  { name: 'Chad',          code: 'TD', dial: '+235', flag: '🇹🇩', pattern: /^\d{8}$/,     example: '63 01 23 45' },
  { name: 'Comoros',       code: 'KM', dial: '+269', flag: '🇰🇲', pattern: /^\d{7}$/,     example: '321 2345' },
  { name: 'Congo',         code: 'CG', dial: '+242', flag: '🇨🇬', pattern: /^\d{9}$/,     example: '061 234 567' },
  { name: "Côte d'Ivoire", code: 'CI', dial: '+225', flag: '🇨🇮', pattern: /^\d{10}$/,    example: '07 00 00 00 00' },
  { name: 'DR Congo',      code: 'CD', dial: '+243', flag: '🇨🇩', pattern: /^\d{9}$/,     example: '099 123 456' },
  { name: 'Egypt',         code: 'EG', dial: '+20',  flag: '🇪🇬', pattern: /^\d{10}$/,    example: '100 123 4567' },
  { name: 'Ethiopia',      code: 'ET', dial: '+251', flag: '🇪🇹', pattern: /^\d{9}$/,     example: '911 234 567' },
  { name: 'Gabon',         code: 'GA', dial: '+241', flag: '🇬🇦', pattern: /^\d{7,8}$/,   example: '06 03 12 34' },
  { name: 'Gambia',        code: 'GM', dial: '+220', flag: '🇬🇲', pattern: /^\d{7}$/,     example: '301 2345' },
  { name: 'Ghana',         code: 'GH', dial: '+233', flag: '🇬🇭', pattern: /^\d{9}$/,     example: '231 234 567' },
  { name: 'Guinea',        code: 'GN', dial: '+224', flag: '🇬🇳', pattern: /^\d{9}$/,     example: '601 12 34 56' },
  { name: 'Guinea-Bissau', code: 'GW', dial: '+245', flag: '🇬🇼', pattern: /^\d{7}$/,     example: '955 1234' },
  { name: 'Kenya',         code: 'KE', dial: '+254', flag: '🇰🇪', pattern: /^\d{9}$/,     example: '712 345 678' },
  { name: 'Lesotho',       code: 'LS', dial: '+266', flag: '🇱🇸', pattern: /^\d{8}$/,     example: '50 12 34 56' },
  { name: 'Liberia',       code: 'LR', dial: '+231', flag: '🇱🇷', pattern: /^\d{7,8}$/,   example: '770 12 345' },
  { name: 'Libya',         code: 'LY', dial: '+218', flag: '🇱🇾', pattern: /^\d{9}$/,     example: '91 234 5678' },
  { name: 'Madagascar',    code: 'MG', dial: '+261', flag: '🇲🇬', pattern: /^\d{9}$/,     example: '321 23 456 78' },
  { name: 'Malawi',        code: 'MW', dial: '+265', flag: '🇲🇼', pattern: /^\d{9}$/,     example: '991 234 567' },
  { name: 'Mali',          code: 'ML', dial: '+223', flag: '🇲🇱', pattern: /^\d{8}$/,     example: '70 12 34 56' },
  { name: 'Mauritania',    code: 'MR', dial: '+222', flag: '🇲🇷', pattern: /^\d{8}$/,     example: '22 12 34 56' },
  { name: 'Mauritius',     code: 'MU', dial: '+230', flag: '🇲🇺', pattern: /^\d{7,8}$/,   example: '5 250 1234' },
  { name: 'Morocco',       code: 'MA', dial: '+212', flag: '🇲🇦', pattern: /^\d{9}$/,     example: '650 123 456' },
  { name: 'Mozambique',    code: 'MZ', dial: '+258', flag: '🇲🇿', pattern: /^\d{9}$/,     example: '82 123 4567' },
  { name: 'Namibia',       code: 'NA', dial: '+264', flag: '🇳🇦', pattern: /^\d{9}$/,     example: '81 123 4567' },
  { name: 'Niger',         code: 'NE', dial: '+227', flag: '🇳🇪', pattern: /^\d{8}$/,     example: '93 12 34 56' },
  { name: 'Nigeria',       code: 'NG', dial: '+234', flag: '🇳🇬', pattern: /^\d{10}$/,    example: '802 123 4567' },
  { name: 'Rwanda',        code: 'RW', dial: '+250', flag: '🇷🇼', pattern: /^\d{9}$/,     example: '780 123 456' },
  { name: 'Senegal',       code: 'SN', dial: '+221', flag: '🇸🇳', pattern: /^\d{9}$/,     example: '77 123 45 67' },
  { name: 'Sierra Leone',  code: 'SL', dial: '+232', flag: '🇸🇱', pattern: /^\d{8}$/,     example: '25 12 34 56' },
  { name: 'Somalia',       code: 'SO', dial: '+252', flag: '🇸🇴', pattern: /^\d{8,9}$/,   example: '90 123 456' },
  { name: 'South Africa',  code: 'ZA', dial: '+27',  flag: '🇿🇦', pattern: /^\d{9}$/,     example: '71 123 4567' },
  { name: 'South Sudan',   code: 'SS', dial: '+211', flag: '🇸🇸', pattern: /^\d{9}$/,     example: '977 123 456' },
  { name: 'Sudan',         code: 'SD', dial: '+249', flag: '🇸🇩', pattern: /^\d{9}$/,     example: '91 123 4567' },
  { name: 'Tanzania',      code: 'TZ', dial: '+255', flag: '🇹🇿', pattern: /^\d{9}$/,     example: '621 234 567' },
  { name: 'Togo',          code: 'TG', dial: '+228', flag: '🇹🇬', pattern: /^\d{8}$/,     example: '90 12 34 56' },
  { name: 'Tunisia',       code: 'TN', dial: '+216', flag: '🇹🇳', pattern: /^\d{8}$/,     example: '20 123 456' },
  { name: 'Uganda',        code: 'UG', dial: '+256', flag: '🇺🇬', pattern: /^\d{9}$/,     example: '712 345 678' },
  { name: 'Zambia',        code: 'ZM', dial: '+260', flag: '🇿🇲', pattern: /^\d{9}$/,     example: '955 123 456' },
  { name: 'Zimbabwe',      code: 'ZW', dial: '+263', flag: '🇿🇼', pattern: /^\d{9}$/,     example: '712 345 678' },
  // ── Europe ────────────────────────────────────────────────────────────────
  { name: 'Belgium',        code: 'BE', dial: '+32',  flag: '🇧🇪', pattern: /^\d{8,9}$/,   example: '470 12 34 56' },
  { name: 'France',         code: 'FR', dial: '+33',  flag: '🇫🇷', pattern: /^\d{9}$/,     example: '6 12 34 56 78' },
  { name: 'Germany',        code: 'DE', dial: '+49',  flag: '🇩🇪', pattern: /^\d{10,11}$/, example: '151 23456789' },
  { name: 'United Kingdom', code: 'GB', dial: '+44',  flag: '🇬🇧', pattern: /^\d{10}$/,    example: '7911 123456' },
  // ── Americas ──────────────────────────────────────────────────────────────
  { name: 'Canada',         code: 'CA', dial: '+1',   flag: '🇨🇦', pattern: /^\d{10}$/,    example: '506 234 5678' },
  { name: 'United States',  code: 'US', dial: '+1',   flag: '🇺🇸', pattern: /^\d{10}$/,    example: '201 555 0123' },
  // ── Catch-all ─────────────────────────────────────────────────────────────
  { name: 'Other',          code: 'XX', dial: '+',    flag: '🌍', pattern: /^[\d\s\-()+]{4,20}$/, example: 'Enter full number' },
];

export const COUNTRY_NAMES = COUNTRY_DATA.filter(c => c.code !== 'XX').map(c => c.name).concat(['Other']);

export function findByName(name: string): CountryInfo | undefined {
  return COUNTRY_DATA.find(c => c.name === name);
}

export function findByCode(code: string): CountryInfo | undefined {
  return COUNTRY_DATA.find(c => c.code === code);
}

/** Returns true when localDigits are valid for the given country name */
export function validatePhone(localDigits: string, countryName: string): boolean {
  const info = findByName(countryName);
  if (!info) return localDigits.length >= 4;
  return info.pattern.test(localDigits);
}
