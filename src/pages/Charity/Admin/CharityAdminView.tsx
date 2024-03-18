import { FC, useEffect, useState } from 'react';
import styles from './CharityAdminView.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useLocation, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import Heart from '@/assets/yourLocalArea/Heart';
import Donate from '@/assets/yourLocalArea/Donate';
import Image from '@/components/Image/Image';
import boxImg from '@/assets/admin/box.png';
import heartImg from '@/assets/yourLocalArea/heart.png';
import donateImg from '@/assets/yourLocalArea/donate.png';
import FormButton from '@/components/FormButton/FormButton';
import PackagePlusIcon from '@/assets/admin/PackagePlusIcon';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import Hat from '@/assets/yourLocalArea/Hat';
import hatImg from '@/assets/yourLocalArea/hat.png';
import EditIcon from '@/assets/school/EditIcon';
import TextInput from '@/components/TextInput/TextInput';

const CharityView: FC = () => {
  const [edit, setEdit] = useState(false);
  const [postcode, setPostcode] = useState<string>();
  const [charityName, setCharityName] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation() as { state: { name: string; postcode: string } };

  useEffect(() => {
    if (location.state && 'name' in location.state) {
      setCharityName(String(location.state.name));
    } else {
      navigate(Paths.CHARITIES_CREATE_EDIT_PROFILE);
    }
  }, [location.state, navigate]);

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <InstitutionBanner type={'charity'} name={charityName} />

      <div className={styles.subContainer}>
        <div className={styles.profilebanner}>
          <h2>Your charity profile is active</h2>
          <p>View, edit and update your public facing profile.</p>
          <FormButton
            theme="formButtonGreen"
            text={'View and edit profile'}
            ariaLabel="view and edit profile"
            onClick={() => navigate(Paths.SCHOOLS_CREATE_EDIT_PROFILE)}
          />
        </div>
        <div>
          <h2>Your postcode</h2>
          <p>
            We will not display this specific postcode on your profile. This is to help Donate to
            Educate make you findable for local families, schools and charities. You can publicly
            display your address on your profile.
          </p>

          {!edit ? (
            <>
              <>{postcode}</>
              <FormButton
                text={
                  <div className={styles.editDiv}>
                    <EditIcon />
                    <span className={styles.editButtonText}>Edit</span>
                  </div>
                }
                theme="formButtonGrey"
                onClick={() => setEdit(true)}
                ariaLabel="edit"
              />
            </>
          ) : (
            <>
              <TextInput
                ariaLabel="postcode"
                value={postcode}
                onChange={(postcode) => setPostcode(postcode)}
              />
              <FormButton
                text="Save"
                theme="formButtonGreen"
                onClick={() => {
                  setEdit(false);

                  // refetch().catch(console.error);
                }}
                ariaLabel="save"
              />
            </>
          )}
        </div>
        {postcode && !edit && (
          <div className={styles.localAreaContainer}>
            <h2>Your local area</h2>
            {tiles.map(({ icon, title, body, image, colour, onClickLink }) => {
              return (
                <div
                  key={title}
                  className={`${styles.tile} ${styles[colour]}`}
                  onClick={() =>
                    navigate(onClickLink, { state: { postcode: location.state.postcode } })
                  }
                >
                  {icon}
                  <div className={styles.content}>
                    <h2 className={styles.header}>{title}</h2>
                    <div>{body}</div>
                  </div>
                  {image}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const tiles = [
  {
    icon: <Hat />,
    title: "Find your child's school",
    body: 'Request or donate products',
    image: <Image alt="hat" image={hatImg} />,
    colour: 'darkBlue',
    onClickLink: Paths.LOCAL_SCHOOLS,
  },
  {
    icon: <Heart />,
    title: 'Find nearby charities',
    body: 'Find out what they stock or donate products',
    image: <Image alt="heart" image={heartImg} />,
    colour: 'midBlue',
    onClickLink: Paths.LOCAL_CHARITIES,
  },
  {
    icon: <Donate />,
    title: 'Donate products',
    body: 'Support schools and charities in your area',
    image: <Image alt="donate" image={donateImg} />,
    colour: 'lightBlue',
    onClickLink: Paths.LOCAL_DONATE,
  },
  {
    icon: <PackagePlusIcon />,
    title: 'Help take extra stock',
    body: 'Sometimes schools and charities might have too much stock that urgently needs to find a new home. Help take it off their hands.',
    image: <Image alt="package" image={boxImg} />,
    colour: 'veryDarkBlue',
    onClickLink: Paths.LOCAL_SCHOOLS,
  },
];

export default CharityView;
