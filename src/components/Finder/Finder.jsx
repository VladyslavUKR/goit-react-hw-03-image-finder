import React, { Component } from 'react';

import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Searchbar from './Searchbar/Searchbar';
import Modal from 'shared/services/Modal/Modal';

import { getImages } from '../../shared/services/image-api.js';
import css from './finder.module.css';

class Finder extends Component {
  state = {
    items: [],
    isLoading: false,
    error: null,
    search: '',
    page: 1,
    greeting: true,
    activeModal: false,
    imageDetails: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ isLoading: true });

      const { search, page } = this.state;
      const data = await getImages(search, page);

      this.setState(prevState => {
        return { items: [...prevState.items, ...data.hits] };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  showImage = (largeImageURL, tags) => {
    this.setState({
      activeModal: true,
      imageDetails: { largeImageURL, tags },
    });
  };

  getInputValue = name => {
    this.setState({ search: name, items: [], page: 1, greeting: false });
  };

  loadMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  render() {
    const { getInputValue, loadMore, showImage } = this;
    const { isLoading, error, items, greeting, activeModal, imageDetails } =
      this.state;
    return (
      <div className={css.finder}>
        {Boolean(greeting) && (
          <h3 className={css.greeting}>Welcome in our app</h3>
        )}
        {isLoading && <p className={css.loading}>...L o a d i n g</p>}
        <Searchbar onSubmit={getInputValue} />
        {error && <p className={css.error}>{error} Please try again later </p>}
        <ImageGallery items={items} onOpenModal={showImage} />
        {Boolean(items.length) && (
          <button className={css.btnLoadMore} type="button" onClick={loadMore}>
            Load more
          </button>
        )}
        {activeModal && (
          <Modal>
            <ImageGalleryItem {...imageDetails} />
          </Modal>
        )}
      </div>
    );
  }
}

export default Finder;
