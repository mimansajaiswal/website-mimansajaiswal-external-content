type DemoModeTone = "neutral" | "accent" | "success" | "warning" | "danger" | "muted";
type DemoProvider = "codex" | "claude" | "gemini" | "mixed" | "generic";
type DemoRole = "user" | "assistant" | "tool" | "status" | "system" | "agent-event";
type DemoState = "idle" | "typing" | "running" | "done" | "error";
type DemoViewport = "mobile" | "tablet" | "desktop";

type DemoChip = {
	label: string;
	tone?: DemoModeTone;
};

type DemoCollapseBehavior = {
	label?: string;
	defaultCollapsed?: boolean;
	byViewport?: Partial<Record<DemoViewport, boolean>>;
};

type DemoBlock =
	| { type: "text"; text: string; label?: string; tone?: DemoModeTone }
	| {
			type: "markdownish";
			label?: string;
			nodes: Array<
				| { type: "p"; text: string }
				| { type: "ul" | "ol"; items: string[] }
			>;
	  }
	| { type: "code"; code?: string; html?: string; language?: string; label?: string }
	| { type: "kv-list"; label?: string; items: Array<{ label: string; value: string }> }
	| { type: "badge-row"; label?: string; items: Array<string | DemoChip> }
	| {
			type: "file-list";
			label?: string;
			items: Array<{ path: string; status?: string; delta?: string; tone?: DemoModeTone }>;
	  }
	| { type: "summary-card"; title: string; lines?: string[]; tone?: DemoModeTone }
	| { type: "terminal-snippet"; label?: string; prompt?: string; output?: string[] };

type DemoNode =
	| {
			type: "message";
			id: string;
			role: DemoRole;
			title?: string;
			state?: DemoState;
			agent?: { id: string; label: string; provider?: DemoProvider; parentAgentId?: string };
			body?: DemoBlock[];
			meta?: Array<string | DemoChip>;
			collapsible?: DemoCollapseBehavior;
			tone?: DemoModeTone;
	  }
	| {
			type: "group";
			id: string;
			label: string;
			children: DemoNode[];
			defaultCollapsed?: boolean;
			collapse?: DemoCollapseBehavior;
			meta?: Array<string | DemoChip>;
			tone?: DemoModeTone;
	  };

type DemoScene = {
	header: {
		title: string;
		subtitle?: string;
		status?: DemoChip;
		statusLabel?: string;
		modelLabel?: string;
		appLabel?: string;
		providerLabel?: string;
		taskLabel?: string;
		breadcrumbs?: string[];
		contextLabel?: string;
		contextActionLabel?: string;
		primaryActionLabel?: string;
	};
	tabs: Array<{ id: string; label: string; badge?: string }>;
	panes?: Record<
		string,
		{
			rightTitle?: string;
			rightSubtitle?: string;
			rightTabs?: Array<{ label: string; badge?: string; active?: boolean }>;
			right?: DemoBlock[];
			rightCollapse?: DemoCollapseBehavior;
			bottomTitle?: string;
			bottomTabs?: Array<{ label: string; badge?: string; active?: boolean }>;
			bottomActionLabel?: string;
			bottom?: DemoBlock[];
			bottomCollapse?: DemoCollapseBehavior;
		}
	>;
	messages: DemoNode[];
	sidebar?: {
		homeLabel?: string;
		workspaceLabel?: string;
		collapse?: DemoCollapseBehavior;
		sections?: Array<{
			title: string;
			actionLabel?: string;
			collapse?: DemoCollapseBehavior;
			items?: Array<{
				label: string;
				subtitle?: string;
				meta?: string;
				delta?: string;
				tone?: DemoModeTone;
				active?: boolean;
			}>;
		}>;
		footerLabel?: string;
		footerActions?: string[];
	};
	composer?: {
		modelLabel?: string;
		secondaryLabel?: string;
		value?: string;
		hint?: string;
		actions?: string[];
		submitLabel?: string;
		statusLabel?: string;
		collapse?: DemoCollapseBehavior;
	};
};

