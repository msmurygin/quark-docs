import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import stats from '../generated/api-stats.json';
import taskCards from '../generated/cards.json';
import styles from './index.module.css';

type Card = {title: string; who: string; text: string; to: string; cta: string; links: Array<[string, string]>; icon: ReactNode};

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const CARDS: Card[] = [
  {
    title: 'Metadata Studio', who: 'Configuration and implementation teams',
    text: 'Explore modules and forms, edit configuration in drafts, and inspect the executable architecture and runtime API map.',
    to: '/docs/studio/', cta: 'Open the Studio guide',
    links: [['Explore the graph', '/docs/studio/graph-explorer/'], ['Configure forms', '/docs/studio/form-designers/'], ['Fork and apply changes', '/docs/studio/module-lifecycle/']],
    icon: icon('M4 4h6v6H4zM14 14h6v6h-6zM14 4h6v6h-6zM7 10v7h7M10 7h4'),
  },
  {
    title: 'Operator guide',
    who: 'Warehouse staff with an RF terminal',
    text: 'Step-by-step screens for receiving, putaway, move, stock count, picking and packing, with the message you will see and what to do next.',
    to: '/docs/operator/',
    cta: 'Open the operator guide',
    links: [
      ['Receiving against an ASN', '/docs/operator/receiving-against-asn/'],
      ['Picking', '/docs/operator/picking/'],
      ['Troubleshooting and messages', '/docs/operator/troubleshooting-and-messages/'],
    ],
    icon: icon('M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM9 7h6M9 11h6M12 17h.01'),
  },
  {
    title: 'Administrator guide',
    who: 'People who set up and run the web application',
    text: 'Users and roles, warehouse structure, owners and SKUs, inbound and outbound policies, labels, reports and the go-live checklist.',
    to: '/docs/admin/',
    cta: 'Open the administrator guide',
    links: [
      ['Users, roles and permissions', '/docs/admin/users-roles-permissions/'],
      ['Warehouse structure', '/docs/admin/warehouse-structure/'],
      ['Go-live checklist', '/docs/admin/checklist-go-live/'],
    ],
    icon: icon('M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z'),
  },
  {
    title: 'API guide',
    who: 'Integrators who call the JSON-RPC API',
    text: `Authentication, request and response format, idempotency and concurrency, errors, webhooks, and a reference for all ${stats.total} methods.`,
    to: '/docs/api/',
    cta: 'Open the API guide',
    links: [
      ['Quickstart', '/docs/api/quickstart/'],
      ['Errors', '/docs/api/errors/'],
      ['Workflows by example', '/docs/api/workflows-by-example/'],
    ],
    icon: icon('M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16'),
  },
];

function EntryCard({card}: {card: Card}) {
  return (
    <article className={styles.card}>
      <div className={styles.cardIcon}>{card.icon}</div>
      <h2 className={styles.cardTitle}>
        <Link to={card.to} className={styles.cardLink}>{card.title}</Link>
      </h2>
      <p className={styles.who}>{card.who}</p>
      <p>{card.text}</p>
      <ul className={styles.quick}>
        {card.links.map(([label, to]) => (
          <li key={to}><Link to={to}>{label}</Link></li>
        ))}
      </ul>
      <Link className={styles.cta} to={card.to}>{card.cta} <span aria-hidden="true">&rarr;</span></Link>
    </article>
  );
}

export default function Home(): ReactNode {
  const apiUrl = useBaseUrl('/api/');
  const allCardsUrl = useBaseUrl(`/cards/files/${taskCards.all.pdf}`);
  return (
    <Layout title="Documentation" description="Guides for warehouse operators and administrators, and the API reference for integrators of Quark WMS.">
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <img className={styles.mark} src={useBaseUrl('/img/favicon.svg')} alt="" width="56" height="56" />
          <p className={styles.eyebrow}>Documentation</p>
          <h1 className={styles.title}>Quark WMS</h1>
          <p className={styles.tagline}>Practical guides for warehouse work, system configuration and integrations. Choose the part that matches your role.</p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/docs/">Get started</Link>
            <a className={`button button--secondary button--lg ${styles.ghost}`} href={apiUrl}>API reference</a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.cards} aria-label="Choose your guide">
          {CARDS.map((c) => <EntryCard key={c.title} card={c} />)}
        </section>

        {taskCards.cards.length > 0 && <section className={styles.taskCards} aria-labelledby="task-cards-title">
          <div>
            <h2 id="task-cards-title">Printable task cards</h2>
            <p>
              {taskCards.cards.length} one-page A5 cards for the RF terminal: receiving, putaway, move, count, picking and packing.
              Steps, screens and what to do when something goes wrong. Print, laminate, keep at the work station.
            </p>
          </div>
          <div className={styles.taskCardsActions}>
            <Link className="button button--primary" to="/cards/">Browse task cards</Link>
            <a className="button button--secondary" href={allCardsUrl} download>Download all (PDF)</a>
          </div>
        </section>}

        <section className={styles.status} aria-labelledby="status-title">
          <h2 id="status-title">What&apos;s new and status</h2>
          <div className={styles.statusGrid}>
            <div>
              <h3>Growing with the product</h3>
              <p>The guides are updated as workflows and screens evolve. Where a screenshot has not been added, follow the written steps and the labels shown in your installation.</p>
            </div>
            <div>
              <h3>API reference</h3>
              <p>
                <a href={apiUrl}>{stats.total} methods</a> in {stats.contexts} contexts, generated from the same catalog the server publishes
                {stats.version ? ` (catalog version ${stats.version})` : ''}. Error bodies are not standard JSON-RPC; see <Link to="/docs/api/errors/">Errors</Link>.
              </p>
            </div>
            <div>
              <h3>Machine-readable</h3>
              <p>Download the catalog as <a href={`${apiUrl}openapi.json`}>OpenAPI 3.1</a> for Postman and code generators, or as <a href={`${apiUrl}openrpc.json`}>OpenRPC</a>.</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
