---
title: "BIOs and extensions"
slug: /studio/bios-and-extensions/
---

# BIOs and extensions

A BIO describes a business data entity used by forms. Use its details to inspect fields, relationships and the configuration that consumes it.

## Inspect a BIO

1. Select the **BIOs** layer and choose the entity.
2. Check its table or data-source information and its fields.
3. Inspect the forms associated with it.
4. Review relationships before changing a parent or child reference.

A database relationship, a form link and an action binding have different roles. Adding one does not automatically create the others.

## Relationships and discovery

Studio provides relationship discovery from database foreign keys. Check the discovered source and target before accepting a result. Discovery reflects the database structure available to the installation; it does not decide the warehouse business process for you.

## Extensions and bindings

Extensions add registered behaviour to the relevant configuration. A binding determines where that behaviour is used. In the **Extensions** layer and the BIO or form sidebar, inspect the extension kind, configuration and binding target together.

For a lifecycle handler, establish when it runs and which entity it affects. For a form action, establish which interaction invokes it and which result the form expects.

## Before changing a binding

Write down the source event or action, the expected input and the result a user should see. Check the affected workflow in a test environment after applying the draft. Use [Architecture Catalog](08-architecture-catalog.md) to inspect registered behaviour and its current usages.

Do not infer that an unbound registered extension is active. Registration and use are shown separately.
