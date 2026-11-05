import { useState } from 'react'
import CrudTablica from '../components/CrudTablica'
import { PRIORITETI, danas, formatDatum } from '../constants'
import { useLista } from '../hooks'
import SmjenaService from '../services/SmjenaService'
import ZadatakService from '../services/ZadatakService'

export default function Zadaci({ param }) {

    const zadaci = useLista(ZadatakService)
    const smjene = useLista(SmjenaService)
    const [stanje, setStanje] = useState('')
    const [samoDanas, setSamoDanas] = useState(false)
    const smjenaF = param?.startsWith('smjena-') ? Number(param.slice(7)) : 0

    const smjena = (s) => smjene.stavke.find((x) => x.sifra === s)
    const opisSmjene = (s) => (s ? `${formatDatum(s.datum)} ${s.vrsta} (${s.odjel})` : '—')
    const sada = danas()

    const prikaz = zadaci.stavke
        .filter((z) => !smjenaF || z.smjena === smjenaF)
        .filter((z) => !samoDanas || z.datum === sada)
        .filter((z) => !stanje || (stanje === 'zavrseni' ? z.zavrseno : !z.zavrseno))
        .sort((a, b) => b.datum.localeCompare(a.datum) || a.vrijeme.localeCompare(b.vrijeme))

    async function prebaci(z) {
        await ZadatakService.promijeni(z.sifra, { zavrseno: !z.zavrseno })
        await zadaci.osvjezi()
    }

    function validate(v) {
        const g = {}
        const s = smjena(Number(v.smjena))
        if (s && s.datum !== v.datum) g.datum = `Datum zadatka mora biti datum smjene (${formatDatum(s.datum)}).`
        return g
    }

    return (
        <CrudTablica
            naslov={smjenaF ? `Zadaci smjene: ${opisSmjene(smjena(smjenaF))}` : 'Zadaci'}
            novi="Novi zadatak"
            servis={ZadatakService}
            stavke={prikaz}
            osvjezi={zadaci.osvjezi}
            otvoreno0={param === 'novi'}
            prazno="Nema zadataka za zadane uvjete."
            validate={validate}
            alat={(
                <div className="alat filteri">
                    <select name="stanje" value={stanje} onChange={(e) => setStanje(e.target.value)}>
                        <option value="">Svi zadaci</option>
                        <option value="zavrseni">Završeni</option>
                        <option value="nezavrseni">Nezavršeni</option>
                    </select>
                    <label className="kvacica-filtar">
                        <input type="checkbox" checked={samoDanas} onChange={(e) => setSamoDanas(e.target.checked)} />
                        Samo današnji
                    </label>
                </div>
            )}
            fields={[
                { name: 'naziv', label: 'Naziv zadatka', required: true },
                { name: 'smjena', label: 'Smjena', type: 'select', asNumber: true, required: true, default: smjenaF || '', options: smjene.stavke.map((s) => ({ value: s.sifra, label: opisSmjene(s) })) },
                { name: 'datum', label: 'Datum', type: 'date', required: true, default: sada },
                { name: 'vrijeme', label: 'Vrijeme', type: 'time', required: true, default: '08:00' },
                { name: 'prioritet', label: 'Prioritet', type: 'select', required: true, default: 'Normalan', options: PRIORITETI.map((p) => ({ value: p, label: p })) },
                { name: 'zavrseno', label: 'Završeno', type: 'checkbox' },
                { name: 'napomena', label: 'Napomena', type: 'textarea' },
            ]}
            columns={[
                { render: (z) => <span className={z.zavrseno ? 'precrtano' : ''}>{z.naziv}</span>, label: 'Zadatak' },
                { render: (z) => `${formatDatum(z.datum)} ${z.vrijeme}`, label: 'Termin' },
                { render: (z) => opisSmjene(smjena(z.smjena)), label: 'Smjena' },
                { key: 'prioritet', label: 'Prioritet' },
                { render: (z) => <button className={z.zavrseno ? 'oznaka ok' : 'oznaka'} onClick={() => prebaci(z)} title="Promijeni stanje">{z.zavrseno ? 'Završeno' : 'Preostalo'}</button>, label: 'Status' },
            ]}
        />
    )
}
