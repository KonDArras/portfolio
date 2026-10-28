/* @ds-bundle: {"format":4,"namespace":"Schematic","components":[{"name":"SectionHeading"},{"name":"Panel"},{"name":"Tags"},{"name":"FilterPill"},{"name":"StatusDot"},{"name":"Meter"},{"name":"Stat"},{"name":"LinkRow"},{"name":"TopNav"},{"name":"Terminal"},{"name":"HobbyChip"},{"name":"EmptyState"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function spot(e) {
    var r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", e.clientX - r.left + "px");
    e.currentTarget.style.setProperty("--sy", e.clientY - r.top + "px");
  }

  function SectionHeading(p) {
    return h("div", { className: "section-head" }, h("h2", { id: p.id }, p.num ? h("span", { className: "num" }, p.num) : null, p.title), p.intro ? h("p", { className: "page-intro" }, p.intro) : null);
  }
  function Panel(p) {
    var spotlight = p.spotlight !== false;
    return h(p.as || "div", { className: cx("panel", spotlight && "spotlight", p.className), onPointerMove: spotlight ? spot : undefined, style: p.style }, p.title ? h("h3", null, p.title) : null, p.children);
  }
  function PanelGrid(p) {
    return h("div", { className: "panel-grid", style: { gridTemplateColumns: "repeat(" + (p.columns || 1) + ", 1fr)" } }, p.children);
  }
  Panel.Grid = PanelGrid;
  function Tags(p) {
    return h("ul", { className: "tags" }, (p.items || []).map(function (t) { return h("li", { key: t }, t); }));
  }
  function FilterPill(p) {
    return h("button", { type: "button", className: cx("filter-pill", p.active && "is-active"), "aria-pressed": !!p.active, onClick: p.onClick }, p.children);
  }
  function StatusDot(p) {
    var dot = h("span", { className: cx("dot", p.live && "dot-live"), "aria-hidden": "true" });
    return p.children ? h("span", { className: "status-line" }, dot, p.children) : dot;
  }
  function Meter(p) {
    var idle = p.load == null;
    return h("div", { className: "skill-row" },
      h("div", { className: "skill-row-head" }, h("span", { className: "skill-name" }, p.name), p.level ? h("span", { className: "lvl" }, p.level) : null),
      idle ? h("div", { className: "meter meter-idle", "aria-hidden": "true" })
           : h("div", { className: "meter", role: "img", "aria-label": p.name + ": " + (p.level || p.load + "%") }, h("div", { className: "meter-fill", style: { "--load": p.load + "%" } })));
  }
  function Stat(p) {
    return h("div", { className: "stat" }, h("span", { className: "stat-value" }, p.value, p.suffix || ""), h("span", { className: "stat-label" }, p.label));
  }
  function LinkRow(p) {
    return h("div", { className: "links" }, (p.links || []).map(function (l) {
      return h("a", { key: l.label, href: l.href, className: l.primary ? "cv-download" : undefined, download: l.download || undefined }, l.label);
    }));
  }
  function TopNav(p) {
    return h("header", { className: "topnav" },
      h("a", { className: "topnav-mark", href: p.homeHref || "#/" }, p.mark || "CK"),
      h("nav", { "aria-label": "Site" }, h("ul", null, (p.links || []).map(function (l) {
        return h("li", { key: l.href }, h("a", { href: l.href, className: l.href === p.active ? "is-active" : undefined, "aria-current": l.href === p.active ? "page" : undefined }, l.label));
      }))));
  }
  function Terminal(p) {
    return h("div", { className: "terminal" },
      h("div", { className: "terminal-bar" },
        h("span", { className: "terminal-dot terminal-dot-r" }), h("span", { className: "terminal-dot terminal-dot-y" }), h("span", { className: "terminal-dot terminal-dot-g" }),
        h("span", { className: "terminal-title" }, p.title)),
      h("div", { className: "terminal-body" },
        (p.lines || []).map(function (l, i) {
          return l.type === "cmd"
            ? h("div", { className: "terminal-cmd", key: i }, h("span", { className: "terminal-prompt" }, "$"), " ", l.text)
            : h("div", { className: "terminal-out", key: i }, l.text);
        }),
        p.typing != null ? h("div", { className: "terminal-cmd" }, h("span", { className: "terminal-prompt" }, "$"), " ", p.typing, h("span", { className: "terminal-caret" })) : null));
  }
  function HobbyChip(p) {
    return h("li", { className: "hobby-chip spotlight", onPointerMove: spot }, p.icon ? h("img", { src: p.icon, alt: "", width: 20, height: 20 }) : null, p.children);
  }
  function EmptyState(p) {
    return h("div", { className: "empty-state" }, h("div", { className: "node", "aria-hidden": "true" }), h("p", null, p.title), p.sub ? h("p", { className: "empty-sub" }, p.sub) : null);
  }

  window.Schematic = { SectionHeading: SectionHeading, Panel: Panel, Tags: Tags, FilterPill: FilterPill, StatusDot: StatusDot, Meter: Meter, Stat: Stat, LinkRow: LinkRow, TopNav: TopNav, Terminal: Terminal, HobbyChip: HobbyChip, EmptyState: EmptyState };
})();
