import PropTypes from 'prop-types';
import css from './image-gallery-item.module.css';

const ImageGalleryItem = ({ tags, largeImageURL }) => {
  return (
    <div className={css.galleryItem}>
      <img className={css.imageItem} src={largeImageURL} alt={tags} />
    </div>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
