import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Analysis from './pages/Analysis.jsx';
<<<<<<< HEAD
import Dashboard from './pages/Dashboard.jsx';
import EDA from './pages/EDA.jsx';
=======
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
import History from './pages/History.jsx';
import About from './pages/About.jsx';
import ComparisonML from './pages/ComparisonML.jsx';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyse" element={<Analysis />} />
<<<<<<< HEAD
          <Route path="/statistiques" element={<Dashboard />} />
          <Route path="/eda" element={<EDA />} />
          <Route path="/comparaison-ml" element={<ComparisonML />} />
          <Route path="/historique" element={<History />} />
          <Route path="/a-propos" element={<About />} />
=======
          <Route path="/historique" element={<History />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/comparaison-ml" element={<ComparisonML />} />
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
        </Routes>
      </main>
    </div>
  );
}

export default App;
