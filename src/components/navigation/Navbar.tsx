import React from 'react';
import PropTypes from 'prop-types';

import Menu from './Menu';

const Navbar = (props: any) => {
  const { blocks, editable } = props;

  const visibleMenuBlocks = !editable
    ? blocks.filter((b: any) => !b.menu_hidden)
    : blocks;
  const menuProps = { ...props, blocks: visibleMenuBlocks };

  return (
    <div className="absolute col-12 z3 fixed">
      <Menu {...menuProps} />
      <Menu {...menuProps} mobile />
    </div>
  );
};

Navbar.propTypes = {
  editable: PropTypes.bool.isRequired,
  blocks: PropTypes.array,
  linkTo: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  editable: false,
  blocks: [],
};

export default Navbar;