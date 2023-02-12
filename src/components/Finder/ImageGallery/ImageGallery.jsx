import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './image-gallery.module.css';

class ImageGallery extends Component {
  static defaultProps = {
    items: [],
  };

  render() {
    const { items, onOpenModal } = this.props;
    const images = items.map(({ id, webformatURL, tags, largeImageURL }) => (
      <li
        onClick={() => onOpenModal(largeImageURL, tags)}
        key={id}
        className={css.galleryItem}
      >
        <img
          className={css.galleryImageItem}
          src={webformatURL}
          alt={tags}
          loading="lazy"
        />
      </li>
    ));
    return <ul className={css.gallery}>{images}</ul>;
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
