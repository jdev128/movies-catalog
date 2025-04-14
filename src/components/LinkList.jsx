import PropTypes from "prop-types";
import "./LinkList.css";

/**
 * TO USE:
 * <LinkList
          links={[
            {
              title: "Movies Search App",
              url: null,
            },
            {
              title: "Movies S",
              url: "/",
            },
            {
              title: "Movie",
              url: "/",
            },
          ]}
        />
 * 
 */

const LinkList = ({ links, stackedLayout = false }) => {
  return (
    <ul className={stackedLayout ? "stacked" : ""}>
      {links.map((link) => (
        <li key={link.title}>
          <a href={link.url?.length > 0 ? link.url : null}>{link.title}</a>
        </li>
      ))}
    </ul>
  );
};

LinkList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ),
  stackedLayout: PropTypes.bool,
};

export default LinkList;
