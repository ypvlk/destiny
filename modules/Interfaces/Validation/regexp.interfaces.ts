import { AllowedCryptocurrencies, AllowedCurrencies, OnlyLatinSymbols } from './rules.interfaces';

export const regexOnlyLatinChars = new RegExp(`^[${OnlyLatinSymbols}]*$`);

export const regexLatinAndSpecialChars = new RegExp(
  `^[${OnlyLatinSymbols}${AllowedCurrencies}${AllowedCryptocurrencies}]*$`
);

export const regexExample: RegExp = /^[a-z\s.'-]*$/i;