const chip = (label: string, tone?: DemoModeTone): DemoChip => ({ label, tone });

const highlightedDialogHtml = `
<pre class="shiki github-dark-dimmed has-highlighted" tabindex="0"><code>
<span class="line"><span style="color:#F47067">import</span><span style="color:#C9D1D9"> { </span><span style="color:#D2A8FF">Command</span><span style="color:#C9D1D9"> } </span><span style="color:#F47067">from</span><span style="color:#A5D6FF"> "@/components/ui/command"</span><span style="color:#C9D1D9">;</span></span>
<span class="line highlighted"><span style="color:#F47067">import</span><span style="color:#C9D1D9"> { </span><span style="color:#D2A8FF">useRecipeSourceLink</span><span style="color:#C9D1D9"> } </span><span style="color:#F47067">from</span><span style="color:#A5D6FF"> "@/lib/recipes/source-link"</span><span style="color:#C9D1D9">;</span></span>
<span class="line"><span style="color:#F47067">export</span><span style="color:#F47067"> function</span><span style="color:#D2A8FF"> RepositoryDetailsDialog</span><span style="color:#C9D1D9">() {</span></span>
<span class="line"><span style="color:#C9D1D9">  </span><span style="color:#F47067">return</span><span style="color:#C9D1D9"> &lt;</span><span style="color:#7EE787">Command</span><span style="color:#C9D1D9"> /&gt;;</span></span>
<span class="line"><span style="color:#C9D1D9">}</span></span>
</code></pre>
`.trim();

