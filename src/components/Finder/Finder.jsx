import React, { Component } from 'react';

import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Searchbar from './Searchbar/Searchbar';
import Modal from 'components/Finder/Modal/Modal';
import Button from './Button/Button';

import { getImages } from '../../shared/services/image-api.js';
import css from './finder.module.css';
import Spinner from './Spinner/Spinner';

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
    showBtn: false,
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
        return {
          items: [...prevState.items, ...data.hits],
          showBtn: prevState.page < Math.ceil(data.totalHits / 15),
        };
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

  closeModal = () => {
    this.setState({ activeModal: false, imageDetails: null });
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
    const { getInputValue, loadMore, showImage, closeModal } = this;
    const {
      isLoading,
      error,
      items,
      greeting,
      activeModal,
      imageDetails,
      showBtn,
    } = this.state;
    return (
      <div className={css.finder}>
        {Boolean(greeting) && (
          <div className={css.greetingWrapper}>
            <h3 className={css.greeting}>Welcome in our app </h3>
            <span className={css.icon}></span>
          </div>
        )}
        {isLoading && <Spinner />}
        <Searchbar onSubmit={getInputValue} />
        {error && <p className={css.error}>{error} Please try again later </p>}
        <ImageGallery items={items} onOpenModal={showImage} />
        {showBtn && <Button loadMore={loadMore} />}
        {activeModal && (
          <Modal closeModal={closeModal}>
            <ImageGalleryItem {...imageDetails} />
          </Modal>
        )}
      </div>
    );
  }
}

export default Finder;
