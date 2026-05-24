import { useState, useRef, useCallback } from "react";

const TECH_ALIASES = {
  "js": "JavaScript", "javascript": "JavaScript",
  "ts": "TypeScript", "typescript": "TypeScript",
  "py": "Python", "python": "Python",
  "rb": "Ruby", "ruby": "Ruby",
  "go": "Go", "golang": "Go",
  "rs": "Rust", "rust": "Rust",
  "cs": "C#", "c#": "C#", "csharp": "C#",
  "cpp": "C++", "c++": "C++",
  "c": "C",
  "java": "Java",
  "kt": "Kotlin", "kotlin": "Kotlin",
  "swift": "Swift",
  "php": "PHP",
  "r": "R",
  "scala": "Scala",
  "dart": "Dart",
  "elixir": "Elixir",
  "haskell": "Haskell",
  "clojure": "Clojure",
  "react": "React", "reactjs": "React", "react.js": "React",
  "vue": "Vue.js", "vuejs": "Vue.js", "vue.js": "Vue.js",
  "angular": "Angular", "angularjs": "Angular",
  "svelte": "Svelte",
  "next": "Next.js", "nextjs": "Next.js", "next.js": "Next.js",
  "nuxt": "Nuxt.js", "nuxtjs": "Nuxt.js",
  "node": "Node.js", "nodejs": "Node.js", "node.js": "Node.js",
  "express": "Express.js", "expressjs": "Express.js",
  "django": "Django",
  "flask": "Flask",
  "fastapi": "FastAPI",
  "rails": "Ruby on Rails", "ror": "Ruby on Rails",
  "laravel": "Laravel",
  "spring": "Spring Boot", "springboot": "Spring Boot",
  "postgres": "PostgreSQL", "postgresql": "PostgreSQL", "psql": "PostgreSQL",
  "mysql": "MySQL",
  "mongo": "MongoDB", "mongodb": "MongoDB",
  "redis": "Redis",
  "sqlite": "SQLite",
  "cassandra": "Cassandra",
  "elastic": "Elasticsearch", "elasticsearch": "Elasticsearch",
  "docker": "Docker",
  "k8s": "Kubernetes", "kubernetes": "Kubernetes",
  "aws": "AWS",
  "gcp": "Google Cloud", "googlecloud": "Google Cloud",
  "azure": "Microsoft Azure",
  "terraform": "Terraform",
  "ansible": "Ansible",
  "jenkins": "Jenkins",
  "gh actions": "GitHub Actions", "github actions": "GitHub Actions",
  "git": "Git",
  "github": "GitHub",
  "gitlab": "GitLab",
  "vscode": "VS Code", "vs code": "VS Code",
  "vim": "Vim",
  "neovim": "Neovim",
  "webpack": "Webpack",
  "vite": "Vite",
  "graphql": "GraphQL",
  "rest": "REST API",
  "grpc": "gRPC",
  "kafka": "Apache Kafka",
  "spark": "Apache Spark",
  "hadoop": "Hadoop",
  "tensorflow": "TensorFlow", "tf": "TensorFlow",
  "pytorch": "PyTorch",
  "sklearn": "scikit-learn", "scikit": "scikit-learn",
  "pandas": "Pandas",
  "numpy": "NumPy",
  "linux": "Linux",
  "ubuntu": "Ubuntu",
  "macos": "macOS",
  "windows": "Windows",
};

