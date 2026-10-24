# CONSULTS.dk – organisk markedsføring uden annoncebudget
Opdateret: 24. oktober 2026.

## Udført i GitHub
- Danish/English homepage with unique search titles, descriptions, canonical URLs, hreflang, robots.txt and ProfessionalService data.
- Three bilingual service-page pairs covering PLC programming, HMI/SCADA and troubleshooting.
- Two bilingual expert-oriented practical guides about preparing a PLC project and managing WinCC alarms/recipes.
- Two index pages: `/viden/` and `/en/insights/`; homepage navigation and all service pages link to the relevant guides.
- Sitemap expanded from 8 to 14 canonical URLs (7 Danish + 7 English), with reciprocal language references.
- Kontaktformularen sender nu via den eksisterende SOLIDTEC/Vercel SMTP-API; dansk og engelsk har fortsat en manuel kopifunktion ved fejl. CONSULTS-henvendelser adresseres til info@consults.dk.
- A simulated, randomly increasing production counter on the homepage illustration has been removed and marked as illustrative.
- Existing Google Search Console: site owner reports sitemap status **Succes** on 24 October 2026. The detailed indexing/performance report is still pending.

## Search intent map (relevance hypotheses, not validated search volumes)
| Destination | Primary intent |
| --- | --- |
| `/` | freelance PLC-konsulent, PLC-programmering |
| `/plc-programmering/` | Siemens PLC-programmering, TIA Portal freelance |
| `/hmi-scada/` | HMI-programmering, WinCC |
| `/plc-fejlfinding/` | Siemens PLC-support, PLC-fejlfinding |
| `/viden/forbered-plc-opgave/` | forbered PLC-projekt, tjekliste PLC-konsulent |
| `/viden/wincc-alarmer/` | WinCC-alarmer, HMI alarmtekster, recepter |
| English versions | freelance PLC programmer Denmark, Siemens TIA Portal engineer, WinCC HMI consultant |

## Kvalitetskrav
- Ingen offentlige kundecases uden særskilt tilladelse og faktisk dokumentation.
- Ingen opfundne produktionsbesparelser, testimonials eller live-telemetri.
- Ingen ukontrollerede API-nøgler, betalt SEO-platform eller marketingtracking cookies.
- Ved publicering af tekniske guides: vurder at eksempler ikke kan misforstås som instruktioner til usikre ændringer på kørende anlæg.

## Næste gratis opgaver
1. Google Search Console: når der er data, kontroller antallet af indekserede URL'er, søgeforespørgsler, klik og sider med fejl. Der er ikke behov for gentagne, uændrede sitemap-indsendelser.
2. LinkedIn: optimer personlig profil og virksomhedsside med specialerne Siemens TIA Portal, WinCC, Beckhoff, PLC-fejlfinding og idriftsættelse.
3. Offentliggør højst to faglige opslag pr. måned til at begynde med – med link til relevant guide, når det hjælper læseren.
4. Indsæt anonymiserede kundecases, hvis projekterne er godkendt og resultaterne dokumenterbare.
5. Kontrollér faktisk modtagelse af én prøvehenvendelse på info@consults.dk og løbende fejlstatus for kontakt-API'et. Serveren bruger samme eksisterende SMTP-løsning som solidtec.dk.

## Måling
Registrér søgevisninger, ikke-brandede klik og kvalificerede kundehenvendelser månedligt. Sammenhold Google-søgninger med henvendelser og afsluttede salg. Søgeplaceringer og afkast er ikke garanteret.

## Design og formulardrift (24. oktober 2026)
- Oprindeligt, centreret layout genskabt efter brugerens valg.
- CONSULTS-logoet vises som skarpt, hvidt SVG uden glow på alle sider.
- Det fravalgte todelte Design A-stylesheet er fjernet.
- Direkte formular til eksisterende SOLIDTEC/Vercel-kontakt-API: dansk/engelsk, særskilt modtageradresse for CONSULTS.
- Se `docs/KONTAKTFORMULAR_SETUP.md` og offline testen i `tests/consults-site-check.mjs`.
