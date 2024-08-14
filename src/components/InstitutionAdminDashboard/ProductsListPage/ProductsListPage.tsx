import { FC, useEffect, useState } from 'react';
import styles from './ProductsListPage.module.scss';
import { ProductsListPageProps } from '@/types/props';
import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import { getPageContent } from './utils';
import FormButton from '@/components/FormButton/FormButton';
import { EditDescription } from '@/components/EditDescription/EditDescription';
import { openNotification } from '@/utils/formComponents';
import ItemListEdit from '@/components/ItemList/ItemListEdit';
import RequestDonateNextSteps from './RequestDonateNextSteps';

const ProductsListPage: FC<ProductsListPageProps> = ({
  institutionType,
  path,
  items,
  setItems,
  type,
  content,
  setContent,
  refetch,
}) => {
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [editState, setEditState] = useState(false);
  const [whatToExpectTestBeforeEdit, setWhatToExpectTestBeforeEdit] = useState('');

  const { banner, helpBannerTitle, helpBannerBody } = getPageContent(type, institutionType);

  useEffect(() => {
    setSaveDisabled(false);
  }, [items]);

  useEffect(() => {
    setTimeout(() => {
      setSaveDisabled(true);
    }, 1);
  }, []);

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={`${styles.banner} ${styles[type]}`}>
        <h1>{banner}</h1>
      </div>

      <Card className={styles.editCard}>
        <div className={styles.helpBanner}>
          <h2>{helpBannerTitle}</h2>
          {helpBannerBody}
        </div>
        <div className={styles.whatToExpect}>
          <h2>What to expect</h2>
          {!editState ? (
            <>
              <p>{content.whatToExpect}</p>
              <FormButton
                text={'Edit'}
                onClick={(): void => {
                  setWhatToExpectTestBeforeEdit(content.whatToExpect);
                  setEditState(true);
                }}
                ariaLabel="edit"
                theme="formButtonGrey"
              />
            </>
          ) : (
            <EditDescription
              value={content.whatToExpect}
              setValue={(val) => {
                setContent({ ...content, whatToExpect: val });
              }}
              handleSave={() => {
                openNotification();
                setEditState(false);
                void refetch();
              }}
              handleCancel={() => {
                setContent({ ...content, whatToExpect: whatToExpectTestBeforeEdit });
                setEditState(false);
              }}
            />
          )}
        </div>
        <ItemListEdit setItems={setItems} items={items} />
        <RequestDonateNextSteps
          institutionType={institutionType}
          content={content}
          setContent={setContent}
          saveDisabled={saveDisabled}
          setSaveDisabled={setSaveDisabled}
          path={path}
          refetch={refetch}
        />
      </Card>
    </div>
  );
};

export default ProductsListPage;
