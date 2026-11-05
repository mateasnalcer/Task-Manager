# Smjene i zadaci

Evidencija radnih smjena i zadataka po smjenama.

Autor: Matea Šnalcer

## Entiteti (CRUD nad oba)

- **Smjena**: datum, vrsta (jutarnja, popodnevna, noćna), vrijeme početka i završetka, odjel, napomena
- **Zadatak**: naziv, smjena, datum, vrijeme, prioritet, završeno (kvačica), napomena

## Funkcije
- Početna ("Danas"): današnja smjena, broj zadataka, završeno i preostalo, popis današnjih zadataka s kvačicom za završetak.
- Pregled smjena po datumu; zadaci jedne smjene.
- Filtriranje zadataka na završene i nezavršene te samo današnje.
- Brisanje uz potvrdu; smjena sa zadacima ne može se obrisati.

Početni podaci su izmišljeni (demo). Podaci se spremaju u `localStorage`.

## Tehnologije
React 19, Vite
