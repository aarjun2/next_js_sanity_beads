import React from 'react';
import Image from 'next/image';
import url_val from '../assets/tamanna-rumee-mIqyYpSNq3o-unsplash.jpg';

const Hero = () => {
    return (
        <section
            className="h-[800px] bg-no-repeat bg-cover bg-center py-24 relative"
        >
            <Image
                src={url_val}
                alt='sale'
                layout="fill"
                objectFit="cover"
                priority 
            />
        </section>
    );
}

export default Hero;