const TECH_META = {
  "JavaScript": { category: "Language", color: "#F7DF1E", textColor: "#000", icon: "ti-brand-javascript" },
  "TypeScript": { category: "Language", color: "#3178C6", textColor: "#fff", icon: "ti-brand-typescript" },
  "Python": { category: "Language", color: "#3776AB", textColor: "#fff", icon: "ti-brand-python" },
  "Ruby": { category: "Language", color: "#CC342D", textColor: "#fff", icon: "ti-circle-letter-r" },
  "Go": { category: "Language", color: "#00ADD8", textColor: "#fff", icon: "ti-brand-golang" },
  "Rust": { category: "Language", color: "#CE422B", textColor: "#fff", icon: "ti-circle-letter-r" },
  "C#": { category: "Language", color: "#512BD4", textColor: "#fff", icon: "ti-circle-letter-c" },
  "C++": { category: "Language", color: "#00599C", textColor: "#fff", icon: "ti-circle-letter-c" },
  "C": { category: "Language", color: "#5C6BC0", textColor: "#fff", icon: "ti-circle-letter-c" },
  "Java": { category: "Language", color: "#007396", textColor: "#fff", icon: "ti-coffee" },
  "Kotlin": { category: "Language", color: "#7F52FF", textColor: "#fff", icon: "ti-brand-kotlin" },
  "Swift": { category: "Language", color: "#FA7343", textColor: "#fff", icon: "ti-brand-swift" },
  "PHP": { category: "Language", color: "#777BB4", textColor: "#fff", icon: "ti-brand-php" },
  "R": { category: "Language", color: "#276DC3", textColor: "#fff", icon: "ti-circle-letter-r" },
  "Scala": { category: "Language", color: "#DC322F", textColor: "#fff", icon: "ti-circle-letter-s" },
  "Dart": { category: "Language", color: "#0175C2", textColor: "#fff", icon: "ti-brand-dart" },
  "React": { category: "Framework", color: "#61DAFB", textColor: "#000", icon: "ti-brand-react" },
  "Vue.js": { category: "Framework", color: "#4FC08D", textColor: "#fff", icon: "ti-brand-vue" },
  "Angular": { category: "Framework", color: "#DD0031", textColor: "#fff", icon: "ti-brand-angular" },
  "Svelte": { category: "Framework", color: "#FF3E00", textColor: "#fff", icon: "ti-brand-svelte" },
  "Next.js": { category: "Framework", color: "#000000", textColor: "#fff", icon: "ti-brand-nextjs" },
  "Nuxt.js": { category: "Framework", color: "#00DC82", textColor: "#000", icon: "ti-brand-nuxt" },
  "Node.js": { category: "Runtime", color: "#339933", textColor: "#fff", icon: "ti-brand-nodejs" },
  "Express.js": { category: "Framework", color: "#000000", textColor: "#fff", icon: "ti-server" },
  "Django": { category: "Framework", color: "#092E20", textColor: "#fff", icon: "ti-brand-django" },
  "Flask": { category: "Framework", color: "#000000", textColor: "#fff", icon: "ti-flask" },
  "FastAPI": { category: "Framework", color: "#009688", textColor: "#fff", icon: "ti-bolt" },
  "Ruby on Rails": { category: "Framework", color: "#CC0000", textColor: "#fff", icon: "ti-train" },
  "Laravel": { category: "Framework", color: "#FF2D20", textColor: "#fff", icon: "ti-brand-laravel" },
  "Spring Boot": { category: "Framework", color: "#6DB33F", textColor: "#fff", icon: "ti-leaf" },
  "PostgreSQL": { category: "Database", color: "#336791", textColor: "#fff", icon: "ti-database" },
  "MySQL": { category: "Database", color: "#4479A1", textColor: "#fff", icon: "ti-database" },
  "MongoDB": { category: "Database", color: "#47A248", textColor: "#fff", icon: "ti-database" },
  "Redis": { category: "Database", color: "#DC382D", textColor: "#fff", icon: "ti-brand-redis" },
  "SQLite": { category: "Database", color: "#003B57", textColor: "#fff", icon: "ti-database" },
  "Docker": { category: "DevOps", color: "#2496ED", textColor: "#fff", icon: "ti-brand-docker" },
  "Kubernetes": { category: "DevOps", color: "#326CE5", textColor: "#fff", icon: "ti-anchor" },
  "AWS": { category: "Cloud", color: "#FF9900", textColor: "#000", icon: "ti-brand-aws" },
  "Google Cloud": { category: "Cloud", color: "#4285F4", textColor: "#fff", icon: "ti-brand-google-big-query" },
  "Microsoft Azure": { category: "Cloud", color: "#0078D4", textColor: "#fff", icon: "ti-brand-azure" },
  "Git": { category: "Tool", color: "#F05032", textColor: "#fff", icon: "ti-brand-git" },
  "GitHub": { category: "Tool", color: "#181717", textColor: "#fff", icon: "ti-brand-github" },
  "VS Code": { category: "Tool", color: "#007ACC", textColor: "#fff", icon: "ti-brand-vscode" },
  "TensorFlow": { category: "ML/AI", color: "#FF6F00", textColor: "#fff", icon: "ti-brain" },
  "PyTorch": { category: "ML/AI", color: "#EE4C2C", textColor: "#fff", icon: "ti-flame" },
  "scikit-learn": { category: "ML/AI", color: "#F7931E", textColor: "#fff", icon: "ti-chart-dots" },
  "Pandas": { category: "Library", color: "#150458", textColor: "#fff", icon: "ti-table" },
  "NumPy": { category: "Library", color: "#013243", textColor: "#fff", icon: "ti-math-function" },
  "GraphQL": { category: "API", color: "#E10098", textColor: "#fff", icon: "ti-brand-graphql" },
  "Apache Kafka": { category: "Messaging", color: "#231F20", textColor: "#fff", icon: "ti-topology-star-3" },
};

