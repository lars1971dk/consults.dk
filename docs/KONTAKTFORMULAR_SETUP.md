# CONSULTS.dk – logo og direkte kontaktformular
Opdateret: 24. oktober 2026.

Den oprindelige centrerede forside fra før PR #5 er genskabt på både dansk og engelsk.
Design A's todelte hero-layout er deaktiveret. Skift kun billedreference til
`assets/logo-clean.svg` (hvidt, skarpt logo uden glow) på alle sider.

Kontaktformularen anvender samme SMTP-baserede Vercel API som solidtec.dk:
https://solidtecdk-statistics-service.vercel.app/api/contact.
Serveren vælger modtager efter anmodningens Origin:
- solidtec.dk -> eksisterende SOLIDTEC modtager.
- consults.dk -> info@consults.dk.

E-mail-login/SMTP-kodeord holdes i Vercel-miljøet, ikke på hjemmesiden.
Efter bekræftet API- og SMTP-succes viser siden først da »besked sendt«.
Ved fejl bevares input og Kopiér henvendelse fungerer som fallback.
Der kræves ingen Web3Forms-nøgle eller ny abonnementstjeneste.

Kontrollér ved driftssætning modtagelsen af en reel testmail i
info@consults.dk og at solidtec.dk fortsat modtager som hidtil.
Ingen løfter om leveret mail uden denne faktiske end-to-end test.
