'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  SKILLS_CATALOG, CHANNEL_CATALOG, PROVIDER_CATALOG, TOOL_CATALOG,
  ITEM_ICONS, SKILL_CATEGORIES, CHANNEL_TIERS,
  type SkillEntry, type ChannelEntry, type ProviderEntry, type ToolEntry,
} from '@/data/catalog-data';

type Tab = 'skills' | 'channels' | 'providers' | 'tools';

const TAB_META: { key: Tab; label: string; count: number }[] = [
  { key: 'skills', label: 'Skills', count: SKILLS_CATALOG.length },
  { key: 'channels', label: 'Channels', count: CHANNEL_CATALOG.length },
  { key: 'providers', label: 'Providers', count: PROVIDER_CATALOG.length },
  { key: 'tools', label: 'Tools', count: TOOL_CATALOG.length },
];

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="catalog__copy"
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
      )}
    </button>
  );
}

function SkillUsage({ skill }: { skill: SkillEntry }) {
  const cli = `wunderland chat --skills ${skill.name}`;
  const sdk = `// agent.config.json\n{\n  "skills": ["${skill.name}"]\n}`;
  return (
    <div className="catalog__usage">
      <div className="catalog__usage-section">
        <div className="catalog__usage-label">CLI</div>
        <div className="catalog__code">
          <code>{cli}</code>
          <CopyBtn text={cli} />
        </div>
      </div>
      <div className="catalog__usage-section">
        <div className="catalog__usage-label">Config</div>
        <div className="catalog__code">
          <code><pre>{sdk}</pre></code>
          <CopyBtn text={sdk} />
        </div>
      </div>
      {skill.requiredSecrets.length > 0 && (
        <div className="catalog__usage-section">
          <div className="catalog__usage-label">Required Secrets</div>
          <div className="catalog__code">
            <code>{skill.requiredSecrets.join(', ')}</code>
          </div>
        </div>
      )}
    </div>
  );
}

