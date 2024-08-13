import { FC, useState } from 'react';
import styles from './InstitutionEdit.module.scss';
import { InstitutionEditViewProps } from '@/types/props';
import { getPageContent } from './utils';
import FormButton from '@/components/FormButton/FormButton';
import { EditDescription } from '@/components/EditDescription/EditDescription';
import { openNotification } from '@/utils/formComponents';
import ItemListEdit from '@/components/ItemList/ItemListEdit';
import { useNavigate } from 'react-router-dom';

const InstitutionEditView: FC<InstitutionEditViewProps> = ({
  type,
  institutionType,
  content,
  setContent,
  items,
  setItems,
  saveDisabled,
  setSaveDisabled,
  path,
  refetch,
}) => {
  const navigate = useNavigate();
  const [editState, setEditState] = useState(false);
  const [editStateActionText, setEditStateActionText] = useState(false);
  const [whatToExpectTestBeforeEdit, setWhatToExpectTestBeforeEdit] = useState('');
  const [actionTextBeforeEdit, setActionTextBeforeEdit] = useState('');

  const { helpBannerTitle, helpBannerBody } = getPageContent(type, institutionType);
  return (
    <>
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

      <div className={styles.helpContact}>
        <h2>Next steps</h2>
        {!editStateActionText ? (
          <>
            <p>{content.actionText}</p>
            <FormButton
              text={'Edit'}
              onClick={(): void => {
                setActionTextBeforeEdit(content.actionText);
                setEditStateActionText(true);
              }}
              theme="formButtonGrey"
              ariaLabel="edit"
            />
          </>
        ) : (
          <EditDescription
            value={content.actionText}
            setValue={(val) => {
              setContent({ ...content, actionText: val });
            }}
            handleSave={() => {
              openNotification();
              setEditStateActionText(false);
              void refetch();
            }}
            handleCancel={() => {
              setContent({ ...content, actionText: actionTextBeforeEdit });
              setEditStateActionText(false);
            }}
          />
        )}
      </div>
      <div className={styles.actionButtons}>
        <FormButton
          theme={saveDisabled ? 'formButtonDisabled' : 'formButtonGreen'}
          onClick={(): void => {
            void refetch().then(() => {
              setSaveDisabled(true);
              openNotification();
            });
          }}
          text={'Save'}
          ariaLabel="save"
          fullWidth={true}
          disabled={saveDisabled}
        />
        <a onClick={() => navigate(path)} className={styles.previewLink}>
          Return to {institutionType} profile
        </a>
      </div>
    </>
  );
};
export default InstitutionEditView;
