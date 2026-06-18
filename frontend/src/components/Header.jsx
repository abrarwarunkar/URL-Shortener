function Header({ view, onNavigate }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo" aria-hidden="true">S</div>
          <span className="header-title">Sniplink</span>
        </div>
        <nav className="header-nav" aria-label="Main navigation">
          <button
            id="nav-shorten"
            className={`nav-btn${view === 'shorten' ? ' active' : ''}`}
            onClick={() => onNavigate('shorten')}
          >
            Shorten
          </button>
          <button
            id="nav-analytics"
            className={`nav-btn${view === 'analytics' ? ' active' : ''}`}
            onClick={() => onNavigate('analytics')}
          >
            Analytics
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
