# CONSULTS.dk – kontaktformular og hero-design A
Opdateret 24. oktober 2026.

## Forretning og målgruppe
CONSULTS ApS leverer freelance software-ressourcer og specialistassistance til industriel PLC- og HMI-/SCADA-udvikling. Maskinbyggere og produktionsvirksomheder i Danmark er primær målgruppe, men internationale projekter er relevante.

## Design (valgt eksempel A)
- Beholder det originale CONSULTS-logo og farverne.
- Større, læsbart logo i mørk blå header på store skærme; tilpasset mindre skærme.
- Lyst hero-område med venstrestillet B2B-budskab og virksomhedens eksisterende industrifoto til højre.
- Undgår at udgive AI-genereret HMI-data fra inspirationsbilledet som ægte produktionsdata.
- Implementeret med `assets/option-a.css` efter de eksisterende styles på begge forsider og uden at ændre undersidernes grundlæggende design.

## Kontaktformular – aktuel live-funktion
- Felter: Firma, navn, e-mail, telefon (valgfrit), forventet opstart og arbejdsform (valgfrit), assistanceområde og opgavebeskrivelse.
- Henvendelsen kan klargøres som e-mailkladde eller kopieres til udklipsholder.
- Formularen **sender ikke** automatisk i den nuværende opsætning. Besøgende skal selv trykke Send i e-mailprogrammet.
- Knappen må ikke omdøbes til 'Send forespørgsel', før direkte levering er verificeret.

## Direkte afsendelse – teknisk forberedt, men ikke aktiveret
En valgfri gratis modtagertjeneste (Web3Forms) er forberedt i den eksisterende JavaScript-kode. `CONTACT_FORM_ACCESS_KEY` står bevidst tom på både `index.html` og `en/index.html`.

Før aktivering skal den dataansvarlige:
1. Vælge/acceptére leverandøren og dens databehandleraftale (DPA) og vurdere internationale overførsler. Udbyderen oplyser, at behandling kan ske uden for EU/EØS.
2. Registrere `info@consults.dk` hos `https://web3forms.com/` og bekræfte modtagermailen.
3. Oplyse den offentlige access key, som indsættes i `CONTACT_FORM_ACCESS_KEY` på begge sprogversioner.
4. Konfigurere den kortest relevante opbevaringsperiode (udbyderen tilbyder 7 dage som minimum), kontrollere spamindstillinger og opdatere privatlivsoplysningerne.
5. Sende mindst én testforespørgsel og bekræfte faktisk modtagelse på `info@consults.dk`, herunder fejl- og spammappe.
6. Først derefter skifte knaptekst til direkte afsendelse. Koden skifter automatisk knaptekst, når en ikke-tom key er angivet; siden skal testes live.

Dette er en forberedelse, ikke et løfte om eksisterende direkte levering. Indtil da er mailto/kopi funktionel og uændret sikker fallback. Der oprettes ingen nye betalte tjenester eller konti uden brugerens godkendelse.

## Kontrol efter udgivelse
- Desktop: header-logo, menu, CTA og venstrestillet hero på bred skærm.
- Mobil: header og menu kan bruges, foto ligger under budskabet, kontaktfelter og knapper passer i bredden.
- Dansk og engelsk: opstart/arbejdsform med i både mailto og kopi; intet ugyldigt URL-encoding.
- Sørg for at kontaktformularen **aldrig** viser 'Tak, din besked er sendt' i mailto-tilstanden.
- Fortsæt Google Search Console-indekseringsmåling uafhængigt af dette arbejde.
