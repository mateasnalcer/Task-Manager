import { napraviServis } from './Kolekcija'
import { danas } from '../constants'

// Entitet 1: Smjena. Početni podaci su izmišljeni (demo).
export const smjene = [
    { sifra: 1, datum: danas(), vrsta: 'Jutarnja', vrijemeOd: '07:00', vrijemeDo: '15:00', odjel: 'Interna (demo)', napomena: '' },
    { sifra: 2, datum: danas(), vrsta: 'Noćna', vrijemeOd: '22:00', vrijemeDo: '06:00', odjel: 'Interna (demo)', napomena: 'Preuzimanje u 21:45.' },
]

export default napraviServis('sz_smjene', smjene)
