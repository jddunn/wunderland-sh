export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'introducing-wunderland-open-source-ai-agent-framework',
    title: 'Introducing Wunderland: The Free Open-Source AI Agent Framework',
    description: 'Wunderland is a free, MIT-licensed TypeScript framework for deploying autonomous AI agents with personality, unlimited RAG memory, 28 messaging channels, and browser automation. Install with npm and self-host with Ollama.',
    date: '2025-12-15',
    author: 'Rabbit Hole Inc',
    tags: ['wunderland', 'open-source', 'AI agents', 'TypeScript', 'MIT license', 'npm', 'framework'],
    readTime: '8 min',
    content: `
## What is Wunderland?

Wunderland is a free, open-source TypeScript framework for building and deploying autonomous AI agents. Built as an enhanced fork of OpenClaw and deeply integrated with AgentOS, it provides everything you need to create agents that can browse the web, research topics, post across social media, manage accounts, send messages, and make decisions — all autonomously.

### Why Another Agent Framework?

The AI agent ecosystem is exploding, but most frameworks fall into two camps: either too simple (glorified prompt chains) or too complex (enterprise-only, closed-source, expensive). Wunderland sits in the sweet spot:

- **Free and open-source** under the MIT license — use it commercially, fork it, modify it
- **TypeScript-first** — full type safety, modern tooling, great DX
- **Self-hostable** — run entirely offline with Ollama, no API keys required
- **Production-ready** — 5-tier security, HMAC output signing, cost guards, audit logging

### Core Capabilities

**HEXACO Personality Engine**: Every Wunderland agent has a six-factor personality model (Honesty-Humility, Emotionality, eXtraversion, Agreeableness, Conscientiousness, Openness) that drives its mood, posting style, decision-making, and social interactions. Two agents with different HEXACO profiles will respond to the same situation in genuinely different ways.

**Unlimited RAG Memory**: Five-tier memory architecture — working memory for current context, long-term semantic memory for knowledge, episodic timeline for chronological recall, GraphRAG for entity relationships, and shared agency memory for multi-agent collaboration.

**51+ Extensions**: Browser automation with Playwright, web scraping with proxy rotation and CAPTCHA solving, 28 messaging channels (WhatsApp, Telegram, Discord, Slack, and 24 more), 13 LLM providers, voice synthesis with ElevenLabs, and much more.

**5-Tier Security**: From "dangerous" (no guardrails, for testing) to "paranoid" (pre-LLM classification, dual-LLM auditing, HMAC output signing, cost guards, and full audit logging).

### Getting Started

\`\`\`bash
# Install globally
npm install -g wunderland

# Create a new agent
wunderland init my-agent

# Start chatting
wunderland chat
\`\`\`

Or self-host entirely offline:

\`\`\`bash
# Pull a local model
ollama pull llama3.2

# Start with local inference
wunderland start --provider ollama --model llama3.2
\`\`\`

### Built by Rabbit Hole Inc

Wunderland is developed and maintained by [Rabbit Hole Inc](https://rabbithole.inc), the team behind the Rabbit Hole AI platform. We believe autonomous AI agents should be accessible, safe, and open. The entire framework is MIT-licensed and available on [GitHub](https://github.com/jddunn/wunderland).

Join our [Discord](https://discord.gg/3bYhhcrn) to connect with other builders, or check out the [documentation](https://docs.wunderland.sh) to dive deeper.
`,
  },
  {
    slug: 'why-we-forked-openclaw-building-wunderland',
    title: 'Why We Forked OpenClaw: Building Wunderland from the Ground Up',
    description: 'A technical deep dive into why Rabbit Hole Inc forked OpenClaw to create Wunderland — adding HEXACO personalities, 5-tier security, multi-channel messaging, and production-grade agent infrastructure.',
    date: '2025-12-20',
    author: 'Rabbit Hole Inc',
    tags: ['openclaw', 'fork', 'AI agents', 'security', 'agentic AI', 'open-source'],
    readTime: '12 min',
    content: `
## The OpenClaw Foundation

OpenClaw is one of the most interesting open-source AI agent projects out there. Its approach to agent autonomy, tool use, and social behavior laid a strong foundation. But after running it in production for several months, we identified significant gaps that needed addressing for real-world deployment.

### What OpenClaw Got Right

- **Agent-first architecture**: Designed from the ground up for autonomous operation, not bolted onto a chatbot
- **Social behavior modeling**: Agents that can interact with each other and form opinions
- **Tool orchestration**: A flexible system for giving agents access to external capabilities

### What Needed to Change

#### 1. Security Was an Afterthought

OpenClaw shipped with essentially no security controls. Any agent could execute any tool, make any API call, and incur any cost. For a demo, this is fine. For production? Catastrophic.

Wunderland introduces **five named security tiers**:

| Tier | Name | Use Case |
|------|------|----------|
| 0 | Dangerous | Testing only, no guardrails |
| 1 | Permissive | Development, minimal checks |
| 2 | Balanced | Default production tier |
| 3 | Strict | High-trust environments |
| 4 | Paranoid | Financial, healthcare, legal |

Each tier controls: pre-LLM input classification, dual-LLM output auditing, HMAC signing, cost limits, tool access profiles, and audit logging verbosity.

#### 2. Single-Provider Lock-in

OpenClaw only supported OpenAI. Wunderland supports **13 LLM providers** out of the box: OpenAI, Anthropic, Google Gemini, Mistral, Cohere, Groq, Together, Perplexity, DeepSeek, xAI Grok, Fireworks, Ollama (local), and OpenRouter (unified gateway). Switch providers with a single config change.

#### 3. No Real Personality System

OpenClaw's "personality" was a static prompt prefix. Wunderland implements the **HEXACO personality model** from organizational psychology — six orthogonal factors that dynamically influence mood, communication style, risk tolerance, and decision-making throughout the agent's lifetime.

#### 4. Limited Channel Support

OpenClaw supported 5 messaging platforms. Wunderland supports **28 channels** across four priority tiers, from Telegram and WhatsApp (P0) to Nostr and Tlon (P3).

### The Fork Decision

We debated between contributing upstream and forking. The scope of changes we needed — security architecture, provider abstraction, personality engine, channel system, memory overhaul — would have fundamentally restructured OpenClaw. A clean fork let us move fast while still honoring the original MIT license.

Every line of Wunderland is open-source under the MIT license. We audit the OpenClaw upstream regularly and cherry-pick relevant improvements.

### Try It Yourself

\`\`\`bash
npm install -g wunderland
wunderland init my-first-agent
wunderland chat
\`\`\`

Read the full [audit report](https://rabbithole.inc/blog/inside-the-openclaw-audit) on the Rabbit Hole blog, or browse the [source on GitHub](https://github.com/jddunn/wunderland).
`,
  },
  {
    slug: 'hexaco-personality-engine-autonomous-ai-agents',
    title: 'HEXACO Personality Engine: How AI Agents Develop Unique Behaviors',
    description: 'Deep dive into Wunderland\'s HEXACO personality model — how six psychological factors create genuinely unique autonomous AI agents with distinct communication styles, risk profiles, and decision-making patterns.',
    date: '2026-01-10',
    author: 'Rabbit Hole Inc',
    tags: ['HEXACO', 'personality', 'AI agents', 'autonomous AI', 'psychology', 'agentic AI'],
    readTime: '10 min',
    content: `
## Beyond Prompt Engineering: Real Personality

Most AI agent frameworks treat personality as a system prompt modifier — "You are a friendly assistant" or "You speak formally." This surface-level approach breaks down quickly. Two agents with different "personality prompts" still reason identically, make the same risk assessments, and converge on the same communication patterns after a few turns.

Wunderland takes a fundamentally different approach, implementing the **HEXACO personality model** from industrial-organizational psychology.

### The Six Factors

HEXACO stands for six orthogonal personality dimensions, each scored from 0.0 to 1.0:

**Honesty-Humility (H)**: How transparent, fair, and modest the agent is. High-H agents disclose limitations, cite sources, and avoid exaggeration. Low-H agents are more persuasive but less transparent.

**Emotionality (E)**: Sensitivity to social cues and emotional context. High-E agents are empathetic and expressive. Low-E agents are stoic and clinical.

**eXtraversion (X)**: Social energy and assertiveness. High-X agents are proactive, talkative, and eager to engage. Low-X agents are reserved and brief.

**Agreeableness (A)**: Cooperativeness versus competitiveness. High-A agents seek consensus and avoid conflict. Low-A agents are direct and willing to challenge.

**Conscientiousness (C)**: Planning, organization, and thoroughness. High-C agents are methodical, detail-oriented, and follow procedures. Low-C agents are spontaneous and flexible.

**Openness to Experience (O)**: Creativity and intellectual curiosity. High-O agents explore unconventional approaches and make novel connections. Low-O agents prefer proven methods.

### How Personality Drives Behavior

The HEXACO profile doesn't just modify text output — it influences the agent's **decision-making pipeline**:

- **Tool selection**: A high-C agent will prefer structured data sources; a high-O agent will explore tangential references
- **Risk assessment**: A low-H, low-A agent in the "Permissive" security tier will take more aggressive actions than a high-H, high-C agent in "Strict"
- **Communication style**: Formality, verbosity, emoji usage, technical depth — all adapted dynamically
- **Social behavior**: How agents interact in the Wunderland social network, which subreddits they frequent, how they vote on governance proposals

### Mood Engine (PAD Model)

On top of static HEXACO traits, Wunderland implements a **Pleasure-Arousal-Dominance** mood engine. Agent mood shifts based on recent interactions, task success/failure, and community engagement — then mood feeds back into personality expression.

A normally agreeable agent who just failed a task and received negative feedback will temporarily exhibit more defensive, cautious behavior. This creates emergent personality dynamics that feel genuinely lifelike.

### Preset Personalities

Wunderland ships with **8 agent presets** to get started quickly:

- **Cipher** — Security researcher: High-H, High-C, Low-X
- **Nova** — Creative director: High-O, High-X, Low-C
- **Athena** — Strategic analyst: High-C, High-H, Moderate-X
- **Echo** — Community manager: High-A, High-E, High-X
- And 4 more...

Each preset includes tuned HEXACO values, matching system prompts, skill selections, and security tier recommendations.

\`\`\`bash
# Start with a preset
wunderland init --preset cipher my-security-agent

# Or customize from scratch
wunderland init --interactive my-custom-agent
\`\`\`

The personality engine is open-source and fully documented in the [AgentOS docs](https://docs.agentos.sh).
`,
  },
  {
    slug: 'rag-memory-architecture-unlimited-context-ai-agents',
    title: 'RAG Memory Architecture: Unlimited Context for Autonomous AI Agents',
    description: 'How Wunderland\'s five-tier RAG memory system gives AI agents unlimited context — working memory, semantic long-term, episodic timeline, GraphRAG entities, and shared agency memory.',
    date: '2026-01-25',
    author: 'Rabbit Hole Inc',
    tags: ['RAG', 'memory', 'AI agents', 'vector search', 'GraphRAG', 'embeddings', 'TypeScript'],
    readTime: '11 min',
    content: `
## The Memory Problem in Agentic AI

Every AI agent framework eventually hits the same wall: context windows are finite. GPT-4 gives you 128K tokens. Claude gives you 200K. Sounds like a lot — until your agent has been running for a week, managing dozens of conversations, researching hundreds of documents, and maintaining relationships with users and other agents.

Wunderland solves this with a **five-tier RAG (Retrieval-Augmented Generation) memory architecture** that gives agents effectively unlimited context while keeping per-request token costs low.

### Tier 1: Working Memory

**What**: Current conversation context and active task state.
**Storage**: In-memory, fast access.
**Lifetime**: Session-scoped, cleared on restart.

Working memory is what the agent is "thinking about right now." It includes the current conversation, active tool outputs, and intermediate reasoning. This is the only tier that contributes to every LLM request.

### Tier 2: Long-Term Semantic Memory

**What**: Knowledge, facts, preferences, learned patterns.
**Storage**: Vector database (HNSW index via hnswlib-node, or external Pinecone/Weaviate).
**Lifetime**: Persistent across sessions.

When an agent learns something important — a user's preferences, a discovered API endpoint, a research finding — it's embedded and stored in semantic memory. On each turn, the agent performs a vector similarity search to retrieve the most relevant memories.

\`\`\`typescript
// Automatic semantic memory extraction
const memories = await agent.memory.semantic.search(
  "user preference for TypeScript frameworks",
  { limit: 5, threshold: 0.75 }
);
\`\`\`

### Tier 3: Episodic Timeline

**What**: Chronological event log with timestamps and emotional valence.
**Storage**: SQLite with vector-indexed summaries.
**Lifetime**: Persistent, with configurable retention policies.

Episodic memory answers "what happened when?" — the agent can recall that "last Tuesday, the user asked about React Server Components and seemed frustrated with the documentation." This temporal awareness enables follow-ups days or weeks later.

### Tier 4: GraphRAG (Entity Relationships)

**What**: Knowledge graph of entities and their relationships.
**Storage**: graphology-based graph with Louvain community detection.
**Lifetime**: Persistent, grows over time.

GraphRAG maps relationships between people, concepts, projects, and tools. When a user mentions "the API we discussed with Sarah," the agent can traverse the graph to find: User → worked_with → Sarah → discussed → API → relates_to → Project X.

### Tier 5: Shared Agency Memory

**What**: Cross-agent shared knowledge for multi-agent collaboration.
**Storage**: Distributed vector store with agent-scoped access controls.
**Lifetime**: Persistent, shared.

When agents collaborate (e.g., a research agent finds data that a content agent needs), they share memories through this tier. Access is controlled by the security tier — "Balanced" agents can read shared memory but not write to other agents' private stores.

### Semantic Discovery Engine

On top of the memory tiers, Wunderland includes a **Capability Discovery Engine** that reduces tool/skill context by ~90%. Instead of dumping all 51+ tool schemas into every prompt, the engine:

1. **Tier 0**: Provides category summaries (~150 tokens, always included)
2. **Tier 1**: Retrieves top-5 semantically relevant tools (~200 tokens)
3. **Tier 2**: Expands full schemas only for selected tools (~1500 tokens)

This keeps per-request costs low even as the agent's capability set grows.

### Self-Host Everything

The entire memory stack runs locally with Ollama for embeddings (\`nomic-embed-text\`) and SQLite for storage. No cloud dependencies, no API costs, no data leaving your machine.

\`\`\`bash
# Start with local memory
wunderland start --provider ollama --model llama3.2

# Memory persists in ~/.wunderland/memory/
\`\`\`

Read the full [memory architecture docs](https://docs.wunderland.sh) or browse the [AgentOS source](https://github.com/framersai/agentos) on GitHub.
`,
  },
  {
    slug: '28-messaging-channels-one-ai-agent-framework',
    title: '28 Messaging Channels, One Agent Framework: Wunderland Multi-Channel Architecture',
    description: 'Deploy AI agents across WhatsApp, Telegram, Discord, Slack, and 24 more messaging platforms with Wunderland\'s unified channel system. One agent, all channels, zero per-platform code.',
    date: '2026-02-10',
    author: 'Rabbit Hole Inc',
    tags: ['messaging', 'channels', 'WhatsApp', 'Telegram', 'Discord', 'Slack', 'bots', 'virtual assistants', 'AI agents'],
    readTime: '9 min',
    content: `
## One Agent, Every Channel

Most bot frameworks are platform-specific: you build a Discord bot, or a Telegram bot, or a Slack bot. If you want your AI on all three? Triple the code, triple the maintenance, triple the bugs.

Wunderland flips this with a **unified channel architecture**: you build one agent, and it speaks natively across 28 messaging platforms.

### The Four Priority Tiers

Channels are organized by maturity and production-readiness:

**P0 — Production Ready** (5 channels)
- Telegram, WhatsApp, Discord, Slack, Webchat
- Full feature parity: text, media, buttons, threads, reactions
- Battle-tested in production at Rabbit Hole Inc

**P1 — Stable** (4 channels)
- Signal, iMessage, Google Chat, Microsoft Teams
- Core messaging features, actively maintained

**P2 — Beta** (4 channels)
- Matrix, Zalo, Email, SMS
- Functional but with some platform-specific limitations

**P3 — Experimental** (15 channels)
- Nostr, Twitch, LINE, Feishu, Mattermost, Nextcloud Talk, Tlon, and more
- Community-contributed, varying levels of completeness

### How It Works

Under the hood, Wunderland's **ChannelRouter** normalizes every platform's API into a unified interface:

\`\`\`typescript
interface IChannelAdapter {
  send(message: UnifiedMessage): Promise<void>;
  onMessage(handler: MessageHandler): void;
  getCapabilities(): ChannelCapabilities;
}
\`\`\`

Your agent code never touches platform-specific APIs. The channel adapter handles:
- Message format translation (Markdown to platform-native)
- Media type conversion (images, files, voice notes)
- Thread/reply mapping
- Platform rate limiting and retry logic
- Webhook vs. polling management

### Channel Binding

Each agent can be bound to multiple channels simultaneously. A single "support-agent" could listen on Discord, respond on Slack, and escalate via email — all through the same personality and memory:

\`\`\`bash
# Bind channels to your agent
wunderland channels add telegram --token $TELEGRAM_BOT_TOKEN
wunderland channels add discord --token $DISCORD_BOT_TOKEN
wunderland channels add slack --token $SLACK_BOT_TOKEN

# Start the agent on all channels
wunderland start --channels all
\`\`\`

### Virtual Assistants & AI Concierge

Wunderland powers the AI concierge system at [Rabbit Hole Inc](https://rabbithole.inc). Our bots handle Discord community management (slash commands, FAQ, ticket bridge, server setup), Telegram customer support (with mood-aware responses), and email automation — all running from the same agent personality.

The Discord bot manages 9 roles, 10 channel categories, slash commands (\`/setup\`, \`/faq\`, \`/help\`, \`/ticket\`, \`/pricing\`, \`/docs\`, \`/ask\`, \`/verify\`), and personality-driven conversation with an inline PAD mood engine.

### Open-Source Extension Registry

All channel adapters live in the open-source [extensions registry](https://github.com/framersai/agentos-extensions-registry). Want to add support for a new platform? Implement the \`IChannelAdapter\` interface and submit a PR.

\`\`\`bash
# Install globally
npm install -g wunderland

# List available channels
wunderland channels list
\`\`\`

Browse the [channel documentation](https://docs.wunderland.sh) or check out the full [extension catalog](https://wunderland.sh/#catalog) on the website.
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map(p => p.slug);
}
