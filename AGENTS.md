# Quark customer documentation

This repository is the sole authoring source for docs.quark.build. Edit Markdown under docs-obsidian/user-guide and the website engine under docs-site. The private WMS repository is implementation evidence, not a second documentation source.

Write plain English for warehouse users and implementers. Explain tasks, prerequisites, exact UI labels, expected results and recovery. Use Mermaid sequence diagrams or user journeys when they clarify verified workflows. Check current code before documenting behaviour. Distinguish an absent guide from an absent product feature. Do not copy internal QA findings, customer records, secrets or unsupported marketing claims into public documentation.

For changed chapters, obtain an independent documentation review against current implementation. The reviewer checks instructions, navigation, examples, diagrams and links; do not launch WMS certification or broad code tests. Run npm run typecheck, npm run test:docs and npm run build in docs-site. Verify affected pages in a browser, including mobile and both colour themes after styling changes. Strict broken links and anchors remain enabled.

Deployment is directly from main through Vercel. No cross-repository workflow or credential is needed. The founder has authorized the dedicated technical writer to publish verified documentation autonomously. This authorization does not cover changing WMS runtime code, product marketing, DNS, accounts, analytics or privacy settings. Keep updates small and report their source revision and checks.
