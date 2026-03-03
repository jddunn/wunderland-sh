/* ============================================================
   Catalog data — Skills, Channels, Providers, Tools
   Source of truth copied from rabbithole's catalog-data.json
   ============================================================ */

export interface SkillEntry {
  name: string;
  displayName: string;
  description: string;
  category: string;
  tags: string[];
  requiredSecrets: string[];
  requiredTools: string[];
}

export interface ChannelEntry {
  packageName: string;
  name: string;
  platform: string;
  displayName: string;
  description: string;
  sdkPackage: string;
  requiredSecrets: string[];
  tier: string;
}

export interface ProviderEntry {
  packageName: string;
  name: string;
  providerId: string;
  displayName: string;
  description: string;
  requiredSecrets: string[];
  defaultModel: string;
  smallModel: string;
}

export interface ToolEntry {
  packageName: string;
  name: string;
  category: string;
  displayName: string;
  description: string;
  requiredSecrets: string[];
}

export const SKILLS_CATALOG: SkillEntry[] = [
  { name: 'web-search', displayName: 'Web Search', description: 'Search the web for up-to-date information, news, documentation, and answers to questions.', category: 'information', tags: ['search', 'web', 'research', 'information-retrieval', 'news'], requiredSecrets: [], requiredTools: ['web-search'] },
  { name: 'weather', displayName: 'Weather Lookup', description: 'Look up current weather conditions, forecasts, and severe weather alerts for any location worldwide.', category: 'information', tags: ['weather', 'forecast', 'climate', 'location'], requiredSecrets: [], requiredTools: ['web-search'] },
  { name: 'summarize', displayName: 'Text / URL Summarization', description: 'Summarize text content, web pages, documents, and long-form articles into concise, structured summaries.', category: 'information', tags: ['summarization', 'text-processing', 'tldr', 'reading'], requiredSecrets: [], requiredTools: ['web-search'] },
  { name: 'github', displayName: 'GitHub (gh CLI)', description: 'Manage GitHub repositories, issues, pull requests, releases, and Actions workflows using the gh CLI.', category: 'developer-tools', tags: ['github', 'git', 'issues', 'pull-requests', 'ci-cd'], requiredSecrets: ['github.token'], requiredTools: [] },
  { name: 'coding-agent', displayName: 'Coding Agent', description: 'Write, review, debug, refactor, and explain code across multiple programming languages and frameworks.', category: 'developer-tools', tags: ['coding', 'programming', 'code-review', 'debugging'], requiredSecrets: [], requiredTools: ['filesystem'] },
  { name: 'git', displayName: 'Git', description: 'Work with Git repositories from the command line — inspect history, create branches, commit changes, and resolve conflicts.', category: 'developer-tools', tags: ['git', 'version-control', 'vcs', 'branching'], requiredSecrets: [], requiredTools: [] },
  { name: 'slack-helper', displayName: 'Slack Helper', description: 'Manage Slack workspaces, channels, messages, and integrations through the Slack API.', category: 'communication', tags: ['slack', 'messaging', 'workspace', 'notifications'], requiredSecrets: ['slack.bot_token', 'slack.app_token'], requiredTools: [] },
  { name: 'discord-helper', displayName: 'Discord Helper', description: 'Manage Discord servers, channels, roles, and messages through the Discord API.', category: 'communication', tags: ['discord', 'messaging', 'server', 'moderation'], requiredSecrets: ['discord.bot_token'], requiredTools: [] },
  { name: 'notion', displayName: 'Notion', description: 'Read, create, and manage pages, databases, and content blocks in Notion workspaces.', category: 'productivity', tags: ['notion', 'wiki', 'database', 'notes', 'project-management'], requiredSecrets: ['notion.api_key'], requiredTools: [] },
  { name: 'obsidian', displayName: 'Obsidian Vault', description: 'Read, create, and manage notes, links, and metadata in Obsidian vaults via the local filesystem.', category: 'productivity', tags: ['obsidian', 'markdown', 'notes', 'knowledge-graph'], requiredSecrets: [], requiredTools: ['filesystem'] },
  { name: 'trello', displayName: 'Trello', description: 'Manage Trello boards, lists, cards, checklists, and team workflows via the Trello API.', category: 'productivity', tags: ['trello', 'kanban', 'project-management', 'boards'], requiredSecrets: ['trello.api_key', 'trello.token'], requiredTools: [] },
  { name: 'apple-notes', displayName: 'Apple Notes', description: 'Create, read, search, and manage notes in Apple Notes using AppleScript and macOS automation.', category: 'productivity', tags: ['apple-notes', 'macos', 'notes', 'applescript'], requiredSecrets: [], requiredTools: ['filesystem'] },
  { name: 'apple-reminders', displayName: 'Apple Reminders', description: 'Create, manage, and query reminders and lists in Apple Reminders using AppleScript.', category: 'productivity', tags: ['apple-reminders', 'macos', 'reminders', 'tasks'], requiredSecrets: [], requiredTools: ['filesystem'] },
  { name: 'healthcheck', displayName: 'Health Check Monitor', description: 'Monitor health and availability of systems, services, APIs, and infrastructure endpoints.', category: 'devops', tags: ['monitoring', 'health', 'uptime', 'infrastructure'], requiredSecrets: [], requiredTools: ['web-search'] },
  { name: 'spotify-player', displayName: 'Spotify Player', description: 'Control Spotify playback, manage playlists, search music, and get recommendations via the Spotify API.', category: 'media', tags: ['spotify', 'music', 'playback', 'playlists'], requiredSecrets: ['spotify.client_id', 'spotify.client_secret', 'spotify.refresh_token'], requiredTools: [] },
  { name: 'whisper-transcribe', displayName: 'Whisper Transcription', description: 'Transcribe audio and video files to text using OpenAI Whisper or compatible speech-to-text APIs.', category: 'media', tags: ['transcription', 'whisper', 'speech-to-text', 'audio'], requiredSecrets: ['openai.api_key'], requiredTools: ['filesystem'] },
  { name: '1password', displayName: '1Password Vault', description: 'Query and retrieve items from 1Password vaults using the 1Password CLI for secure credential access.', category: 'security', tags: ['1password', 'passwords', 'secrets', 'vault'], requiredSecrets: [], requiredTools: [] },
  { name: 'image-gen', displayName: 'AI Image Generation', description: 'Generate images from text prompts using AI image generation APIs like DALL-E, Stable Diffusion, or Midjourney.', category: 'creative', tags: ['image-generation', 'ai-art', 'dall-e', 'creative'], requiredSecrets: ['openai.api_key'], requiredTools: [] },
];

