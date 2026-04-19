# Interview Practice App

An interview practice app for Junior/Entry-Level software engineering positions in backend.

<u>[Check it out!](https://backendprep.sk05mvs33xkna.eu-central-1.cs.amazonlightsail.com/)</u>

## Tools

- **Frontend:** [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/) and [Tailwind CSS](https://tailwindcss.com/) — used to build and style the single-page interactive UI.
- **Backend:** Next.js API routes (TypeScript) — handle prompt construction, parameter tuning, and security guards.
- **LLMs API:** called via the official [openai](https://github.com/openai/openai-node) Node.js, using the `chosen` model.

## Supported LLM Providers and Models

- **OpenAI**
  - `gpt-4.1`
  - `gpt-4.1-mini`
  - `gpt-4.1-nano`
  - `gpt-4o`
  - `gpt-4o-mini`
- **Anthropic**
  - `claude-opus-4-7`
  - `claude-opus-4-6`
  - `claude-sonnet-4-6`
  - `claude-haiku-4-5-20251001`
- **Google**
  - `gemini-2.5-flash`
  - `gemini-2.5-flash-lite`
