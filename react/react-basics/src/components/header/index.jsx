import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const { content, title, cardItemsCount } = props;
  return (
    <div style={{ minWidth: 600 }}>
      <h1>{title}</h1>
      <p>{content}</p>
      {cardItemsCount > 0 && <p>{cardItemsCount} cards found</p>}
    </div>
  );
};

Header.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
  cardItemsCount: PropTypes.number,
};
// Header.defaultProps = {
//   content: "Welcome to the card list default",
//   title: "Card List Default",
//   cardItemsCount: 0,
// };

export default Header;
