import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Analysis', path: '/analyse' },
  { label: 'Statistics', path: '/statistiques' },
  { label: 'EDA', path: '/eda' },
  { label: 'ML Comparison', path: '/comparaison-ml' },
  { label: 'History', path: '/historique' },
  { label: 'About', path: '/a-propos' }
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          Customer Review Analysis
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
