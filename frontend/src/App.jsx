import { useState } from 'react';
import Header from './components/Header.jsx';
import ShortenView from './components/ShortenView.jsx';
import AnalyticsView from './components/AnalyticsView.jsx';

function App() {
  const [view, setView] = useState('shorten');

  return (
    <>
      <Header view={view} onNavigate={setView} />
      <main className="app-container">
        {view === 'shorten' && <ShortenView />}
        {view === 'analytics' && <AnalyticsView />}
      </main>
      <footer className="footer">
        <div>Built for performance. Designed for scale.</div>
        <div className="footer-stack">
          <span className="footer-tag">Spring Boot</span>
          <span className="footer-tag">PostgreSQL</span>
          <span className="footer-tag">Redis</span>
          <span className="footer-tag">React</span>
        </div>
      </footer>
    </>
  );
}

export default App;
