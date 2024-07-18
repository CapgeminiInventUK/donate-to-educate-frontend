import type { ImageProps } from '@/types/props';
import type { FC } from 'react';

const Image: FC<ImageProps> = ({ alt, height, width, className, image }) => (
  <img src={image} alt={alt} height={height} width={width} className={className} />
);

export default Image;
