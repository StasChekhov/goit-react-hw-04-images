import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css'
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({image, onClose}) {

    useEffect(() => {
        const escapeFunction = e => {
            if (e.code === 'Escape') {
                onClose()
            }
        };
            window.addEventListener('keydown', escapeFunction);
        return () => {
            window.removeEventListener('keydown', escapeFunction)
        }
    },[ onClose ])
    // componentDidMount() {
    //     window.addEventListener('keydown', this.escapeFunction)
    // }
    // componentWillUnmount() {
    //     window.removeEventListener('keydown', this.escapeFunction)
    // }
    

    const overlayClick = e => {
        if (e.currentTarget === e.target) {
            onClose()
        }
    }
    
        return createPortal (
            <div className={s.overlay} onClick={overlayClick}>
                <div className={s.module}>
                    <img  src={image} alt="" />
                </div>
            </div>,
            modalRoot,
        );
}
 


Modal.propTypes = {
  image: PropTypes.string,
  
};
