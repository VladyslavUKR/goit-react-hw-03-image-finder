import PropTypes from 'prop-types';
import css from './image-gallery-item.module.css';

const ImageGalleryItem = ({ tags, largeImageURL }) => {
  return (
    <li class={css.galleryItem}>
      <img className={css.imageItem} src={largeImageURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