export const baseScene: DemoScene = {
	header: {
		title: "Import recipes from Mela",
		subtitle: "A flat workspace shell for cleaning recipe imports, screenshot notes, and publish-ready markdown.",
		status: chip("Import ready", "success"),
		statusLabel: "Ready to publish",
		taskLabel: "Recipe workflow",
		appLabel: "Workspace shell",
		providerLabel: "Codex",
		modelLabel: "GPT-5.4",
		breadcrumbs: ["workspace", "mela-import", "weeknight-recipes"],
		contextLabel: "/recipes/mela-import",
		contextActionLabel: "Open",
		primaryActionLabel: "Publish",
	},
	tabs: [
		{ id: "all", label: "Conversation" },
		{ id: "debug", label: "Fields" },
		{ id: "review", label: "Notes" },
		{ id: "plus", label: "+" },
	],
	sidebar: {
		homeLabel: "Home",
		collapse: {
			label: "Toggle sidebar",
			byViewport: { mobile: true, tablet: false, desktop: false },
		},
		sections: [
			{
				title: "recipes",
				actionLabel: "New workflow",
				items: [
					{
						label: "mela-import-weeknight",
						subtitle: "tomato-lentil-soup",
						meta: "#01",
						delta: "Ready",
						tone: "success",
						active: true,
					},
					{
						label: "screenshot-caption-pass",
						subtitle: "kitchen-reference-shot",
						meta: "#02",
						delta: "Review",
						tone: "warning",
					},
				],
			},
			{
				title: "captures",
				actionLabel: "New capture",
				collapse: {
					label: "Toggle captures",
					byViewport: { mobile: true, tablet: false, desktop: false },
				},
				items: [
					{
						label: "ingredient-closeups",
						subtitle: "onion-garlic-butter",
						meta: "#03",
						delta: "Ready",
						tone: "success",
					},
					{
						label: "ipad-step-screenshots",
						subtitle: "pasta-night",
						meta: "#04",
						delta: "Queued",
						tone: "success",
					},
					{
						label: "mela-export-check",
						subtitle: "batch-3",
						meta: "#05",
						delta: "Active",
						tone: "success",
					},
				],
			},
			{
				title: "drafts",
				actionLabel: "New draft",
				collapse: {
					label: "Toggle drafts",
					byViewport: { mobile: true, tablet: true, desktop: false },
				},
			},
			{
				title: "screenshots",
				actionLabel: "New gallery set",
				collapse: {
					label: "Toggle screenshots",
					byViewport: { mobile: true, tablet: true, desktop: true },
				},
			},
		],
		footerLabel: "Add source",
		footerActions: ["trash", "chat", "settings"],
	},
	panes: {
		all: {
			rightTitle: "Files",
			rightTabs: [
				{ label: "Files", badge: "10", active: true },
				{ label: "Preview" },
				{ label: "Notes" },
			],
			right: [
				{
					type: "file-list",
					items: [
						{ path: "content/recipes/tomato-lentil-soup.md", delta: "+18", tone: "success" },
						{ path: "content/recipes/tomato-lentil-soup.cover.jpg", delta: "replace", tone: "warning" },
						{ path: "content/recipes/tomato-lentil-soup.steps.json", delta: "+6 -2", tone: "success" },
						{ path: "content/screenshots/pasta-night/hero-caption.md", delta: "+4", tone: "success" },
						{ path: "content/screenshots/pasta-night/shot-list.md", delta: "+2 -1", tone: "warning" },
						{ path: "content/screenshots/pasta-night/gallery-order.json", delta: "+1 -1", tone: "warning" },
						{ path: "assets/recipes/tomato-lentil-soup/hero.png", delta: "updated", tone: "success" },
						{ path: "assets/recipes/tomato-lentil-soup/step-03.png", delta: "updated", tone: "success" },
						{ path: "notes/mela-import-weeknight.md", delta: "+9", tone: "success" },
						{ path: "notes/screenshot-review.md", delta: "+3", tone: "warning" },
					],
				},
			],
			rightCollapse: {
				label: "Toggle files",
				byViewport: { mobile: true, tablet: false, desktop: false },
			},
			bottomTitle: "Terminal",
			bottomTabs: [{ label: "Run" }, { label: "Terminal", active: true }, { label: "+" }],
			bottomActionLabel: "Run",
			bottom: [
				{
					type: "terminal-snippet",
					prompt: "recipes-site git:(mela-import-weeknight)",
					output: [""],
				},
			],
			bottomCollapse: {
				label: "Toggle terminal",
				byViewport: { mobile: true, tablet: true, desktop: false },
			},
		},
		debug: {
			rightTitle: "Recipe fields",
			rightTabs: [
				{ label: "Fields", badge: "8", active: true },
				{ label: "Preview" },
				{ label: "Notes" },
			],
			right: [
				{
					type: "file-list",
					items: [
						{ path: "title", delta: "normalized", tone: "success" },
						{ path: "source_url", delta: "kept", tone: "success" },
						{ path: "yield", delta: "filled", tone: "success" },
						{ path: "tags", delta: "+3 -1", tone: "warning" },
						{ path: "hero_caption", delta: "needs pass", tone: "warning" },
					],
				},
			],
			rightCollapse: {
				label: "Toggle fields",
				byViewport: { mobile: true, tablet: false, desktop: false },
			},
			bottomTitle: "Terminal",
			bottomTabs: [{ label: "Run" }, { label: "Terminal", active: true }, { label: "+" }],
			bottomActionLabel: "Run",
			bottom: [
				{
					type: "terminal-snippet",
					prompt: "recipes-site git:(mela-import-weeknight)",
					output: [""],
				},
			],
			bottomCollapse: {
				label: "Toggle terminal",
				byViewport: { mobile: true, tablet: true, desktop: false },
			},
		},
		review: {
			rightTitle: "Screenshot notes",
			rightTabs: [{ label: "Files" }, { label: "Preview" }, { label: "Notes", active: true }],
			right: [
				{
					type: "summary-card",
					title: "Publish checklist",
					lines: [
						"Recipe title normalized from Mela export",
						"Ingredient list cleaned for web formatting",
						"Screenshot captions still need a final pass",
					],
					tone: "accent",
				},
				{
					type: "kv-list",
					items: [
						{ label: "Recipes", value: "3" },
						{ label: "Messages", value: "13" },
						{ label: "Tool calls", value: "15" },
						{ label: "Status", value: "Ready" },
					],
				},
			],
			rightCollapse: {
				label: "Toggle notes",
				byViewport: { mobile: false, tablet: false, desktop: false },
			},
			bottomTitle: "Terminal",
			bottomTabs: [{ label: "Run" }, { label: "Terminal", active: true }, { label: "+" }],
			bottomActionLabel: "Run",
			bottom: [
				{
					type: "terminal-snippet",
					prompt: "recipes-site git:(mela-import-weeknight)",
					output: [""],
				},
			],
			bottomCollapse: {
				label: "Toggle terminal",
				byViewport: { mobile: true, tablet: true, desktop: false },
			},
		},
	},
	composer: {
		statusLabel: "Scroll to bottom",
		modelLabel: "Sonnet 4.5",
		secondaryLabel: "Tag recipes",
		actions: ["clipboard", "screenshots"],
		value: "Add a short note for the hero screenshot and tighten the ingredient formatting before publish.",
		hint: "#L to focus",
		submitLabel: "Run",
		collapse: {
			label: "Toggle composer",
			byViewport: { mobile: true, tablet: false, desktop: false },
		},
	},
	messages: [
		{
			type: "message",
			id: "intro",
			role: "status",
			title: "Imported 3 recipes from Mela. One hero caption and two ingredient lists still need cleanup before publish.",
			body: [
				{ type: "text", text: "The assistant checked the imported recipes, compared the screenshot notes, and switched into cleanup mode before writing the final publish summary." },
			],
		},
		{
			type: "message",
			id: "assistant-validation",
			role: "assistant",
			title: "Import pass",
			state: "done",
			agent: { id: "main", label: "Main agent", provider: "codex" },
			body: [
				{
					type: "text",
					text: "I finished cleaning the imported Mela content. Next I’m checking the fields, screenshot notes, and publish copy so the recipe page reads cleanly on the site.",
				},
			],
		},
		{
			type: "group",
			id: "tool-activity",
			label: "13 tool calls, 7 messages",
			defaultCollapsed: false,
			children: [
				{
					type: "message",
					id: "tool-file-change",
					role: "tool",
					title: "1 recipe file updated",
					body: [
						{
							type: "file-list",
							items: [
								{ path: "tomato-lentil-soup.md", delta: "+4 -1", tone: "success" },
							],
						},
					],
				},
				{
					type: "message",
					id: "assistant-note",
					role: "assistant",
					title: "Screenshot note",
					body: [
						{
							type: "text",
							text: "the import looks good now. i think it would help to keep the ingredient list tighter and reuse the screenshot caption format from the earlier gallery post so the final page feels consistent",
						},
					],
				},
			],
		},
		{
			type: "group",
			id: "summary-group",
			label: "15 tool calls, 13 messages",
			children: [
				{
					type: "message",
					id: "assistant-summary",
					role: "assistant",
					title: "Publish summary",
					agent: { id: "main", label: "Main agent", provider: "codex" },
					body: [
						{
							type: "markdownish",
							nodes: [
								{
									type: "p",
									text: "The recipe cleanup pass is complete. Here is the publish summary:",
								},
								{
									type: "p",
									text: "I normalized the imported Mela content, tightened the ingredient formatting, and left clear notes for the remaining screenshot captions.",
								},
								{
									type: "ol",
									items: [
										"Cleaned recipe title and metadata so the post reads like native site content instead of an app export",
										"Trimmed ingredient formatting and kept the step order intact",
										"Left screenshot-specific notes in the side pane before publish",
									],
								},
							],
						},
					],
				},
			],
		},
	],
};

