import { FC } from 'react';
import { ImageProps } from '@/types/props';

const Image: FC<ImageProps> = ({ alt, height, width, className, image }) => (
  <img src={image} alt={alt} height={height} width={width} className={className} />
);

export default Image;
