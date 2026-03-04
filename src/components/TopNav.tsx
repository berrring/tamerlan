type TopNavItem = {
  id: string;
  label: string;
};

type TopNavProps = {
  brand: string;
  items: TopNavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
};

export default function TopNav({ brand, items, activeId, onNavigate }: TopNavProps) {
  return (
    <header className="top-nav">
      <button className="top-nav__brand" onClick={() => onNavigate("hero")} type="button">
        {brand}
      </button>

      <nav className="top-nav__menu" aria-label="Навигация по главам">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`top-nav__link ${activeId === item.id ? "is-active" : ""}`}
            aria-current={activeId === item.id ? "page" : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
