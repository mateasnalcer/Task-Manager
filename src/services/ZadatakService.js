import { napraviServis } from './Kolekcija'
import { danas } from '../constants'

// Entitet 2: Zadatak (pripada smjeni). Početni podaci su demo.
export const zadaci = [
    { sifra: 1, naziv: 'Provjera zalihe materijala', datum: danas(), vrijeme: '08:00', smjena: 1, prioritet: 'Normalan', zavrseno: true, napomena: '' },
    { sifra: 2, naziv: 'Priprema dokumentacije', datum: danas(), vrijeme: '09:30', smjena: 1, prioritet: 'Visok', zavrseno: true, napomena: '' },
    { sifra: 3, naziv: 'Provjera opreme', datum: danas(), vrijeme: '11:00', smjena: 1, prioritet: 'Normalan', zavrseno: false, napomena: '' },
    { sifra: 4, naziv: 'Predaja smjene', datum: danas(), vrijeme: '14:30', smjena: 1, prioritet: 'Visok', zavrseno: false, napomena: 'Usmena predaja i zapisnik.' },
]

export default napraviServis('sz_zadaci', zadaci)