const CATEGORY_COLORS = {
  Language: "var(--color-background-info)",
  Framework: "#f0fdf4",
  Runtime: "#fef3c7",
  Database: "#fdf2f8",
  DevOps: "#fff7ed",
  Cloud: "#eff6ff",
  Tool: "#f5f3ff",
  "ML/AI": "#fef2f2",
  Library: "#f0fdfa",
  API: "#fff1f2",
  Messaging: "#f8fafc",
};

const CATEGORY_TEXT = {
  Language: "var(--color-text-info)",
  Framework: "#166534",
  Runtime: "#92400e",
  Database: "#9d174d",
  DevOps: "#9a3412",
  Cloud: "#1e40af",
  Tool: "#5b21b6",
  "ML/AI": "#991b1b",
  Library: "#0f766e",
  API: "#9f1239",
  Messaging: "#475569",
};

function normalize(raw) {
  const issues = [];
  let val = raw;
  const original = raw;

  // Trim
  if (val !== val.trim()) {
    val = val.trim();
    issues.push({ type: "trimmed", msg: "Removed leading/trailing whitespace" });
  }

  // Lowercase for matching
  const lower = val.toLowerCase().replace(/[.\s-]/g, "");
  const lowerSpaced = val.toLowerCase().trim();

  // Alias lookup
  const canonical = TECH_ALIASES[lowerSpaced] || TECH_ALIASES[lower] || TECH_ALIASES[lower.replace(/\./g, "")];

  if (canonical && canonical !== val) {
    issues.push({ type: "normalized", msg: `Standardized "${val}" → "${canonical}"` });
    val = canonical;
  } else if (!canonical) {
    // Title case unknown tech
    const titled = val.replace(/\b\w/g, c => c.toUpperCase());
    if (titled !== val) {
      issues.push({ type: "cased", msg: `Applied title case` });
      val = titled;
    }
    issues.push({ type: "unknown", msg: "Not found in known tech registry" });
  }

  const meta = TECH_META[val];
  return { original, cleaned: val, issues, meta, recognized: !!meta };
}

function parseInput(text) {
  return text
    .split(/[\n,;|]+/)
    .map(s => s.trim())
    .filter(Boolean);
}

const SAMPLE_DATA = `JavaScript, typescript, py\nreact, vue.js, ANGULAR\nnodejs, django, FastAPI\npostgres, MongoDB, redis\ndocker, k8s\naws, gcp, Azure\ngit, VS Code\ntensorflow, pytorch\npandas, numpy\n  GraphQL , grpc , kafka`;

