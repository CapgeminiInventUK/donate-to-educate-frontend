import { FC, useEffect, useState } from 'react';
import styles from './InstitutionEdit.module.scss';
import FormButton from '@/components/FormButton/FormButton';
import ItemList from '@/components/ItemList/ItemList';
import { InstitutionEditProps } from '@/types/props';
import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import { getButtonTextFromType, getPageContent } from './utils';
import { useNavigate } from 'react-router-dom';
import InstitutionEditView from './InstitutionEditView';

const InstitutionEdit: FC<InstitutionEditProps> = ({
  institutionType,
  path,
  items,
  setItems,
  type,
  content,
  setContent,
  refetch,
}) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);

  const { banner } = getPageContent(type, institutionType);

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
        {!preview && (
          <InstitutionEditView
            type={type}
            institutionType={institutionType}
            content={content}
            setContent={setContent}
            items={items}
            setItems={setItems}
            saveDisabled={saveDisabled}
            setSaveDisabled={setSaveDisabled}
            path={path}
            refetch={refetch}
          />
        )}
        {preview && (
          <div className={styles.preview}>
            <h2>What to expect</h2>
            <p>{content.whatToExpect}</p>
            <ItemList type={type} items={items} />
            <div className={styles.helpContact}>
              <>
                <p>{content.actionText}</p>
                <FormButton
                  theme="formButtonGreenDisabled"
                  text={getButtonTextFromType(type)}
                  fullWidth
                  ariaLabel="contact"
                  disabled
                />
              </>
            </div>
            <div className={styles.actionButtons}>
              <FormButton
                theme={'formButtonDarkBlue'}
                onClick={(): void => setPreview(false)}
                text={'Edit'}
                ariaLabel="edit"
              />
              <FormButton
                theme={'formButtonMidBlue'}
                onClick={(): void => {
                  void refetch().then(() => navigate(path));
                }}
                text={'Save'}
                ariaLabel="save"
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InstitutionEdit;
