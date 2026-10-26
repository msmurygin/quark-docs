import {useMemo, useState} from 'react';
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import data from '../../generated/cards.json';
import styles from './cards.module.css';

type TaskCard = {id: string; title: string; area: string; areaLabel: string; png: string; pdf: string; pngBytes: number; pdfBytes: number; width: number; height: number};

const kb = (n: number) => (n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);

export default function TaskCards(): ReactNode {
  const files = useBaseUrl('/cards/files/');
  const cards = data.cards as TaskCard[];
  const [area, setArea] = useState<string>('all');
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of cards) m.set(c.area, (m.get(c.area) ?? 0) + 1);
    return m;
  }, [cards]);
  const shown = area === 'all' ? cards : cards.filter((c) => c.area === area);

  if (!cards.length) return (
    <Layout title="Task cards" description="Printable workflow references for Quark WMS operators.">
      <main className="container margin-vert--xl"><h1>Task cards</h1><p>Printable cards will appear here when their exports are available. The operator guide contains the workflow instructions.</p><Link className="button button--primary" to="/docs/operator/">Open the operator guide</Link></main>
    </Layout>
  );

  return (
    <Layout title="Task cards" description="One-page A5 task cards for RF terminal operators: print, laminate, keep at the workstation.">
      <header className={styles.head}>
        <div className={styles.headInner}>
          <p className={styles.eyebrow}>Operators</p>
          <h1 className={styles.title}>Task cards</h1>
          <p className={styles.lead}>
            One A5 page for each job on the RF terminal: the steps, the screens and what to do when something goes wrong. Print them, laminate them and keep them at the work station.
          </p>
          <div className={styles.actions}>
            <a className="button button--primary button--lg" href={`${files}${data.all.pdf}`} download>
              Download all cards (PDF)
            </a>
            <span className={styles.meta}>{cards.length} cards, one A5 page each, {kb(data.all.bytes)}</span>
          </div>
          <p className={styles.print}>
            <strong>Print:</strong> paper size A5, margins none, scale 100% (not &ldquo;fit to page&rdquo;), colour on.
          </p>
        </div>
      </header>

      <main className={`${styles.main} cards-gallery`}>
        <div className={styles.filters} role="group" aria-label="Filter by area">
          <button type="button" className={`${styles.chip} ${area === 'all' ? styles.chipOn : ''}`} aria-pressed={area === 'all'} onClick={() => setArea('all')}>
            All <span className={styles.count}>{cards.length}</span>
          </button>
          {data.areas.filter((a) => counts.has(a.id)).map((a) => (
            <button key={a.id} type="button" className={`${styles.chip} ${area === a.id ? styles.chipOn : ''}`} aria-pressed={area === a.id} onClick={() => setArea(a.id)}>
              {a.label} <span className={styles.count}>{counts.get(a.id)}</span>
            </button>
          ))}
        </div>

        <ul className={styles.grid}>
          {shown.map((c) => (
            <li key={c.id} className={styles.tile}>
              <img className={styles.preview} src={`${files}${c.png}`} width={c.width} height={c.height} loading="lazy" alt={`Task card ${c.id}: ${c.title}`} />
              <div className={styles.info}>
                <p className={styles.kicker}><span className={styles.id}>{c.id}</span> {c.areaLabel}</p>
                <h2 className={styles.cardTitle}>{c.title}</h2>
                <a className={`button button--primary button--sm ${styles.dl}`} href={`${files}${c.pdf}`} download>
                  Download PDF <span className={styles.size}>{kb(c.pdfBytes)}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.note}>
          The cards follow the operator guide step by step. If your terminal shows something that is not on a card, do not guess: call your supervisor.
        </p>
      </main>
    </Layout>
  );
}
