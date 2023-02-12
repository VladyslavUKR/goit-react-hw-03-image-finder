import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  render() {
    const { children } = this.props;
    return createPortal(
      <div class={CSS.overlay}>
        <div class={css.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};
