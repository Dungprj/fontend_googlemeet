import PropTypes from 'prop-types';

function Menu({ children }) {
    return <nav>{children}</nav>;
}

Menu.propTypes = {
    children: PropTypes.node.isRequired // Make sure to include PropTypes for the children prop
};

export default Menu;
