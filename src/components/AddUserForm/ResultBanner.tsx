import { FC } from 'react';
import styles from './AddUserForm.module.scss';
import Email from '@/assets/admin/Email';
import { AdminUserResultBannerProps } from '@/types/props';
import { AdminUserResultType } from '@/types/data';
import { capitaliseFirstLetter } from '@/utils/globals';
import BackLogo from '@/assets/admin/BackLogo';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import LogoWhite from '@/assets/logo/LogoWhite';

const ResultBanner: FC<AdminUserResultBannerProps> = ({
  type,
  name,
  linkText,
  logo = 'email',
  onLinkClick,
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.banner}>
      {logo === 'email' ? <Email className={styles.email} /> : <BackLogo />}
      <h2>{getHeaderText(type, name)}</h2>
      <p>{getSubtext(type)}</p>
      {linkText && (
        <>
          <div className={styles.logo}>
            <LogoWhite />
          </div>
          <Button
            theme="link"
            ariaLabel={`${linkText}-button`}
            className={styles.link}
            onClick={() => (onLinkClick ? onLinkClick() : navigate(-1))}
            text={linkText}
          />
        </>
      )}
    </div>
  );
};

const getHeaderText = (type: AdminUserResultType, name?: string): string => {
  switch (type) {
    case AdminUserResultType.LA_ACCOUNT_CREATED:
      return `You have created an account for ${capitaliseFirstLetter(String(name))} County Council.`;
    case AdminUserResultType.INSTITUTION_ACCOUNT_CREATED:
      return `You have created an account for ${name}`;
    case AdminUserResultType.PROFILE_DELETED:
      return `${name} has been deleted from Donate to Educate`;
    case AdminUserResultType.ACCOUNT_DELETED:
      return `Your account has been deleted from Donate to Educate`;
    case AdminUserResultType.PROFILE_AND_ACCOUNT_DELETED:
      return `Your profile and ${name} have been deleted from Donate to Educate`;
  }
};

const getSubtext = (type: AdminUserResultType): string => {
  switch (type) {
    case AdminUserResultType.LA_ACCOUNT_CREATED:
    case AdminUserResultType.INSTITUTION_ACCOUNT_CREATED:
      return 'The user has been emailed with instructions to set up their profile';
    case AdminUserResultType.PROFILE_DELETED:
      return 'Users associated with this profile have been emailed.';
    case AdminUserResultType.ACCOUNT_DELETED:
    case AdminUserResultType.PROFILE_AND_ACCOUNT_DELETED:
      return 'Thank you for having been a part of our mission to alleviate education poverty.';
  }
};

export default ResultBanner;
