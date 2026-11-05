import { useState } from 'react'
import CrudTablica from '../components/CrudTablica'
import { VRSTE_SMJENA, danas, formatDatum } from '../constants'
import { useLista } from '../hooks'
import SmjenaService from '../services/SmjenaService'
import ZadatakService from '../services/ZadatakService'

export default function Smjene({ idi, param }) {

    const smjene = useLista(SmjenaService)
    const zadaci = useLista(ZadatakService)
    const [datum, setDatum] = useState('')

    const brojZadataka = (s) => zadaci.stavke.filter((z) => z.smjena === s).length
    const prikaz = smjene.stavke
        .filter((s) => !datum || s.datum === datum)
        .sort((a, b) => b.datum.localeCompare(a.datum) || a.vrijemeOd.localeCompare(b.vrijemeOd))

    function validate(v) {
        const g = {}
        if (v.vrsta !== 'Noćna' && v.vrijemeDo <= v.vrijemeOd) g.vrijemeDo = 'Završetak mora biti nakon početka (osim noćne smjene).'
        return g
    }

    return (
        <CrudTablica
            naslov="Smjene"
            novi="Nova smjena"
            servis={SmjenaService}
            stavke={prikaz}
            osvjezi={smjene.osvjezi}
            otvoreno0={param === 'nova'}
            prazno="Nema smjena za zadani datum."
            validate={validate}
            alat={(
                <div className="alat filteri">
                    <label>Smjene na datum <input type="date" name="datum" value={datum} onChange={(e) => setDatum(e.target.value)} /></label>
                    {datum && <button className="veza" onClick={() => setDatum('')}>Prikaži sve</button>}
                </div>
            )}
            fields={[
                { name: 'datum', label: 'Datum', type: 'date', required: true, default: danas() },
                { name: 'vrsta', label: 'Vrsta smjene', type: 'select', required: true, default: 'Jutarnja', options: VRSTE_SMJENA.map((v) => ({ value: v, label: v })) },
                { name: 'vrijemeOd', label: 'Vrijeme početka', type: 'time', required: true, default: '07:00' },
                { name: 'vrijemeDo', label: 'Vrijeme završetka', type: 'time', required: true, default: '15:00' },
                { name: 'odjel', label: 'Odjel', required: true },
                { name: 'napomena', label: 'Napomena', type: 'textarea' },
            ]}
            columns={[
                { render: (s) => formatDatum(s.datum), label: 'Datum' },
                { key: 'vrsta', label: 'Vrsta' },
                { render: (s) => `${s.vrijemeOd} – ${s.vrijemeDo}`, label: 'Vrijeme' },
                { key: 'odjel', label: 'Odjel' },
                { render: (s) => <button className="veza" onClick={() => idi('zadaci', `smjena-${s.sifra}`)}>{brojZadataka(s.sifra)} zadataka</button>, label: 'Zadaci' },
                { render: (s) => s.napomena || '—', label: 'Napomena' },
            ]}
            blokirajBrisanje={(s) => (brojZadataka(s.sifra) > 0 ? 'Smjena ima zadatke. Prvo obrišite njezine zadatke.' : null)}
        />
    )
}