export const motionScene: DemoScene = {
	...baseScene,
	header: {
		...baseScene.header,
		title: "Recipe publish assistant",
		subtitle: "The same scene data can render as static, staged playback, or CSS-first typing.",
		status: chip("Streaming", "accent"),
	},
	messages: [
		{
			type: "message",
			id: "user-request",
			role: "user",
			title: "Prompt",
			body: [
				{
					type: "text",
					text: "Summarize the imported recipe cleanup, call out any screenshot risks, and tell me what still needs work before publish.",
				},
			],
		},
		{
			type: "message",
			id: "assistant-typing",
			role: "assistant",
			title: "Agent response",
			state: "typing",
			agent: { id: "main", label: "Main agent", provider: "codex" },
			meta: [chip("typing", "accent"), chip("GUI mode", "muted")],
			body: [
				{
					type: "markdownish",
					nodes: [
						{
							type: "p",
							text: "I’ve completed the recipe cleanup pass. The main changes are normalized metadata, tighter ingredient formatting, and clearer screenshot notes for the publish flow.",
						},
						{
							type: "ul",
							items: [
								"Risk: hero caption still reads too literally from the Mela export",
								"Risk: screenshot order for step 3 and step 4 should be checked once on the final page",
								"Safe to publish once those notes are resolved",
							],
						},
					],
				},
			],
		},
		{
			type: "message",
			id: "assistant-code",
			role: "tool",
			title: "Validation snapshot",
			body: [
				{
					type: "code",
					language: "tsx",
					html: highlightedDialogHtml,
					label: "Pre-highlighted code HTML",
				},
			],
		},
	],
};

