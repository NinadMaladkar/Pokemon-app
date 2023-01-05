import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Link to='/'>
      <Box
        w='100vw'
        backgroundColor='#2a75bb'
        height=' 12vh'
        color='#ffcb05'
        className='header'
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <Image src='/pokemon-logo.png' w='15%' />
      </Box>
    </Link>
  );
};

export default Header;
