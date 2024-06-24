import { FC } from 'react';
import styles from './EditableInformationTile.module.scss';
import Button from '../Button/Button';
import { EditableInformationTileProps } from '@/types/props';
import HorizontalLine from '@/assets/school/HorizontalLine';
import TextArea from '../TextArea/TextArea';
import CancelButton from '../CancelButton/CancelButton';
import FormButton from '../FormButton/FormButton';

const EditableInformationTile: FC<EditableInformationTileProps> = ({
  heading,
  onCancel,
  editContent,
  saveOnClick,
  isEditing = false,
  text,
  setText,
}: EditableInformationTileProps) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>{heading}</h2>
          <HorizontalLine className={styles.horizontalLine} />
        </div>
        {isEditing ? (
          <>
            <TextArea characterLimit={1000} onChange={setText} value={text} ariaLabel="edit" />
            <div className={styles.footerButtons}>
              <Button
                theme="darkBlue"
                className={styles.saveButton}
                onClick={saveOnClick}
                text="Save"
                ariaLabel="save"
              />
              <CancelButton onClick={onCancel} theme={'blue'} />
            </div>
          </>
        ) : (
          <>
            {text}
            <FormButton
              onClick={editContent}
              theme={'formButtonGrey'}
              text="Edit"
              ariaLabel={'edit'}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EditableInformationTile;
