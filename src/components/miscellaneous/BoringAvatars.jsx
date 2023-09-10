import React from 'react';
import Avatar from 'boring-avatars';

const BoringAvatars = ({ name, size }) => {
  return (
    <Avatar
      size={size}
      name={name}
      variant='beam'
      colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
    />
  );
};

export default BoringAvatars;