export const CHANNEL_CATALOG: ChannelEntry[] = [
  { packageName: '@framers/agentos-ext-channel-telegram', name: 'channel-telegram', platform: 'telegram', displayName: 'Telegram', description: 'Telegram Bot API via grammY — supports text, images, inline keyboards, groups.', sdkPackage: 'grammy', requiredSecrets: ['telegram.botToken'], tier: 'P0' },
  { packageName: '@framers/agentos-ext-channel-whatsapp', name: 'channel-whatsapp', platform: 'whatsapp', displayName: 'WhatsApp', description: 'WhatsApp Web bridge via Baileys — supports text, images, documents, voice notes.', sdkPackage: '@whiskeysockets/baileys', requiredSecrets: ['whatsapp.sessionData'], tier: 'P0' },
  { packageName: '@framers/agentos-ext-channel-discord', name: 'channel-discord', platform: 'discord', displayName: 'Discord', description: 'Discord bot via discord.js — supports text, embeds, threads, reactions, buttons.', sdkPackage: 'discord.js', requiredSecrets: ['discord.botToken'], tier: 'P0' },
  { packageName: '@framers/agentos-ext-channel-slack', name: 'channel-slack', platform: 'slack', displayName: 'Slack', description: 'Slack workspace integration via Bolt — supports text, blocks, threads, reactions.', sdkPackage: '@slack/bolt', requiredSecrets: ['slack.botToken', 'slack.signingSecret', 'slack.appToken'], tier: 'P0' },
  { packageName: '@framers/agentos-ext-channel-webchat', name: 'channel-webchat', platform: 'webchat', displayName: 'WebChat', description: 'Browser-based chat widget via Socket.IO — embeds in any website.', sdkPackage: 'socket.io', requiredSecrets: [], tier: 'P0' },
  { packageName: '@framers/agentos-ext-channel-signal', name: 'channel-signal', platform: 'signal', displayName: 'Signal', description: 'Signal messenger via signal-cli — end-to-end encrypted messaging.', sdkPackage: 'signal-cli', requiredSecrets: ['signal.phoneNumber'], tier: 'P1' },
  { packageName: '@framers/agentos-ext-channel-imessage', name: 'channel-imessage', platform: 'imessage', displayName: 'iMessage', description: 'iMessage bridge via BlueBubbles — macOS server required.', sdkPackage: 'bluebubbles-node', requiredSecrets: ['imessage.serverUrl', 'imessage.password'], tier: 'P1' },
  { packageName: '@framers/agentos-ext-channel-google-chat', name: 'channel-google-chat', platform: 'google-chat', displayName: 'Google Chat', description: 'Google Chat bot via service account auth — supports threads; inbound events via webhook.', sdkPackage: 'google-auth-library', requiredSecrets: ['googlechat.serviceAccount'], tier: 'P1' },
  { packageName: '@framers/agentos-ext-channel-teams', name: 'channel-teams', platform: 'teams', displayName: 'Microsoft Teams', description: 'Microsoft Teams bot via Bot Framework — supports adaptive cards.', sdkPackage: 'botbuilder', requiredSecrets: ['teams.appId', 'teams.appPassword'], tier: 'P1' },
  { packageName: '@framers/agentos-ext-channel-matrix', name: 'channel-matrix', platform: 'matrix', displayName: 'Matrix', description: 'Matrix/Element via matrix-bot-sdk — decentralized, federated messaging.', sdkPackage: '@vector-im/matrix-bot-sdk', requiredSecrets: ['matrix.homeserverUrl', 'matrix.accessToken'], tier: 'P2' },
  { packageName: '@framers/agentos-ext-channel-zalo', name: 'channel-zalo', platform: 'zalo', displayName: 'Zalo', description: 'Zalo Bot API — popular in Vietnam.', sdkPackage: 'zalo-api', requiredSecrets: ['zalo.botToken'], tier: 'P2' },
  { packageName: '@framers/agentos-ext-channel-email', name: 'channel-email', platform: 'email', displayName: 'Email', description: 'Email messaging via nodemailer (SMTP) + imap-simple (IMAP).', sdkPackage: 'nodemailer', requiredSecrets: ['email.smtpHost', 'email.smtpUser', 'email.smtpPassword'], tier: 'P2' },
  { packageName: '@framers/agentos-ext-channel-sms', name: 'channel-sms', platform: 'sms', displayName: 'SMS', description: 'SMS messaging via Twilio — text-only, worldwide reach.', sdkPackage: 'twilio', requiredSecrets: ['twilio.accountSid', 'twilio.authToken', 'twilio.phoneNumber'], tier: 'P2' },
  { packageName: '@framers/agentos-ext-channel-nostr', name: 'channel-nostr', platform: 'nostr', displayName: 'Nostr', description: 'Nostr relay messaging via nostr-tools — decentralized, censorship-resistant protocol.', sdkPackage: 'nostr-tools', requiredSecrets: ['nostr.privateKey', 'nostr.relayUrls'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-twitch', name: 'channel-twitch', platform: 'twitch', displayName: 'Twitch', description: 'Twitch IRC chat via tmi.js — supports chat messages, commands, whispers.', sdkPackage: 'tmi.js', requiredSecrets: ['twitch.oauthToken', 'twitch.username', 'twitch.channel'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-line', name: 'channel-line', platform: 'line', displayName: 'LINE', description: 'LINE Messaging API — supports text, images, flex messages, rich menus.', sdkPackage: '@line/bot-sdk', requiredSecrets: ['line.channelAccessToken', 'line.channelSecret'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-feishu', name: 'channel-feishu', platform: 'feishu', displayName: 'Feishu / Lark', description: 'Feishu (Lark) bot via official SDK — supports text, cards, interactive messages.', sdkPackage: '@larksuiteoapi/node-sdk', requiredSecrets: ['feishu.appId', 'feishu.appSecret', 'feishu.verificationToken', 'feishu.encryptKey'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-mattermost', name: 'channel-mattermost', platform: 'mattermost', displayName: 'Mattermost', description: 'Mattermost self-hosted chat via official client — supports text, threads, reactions.', sdkPackage: 'ws', requiredSecrets: ['mattermost.url', 'mattermost.token'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-nextcloud', name: 'channel-nextcloud', platform: 'nextcloud-talk', displayName: 'NextCloud Talk', description: 'NextCloud Talk bot API — self-hosted, privacy-focused team messaging.', sdkPackage: 'nextcloud-talk-bot', requiredSecrets: ['nextcloud.url', 'nextcloud.token'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-tlon', name: 'channel-tlon', platform: 'tlon', displayName: 'Tlon (Urbit)', description: 'Tlon / Urbit messaging — peer-to-peer, identity-sovereign communication.', sdkPackage: 'tlon-api', requiredSecrets: ['tlon.shipUrl', 'tlon.code'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-irc', name: 'channel-irc', platform: 'irc', displayName: 'IRC', description: 'IRC channel adapter — supports inbound/outbound messages and channel joins.', sdkPackage: 'node:net', requiredSecrets: ['irc.host', 'irc.port', 'irc.nick', 'irc.channels'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-zalouser', name: 'channel-zalouser', platform: 'zalouser', displayName: 'Zalo Personal', description: 'Zalo personal account messaging via zca-cli (unofficial) — use at your own risk.', sdkPackage: 'zca-cli', requiredSecrets: [], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-reddit', name: 'channel-reddit', platform: 'reddit', displayName: 'Reddit', description: 'Bidirectional Reddit interaction via snoowrap — supports posting, commenting, voting, searching, subscriptions, and messaging.', sdkPackage: 'snoowrap', requiredSecrets: ['reddit.clientId', 'reddit.clientSecret', 'reddit.username', 'reddit.password'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-twitter', name: 'channel-twitter', platform: 'twitter', displayName: 'Twitter / X', description: 'Twitter/X integration via twitter-api-v2 — post, reply, quote, thread, search, and DMs.', sdkPackage: 'twitter-api-v2', requiredSecrets: ['twitter.bearerToken'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-instagram', name: 'channel-instagram', platform: 'instagram', displayName: 'Instagram', description: 'Instagram Graph API — publish content, manage DMs, research hashtags, and track engagement.', sdkPackage: 'axios', requiredSecrets: ['instagram.accessToken'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-tiktok', name: 'channel-tiktok', platform: 'tiktok', displayName: 'TikTok', description: 'TikTok API for Business — upload videos, discover trends, search content, and track analytics.', sdkPackage: 'axios', requiredSecrets: ['tiktok.accessToken'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-youtube', name: 'channel-youtube', platform: 'youtube', displayName: 'YouTube', description: 'YouTube Data API v3 — upload videos/Shorts, comment, search, trending, analytics, playlists.', sdkPackage: 'googleapis', requiredSecrets: ['youtube.apiKey'], tier: 'P3' },
  { packageName: '@framers/agentos-ext-channel-pinterest', name: 'channel-pinterest', platform: 'pinterest', displayName: 'Pinterest', description: 'Pinterest API — create pins, manage boards, search content, trends, analytics, and scheduling.', sdkPackage: 'axios', requiredSecrets: ['pinterest.accessToken'], tier: 'P3' },
];

export const PROVIDER_CATALOG: ProviderEntry[] = [
  { packageName: '@framers/agentos-ext-provider-openai', name: 'provider-openai', providerId: 'openai', displayName: 'OpenAI', description: 'OpenAI API — GPT-4o, GPT-4.1, o-series reasoning models.', requiredSecrets: ['openai.apiKey'], defaultModel: 'gpt-4o', smallModel: 'gpt-4o-mini' },
  { packageName: '@framers/agentos-ext-provider-anthropic', name: 'provider-anthropic', providerId: 'anthropic', displayName: 'Anthropic', description: 'Anthropic API — Claude Sonnet, Haiku, and Opus models.', requiredSecrets: ['anthropic.apiKey'], defaultModel: 'claude-sonnet-4-5-20250929', smallModel: 'claude-haiku-4-5-20251001' },
  { packageName: '@framers/agentos-ext-provider-ollama', name: 'provider-ollama', providerId: 'ollama', displayName: 'Ollama', description: 'Ollama local inference — run open-weight models (Llama, Mistral, etc.) on your own hardware.', requiredSecrets: [], defaultModel: 'llama3', smallModel: 'llama3.2:3b' },
  { packageName: '@framers/agentos-ext-provider-bedrock', name: 'provider-bedrock', providerId: 'bedrock', displayName: 'AWS Bedrock', description: 'AWS Bedrock — managed access to Anthropic Claude, Meta Llama, and other foundation models.', requiredSecrets: ['aws.accessKeyId', 'aws.secretAccessKey', 'aws.region'], defaultModel: 'anthropic.claude-sonnet', smallModel: 'anthropic.claude-haiku' },
  { packageName: '@framers/agentos-ext-provider-gemini', name: 'provider-gemini', providerId: 'gemini', displayName: 'Google Gemini', description: 'Google Gemini API — Gemini 2.0 Flash, Pro, and multimodal models.', requiredSecrets: ['gemini.apiKey'], defaultModel: 'gemini-2.0-flash', smallModel: 'gemini-2.0-flash-lite' },
  { packageName: '@framers/agentos-ext-provider-github-copilot', name: 'provider-github-copilot', providerId: 'github-copilot', displayName: 'GitHub Copilot', description: 'GitHub Copilot Chat API — uses your existing Copilot subscription for model access.', requiredSecrets: ['github.copilotToken'], defaultModel: 'gpt-4o', smallModel: 'gpt-4o-mini' },
  { packageName: '@framers/agentos-ext-provider-cloudflare-ai', name: 'provider-cloudflare-ai', providerId: 'cloudflare-ai', displayName: 'Cloudflare AI', description: 'Cloudflare AI Gateway — proxy and observe requests to any upstream provider with caching.', requiredSecrets: ['cloudflare.accountId', 'cloudflare.apiToken'], defaultModel: '(configurable)', smallModel: '(configurable)' },
  { packageName: '@framers/agentos-ext-provider-minimax', name: 'provider-minimax', providerId: 'minimax', displayName: 'Minimax', description: 'Minimax API — MiniMax-M2.1 and VL-01 vision-language models.', requiredSecrets: ['minimax.apiKey'], defaultModel: 'MiniMax-M2.1', smallModel: 'MiniMax-VL-01' },
  { packageName: '@framers/agentos-ext-provider-qwen', name: 'provider-qwen', providerId: 'qwen', displayName: 'Qwen', description: 'Alibaba Qwen API — Qwen-Max, Qwen-Turbo, and Qwen-VL models.', requiredSecrets: ['qwen.apiKey'], defaultModel: 'qwen-max', smallModel: 'qwen-turbo' },
  { packageName: '@framers/agentos-ext-provider-moonshot', name: 'provider-moonshot', providerId: 'moonshot', displayName: 'Moonshot', description: 'Moonshot AI (Kimi) API — long-context models with strong multilingual support.', requiredSecrets: ['moonshot.apiKey'], defaultModel: 'kimi-k2.5', smallModel: 'kimi-k2-instant' },
  { packageName: '@framers/agentos-ext-provider-xiaomi-mimo', name: 'provider-xiaomi-mimo', providerId: 'xiaomi-mimo', displayName: 'Xiaomi Mimo', description: 'Xiaomi Mimo API — Mimo-v2-Flash model with Anthropic-compatible endpoint.', requiredSecrets: ['xiaomi.apiKey'], defaultModel: 'mimo-v2-flash', smallModel: 'mimo-v2-flash' },
  { packageName: '@framers/agentos-ext-provider-venice', name: 'provider-venice', providerId: 'venice', displayName: 'Venice', description: 'Venice AI — privacy-focused inference with no data retention, supports open-weight models.', requiredSecrets: ['venice.apiKey'], defaultModel: 'venice-default', smallModel: 'venice-fast' },
  { packageName: '@framers/agentos-ext-provider-openrouter', name: 'provider-openrouter', providerId: 'openrouter', displayName: 'OpenRouter', description: 'OpenRouter — unified API gateway to 200+ models from multiple providers with automatic fallback.', requiredSecrets: ['openrouter.apiKey'], defaultModel: 'auto', smallModel: 'auto' },
];

export const TOOL_CATALOG: ToolEntry[] = [
  { packageName: '@framers/agentos-ext-auth', name: 'auth', category: 'tool', displayName: 'Authentication', description: 'User authentication and session management tools.', requiredSecrets: [] },
  { packageName: '@framers/agentos-ext-web-search', name: 'web-search', category: 'tool', displayName: 'Web Search', description: 'Web search using DuckDuckGo by default; optional Serper/Brave API key for enhanced results.', requiredSecrets: [] },
  { packageName: '@framers/agentos-ext-web-browser', name: 'web-browser', category: 'tool', displayName: 'Web Browser', description: 'Headless browser for page fetching and scraping.', requiredSecrets: [] },
  { packageName: '@framers/agentos-ext-cli-executor', name: 'cli-executor', category: 'tool', displayName: 'CLI Executor', description: 'Execute shell commands in a controlled agent workspace (recommended self-hosted).', requiredSecrets: [] },
  { packageName: '@framers/agentos-ext-giphy', name: 'giphy', category: 'tool', displayName: 'Giphy', description: 'Search and share GIFs via the Giphy API.', requiredSecrets: [] },
  { packageName: '@framers/agentos-ext-image-search', name: 'image-search', category: 'tool', displayName: 'Image Search', description: 'Search for images via web APIs.', requiredSecrets: [] },
  { packageName: '@framers/agentos-ext-voice-synthesis', name: 'voice-synthesis', category: 'voice', displayName: 'Voice Synthesis', description: 'Text-to-speech synthesis via ElevenLabs or similar.', requiredSecrets: [] },
  { packageName: '@framers/agentos-ext-news-search', name: 'news-search', category: 'tool', displayName: 'News Search', description: 'Search recent news articles.', requiredSecrets: [] },
  { packageName: '@framers/agentos-ext-skills', name: 'skills', category: 'tool', displayName: 'Skills Registry', description: 'Discover and enable curated SKILL.md prompt modules.', requiredSecrets: [] },
  { packageName: '@framers/agentos-ext-voice-twilio', name: 'voice-twilio', category: 'voice', displayName: 'Twilio Voice', description: 'Phone call integration via Twilio — outbound/inbound calls, TwiML, media streams.', requiredSecrets: ['twilio.accountSid', 'twilio.authToken'] },
  { packageName: '@framers/agentos-ext-voice-telnyx', name: 'voice-telnyx', category: 'voice', displayName: 'Telnyx Voice', description: 'Phone call integration via Telnyx Call Control v2 — SIP, FQDN routing.', requiredSecrets: ['telnyx.apiKey', 'telnyx.connectionId'] },
  { packageName: '@framers/agentos-ext-voice-plivo', name: 'voice-plivo', category: 'voice', displayName: 'Plivo Voice', description: 'Phone call integration via Plivo Voice API — outbound calls, XML responses.', requiredSecrets: ['plivo.authId', 'plivo.authToken'] },
  { packageName: '@framers/agentos-ext-calendar-google', name: 'calendar-google', category: 'productivity', displayName: 'Google Calendar', description: 'Google Calendar API — event CRUD, free/busy queries, multi-calendar support.', requiredSecrets: ['google.clientId', 'google.clientSecret', 'google.refreshToken'] },
  { packageName: '@framers/agentos-ext-email-gmail', name: 'email-gmail', category: 'productivity', displayName: 'Gmail', description: 'Gmail API — send, read, search, reply to emails, manage labels.', requiredSecrets: ['google.clientId', 'google.clientSecret', 'google.refreshToken'] },
  { packageName: '@framers/agentos-ext-telegram', name: 'telegram', category: 'integration', displayName: 'Telegram (Legacy)', description: 'Legacy Telegram bot integration (tool-based, pre-channel system).', requiredSecrets: ['telegram.botToken'] },
];

export const ITEM_ICONS: Record<string, string> = {
  // Skills
  'web-search': '🔍', weather: '🌤️', summarize: '📝', github: '🐙', 'coding-agent': '💻',
  git: '🌳', 'slack-helper': '💬', 'discord-helper': '🎮', notion: '📓', obsidian: '💎',
  trello: '📋', 'apple-notes': '🍎', 'apple-reminders': '⏰', healthcheck: '🏥',
  'spotify-player': '🎵', 'whisper-transcribe': '🎤', '1password': '🔐', 'image-gen': '🎨',
  // Channels
  telegram: '✈️', whatsapp: '💚', discord: '🎮', slack: '💼', webchat: '🌐',
  signal: '🔒', imessage: '💬', 'google-chat': '💬', teams: '👥', matrix: '🟢',
  zalo: '💙', email: '📧', sms: '📱', nostr: '🔮', twitch: '🟣', line: '🟢',
  feishu: '🐦', mattermost: '💭', 'nextcloud-talk': '☁️', tlon: '🔵', irc: '📡',
  zalouser: '💙', reddit: '🤖', twitter: '🐦', instagram: '📸', tiktok: '🎵',
  youtube: '▶️', pinterest: '📌',
  // Providers
  openai: '🧠', anthropic: '🤖', ollama: '🦙', bedrock: '☁️', gemini: '✨',
  'github-copilot': '🤝', 'cloudflare-ai': '🌐', minimax: '🔬', qwen: '🐲',
  moonshot: '🌙', 'xiaomi-mimo': '📱', venice: '🏛️', openrouter: '🔀',
  // Tools
  auth: '🔑', 'web-browser': '🌍', 'cli-executor': '⚡', giphy: '🎬',
  'image-search': '🖼️', 'voice-synthesis': '🗣️', 'news-search': '📰',
  skills: '⚙️', 'voice-twilio': '📞', 'voice-telnyx': '📞', 'voice-plivo': '📞',
  'calendar-google': '📅', 'email-gmail': '📧',
};

export const SKILL_CATEGORIES = ['information', 'developer-tools', 'communication', 'productivity', 'devops', 'media', 'security', 'creative'] as const;
export const CHANNEL_TIERS = ['P0', 'P1', 'P2', 'P3'] as const;
