import PropTypes from 'prop-types';
import css from './button.module.css';

const Button = ({ loadMore }) => {
  return (
    <>
      <button className={css.btnLoadMore} type="button" onClick={loadMore}>
        Load more
      </button>
    </>
  );
};

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
