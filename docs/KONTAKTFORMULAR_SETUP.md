# CONSULTS.dk – layout, logo og direkte kontakt
Opdateret: 24. oktober 2026.

## Valgt design og afgrænsning
Det oprindelige centrerede layout er bevaret. Den fravalgte split-hero fra Design A er fjernet,
og `assets/option-a.css` er slettet. Logoet er nu `assets/logo-clean.svg`, et hvidt,
vektorskarpt logo uden glød, blur eller skygge. Det anvendes på forside, ydelsessider,
videnssider og i begge sprogversioner.

## Kontakt – samme løsning som SOLIDTEC.dk
Hjemmesiden indsender kontaktformularen via HTTPS POST til den eksisterende
serverless SMTP-tjeneste:
`https://solidtecdk-statistics-service.vercel.app/api/contact`.

Tjenesten er hostet på Vercel i projektet `solidtec.dk-statistics-service`
(backend-kode: `lars1971dk/solidtec.dk/statistics-service`).
Kun de præcist godkendte oprindelser får adgang:
`https://solidtec.dk`, `https://www.solidtec.dk`,
`https://consults.dk` og `https://www.consults.dk`.
Dashboardets særskilte adgangskontrol er uændret.

Modtagere bestemmes **kun på serveren**:
- SOLIDTEC.dk: den eksisterende `CONTACT_RECIPIENT_EMAIL`
  (standard `lt@solidtec.dk`).
- CONSULTS.dk: `CONSULTS_CONTACT_RECIPIENT_EMAIL`
  (standard `info@consults.dk`).

SMTP-afsenderen er stadig den eksisterende SOLIDTEC-mailkonto. Dette er tilsigtet:
CONSULTS-mailen er **modtager**, ikke ny SMTP-login. Kundens adresse sættes som
`Reply-To`. Hvis der senere ønskes afsendelse fra `info@consults.dk`, kræver det en
godkendt, separat SMTP-konfiguration; ingen afsenderdomæner spoofes.

API'et kontrollerer felter, skjult spamfelt, oprindelse og særskilt
rate limiting pr. website. Brugerfladen viser først *sendt*, når API'et returnerer
succes efter SMTP-leveringsforsøg. Ved fejl bevares input og
`Kopiér henvendelse` fungerer fortsat.

## Verifikation
- Automatiske offline-tjek: `node tests/consults-site-check.mjs`.
- Backend: test suite `statistics-service/test-contact.mjs` i SOLIDTEC-repositoriet.
- Vercel produktion: deployment til kontakt-API'et bekræftet READY efter PR #11.
- GitHub Pages: udrulning af CONSULTS PR #6 bekræftet SUCCESS.
- Reelt end-to-end modtagelsescheck er **endnu ikke bekræftet**. Test én kort
  henvendelse fra `https://consults.dk/` og kontrollér indbakke/spam under
  `info@consults.dk`. Uden adgang til mailbox må vi ikke erklære modtagelsen bekræftet.

Ingen ekstra formularleverandør, nye SMTP-hemmeligheder eller betalt tjeneste er nødvendig.
