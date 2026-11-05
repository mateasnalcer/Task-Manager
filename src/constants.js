export const IME_APLIKACIJE = 'Smjene i zadaci'
export const AUTOR = 'Matea Šnalcer'

export const STRANICE = [
    { id: 'pocetna', naziv: 'Danas', izbornik: true },
    { id: 'smjene', naziv: 'Smjene', izbornik: true },
    { id: 'zadaci', naziv: 'Zadaci', izbornik: true },
]

export const VRSTE_SMJENA = ['Jutarnja', 'Popodnevna', 'Noćna']
export const PRIORITETI = ['Nizak', 'Normalan', 'Visok']

export const formatDatum = (d) => (d ? d.split('-').reverse().join('. ') + '.' : '')

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const danas = () => iso(new Date())
