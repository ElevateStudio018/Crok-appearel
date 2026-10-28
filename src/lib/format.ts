const sek = new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 });

/** 1500 -> "1 500 SEK" */
export const formatPrice = (amount: number) => `${sek.format(amount).replace(/ /g, ' ')} SEK`;
