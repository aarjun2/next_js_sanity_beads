import { useParams } from 'next/navigation';
import { CartContext } from '@/app/context/CartContext';
import { ProductContext } from '@/app/context/ProductContext';
import { useContext, useState, useEffect } from 'react';
import Footer from './Footer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const IndividualProducts = () => {
  const id = useParams();
  const products = useContext(ProductContext);
  const { addtoCart } = useContext(CartContext);
  const [activeImg, setActiveImage] = useState('');

  const product = products.find((item: any) => {
    return item._id === id.products;
  });

  useEffect(() => {
    if (product) {
      setActiveImage(product.image['0']);
    }
  }, [product]);

  if (!product) {
    return (
      <section className='h-screen flex justify-center items-center'>
        Loading...
      </section>
    );
  }

  const { price, name, details, _id, image } = product;
 

  return (
    <section className='pt-32 pb-12 lg:py-32 h-screen items-center'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row items-center'>
        <div className='flex flex-col gap-6 lg:w-2/4'>
                <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl'/>
                <div className='flex flex-row gap-2 h-24'>
                {image.map((imgSrc: any, index: any) => (
                    <img
                    key={index}
                    src={imgSrc}
                    alt=""
                    className='w-24 h-24 rounded-md cursor-pointer'
                    onClick={() => setActiveImage(imgSrc)}
                    />
                ))}
                </div>
            </div>
          <div className='flex-1 text-center lg:text-left mt-8 lg:mt-0 lg:ml-8'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px]'>
              {name}
            </h1>
            <div className='text-xl text-red-500 font-medium mb-6'>
              $ {price}
            </div>
            <p className='mb-8'>{details}</p>
            <button
              onClick={() => addtoCart(name, _id, price)}
              className='bg-primary py-4 px-8 text-white'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className='mt-8 lg:mt-16'>
        <Footer />
      </div>
    </section>
  );
};

export default IndividualProducts;