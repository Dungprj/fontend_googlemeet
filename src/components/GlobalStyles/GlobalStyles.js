import './GlobalStyles.scss';
import PropTypes from 'prop-types';

function GlobalStyle({ children }) {
    return children;
}

GlobalStyle.propTypes = {
    children: PropTypes.node.isRequired, // Make sure to include PropTypes for the children prop
};

export default GlobalStyle;
