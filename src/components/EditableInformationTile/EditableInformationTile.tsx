import { FC, useState } from 'react';
import styles from './EditableInformationTile.module.scss';
import Button from '../Button/Button';
import { EditableInformationTileProps } from '@/types/props';
import HorizontalLine from '@/assets/school/HorizontalLine';
import PlusIcon from '@/assets/school/PlusIcon';
import TextArea from '../TextArea/TextArea';
import CancelButton from '../CancelButton/CancelButton';

const EditableInformationTile: FC<EditableInformationTileProps> = ({
  heading,
  subtext,
  onClick,
  saveOnClick,
  isEditing = false,
}: EditableInformationTileProps) => {
  const [text, setText] = useState(subtext);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>{heading}</h2>
          <HorizontalLine className={styles.horizontalLine} />
        </div>
        {subtext && !isEditing && <p className={styles.subtext}>{isEditing ? text : subtext}</p>}
        {isEditing ? (
          <>
            <TextArea characterLimit={1000} onChange={setText} value={text} />
            <div className={styles.footerButtons}>
              <Button
                theme="darkBlue"
                className={styles.saveButton}
                onClick={saveOnClick}
                text="Save"
              />
              <CancelButton onClick={onClick} theme={'blue'} />
            </div>
          </>
        ) : (
          <Button
            theme="darkBlue"
            className={styles.addSectionButton}
            onClick={onClick}
            text={
              <div className={styles.addSectionDiv}>
                <span className={styles.addSectionButtonText}>Add section</span>
                <PlusIcon />
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default EditableInformationTile;