export const subAgentScene: DemoScene = {
	header: {
		title: "Plan recipe and screenshot cleanup",
		subtitle: "Main thread with two worker agents and one merged result.",
		status: chip("2 workers active", "success"),
		breadcrumbs: ["thread", "recipe-publish"],
	},
	tabs: [{ id: "main", label: "Thread" }],
	sidebar: {
		homeLabel: "Home",
		sections: [
			{
				title: "Threads",
				items: [
					{
						label: "Plan recipe and screenshot cleanup",
						subtitle: "Claude · Gemini",
						meta: "3d",
						delta: "+311 -4",
						tone: "success",
						active: true,
					},
					{
						label: "Audit transcript structure",
						subtitle: "Beauvoir",
						meta: "10h",
					},
					{
						label: "Audit extracted transcript",
						subtitle: "Darwin",
						meta: "10h",
					},
					{
						label: "Audit transcripts",
						subtitle: "Ohm",
						meta: "10h",
					},
					{
						label: "Audit transcript notes",
						subtitle: "Peirce",
						meta: "10h",
					},
				],
			},
		],
		footerLabel: "New thread",
		footerActions: ["chat", "settings"],
	},
	messages: [
		{
			type: "message",
			id: "spawn-workers",
			role: "agent-event",
			title: "Split the task into two workers and kept the main thread open for the merged summary.",
			agent: { id: "main", label: "Main agent", provider: "codex" },
			meta: [chip("parallelized", "accent")],
			body: [
				{
					type: "badge-row",
					items: [
						chip("2 workers active", "success"),
						chip("worker-a", "accent"),
						chip("worker-b", "accent"),
						"recipe cleanup",
						"screenshot notes",
					],
				},
				{
					type: "text",
					text: "Parent: Codex\nWorkers: Claude, Gemini\nPhase: publish prep",
				},
			],
		},
		{
			type: "group",
			id: "worker-responses",
			label: "Closed 2 workers",
			children: [
				{
					type: "message",
					id: "worker-a-response",
					role: "assistant",
					title: "Claude returned recipe structure notes",
					agent: { id: "worker-a", label: "Worker A", provider: "claude", parentAgentId: "main" },
					body: [
						{
							type: "markdownish",
							nodes: [
								{
									type: "ul",
									items: [
										"Shorten the imported title so it reads like native site copy",
										"Keep ingredient quantities and units on one line where possible",
										"Leave source attribution in metadata, not in the hero paragraph",
									],
								},
							],
						},
					],
				},
				{
					type: "message",
					id: "worker-b-response",
					role: "assistant",
					title: "Gemini returned screenshot notes",
					agent: { id: "worker-b", label: "Worker B", provider: "gemini", parentAgentId: "main" },
					body: [
						{
							type: "markdownish",
							nodes: [
								{
									type: "ul",
									items: [
										"Move the step-3 screenshot ahead of the ingredient close-up",
										"Shorten the hero caption for the gallery card",
										"Keep the screenshot note list collapsed by default on mobile",
									],
								},
							],
						},
					],
				},
			],
		},
		{
			type: "message",
			id: "parent-summary",
			role: "assistant",
			title: "Merged the worker output into one publish-ready plan",
			agent: { id: "main", label: "Main agent", provider: "codex" },
			body: [
				{
					type: "text",
					text: "The main thread now has one clean checklist for recipe copy, screenshot order, and final publish polish.",
				},
			],
		},
	],
};

