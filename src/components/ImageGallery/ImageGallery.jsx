import s from './ImageGallery.module.css'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from "prop-types";

const ImageGallery = ({ listImages, open }) => {
  return (
    <ul className={s.gallery}>
      {listImages.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            image={webformatURL}
            largeImage={largeImageURL}
            key={id}
            showImage={open}
          />
        )
      })
      } 
    </ul>    
  );    
}

export default ImageGallery;


ImageGallery.propTypes = {
  listImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ),
  open: PropTypes.func.isRequired,
};