function ChannelUsage({ ch }: { ch: ChannelEntry }) {
  const install = `npm install ${ch.packageName}`;
  const manifest = `// agent.config.json\n{\n  "channels": {\n    "${ch.platform}": {\n      "enabled": true\n    }\n  }\n}`;
  return (
    <div className="catalog__usage">
      <div className="catalog__usage-section">
        <div className="catalog__usage-label">Install</div>
        <div className="catalog__code">
          <code>{install}</code>
          <CopyBtn text={install} />
        </div>
      </div>
      <div className="catalog__usage-section">
        <div className="catalog__usage-label">Config</div>
        <div className="catalog__code">
          <code><pre>{manifest}</pre></code>
          <CopyBtn text={manifest} />
        </div>
      </div>
      {ch.requiredSecrets.length > 0 && (
        <div className="catalog__usage-section">
          <div className="catalog__usage-label">Environment Variables</div>
          <div className="catalog__env-list">
            {ch.requiredSecrets.map((s) => (
              <span key={s} className="catalog__env">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProviderUsage({ prov }: { prov: ProviderEntry }) {
  const config = `// agent.config.json\n{\n  "provider": "${prov.providerId}",\n  "model": "${prov.defaultModel}"\n}`;
  return (
    <div className="catalog__usage">
      <div className="catalog__usage-section">
        <div className="catalog__usage-label">Config</div>
        <div className="catalog__code">
          <code><pre>{config}</pre></code>
          <CopyBtn text={config} />
        </div>
      </div>
      <div className="catalog__usage-section">
        <div className="catalog__usage-label">Models</div>
        <div className="catalog__models">
          <span className="catalog__model-badge">Default: {prov.defaultModel}</span>
          <span className="catalog__model-badge">Small: {prov.smallModel}</span>
        </div>
      </div>
      {prov.requiredSecrets.length > 0 && (
        <div className="catalog__usage-section">
          <div className="catalog__usage-label">Environment Variables</div>
          <div className="catalog__env-list">
            {prov.requiredSecrets.map((s) => (
              <span key={s} className="catalog__env">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ToolUsage({ tool }: { tool: ToolEntry }) {
  const install = `npm install ${tool.packageName}`;
  const manifest = `// agent.config.json\n{\n  "extensions": ["${tool.name}"]\n}`;
  return (
    <div className="catalog__usage">
      <div className="catalog__usage-section">
        <div className="catalog__usage-label">Install</div>
        <div className="catalog__code">
          <code>{install}</code>
          <CopyBtn text={install} />
        </div>
      </div>
      <div className="catalog__usage-section">
        <div className="catalog__usage-label">Config</div>
        <div className="catalog__code">
          <code><pre>{manifest}</pre></code>
          <CopyBtn text={manifest} />
        </div>
      </div>
      {tool.requiredSecrets.length > 0 && (
        <div className="catalog__usage-section">
          <div className="catalog__usage-label">Required Secrets</div>
          <div className="catalog__env-list">
            {tool.requiredSecrets.map((s) => (
              <span key={s} className="catalog__env">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function CatalogBrowser() {
  const [tab, setTab] = useState<Tab>('skills');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = useCallback((id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  }, []);

  const matchesSearch = useCallback((item: { name: string; displayName: string; description: string; tags?: string[] }, q: string) => {
    const lower = q.toLowerCase();
    return item.displayName.toLowerCase().includes(lower) ||
      item.name.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower) ||
      (item.tags?.some((t) => t.toLowerCase().includes(lower)) ?? false);
  }, []);

  const filteredSkills = useMemo(() => {
    let items = SKILLS_CATALOG;
    if (search) items = items.filter((s) => matchesSearch(s, search));
    if (categoryFilter) items = items.filter((s) => s.category === categoryFilter);
    return items;
  }, [search, categoryFilter, matchesSearch]);

  const filteredChannels = useMemo(() => {
    let items = CHANNEL_CATALOG;
    if (search) items = items.filter((c) => matchesSearch({ ...c, tags: [c.platform, c.sdkPackage, c.tier] }, search));
    if (categoryFilter) items = items.filter((c) => c.tier === categoryFilter);
    return items;
  }, [search, categoryFilter, matchesSearch]);

  const filteredProviders = useMemo(() => {
    let items = PROVIDER_CATALOG;
    if (search) items = items.filter((p) => matchesSearch({ ...p, tags: [p.providerId, p.defaultModel] }, search));
    return items;
  }, [search, matchesSearch]);

  const filteredTools = useMemo(() => {
    let items = TOOL_CATALOG;
    if (search) items = items.filter((t) => matchesSearch({ ...t, tags: [t.category] }, search));
    return items;
  }, [search, matchesSearch]);

  const activeItems = tab === 'skills' ? filteredSkills :
    tab === 'channels' ? filteredChannels :
    tab === 'providers' ? filteredProviders : filteredTools;

  const categories = tab === 'skills' ? SKILL_CATEGORIES :
    tab === 'channels' ? CHANNEL_TIERS : null;

  const handleTabChange = useCallback((t: Tab) => {
    setTab(t);
    setCategoryFilter(null);
    setExpandedCard(null);
  }, []);

  return (
    <div className="catalog">
      {/* Tabs */}
      <div className="catalog__tabs">
        {TAB_META.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`catalog__tab ${tab === t.key ? 'catalog__tab--active' : ''}`}
            onClick={() => handleTabChange(t.key)}
          >
            {t.label}
            <span className="catalog__tab-count">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="catalog__controls">
        <div className="catalog__search-wrap">
          <svg className="catalog__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="catalog__search"
            placeholder={`Search ${tab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button type="button" className="catalog__search-clear" onClick={() => setSearch('')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          )}
        </div>

        {categories && (
          <div className="catalog__filters">
            <button
              type="button"
              className={`catalog__filter ${!categoryFilter ? 'catalog__filter--active' : ''}`}
              onClick={() => setCategoryFilter(null)}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`catalog__filter ${categoryFilter === cat ? 'catalog__filter--active' : ''}`}
                onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Count */}
      <div className="catalog__count">
        {activeItems.length} {tab}{activeItems.length === 1 && tab.endsWith('s') ? tab.slice(0, -1) : ''}
      </div>

      {/* Grid */}
      <div className="catalog__grid">
        {tab === 'skills' && filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className={`catalog__card ${expandedCard === skill.name ? 'catalog__card--expanded' : ''}`}
            onClick={() => toggleCard(skill.name)}
          >
            <div className="catalog__card-header">
              <span className="catalog__card-icon">{ITEM_ICONS[skill.name] || '⚡'}</span>
              <div className="catalog__card-title-row">
                <div className="catalog__card-name">{skill.displayName}</div>
                <span className="catalog__card-badge" data-category={skill.category}>{skill.category}</span>
              </div>
            </div>
            <p className="catalog__card-desc">{skill.description}</p>
            <div className="catalog__card-tags">
              {skill.tags.slice(0, 4).map((t) => (
                <span key={t} className="catalog__tag">{t}</span>
              ))}
            </div>
            {expandedCard === skill.name && <SkillUsage skill={skill} />}
          </div>
        ))}

        {tab === 'channels' && filteredChannels.map((ch) => (
          <div
            key={ch.name}
            className={`catalog__card ${expandedCard === ch.name ? 'catalog__card--expanded' : ''}`}
            onClick={() => toggleCard(ch.name)}
          >
            <div className="catalog__card-header">
              <span className="catalog__card-icon">{ITEM_ICONS[ch.platform] || '📡'}</span>
              <div className="catalog__card-title-row">
                <div className="catalog__card-name">{ch.displayName}</div>
                <span className="catalog__card-badge" data-tier={ch.tier}>{ch.tier}</span>
              </div>
            </div>
            <p className="catalog__card-desc">{ch.description}</p>
            <div className="catalog__card-tags">
              <span className="catalog__tag">{ch.sdkPackage}</span>
              <span className="catalog__tag">{ch.platform}</span>
            </div>
            {expandedCard === ch.name && <ChannelUsage ch={ch} />}
          </div>
        ))}

        {tab === 'providers' && filteredProviders.map((prov) => (
          <div
            key={prov.name}
            className={`catalog__card ${expandedCard === prov.name ? 'catalog__card--expanded' : ''}`}
            onClick={() => toggleCard(prov.name)}
          >
            <div className="catalog__card-header">
              <span className="catalog__card-icon">{ITEM_ICONS[prov.providerId] || '🧠'}</span>
              <div className="catalog__card-title-row">
                <div className="catalog__card-name">{prov.displayName}</div>
                <span className="catalog__card-badge" data-category="provider">provider</span>
              </div>
            </div>
            <p className="catalog__card-desc">{prov.description}</p>
            <div className="catalog__card-tags">
              <span className="catalog__tag">{prov.defaultModel}</span>
              <span className="catalog__tag">{prov.smallModel}</span>
            </div>
            {expandedCard === prov.name && <ProviderUsage prov={prov} />}
          </div>
        ))}

        {tab === 'tools' && filteredTools.map((tool) => (
          <div
            key={tool.name}
            className={`catalog__card ${expandedCard === tool.name ? 'catalog__card--expanded' : ''}`}
            onClick={() => toggleCard(tool.name)}
          >
            <div className="catalog__card-header">
              <span className="catalog__card-icon">{ITEM_ICONS[tool.name] || '🔧'}</span>
              <div className="catalog__card-title-row">
                <div className="catalog__card-name">{tool.displayName}</div>
                <span className="catalog__card-badge" data-category={tool.category}>{tool.category}</span>
              </div>
            </div>
            <p className="catalog__card-desc">{tool.description}</p>
            {expandedCard === tool.name && <ToolUsage tool={tool} />}
          </div>
        ))}

        {activeItems.length === 0 && (
          <div className="catalog__empty">
            No {tab} found matching &ldquo;{search}&rdquo;
          </div>
        )}
      </div>

      {/* GitHub links */}
      <div className="catalog__links">
        <a href="https://github.com/framersai/agentos-extensions-registry" target="_blank" rel="noopener noreferrer" className="catalog__gh-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
          Extensions Registry
        </a>
        <a href="https://github.com/framersai/agentos-skills-registry" target="_blank" rel="noopener noreferrer" className="catalog__gh-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
          Skills Registry
        </a>
        <a href="https://github.com/framersai/agentos" target="_blank" rel="noopener noreferrer" className="catalog__gh-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
          AgentOS Core
        </a>
      </div>
    </div>
  );
}
