type SideNavItem = {
  id: string;
  label: string;
};

type SideNavProps = {
  items: SideNavItem[];
  activeId: string;
  progress: number;
  onNavigate: (id: string) => void;
};

export default function SideNav({ items, activeId, progress, onNavigate }: SideNavProps) {
  return (
    <>
      <aside className="side-nav" aria-label="Прогресс лонгрида">
        <div className="side-nav__track" aria-hidden="true">
          <span className="side-nav__fill" style={{ transform: `scaleY(${progress})` }} />
        </div>

        <ul className="side-nav__list">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id} className="side-nav__item">
                <button
                  type="button"
                  className={`side-nav__dot ${active ? "is-active" : ""}`}
                  onClick={() => onNavigate(item.id)}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                />
                <button
                  type="button"
                  className={`side-nav__label ${active ? "is-active" : ""}`}
                  onClick={() => onNavigate(item.id)}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="side-nav-mobile" aria-label="Мобильная навигация">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`side-nav-mobile__dot ${item.id === activeId ? "is-active" : ""}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
            aria-current={item.id === activeId ? "page" : undefined}
          />
        ))}
      </div>
    </>
  );
}
