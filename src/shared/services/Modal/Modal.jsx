import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeEsq);
  }

  closeEsq = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeEsq);
  }

  closeOverlay = e => {
    if (e.target === e.currentTarget || e.key === 'Escape') {
      this.props.closeModal();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={this.closeOverlay}>
        <div className={css.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};
