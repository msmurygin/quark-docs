import React from 'react';
import stats from '../generated/api-stats.json';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const roles = [
  {n: '01', title: 'Metadata Studio', to: '/docs/studio/', who: 'Configuration and implementation teams', text: 'Explore modules and forms, edit configuration in drafts, and inspect the executable architecture and runtime API map.', links: [['Explore the graph', '/docs/studio/graph-explorer/'], ['Configure forms', '/docs/studio/form-designers/'], ['Fork and apply changes', '/docs/studio/module-lifecycle/']], go: 'Open the Studio guide'},
  {n: '02', title: 'Operator guide', to: '/docs/operator/', who: 'Warehouse staff with an RF terminal', text: 'Step-by-step screens for receiving, putaway, move, stock count, picking and packing, with the message you will see and what to do next.', links: [['Receiving against an ASN', '/docs/operator/receiving-against-asn/'], ['Picking', '/docs/operator/picking/'], ['Troubleshooting and messages', '/docs/operator/troubleshooting-and-messages/']], go: 'Open the operator guide'},
  {n: '03', title: 'Administrator guide', to: '/docs/admin/', who: 'People who set up and run the web application', text: 'Users and roles, warehouse structure, owners and SKUs, inbound and outbound policies, labels, reports and the go-live checklist.', links: [['Users, roles and permissions', '/docs/admin/users-roles-permissions/'], ['Warehouse structure', '/docs/admin/warehouse-structure/'], ['Go-live checklist', '/docs/admin/checklist-go-live/']], go: 'Open the administrator guide'},
  {n: '04', title: 'API guide', to: '/docs/api/', who: 'Integrators who call the JSON-RPC API', text: `Authentication, request and response format, idempotency and concurrency, errors, webhooks, and a reference for all ${stats.total} methods.`, links: [['Quickstart', '/docs/api/quickstart/'], ['Errors', '/docs/api/errors/'], ['Workflows by example', '/docs/api/workflows-by-example/']], go: 'Open the API guide'},
];

export default function Home() {
  return (
    <Layout title="Documentation" description="Guides for warehouse operators and administrators, and the API reference for integrators of Quark WMS.">
      <main>
        <section className="qd-hero">
          <div className="qd-wrap qd-hero-grid">
            <div>
              <p className="qd-kick">Documentation</p>
              <h1 className="qd-display">Quark WMS<br /><span>documentation.</span></h1>
              <p className="qd-lede">Practical guides for warehouse work, system configuration and integrations. Choose the part that matches your role.</p>
              <div className="qd-actions">
                <Link className="qd-btn" to="/docs/">Get started <span aria-hidden="true">→</span></Link>
                <a className="qd-btn is-ghost" href="/api/">API reference</a>
              </div>
            </div>
            <dl className="qd-facts">
              <div><dt>Guides</dt><dd>4 roles</dd></div>
              <div><dt>API methods</dt><dd><a href="/api/">{stats.total}</a></dd></div>
              <div><dt>Contexts</dt><dd>{stats.contexts}</dd></div>
              <div><dt>Catalog</dt><dd>v{stats.version}</dd></div>
            </dl>
          </div>
        </section>
        <section className="qd-sec">
          <div className="qd-wrap">
            <header className="qd-shead">
              <div><p className="qd-kick">Choose by role</p><h2 className="qd-h2">Start where your work is.</h2></div>
              <p>Each guide is written for one audience. Operators get screens and messages; administrators get policies; integrators get the API.</p>
            </header>
            <div className="qd-roles">
              {roles.map((r) => (
                <article className="qd-role" key={r.n}>
                  <span className="qd-role-n">{r.n}</span>
                  <h3><Link to={r.to}>{r.title}</Link></h3>
                  <p className="qd-role-for">{r.who}</p>
                  <p>{r.text}</p>
                  <ul>{r.links.map(([l, to]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul>
                  <Link className="qd-role-go" to={r.to}>{r.go} →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="qd-sec is-tint">
          <div className="qd-wrap">
            <header className="qd-shead"><div><p className="qd-kick">What's new and status</p><h2 className="qd-h2">Growing with the product.</h2></div></header>
            <div className="qd-status">
              <article><p className="qd-kick">Guides</p><h3>Updated as screens evolve</h3><p>Where a screenshot has not been added, follow the written steps and the labels shown in your installation.</p></article>
              <article><p className="qd-kick">API reference</p><h3><a href="/api/">{stats.total} methods in {stats.contexts} contexts</a></h3><p>Generated from the same catalog the server publishes (catalog version {stats.version}). Error bodies are not standard JSON-RPC; see <Link to="/docs/api/errors/">Errors</Link>.</p></article>
              <article><p className="qd-kick">Machine-readable</p><h3>OpenAPI 3.1 and OpenRPC</h3><p>Download the catalog as <a href="/api/openapi.json">OpenAPI 3.1</a> for Postman and code generators, or as <a href="/api/openrpc.json">OpenRPC</a>.</p></article>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
