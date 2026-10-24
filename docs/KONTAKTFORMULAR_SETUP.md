# CONSULTS.dk – kontaktformular med valgfri kundekopi

Opdateret: 24. oktober 2026.

## Afsender og modtager

Den tilsigtede opsætning for CONSULTS.dk er:
- **Fra:** CONSULTS <info@consults.dk>
- **Til:** info@consults.dk
- **Svar-til:** den adresse, som kunden indtaster

Den eksisterende Vercel-kontaktservice bruges stadig:
`https://solidtecdk-statistics-service.vercel.app/api/contact`

Serveren vælger mailkonto og modtager ud fra et præcist tilladt website-Origin.
SOLIDTEC.dk bruger fortsat sine eksisterende SMTP-oplysninger og sin mailadresse.

### Vigtig engangsopsætning, der mangler

One.com kræver SMTP-godkendelse med den rigtige afsender-mailkonto.
For CONSULTS skal følgende konfigureres **sikkert i Vercels Production environment**:
- `CONSULTS_SMTP_USER=info@consults.dk` (eller udelades; standard er denne adresse).
- `CONSULTS_SMTP_PASSWORD` = adgangskoden til den aktive mailbox på one.com, som
  en **Sensitive** environment variable. Den må **aldrig** deles i chat eller GitHub.
- Host og port arves fra de eksisterende SMTP-indstillinger (`send.one.com:465`).
  Hvis CONSULTS bruger en anden mailhost, indstilles også `CONSULTS_SMTP_HOST` og
  `CONSULTS_SMTP_PORT`.

Før den særskilte adgangskode er konfigureret, benytter den eksisterende API fortsat
Solidtecs fungerende SMTP-konto som midlertidig afsender til intern modtagelse.
Dette er **ikke** den ønskede endelige afsenderidentitet. Brugeren kan ikke få en
automatisk mailkopi fra korrekt CONSULTS-afsender før mailboxen er tilsluttet.
Efter ændring af miljøvariabel skal Vercel produktionen genudrulles.

## Kundevenligt kontaktflow

- Kontaktformularen findes på dansk og engelsk og bevarer det oprindelige layout.
- Kunden kan sætte et **ikke-forhåndsvalgt** kryds i »Send mig en kopi«.
- Forespørgslen sendes først til CONSULTS. Hvis kopi er valgt, forsøges den sendt
  som en selvstændig kvitteringsmail til kundens egen e-mailadresse.
- Afsender i kundekopien er CONSULTS <info@consults.dk> og Reply-To peger samme sted.
- Hvis intern levering lykkes men kundekopien fejler, modtager browseren
  `{ok:true,copyRequested:true,copySent:false}`. Formularen bevares, så
  kunden kan kopiere teksten; vi forsøger ikke at gensende intern mail automatisk.
- Fejl i intern afsendelse fører aldrig til en falsk succesbesked.

## E-maildesign

CONSULTS' mails på dansk og engelsk har en enkel responsive HTML-skabelon med:
- mørk marineblå overskrift, hvidt CONSULTS-navn og orange accentstreg;
- tydelig emneoverskrift og oversigt over virksomhed, navn, e-mail, telefon og emne;
- læsevenlig blok med kundens opgavebeskrivelse og en egentlig svarknap;
- separat takkekvittering til kunden, i stedet for CC i den interne mail;
- almindelig tekstversion som fallback.

Kundens input HTML-escapes før visning, så f.eks. `<script>` vises som tekst.

## Tests og afgrænsning

- Offline-regressionstest: `node tests/consults-site-check.mjs`.
- Backend-tests: `node --test statistics-service/test-contact.mjs` fra
  SOLIDTEC-repositoryets projektmappe.
- Ingen ekstra formularleverandør, marketingtracking eller betalt mailtjeneste.
- Skal kontrolleres med mindst én ægte testmail **efter** `CONSULTS_SMTP_PASSWORD`
  er sat, inklusive hvilken From-adresse mailklienten faktisk viser.
- Den eneste brugerhandling, som ikke kan automatiseres sikkert her, er at
  oprette den beskyttede SMTP-adgangskode i Vercel.
