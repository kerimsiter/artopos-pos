export type Country = {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  format?: string;
  maxLength?: number;
};

export const countriesData: Country[] = [
  {
    code: "TR",
    name: "Türkiye",
    dialCode: "+90",
    flag: "🇹🇷",
    format: "5XX XXX XX XX",
    maxLength: 10
  },
  {
    code: "US",
    name: "Amerika Birleşik Devletleri",
    dialCode: "+1",
    flag: "🇺🇸",
    format: "(XXX) XXX-XXXX",
    maxLength: 10
  },
  {
    code: "GB",
    name: "Birleşik Krallık",
    dialCode: "+44",
    flag: "🇬🇧",
    format: "XXXX XXX XXX",
    maxLength: 10
  },
  {
    code: "DE",
    name: "Almanya",
    dialCode: "+49",
    flag: "🇩🇪",
    format: "XXX XXXXXXX",
    maxLength: 10
  },
  {
    code: "FR",
    name: "Fransa",
    dialCode: "+33",
    flag: "🇫🇷",
    format: "X XX XX XX XX",
    maxLength: 9
  },
  {
    code: "IT",
    name: "İtalya",
    dialCode: "+39",
    flag: "🇮🇹",
    format: "XXX XXX XXXX",
    maxLength: 10
  },
  {
    code: "ES",
    name: "İspanya",
    dialCode: "+34",
    flag: "🇪🇸",
    format: "XXX XX XX XX",
    maxLength: 9
  },
  {
    code: "NL",
    name: "Hollanda",
    dialCode: "+31",
    flag: "🇳🇱",
    format: "X XXXXXXXX",
    maxLength: 9
  },
  {
    code: "BE",
    name: "Belçika",
    dialCode: "+32",
    flag: "🇧🇪",
    format: "XXX XX XX XX",
    maxLength: 9
  },
  {
    code: "AT",
    name: "Avusturya",
    dialCode: "+43",
    flag: "🇦🇹",
    format: "XXX XXXXXXX",
    maxLength: 10
  },
  {
    code: "CH",
    name: "İsviçre",
    dialCode: "+41",
    flag: "🇨🇭",
    format: "XX XXX XX XX",
    maxLength: 9
  },
  {
    code: "SE",
    name: "İsveç",
    dialCode: "+46",
    flag: "🇸🇪",
    format: "XX XXX XX XX",
    maxLength: 9
  },
  {
    code: "NO",
    name: "Norveç",
    dialCode: "+47",
    flag: "🇳🇴",
    format: "XXX XX XXX",
    maxLength: 8
  },
  {
    code: "DK",
    name: "Danimarka",
    dialCode: "+45",
    flag: "🇩🇰",
    format: "XX XX XX XX",
    maxLength: 8
  },
  {
    code: "FI",
    name: "Finlandiya",
    dialCode: "+358",
    flag: "🇫🇮",
    format: "XX XXX XXXX",
    maxLength: 9
  },
  {
    code: "RU",
    name: "Rusya",
    dialCode: "+7",
    flag: "🇷🇺",
    format: "(XXX) XXX-XX-XX",
    maxLength: 10
  },
  {
    code: "UA",
    name: "Ukrayna",
    dialCode: "+380",
    flag: "🇺🇦",
    format: "XX XXX XXXX",
    maxLength: 9
  },
  {
    code: "PL",
    name: "Polonya",
    dialCode: "+48",
    flag: "🇵🇱",
    format: "XXX XXX XXX",
    maxLength: 9
  },
  {
    code: "GR",
    name: "Yunanistan",
    dialCode: "+30",
    flag: "🇬🇷",
    format: "XXX XXX XXXX",
    maxLength: 10
  },
  {
    code: "PT",
    name: "Portekiz",
    dialCode: "+351",
    flag: "🇵🇹",
    format: "XXX XXX XXX",
    maxLength: 9
  },
  {
    code: "JP",
    name: "Japonya",
    dialCode: "+81",
    flag: "🇯🇵",
    format: "XX XXXX XXXX",
    maxLength: 10
  },
  {
    code: "KR",
    name: "Güney Kore",
    dialCode: "+82",
    flag: "🇰🇷",
    format: "XX XXXX XXXX",
    maxLength: 10
  },
  {
    code: "CN",
    name: "Çin",
    dialCode: "+86",
    flag: "🇨🇳",
    format: "XXX XXXX XXXX",
    maxLength: 11
  },
  {
    code: "IN",
    name: "Hindistan",
    dialCode: "+91",
    flag: "🇮🇳",
    format: "XXXXX XXXXX",
    maxLength: 10
  },
  {
    code: "AU",
    name: "Avustralya",
    dialCode: "+61",
    flag: "🇦🇺",
    format: "XXX XXX XXX",
    maxLength: 9
  },
  {
    code: "NZ",
    name: "Yeni Zelanda",
    dialCode: "+64",
    flag: "🇳🇿",
    format: "XX XXX XXXX",
    maxLength: 9
  },
  {
    code: "CA",
    name: "Kanada",
    dialCode: "+1",
    flag: "🇨🇦",
    format: "(XXX) XXX-XXXX",
    maxLength: 10
  },
  {
    code: "MX",
    name: "Meksika",
    dialCode: "+52",
    flag: "🇲🇽",
    format: "XX XXXX XXXX",
    maxLength: 10
  },
  {
    code: "BR",
    name: "Brezilya",
    dialCode: "+55",
    flag: "🇧🇷",
    format: "(XX) XXXXX-XXXX",
    maxLength: 11
  },
  {
    code: "AR",
    name: "Arjantin",
    dialCode: "+54",
    flag: "🇦🇷",
    format: "XX XXXX-XXXX",
    maxLength: 10
  },
  {
    code: "SA",
    name: "Suudi Arabistan",
    dialCode: "+966",
    flag: "🇸🇦",
    format: "XX XXX XXXX",
    maxLength: 9
  },
  {
    code: "AE",
    name: "Birleşik Arap Emirlikleri",
    dialCode: "+971",
    flag: "🇦🇪",
    format: "XX XXX XXXX",
    maxLength: 9
  },
  {
    code: "EG",
    name: "Mısır",
    dialCode: "+20",
    flag: "🇪🇬",
    format: "XXX XXX XXXX",
    maxLength: 10
  },
  {
    code: "IL",
    name: "İsrail",
    dialCode: "+972",
    flag: "🇮🇱",
    format: "XX XXX XXXX",
    maxLength: 9
  },
  {
    code: "AZ",
    name: "Azerbaycan",
    dialCode: "+994",
    flag: "🇦🇿",
    format: "XX XXX XX XX",
    maxLength: 9
  }
];

// Varsayılan ülkeyi getir
export const getDefaultCountry = (): Country => {
  return countriesData.find(c => c.code === "TR") || countriesData[0];
};

// Ülke koduna göre ülkeyi bul
export const getCountryByCode = (code: string): Country | undefined => {
  return countriesData.find(c => c.code === code);
};

// Telefon numarasını formatla
export const formatPhoneNumber = (value: string, format?: string): string => {
  if (!format) return value;
  
  // Sadece rakamları al
  const numbers = value.replace(/\D/g, '');
  let formatted = '';
  let numberIndex = 0;
  
  for (let i = 0; i < format.length; i++) {
    if (format[i] === 'X') {
      if (numberIndex < numbers.length) {
        formatted += numbers[numberIndex];
        numberIndex++;
      } else {
        break;
      }
    } else if (format[i] === '5' && i === 0) {
      // İlk karakterde 5 varsa (Türkiye için)
      formatted += '5';
    } else if (numberIndex > 0 && numberIndex <= numbers.length) {
      formatted += format[i];
    }
  }
  
  return formatted;
};

// Telefon numarasının geçerliliğini kontrol et
export const validatePhoneNumber = (phone: string, country: Country): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === (country.maxLength || 10);
};