export const collapseScene: DemoScene = {
	...baseScene,
	header: {
		...baseScene.header,
		title: "Collapse-heavy activity log",
		subtitle: "Explicit group nodes control collapse state without relying on marker syntax.",
		status: chip("Condensed", "warning"),
	},
	messages: [
		{
			type: "group",
			id: "collapsed-tools",
			label: "Verbose tool output",
			defaultCollapsed: true,
			meta: [chip("default collapsed", "warning")],
			children: [
				{
					type: "message",
					id: "tool-output-1",
					role: "tool",
					title: "Directory scan",
					body: [
						{
							type: "terminal-snippet",
							prompt: "rg --files content/recipes assets/recipes notes",
							output: [
								"content/recipes/tomato-lentil-soup.md",
								"assets/recipes/tomato-lentil-soup/hero.png",
								"notes/screenshot-review.md",
							],
						},
					],
				},
				{
					type: "message",
					id: "tool-output-2",
					role: "tool",
					title: "Config summary",
					collapsible: {
						label: "Toggle config details",
						defaultCollapsed: true,
					},
					body: [
						{
							type: "kv-list",
							items: [
								{ label: "Theme", value: "system" },
								{ label: "Mode", value: "play" },
								{ label: "Message scroll", value: "fixed height" },
							],
						},
					],
				},
			],
		},
		{
			type: "message",
			id: "collapsed-summary",
			role: "assistant",
			title: "Condensed summary",
			body: [
				{
					type: "text",
					text: "Users can collapse either a whole group of messages or just the long body of a single message. The component stores that state locally per instance and keeps the transcript scrollable when the log gets long.",
				},
			],
		},
	],
};

export const responsiveScene: DemoScene = {
	...baseScene,
	header: {
		title: "Recipe publish pass",
		subtitle: "One shell, sized by its parent.",
		status: chip("Ready", "success"),
		providerLabel: "Codex",
		modelLabel: "GPT-5.4",
		breadcrumbs: ["mela-import"],
		primaryActionLabel: "Publish",
	},
	tabs: [{ id: "all", label: "Conversation" }],
	sidebar: {
		homeLabel: "Home",
		collapse: {
			label: "Toggle sidebar",
			byViewport: { mobile: true, tablet: true, desktop: false },
		},
		sections: [
			{
				title: "recipes",
				actionLabel: "New workflow",
				items: [
					{
						label: "mela-import-weeknight",
						subtitle: "tomato-lentil-soup",
						meta: "#01",
						delta: "Ready",
						tone: "success",
						active: true,
					},
					{
						label: "caption-pass",
						subtitle: "pasta-night",
						meta: "#02",
						delta: "Review",
						tone: "warning",
					},
				],
			},
		],
		footerLabel: "Add source",
		footerActions: ["trash", "chat", "settings"],
	},
	panes: {},
	composer: undefined,
	messages: [
		{
			type: "message",
			id: "responsive-intro",
			role: "status",
			title: "Imported 3 recipes. One caption and one ingredient list still need cleanup before publish.",
			body: [
				{
					type: "text",
					text: "The agent checked the Mela import and left a short publish summary so the same shell reads clearly in narrow and wide containers.",
				},
			],
		},
		{
			type: "message",
			id: "responsive-summary",
			role: "assistant",
			title: "Publish summary",
			state: "done",
			agent: { id: "main", label: "Main agent", provider: "codex" },
			body: [
				{
					type: "text",
					text: "I normalized the metadata, tightened the ingredient formatting, and left the remaining screenshot edits in the thread so the post can publish cleanly.",
				},
			],
		},
	],
};
