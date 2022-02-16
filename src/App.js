import { useState, useEffect } from 'react';
import Button from './components/Button/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar';

export default function App() {
  const [photoName, setPhotoName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [page, setPage] = useState(1);

  // state = {
  //   photoName: '',
  //   images: [],
  //   loading: false,
  //   largeImage: '',
  //   page: 1,
  // }
  
  useEffect(() => {
    if (!loading && photoName && page) {
      setLoading(true)

      fetch(`https://pixabay.com/api/?q=${photoName}&page=${page}&key=25514627-ce86075d369dfb00c77a4eeac&image_type=photo&orientation=horizontal&per_page=12`)
        .then(res => res.json())
        .then(res => { 
          const images = res.hits.map(({ id, largeImageURL, webformatURL }) => ({ id, largeImageURL, webformatURL }));
          setImages((prevImages) => page > 1 ? [...prevImages, ...images] : images);
        })
        .finally(() => setLoading(false));
    }
  }, [page, photoName])
  // componentDidUpdate(prevProps, prevState) {
  //   const prevName = prevState.photoName;
  //   const nextName = this.state.photoName;
  //   const prevPage = prevState.page;
  //   const nextPage = this.state.page;

  //   if (((prevPage !== nextPage) || (prevName !== nextName)) && !this.state.loading) {  
  //     this.setState({loading:true})

  //     fetch(`https://pixabay.com/api/?q=${this.state.photoName}&page=${this.state.page}&key=25514627-ce86075d369dfb00c77a4eeac&image_type=photo&orientation=horizontal&per_page=12`)
  //       .then(res => res.json())
  //       .then(res => { 
  //         const images = res.hits.map(({ id, largeImageURL, webformatURL }) => ({ id, largeImageURL, webformatURL }));
  //         this.setState({ images: nextPage > 1 ? [...this.state.images, ...images]: images })
          
  //       })
  //       .finally(()=> this.setState({loading:false}))
  //   }
  // }
  
  const searchbarFormSubmit = (photoName) => {
    setPhotoName(photoName);
    setPage(1)
    
    
  }
  const onOpenImage = state => {
    setLargeImage(state)
  }
  const onLoadMore = () => {
    setPage(() => page + 1 );
    
  }

    
    return (
      <>
          <Searchbar onSubmit={searchbarFormSubmit} />
          {photoName !== '' && (

          <ImageGallery
            listImages={images}
            open={onOpenImage}
            
            // id={ id }
            // previewURL={ previewURL }
            // webformatURL={ webformatURL }
          />
          )}

          {loading && <Loader />}
          {largeImage && <Modal
            image={largeImage}
            onClose={onOpenImage}
          />}
          
          {(images.length >= 12) ?
            <Button
            load={onLoadMore}
            />
            : null
          }
      </>
    );
}


