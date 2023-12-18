import { FC, useState } from 'react';
import styles from './SchoolEdit.module.scss';
import ItemListEdit from '@/components/ItemList/ItemListEdit';
import FormButton from '@/components/FormButton/FormButton';
import ItemList from '@/components/ItemList/ItemList';
import { ItemsIconType } from '@/components/ItemList/getIcons';
import Button from '@/components/Button/Button';

const SchoolEdit: FC = () => {
  const [type, setType] = useState<ItemsIconType>('tick');
  const [preview, setPreview] = useState(false);
  const { banner, helpBannerTitle, helpBannerBody } = getPageText(type);

  return (
    <div className={styles.container}>
      <Button theme="darkBlue" onClick={() => setType('tick')} text="Request" />
      <Button theme="darkBlue" onClick={() => setType('heart')} text="Donate" />
      <Button theme="darkBlue" onClick={() => setType('plus')} text="Excess" />
      <div className={`${styles.banner} ${styles[type]}`}>
        <h2>{banner}</h2>
      </div>
      <div className={styles.card}>
        {!preview && (
          <>
            <div className={styles.helpBanner}>
              <h2>{helpBannerTitle}</h2>
              <p>{helpBannerBody}</p>
            </div>
            <div className={styles.whatToExpect}>
              <h2>What to expect</h2>
              <p>
                View the products we have in stock. While we update our stock levels regularly, they
                may change daily.{' '}
              </p>
              <FormButton text={'Edit'} onClick={(): void => undefined} theme="formButtonGrey" />
            </div>
            <ItemListEdit type={type} />
            <div className={styles.helpContact}>
              <p>
                Once we have your request for the products you need, we&apos;ll contact you to
                arrange the next steps as soon as we can.
              </p>
              <FormButton text={'Edit'} onClick={(): void => undefined} theme="formButtonGrey" />
            </div>
            <div className={styles.actionButtons}>
              <FormButton
                theme={'formButtonGrey'}
                onClick={(): void => setPreview(true)}
                text={'Preview'}
              />
              <FormButton
                theme={'formButtonMidBlue'}
                onClick={(): void => undefined}
                text={'Save'}
              />
            </div>
          </>
        )}
        {preview && (
          <>
            <ItemList type={type} />
            <div className={styles.actionButtons}>
              <FormButton
                theme={'formButtonDarkBlue'}
                onClick={(): void => setPreview(false)}
                text={'Edit'}
              />
              <FormButton
                theme={'formButtonMidBlue'}
                onClick={(): void => undefined}
                text={'Save'}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const getPageText = (
  type: ItemsIconType
): { banner: string; helpBannerTitle: string; helpBannerBody: string } => {
  switch (type) {
    case 'tick':
      return {
        banner: 'Request products',
        helpBannerTitle: 'Build your request products page',
        helpBannerBody:
          'Tell your visitors what to expect when they request products. Include your collection or delivery times to manage their expectations. Select which products you have in stock and include details, if you need them.',
      };
    case 'heart':
      return {
        banner: 'Donate products',
        helpBannerTitle: 'Build your donate products page',
        helpBannerBody:
          'Select the products your school needs so that charities and volunteer groups know what to donate',
      };
    case 'plus':
      return {
        banner: 'Extra stock to share with the community',
        helpBannerTitle: 'Build your extra stock page',
        helpBannerBody:
          'Select the products you have too much of so that charities and volunteer groups can help share it with people that need it.',
      };
    default:
      throw new Error(`Unknown type ${String(type)}`);
  }
};

export default SchoolEdit;
