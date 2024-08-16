import { FC, useState } from 'react';
import styles from './ProductsListPage.module.scss';
import { RequestDonateNextStepsProps } from '@/types/props';
import FormButton from '@/components/FormButton/FormButton';
import { EditDescription } from '@/components/EditDescription/EditDescription';
import { openNotification } from '@/utils/formComponents';
import { Link } from 'react-router-dom';

const RequestDonateNextSteps: FC<RequestDonateNextStepsProps> = ({
  institutionType,
  content,
  setContent,
  saveDisabled,
  setSaveDisabled,
  path,
  refetch,
}) => {
  const [actionTextBeforeEdit, setActionTextBeforeEdit] = useState('');
  const [editStateActionText, setEditStateActionText] = useState(false);

  return (
    <>
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
        <Link to={path} className={styles.previewLink}>
          Return to {institutionType} profile
        </Link>
      </div>
    </>
  );
};
export default RequestDonateNextSteps;
