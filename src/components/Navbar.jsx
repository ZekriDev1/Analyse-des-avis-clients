import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Accueil', path: '/' },
  { label: 'Analyse', path: '/analyse' },
  { label: 'Comparaison ML', path: '/comparaison-ml' },
  { label: 'Historique', path: '/historique' },
  { label: 'À propos', path: '/a-propos' }
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          Analyse des avis clients
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
