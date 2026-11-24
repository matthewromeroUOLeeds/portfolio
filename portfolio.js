// Replace these three entries with your project content. Set a URL to show its link.
const projects = [
  {
    title: "Project One",
    category: "Full-stack application",
    summary: "Describe the problem your application solves and who it helps.",
    visual: "dashboard",
    details: {
      "The problem": "Introduce the users and what they needed.",
      "What I built": "Describe your contribution and how the main parts of the app fit together.",
      "What I learned": "Share a trade-off, a challenge, or what you would change next.",
    },
    demoUrl: "",
    sourceUrl: "",
  },
  {
    title: "Project Two",
    category: "Algorithms and data",
    summary: "Explain the problem, your approach, and how you checked that it worked.",
    visual: "network",
    details: {
      "The problem": "Define the inputs, the desired output, and any constraints.",
      "My approach": "Explain your algorithm or data model and why you chose it.",
      "How I tested it": "Summarise how you assessed correctness or performance.",
    },
    demoUrl: "",
    sourceUrl: "",
  },
  {
    title: "Project Three",
    category: "Software engineering",
    summary: "Introduce a tool or experiment and highlight the decisions behind it.",
    visual: "terminal",
    details: {
      "The idea": "Explain what prompted the project and what you wanted to try.",
      "Implementation": "Highlight the tools you used and a technical decision you made.",
      "Outcome": "Describe what you achieved and what you would explore next.",
    },
    demoUrl: "",
    sourceUrl: "",
  },
];

const artwork = {
  dashboard: '<div class="mini-app"><div class="mini-bar"><i></i><i></i><i></i></div><div class="mini-layout"><aside><i></i><i></i><i></i></aside><div><i></i><i></i><i></i><i></i></div></div></div>',
  network: '<div class="network-map"><i></i><i></i><i></i><i></i><i></i><b></b><b></b><b></b><b></b></div>',
  terminal: '<div class="mini-terminal"><div class="mini-bar"><i></i><i></i><i></i></div><div class="terminal-lines"><span>&gt;</span><i></i><span>&gt;</span><i></i><span>&gt;</span><i></i></div></div>',
};

const grid = document.querySelector("#project-grid");
function element(tag, content, className) {
  const node = document.createElement(tag);
  node.textContent = content;
  if (className) node.className = className;
  return node;
}

for (const project of projects) {
  const card = element("article", "", "card");
  const art = element("div", "", "art art-" + project.visual);
  art.setAttribute("aria-hidden", "true");
  art.innerHTML = artwork[project.visual];
  const body = element("div", "", "card-body");
  body.append(
    element("p", project.category, "category"),
    element("h3", project.title),
    element("p", project.summary, "summary"),
  );
  const details = element("dl", "", "project-details");
  for (const [term, description] of Object.entries(project.details)) {
    details.append(element("dt", term), element("dd", description));
  }
  body.append(details);

  const links = element("div", "", "project-links");
  for (const [label, url] of [["Live demo", project.demoUrl], ["Source code", project.sourceUrl]]) {
    if (!url) continue;
    const parsed = URL.canParse(url) ? new URL(url) : null;
    if (!parsed || !["https:", "http:"].includes(parsed.protocol)) continue;
    const link = element("a", label);
    link.href = parsed.href;
    links.append(link);
  }
  if (links.childElementCount) body.append(links);
  card.append(art, body);
  grid.append(card);
}
