import { danas, formatDatum } from '../constants'
import { useLista } from '../hooks'
import SmjenaService from '../services/SmjenaService'
import ZadatakService from '../services/ZadatakService'

export default function Pocetna({ idi }) {

    const smjene = useLista(SmjenaService)
    const zadaci = useLista(ZadatakService)

    const sada = danas()
    const danasnjeSmjene = smjene.stavke.filter((s) => s.datum === sada).sort((a, b) => a.vrijemeOd.localeCompare(b.vrijemeOd))
    const danasnji = zadaci.stavke.filter((z) => z.datum === sada).sort((a, b) => a.vrijeme.localeCompare(b.vrijeme))
    const zavrsenih = danasnji.filter((z) => z.zavrseno).length

    async function prebaci(z) {
        await ZadatakService.promijeni(z.sifra, { zavrseno: !z.zavrseno })
        await zadaci.osvjezi()
    }

    return (
        <>
            <h1>Danas: {formatDatum(sada)}</h1>

            <div className="kutije">
                <div className="kutija statistika">
                    <b>{danasnjeSmjene.length ? danasnjeSmjene.map((s) => `${s.vrijemeOd}–${s.vrijemeDo}`).join(', ') : '—'}</b>
                    <span>Današnja smjena</span>
                </div>
                <div className="kutija statistika"><b>{danasnji.length}</b><span>Zadataka</span></div>
                <div className="kutija statistika"><b>{zavrsenih}</b><span>Završeno</span></div>
                <div className="kutija statistika"><b>{danasnji.length - zavrsenih}</b><span>Preostalo</span></div>
            </div>

            <div className="glava">
                <h2>Današnji zadaci</h2>
                <div className="alat bez-razmaka">
                    <button className="gumb" onClick={() => idi('zadaci', 'novi')}>+ Novi zadatak</button>
                    <button className="gumb sporedni" onClick={() => idi('smjene', 'nova')}>+ Nova smjena</button>
                </div>
            </div>
            <div className="kutija popis-zadataka">
                {danasnji.length === 0 ? <p className="prigusen popuna">Danas nema zadataka.</p> : (
                    <ul>
                        {danasnji.map((z) => (
                            <li key={z.sifra} className={z.zavrseno ? 'gotov' : ''}>
                                <label>
                                    <input type="checkbox" checked={z.zavrseno} onChange={() => prebaci(z)} />
                                    <span>{z.vrijeme}</span> {z.naziv}
                                </label>
                                <span className={z.prioritet === 'Visok' ? 'oznaka' : 'prigusen'}>{z.prioritet}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}
