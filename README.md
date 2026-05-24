# Tech Data Cleaner

A single-file React tool for normalizing and enriching messy technology name data. Paste raw input with abbreviations, aliases, and inconsistent casing — get back clean, standardized entries with category metadata.

---

## Features

- **Alias resolution** — maps 100+ abbreviations to canonical names (`js` → `JavaScript`, `k8s` → `Kubernetes`, `py` → `Python`)
- **Whitespace trimming** — strips leading/trailing spaces
- **Case normalization** — applies title case to unrecognized entries
- **Category tagging** — classifies each tech into Language, Framework, Database, DevOps, Cloud, ML/AI, Library, API, Messaging, Runtime, or Tool
- **Unknown flagging** — marks entries not found in the registry with a warning
- **Category filter** — filter results by category with one click
- **Category breakdown** — visual summary of how many entries fall into each group
- **Copy cleaned output** — copies all cleaned names to clipboard
- **CSV export** — downloads a spreadsheet with Original, Cleaned, Category, and Issues columns

---

## Getting Started

### Prerequisites

- Node.js 18+
- A React environment (Create React App, Vite, Next.js, etc.)

### Installation

```bash
# Clone or copy the single file into your project
cp tech-data-cleaner.jsx src/

# Install dependencies (none beyond React itself)
npm install
```

### Usage

```bash
npm run dev   # or npm start
```

Open your browser and navigate to the component route. The tool loads with sample data pre-filled so you can see it in action immediately.

---

## Input Format

The tool accepts any combination of delimiters. All of the following work:

```
# Newline-separated
javascript
typescript
python

# Comma-separated
react, vue.js, angular

# Semicolon or pipe
postgres; mongodb | redis

# Mixed
js, py; k8s
docker | AWS, gcp
```

---

## Supported Technologies

### Languages
JavaScript, TypeScript, Python, Ruby, Go, Rust, C#, C++, C, Java, Kotlin, Swift, PHP, R, Scala, Dart, Elixir, Haskell, Clojure

### Frameworks
React, Vue.js, Angular, Svelte, Next.js, Nuxt.js, Express.js, Django, Flask, FastAPI, Ruby on Rails, Laravel, Spring Boot

### Databases
PostgreSQL, MySQL, MongoDB, Redis, SQLite, Cassandra, Elasticsearch

### DevOps & Cloud
Docker, Kubernetes, AWS, Google Cloud, Microsoft Azure, Terraform, Ansible, Jenkins, GitHub Actions

### Tools
Git, GitHub, GitLab, VS Code, Vim, Neovim, Webpack, Vite

### ML / AI & Data
TensorFlow, PyTorch, scikit-learn, Pandas, NumPy, Apache Spark, Hadoop

### APIs & Messaging
GraphQL, REST API, gRPC, Apache Kafka

---

## How Cleaning Works

Each raw entry goes through the following pipeline:

```
Raw input
    │
    ▼
1. Trim whitespace
    │
    ▼
2. Lowercase + strip punctuation for matching
    │
    ▼
3. Alias lookup (100+ mappings)
    │
    ├── Match found  →  canonical name + metadata
    └── No match     →  title-case the input, flag as Unknown
```

Every change is recorded and shown in the **Changes** column of the results table.

---

## CSV Export Schema

| Column   | Description                                      |
|----------|--------------------------------------------------|
| Original | The raw input value as entered                   |
| Cleaned  | The normalized, canonical technology name        |
| Category | Language / Framework / Database / DevOps / etc.  |
| Issues   | Pipe-separated list of changes applied           |

---

## File Structure

```
tech-data-cleaner.jsx   ← entire project in one file
README.md
```

The single file contains:

- `TECH_ALIASES` — alias-to-canonical mapping (100+ entries)
- `TECH_META` — canonical name to category, color, and icon
- `CATEGORY_COLORS` / `CATEGORY_TEXT` — styling tokens per category
- `normalize(raw)` — core cleaning function
- `parseInput(text)` — delimiter-aware input parser
- `App` — main React component with all UI and logic

---

## Extending the Registry

To add new technologies, edit the two objects at the top of the file:

```js
// 1. Add aliases
const TECH_ALIASES = {
  "bun": "Bun",
  "bunjs": "Bun",
  // ...
};

// 2. Add metadata
const TECH_META = {
  "Bun": { category: "Runtime", color: "#FBF0DF", textColor: "#000", icon: "ti-bolt" },
  // ...
};
```

Available categories: `Language`, `Framework`, `Runtime`, `Database`, `DevOps`, `Cloud`, `Tool`, `ML/AI`, `Library`, `API`, `Messaging`

---

## Design Notes

- Built with React hooks only — no external state library
- Styling uses CSS variables from the host design system (compatible with claude.ai artifact environment)
- Icons use the Tabler icon outline webfont (`ti-*` classes)
- No browser storage used — all state is in-memory during the session

---

## License

MIT
