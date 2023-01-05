import { Image } from '@chakra-ui/react';
import React from 'react';
import 'animate.css';

const Loading = () => {
  return (
    <Image
      src='/pokeball.png'
      className='animate__animated animate__infinite animate__bounce'
      w='10%'
    />
  );
};

export default Loading;
