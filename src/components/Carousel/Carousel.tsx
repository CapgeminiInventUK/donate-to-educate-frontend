import { FC, useState, useEffect } from 'react';
import styles from './Carousel.module.scss';
import Image from '@components/Image/Image';
import { CarouselProps } from '@/types/props';
import { TEN_SECONDS_IN_MILLISECONDS } from '@/utils/globals';

const Carousel: FC<CarouselProps> = ({ items }) => {
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextActive = items.length === active + 1 ? 0 : active + 1;
      setActive(nextActive);
    }, TEN_SECONDS_IN_MILLISECONDS);

    return () => clearInterval(interval);
  }, [active, items.length]);

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
