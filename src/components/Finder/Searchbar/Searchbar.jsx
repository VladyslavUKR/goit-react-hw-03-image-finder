import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './search-bar.module.css';

class Searchbar extends Component {
  state = { name: '' };

  inputValue = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { name } = this.state;
    onSubmit(name);
    this.reset();
  };

  reset() {
    this.setState({ name: '' });
  }

  render() {
    const { name } = this.state;
    const { inputValue, handleSubmit } = this;

    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.submitFrom}>
            <span className={css.buttonLabel}>Search</span>
          </button>
          <input
            onChange={inputValue}
            name="name"
            value={name}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
