import type { Lang } from '../i18n';

// Section ids are shared between languages so /policies#returns works in both.
export const policySections: Record<Lang, { id: string; title: string; body: string[] }[]> = {
  en: [
    {
      id: 'pre-order',
      title: 'Pre-orders',
      body: [
        'Pre-order pieces are made in small numbers after the drop closes. You pay when you place your pre-order.',
        'The estimated delivery time is shown on the product page – CORK 3 pre-orders ship before 24 December. If production is delayed, we email you with a new date.',
        'You can cancel a pre-order for a full refund at any time before it ships. Email us with your order number.',
        'If we cannot produce your piece, you get a full refund.',
      ],
    },
    {
      id: 'shipping',
      title: 'Shipping',
      body: [
        'We ship from Uppsala, Sweden. Shipping cost and delivery time are shown at checkout.',
        'You get an email with tracking when your order ships.',
      ],
    },
    {
      id: 'returns',
      title: 'Returns & right of withdrawal',
      body: [
        'You have 14 days to withdraw from your purchase from the day you receive it, in line with the Swedish Distance Contracts Act (distansavtalslagen).',
        'Items must be unused, unwashed and in original condition with tags. Return shipping is paid by the customer unless the item is faulty.',
        'Refunds are made to the original payment method within 14 days of us receiving the return.',
      ],
    },
    {
      id: 'complaints',
      title: 'Complaints',
      body: [
        'Faulty items are covered by the Swedish Consumer Sales Act (konsumentköplagen) for three years. Contact us with photos and your order number.',
        'If we cannot agree, you can turn to the National Board for Consumer Disputes (Allmänna reklamationsnämnden, arn.se).',
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy',
      body: [
        'We only collect what is needed to deliver your order: name, email, address and order details. Payments are handled by our payment provider, Stripe – we never see your card details.',
        'If you sign up for the mailing list, we store your email address only to send you news about CORK releases. You can unsubscribe at any time.',
        'Your data is processed under the GDPR and never sold. You can ask us to see, correct or delete your data at any time.',
      ],
    },
    {
      id: 'terms',
      title: 'Terms of purchase',
      body: ['All prices are in SEK. A purchase is binding once payment is confirmed.', 'These terms follow Swedish law.'],
    },
  ],
  sv: [
    {
      id: 'pre-order',
      title: 'Förbeställningar',
      body: [
        'Förbeställda plagg tillverkas i små upplagor när droppet har stängt. Du betalar när du lägger din förbeställning.',
        'Beräknad leveranstid visas på produktsidan – förbeställningar av CORK 3 skickas före 24 december. Blir produktionen försenad mejlar vi dig ett nytt datum.',
        'Du kan avbryta en förbeställning och få full återbetalning när som helst innan den skickas. Mejla oss med ditt ordernummer.',
        'Om vi inte kan tillverka ditt plagg får du full återbetalning.',
      ],
    },
    {
      id: 'shipping',
      title: 'Frakt',
      body: [
        'Vi skickar från Uppsala. Fraktkostnad och leveranstid visas i kassan.',
        'Du får ett mejl med spårningsnummer när din order skickas.',
      ],
    },
    {
      id: 'returns',
      title: 'Retur & ångerrätt',
      body: [
        'Du har 14 dagars ångerrätt från den dag du tar emot ditt köp, enligt distansavtalslagen.',
        'Plaggen ska vara oanvända, otvättade och i originalskick med etiketter kvar. Kunden betalar returfrakten, om inte plagget är felaktigt.',
        'Återbetalningen görs till den ursprungliga betalningsmetoden inom 14 dagar från att vi tagit emot returen.',
      ],
    },
    {
      id: 'complaints',
      title: 'Reklamation',
      body: [
        'Felaktiga varor omfattas av konsumentköplagen i tre år. Kontakta oss med bilder och ditt ordernummer.',
        'Om vi inte kommer överens kan du vända dig till Allmänna reklamationsnämnden (arn.se).',
      ],
    },
    {
      id: 'privacy',
      title: 'Integritet',
      body: [
        'Vi samlar bara in det som behövs för att leverera din order: namn, e-post, adress och orderuppgifter. Betalningar hanteras av vår betalleverantör Stripe – vi ser aldrig dina kortuppgifter.',
        'Om du skriver upp dig på nyhetsbrevet sparar vi din e-postadress enbart för att skicka nyheter om CORK-släpp. Du kan avsluta när som helst.',
        'Dina uppgifter behandlas enligt GDPR och säljs aldrig. Du kan när som helst be oss visa, rätta eller radera dina uppgifter.',
      ],
    },
    {
      id: 'terms',
      title: 'Köpvillkor',
      body: ['Alla priser anges i SEK. Ett köp är bindande när betalningen är bekräftad.', 'Villkoren följer svensk lag.'],
    },
  ],
};