export default function App() {
  const [input, setInput] = useState(SAMPLE_DATA);
  const [results, setResults] = useState([]);
  const [processed, setProcessed] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [copied, setCopied] = useState(false);
  const textRef = useRef(null);

  const handleProcess = useCallback(() => {
    const items = parseInput(input);
    const cleaned = items.map(item => normalize(item));
    setResults(cleaned);
    setProcessed(true);
    setActiveFilter("All");
  }, [input]);

  const handleReset = () => {
    setInput("");
    setResults([]);
    setProcessed(false);
    setCopied(false);
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_DATA);
    setProcessed(false);
    setResults([]);
  };

  const categories = ["All", ...Array.from(new Set(results.filter(r => r.meta).map(r => r.meta.category))).sort()];
  const filtered = activeFilter === "All" ? results : results.filter(r => r.meta?.category === activeFilter);

  const recognized = results.filter(r => r.recognized).length;
  const unknown = results.filter(r => !r.recognized).length;
  const issues = results.reduce((acc, r) => acc + r.issues.filter(i => i.type !== "unknown").length, 0);

  const exportCSV = () => {
    const rows = [["Original", "Cleaned", "Category", "Issues"]];
    results.forEach(r => {
      rows.push([
        r.original,
        r.cleaned,
        r.meta?.category || "Unknown",
        r.issues.map(i => i.msg).join(" | "),
      ]);
    });
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "cleaned_tech_data.csv"; a.click();
  };

  const copyClean = () => {
    const text = results.map(r => r.cleaned).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 760, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <h2 style={{ sr: true }}>Technology Lookup & Data Cleaning Tool</h2>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <i className="ti ti-circuit-board" style={{ fontSize: 22, color: "var(--color-text-secondary)" }} aria-hidden />
          <span style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)" }}>Tech Data Cleaner</span>
          <span style={{
            fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 99,
            background: "var(--color-background-info)", color: "var(--color-text-info)", marginLeft: 4
          }}>v1.0</span>
        </div>
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>
          Paste messy technology names — aliases, typos, abbreviations — and get clean, standardized entries with category metadata.
        </p>
      </div>

      {/* Input area */}
      <div style={{
        background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)", overflow: "hidden", marginBottom: "1rem"
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 14px", borderBottom: "0.5px solid var(--color-border-tertiary)",
          background: "var(--color-background-secondary)"
        }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>
            <i className="ti ti-input-search" style={{ fontSize: 15, verticalAlign: -2, marginRight: 6 }} aria-hidden />
            Input — one tech per line, or comma/semicolon separated
          </span>
          <button onClick={handleLoadSample} style={{
            fontSize: 12, padding: "3px 10px", borderRadius: "var(--border-radius-md)",
            border: "0.5px solid var(--color-border-secondary)", background: "transparent",
            color: "var(--color-text-secondary)", cursor: "pointer"
          }}>
            Load sample
          </button>
        </div>
        <textarea
          ref={textRef}
          value={input}
          onChange={e => { setInput(e.target.value); setProcessed(false); }}
          placeholder="e.g. js, typescript, py, reactjs, k8s, postgres..."
          style={{
            width: "100%", minHeight: 120, padding: "12px 14px", border: "none", outline: "none",
            fontFamily: "var(--font-mono)", fontSize: 13, resize: "vertical", boxSizing: "border-box",
            background: "transparent", color: "var(--color-text-primary)", lineHeight: 1.6
          }}
        />
        <div style={{
          display: "flex", gap: 8, padding: "10px 14px", borderTop: "0.5px solid var(--color-border-tertiary)",
          background: "var(--color-background-secondary)"
        }}>
          <button onClick={handleProcess} style={{
            fontSize: 13, fontWeight: 500, padding: "6px 18px", borderRadius: "var(--border-radius-md)",
            border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)",
            color: "var(--color-text-primary)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6
          }}>
            <i className="ti ti-sparkles" style={{ fontSize: 15 }} aria-hidden />
            Clean & Analyze
          </button>
          <button onClick={handleReset} style={{
            fontSize: 13, padding: "6px 14px", borderRadius: "var(--border-radius-md)",
            border: "0.5px solid var(--color-border-tertiary)", background: "transparent",
            color: "var(--color-text-secondary)", cursor: "pointer"
          }}>
            Reset
          </button>
          {processed && (
            <>
              <button onClick={copyClean} style={{
                fontSize: 13, padding: "6px 14px", borderRadius: "var(--border-radius-md)",
                border: "0.5px solid var(--color-border-tertiary)", background: "transparent",
                color: "var(--color-text-secondary)", cursor: "pointer", marginLeft: "auto",
                display: "flex", alignItems: "center", gap: 5
              }}>
                <i className={`ti ${copied ? "ti-check" : "ti-copy"}`} style={{ fontSize: 14 }} aria-hidden />
                {copied ? "Copied!" : "Copy cleaned"}
              </button>
              <button onClick={exportCSV} style={{
                fontSize: 13, padding: "6px 14px", borderRadius: "var(--border-radius-md)",
                border: "0.5px solid var(--color-border-tertiary)", background: "transparent",
                color: "var(--color-text-secondary)", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 5
              }}>
                <i className="ti ti-file-type-csv" style={{ fontSize: 14 }} aria-hidden />
                Export CSV
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      {processed && results.length > 0 && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: "1.25rem" }}>
            {[
              { label: "Total entries", value: results.length, icon: "ti-list" },
              { label: "Recognized", value: recognized, icon: "ti-circle-check", ok: true },
              { label: "Unknown", value: unknown, icon: "ti-help-circle", warn: unknown > 0 },
              { label: "Fixes applied", value: issues, icon: "ti-wand" },
            ].map(s => (
              <div key={s.label} style={{
                background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)",
                padding: "12px 14px"
              }}>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}>
                  <i className={`ti ${s.icon}`} style={{ fontSize: 14 }} aria-hidden />
                  {s.label}
                </div>
                <div style={{
                  fontSize: 22, fontWeight: 500,
                  color: s.ok ? "var(--color-text-success)" : s.warn ? "var(--color-text-warning)" : "var(--color-text-primary)"
                }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontSize: 12, padding: "4px 12px", borderRadius: 99, cursor: "pointer",
                  border: activeFilter === cat ? "1.5px solid var(--color-border-primary)" : "0.5px solid var(--color-border-tertiary)",
                  background: activeFilter === cat ? "var(--color-background-primary)" : "transparent",
                  color: activeFilter === cat ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  fontWeight: activeFilter === cat ? 500 : 400
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results table */}
          <div style={{
            background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: "var(--border-radius-lg)", overflow: "hidden"
          }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1.2fr 110px 1.5fr",
              padding: "8px 14px", background: "var(--color-background-secondary)",
              borderBottom: "0.5px solid var(--color-border-tertiary)",
              fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", letterSpacing: "0.04em",
              textTransform: "uppercase"
            }}>
              <span>Original</span>
              <span>Cleaned</span>
              <span>Category</span>
              <span>Changes</span>
            </div>

            {filtered.map((r, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 1.2fr 110px 1.5fr",
                padding: "10px 14px", alignItems: "start",
                borderBottom: i < filtered.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none",
                background: i % 2 === 0 ? "transparent" : "var(--color-background-secondary)"
              }}>
                {/* Original */}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-secondary)", paddingTop: 2 }}>
                  {r.original}
                </span>

                {/* Cleaned + badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {r.meta ? (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)"
                    }}>
                      <span style={{
                        width: 10, height: 10, borderRadius: "50%",
                        background: r.meta.color, flexShrink: 0, display: "inline-block"
                      }} />
                      {r.cleaned}
                    </span>
                  ) : (
                    <span style={{ fontSize: 13, color: "var(--color-text-primary)" }}>{r.cleaned}</span>
                  )}
                </div>

                {/* Category */}
                <div>
                  {r.meta ? (
                    <span style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 99, fontWeight: 500,
                      background: CATEGORY_COLORS[r.meta.category] || "var(--color-background-secondary)",
                      color: CATEGORY_TEXT[r.meta.category] || "var(--color-text-secondary)"
                    }}>
                      {r.meta.category}
                    </span>
                  ) : (
                    <span style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 99,
                      background: "var(--color-background-warning)", color: "var(--color-text-warning)"
                    }}>
                      Unknown
                    </span>
                  )}
                </div>

                {/* Issues */}
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {r.issues.length === 0 ? (
                    <span style={{ fontSize: 12, color: "var(--color-text-success)" }}>
                      <i className="ti ti-check" style={{ fontSize: 12, marginRight: 4 }} aria-hidden />
                      No changes
                    </span>
                  ) : r.issues.map((iss, j) => (
                    <span key={j} style={{
                      fontSize: 11, color: iss.type === "unknown"
                        ? "var(--color-text-warning)"
                        : iss.type === "normalized" || iss.type === "cased"
                          ? "var(--color-text-info)"
                          : "var(--color-text-secondary)"
                    }}>
                      <i className={`ti ${iss.type === "unknown" ? "ti-alert-triangle" : iss.type === "trimmed" ? "ti-scissors" : "ti-transform"}`}
                        style={{ fontSize: 11, marginRight: 3, verticalAlign: -1 }} aria-hidden />
                      {iss.msg}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Category breakdown */}
          {activeFilter === "All" && (
            <div style={{ marginTop: "1.25rem" }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 10 }}>
                <i className="ti ti-chart-bar" style={{ fontSize: 14, verticalAlign: -2, marginRight: 6 }} aria-hidden />
                Category breakdown
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {Object.entries(
                  results.filter(r => r.meta).reduce((acc, r) => {
                    acc[r.meta.category] = (acc[r.meta.category] || 0) + 1;
                    return acc;
                  }, {})
                ).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
                  <div key={cat} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "6px 12px",
                    background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)",
                    border: "0.5px solid var(--color-border-tertiary)"
                  }}>
                    <span style={{ fontSize: 13, color: "var(--color-text-primary)" }}>{cat}</span>
                    <span style={{
                      fontSize: 12, fontWeight: 500, minWidth: 20, textAlign: "center",
                      padding: "1px 7px", borderRadius: 99,
                      background: CATEGORY_COLORS[cat] || "var(--color-background-primary)",
                      color: CATEGORY_TEXT[cat] || "var(--color-text-secondary)"
                    }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {processed && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)", fontSize: 14 }}>
          <i className="ti ti-inbox" style={{ fontSize: 32, display: "block", marginBottom: 8 }} aria-hidden />
          No entries to process. Add some technology names above.
        </div>
      )}

      {!processed && (
        <div style={{
          textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)", fontSize: 13,
          border: "0.5px dashed var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)"
        }}>
          <i className="ti ti-wand" style={{ fontSize: 28, display: "block", marginBottom: 8, color: "var(--color-text-tertiary)" }} aria-hidden />
          Enter technology names above and click <strong style={{ fontWeight: 500 }}>Clean & Analyze</strong> to normalize and enrich your data.
        </div>
      )}
    </div>
  );
}
