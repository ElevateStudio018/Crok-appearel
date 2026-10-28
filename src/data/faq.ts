import type { Lang } from '../i18n';

// Answers mirror the terms on /policies – keep them in sync.
export const faqs: Record<Lang, { q: string; a: string }[]> = {
  en: [
    {
      q: 'How does the pre-order work?',
      a: 'You pay when you place your pre-order. Each CORK 3 piece is made in a run of 25 after the drop closes, and every order ships before 24 December.',
    },
    {
      q: 'Can I cancel my pre-order?',
      a: 'Yes. You can cancel a pre-order for a full refund at any time before it ships. Email us with your order number.',
    },
    {
      q: 'Where do you ship from?',
      a: 'We ship from Uppsala, Sweden. Shipping cost and delivery time are shown at checkout, and you get an email with tracking when your order ships.',
    },
    {
      q: 'What is your return policy?',
      a: 'You have 14 days from the day you receive your order to withdraw from the purchase. Items must be unused, unwashed and in original condition with tags. Refunds go back to the original payment method within 14 days of us receiving the return.',
    },
    {
      q: 'How do the sizes fit?',
      a: 'Both pieces have a baggy, oversized fit. Take your usual size. Each product page has fit notes, and you can contact us for exact measurements before you order.',
    },
  ],
  sv: [
    {
      q: 'Hur fungerar förbeställningen?',
      a: 'Du betalar när du lägger din förbeställning. Varje CORK 3-plagg tillverkas i 25 exemplar när droppet har stängt, och alla ordrar skickas före 24 december.',
    },
    {
      q: 'Kan jag avbryta min förbeställning?',
      a: 'Ja. Du kan avbryta en förbeställning och få full återbetalning när som helst innan den skickas. Mejla oss med ditt ordernummer.',
    },
    {
      q: 'Var skickar ni ifrån?',
      a: 'Vi skickar från Uppsala. Fraktkostnad och leveranstid visas i kassan, och du får ett mejl med spårningsnummer när din order skickas.',
    },
    {
      q: 'Hur fungerar returer?',
      a: 'Du har 14 dagars ångerrätt från den dag du tar emot din order. Plaggen ska vara oanvända, otvättade och i originalskick med etiketter kvar. Återbetalningen görs till din ursprungliga betalningsmetod inom 14 dagar från att vi tagit emot returen.',
    },
    {
      q: 'Hur är storlekarna?',
      a: 'Båda plaggen har en baggy, oversized passform. Välj din vanliga storlek. Varje produktsida har information om passform, och du kan kontakta oss för exakta mått innan du beställer.',
    },
  ],
};
