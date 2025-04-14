import PropTypes from "prop-types";
import "./NavBar.css";

const NavBar = ({ backgroundColor, homeIcon, children, menuIcon }) => {
  return (
    <header>
      <nav
        style={{ backgroundColor: backgroundColor ? backgroundColor : "grey" }}
      >
        <a href="/">
          <img src={homeIcon.url} id="home-icon" alt={homeIcon.altTitle} />
        </a>
        <div id="nav-content">{children}</div>
        {menuIcon && (
          <img src={menuIcon.url} id="menu-icon" alt={menuIcon.altTitle} />
        )}
      </nav>
    </header>
  );
};

NavBar.propTypes = {
  backgroundColor: PropTypes.string,
  homeIcon: PropTypes.exact({
    altTitle: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  menuIcon: PropTypes.exact({
    altTitle: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
  children: PropTypes.element.isRequired,
};

export default NavBar;
