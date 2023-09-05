import { FC, useState, useEffect } from 'react';
import styles from './Carousel.module.scss';
import Image from '@components/Image/Image';
import { CarouselProps } from '@/types/props';
import { TEN_SECONDS_IN_MILLISECONDS } from '@/utils/globals';
import ArrowLeft from '@/assets/carousel/ArrowLeft';
import ArrowRight from '@/assets/carousel/ArrowRight';
import { CarouselItem } from '@/types/data';

const incrementCount = (items: CarouselItem[], active: number): number => {
  return items.length === active + 1 ? 0 : active + 1;
};

const decrementCount = (items: CarouselItem[], active: number): number => {
  return active === 0 ? items.length - 1 : active - 1;
};

const Carousel: FC<CarouselProps> = ({ items }) => {
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(incrementCount(items, active));
    }, TEN_SECONDS_IN_MILLISECONDS);

    return () => clearInterval(interval);
  }, [active, items]);

  return (
    <div className={styles.container}>
      {items.map(({ title, image, colour }, index) => (
        <div
          key={title}
          className={`${styles.carouselItem} ${active !== index ? styles.hidden : ''} ${
            styles[colour]
          }`}
        >
          <Image className={styles.image} image={image} alt={title} />
          <h2 className={styles.title}>{title}</h2>
          <ArrowLeft
            className={`${styles.arrow} ${styles.left} ${styles[colour]}`}
            colour={colour === 'lightBlue' ? 'black' : 'white'}
            onClick={(): void => setActive(decrementCount(items, active))}
          />
          <ArrowRight
            className={`${styles.arrow} ${styles.right} ${styles[colour]}`}
            colour={colour === 'lightBlue' ? 'black' : 'white'}
            onClick={(): void => setActive(incrementCount(items, active))}
          />
        </div>
      ))}
      <div className={styles.progressContainer}>
        {items.map(({ title }, index) => (
          <div
            key={title}
            onClick={(): void => {
              setActive(index);
            }}
            className={active === index ? styles.activeProgressDot : styles.progressDot}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
