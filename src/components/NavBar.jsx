import PropTypes from "prop-types";
import "./NavBar.css";

const NavBar = ({ backgroundColor, homeIcon, options, menuIcon }) => {
  return (
    <header>
      <nav
        style={{ backgroundColor: backgroundColor ? backgroundColor : "grey" }}
      >
        <a href="/">
          <img src={homeIcon.url} id="home-icon" alt={homeIcon.altTitle} />
        </a>
        <ul>
          {options &&
            options.map((option) => (
              <li className="nav-option">
                <a href={option.url}>{option.title}</a>
              </li>
            ))}
        </ul>
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
  options: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ),
  menuIcon: PropTypes.exact({
    altTitle: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default NavBar;
