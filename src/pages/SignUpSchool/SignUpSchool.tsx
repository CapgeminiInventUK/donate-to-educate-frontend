import { FC, useCallback, useEffect, useState } from 'react';
import styles from './SignUpSchool.module.scss';
import MultiStepForm from '@components/MultiStepForm/MultiStepForm';
import { FormDataItem, FormMeta, FormTemplate } from '@/types/data';
import getHappyPath from './happyPath';
import getCannotFindSchoolPath from './cannotFindSchoolPath';

const SignUpSchool: FC = () => {
  const [formData, setFormData] = useState<FormDataItem[]>([]);
  const [formTemplate, setFormTemplate] = useState<FormTemplate[]>([]);

  const onChange = useCallback(
    (value: string | number | boolean, formMeta: FormMeta | undefined): void => {
      const { page = 0, field = '', section } = formMeta ?? {};
      const removeOldValue = formData.filter(({ field: oldField }) => oldField !== field);
      setFormData([...removeOldValue, { field, value, section, page }]);
    },
    [formData]
  );

  const cannotFindSchool = useCallback((): void => {
    setFormTemplate(getCannotFindSchoolPath(onChange, cannotFindSchool));
  }, [onChange]);

  const setHappyPathTemplate = useCallback((): void => {
    setFormTemplate(getHappyPath(onChange, cannotFindSchool));
  }, [cannotFindSchool, onChange]);

  useEffect(() => {
    setHappyPathTemplate();
  }, [setHappyPathTemplate]);

  return (
    <div className={styles.container}>
      {formTemplate.length > 0 && <MultiStepForm formTemplate={formTemplate} formData={formData} />}
    </div>
  );
};

export default SignUpSchool;
