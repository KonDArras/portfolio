const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/guides", label: "Guides" },
];

export default function TopNav({ route, navigate }) {
  function handleClick(e, href) {
    e.preventDefault();
    navigate(href, e);
  }

  return (
    <header className="topnav">
      <a className="topnav-mark" href="#/" onClick={(e) => handleClick(e, "/")}>
        CK
      </a>
      <nav aria-label="Site">
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={`#${link.href}`}
                className={route === link.href ? "is-active" : ""}
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
