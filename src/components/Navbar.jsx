import { NavLink } from 'react-router-dom';

const links = [
<<<<<<< HEAD
  { label: 'Home', path: '/' },
  { label: 'Analysis', path: '/analyse' },
  { label: 'Statistics', path: '/statistiques' },
  { label: 'EDA', path: '/eda' },
  { label: 'ML Comparison', path: '/comparaison-ml' },
  { label: 'History', path: '/historique' },
  { label: 'About', path: '/a-propos' }
=======
  { label: 'Accueil', path: '/' },
  { label: 'Analyse', path: '/analyse' },
  { label: 'Comparaison ML', path: '/comparaison-ml' },
  { label: 'Historique', path: '/historique' },
  { label: 'À propos', path: '/a-propos' }
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
<<<<<<< HEAD
          Customer Review Analysis
=======
          Analyse des avis clients
>>>>>>> 132fdfbe031f201d1e2e251791f4f2ed53a639e2
        </NavLink>
        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
