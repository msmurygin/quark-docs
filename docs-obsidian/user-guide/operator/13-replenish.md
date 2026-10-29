# 13 Replenish

## What you will do

Bring stock from storage to a pick location that is running low. The system gives you the task: where to take from, how much, where to bring it.

## Before you start

- You have the `Replenish` task right in a work area over the pick and storage zones. Ask a supervisor if **There is no replenishment for you to take now** never changes.
- Tasks appear by themselves every 5 minutes, or at once when a supervisor presses **Replenish Now**.

## Steps

1. On **Main Menu**, press `2` (**Inventory**). On **Inventory**, press `6` (**Replenish**).
2. **Replenish — Next** asks for your next task. A task already in your hands comes back first. On an error, press `Enter` to ask again.
3. **Replenish — Take** shows:
   - **Go to**: the location to take from;
   - **What**: the SKU and its lot;
   - **Take**: how many, in which unit (for example `16 CS`).
4. Go there and scan the location. A different location stays on this screen: **Not this location: go to …**.
5. **Replenish — How Much** offers the planned quantity. Press `Enter` if you took it all. If there was less, type what you took — then **Replenish — Why Less** asks for a reason (for example `EMPTY`).
6. **Replenish — Bring** shows **Bring to** — the pick location. Go there and scan it. The stock moves and the task closes.
7. **Replenished** says **Replenished in full**, or **Replenished short - the rest comes later**. Press `Enter` for the next task.

`Esc` on the first two screens goes back to the Inventory menu. The task stays yours and comes back first next time.

## If something goes wrong

| Message | What it means | What to do |
|---|---|---|
| There is no replenishment for you to take now | Nothing is due, or nothing in your areas | Wait, or ask a supervisor for the area right |
| This is not the location to bring to: go to … | You scanned another location | Go to the location named |
| Bring a quantity above zero and not above the … planned | More than planned, or zero | Enter what you took, up to the plan |
| Say why less than planned was brought | Less than planned, no reason | Enter a reason |
| Replenishment … is held by another operator | The task is someone else's | Ask for the next task |
| Replenishment … is not open | It was done or called off meanwhile | Ask for the next task |
