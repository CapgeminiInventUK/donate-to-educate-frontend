import { FC, useEffect, useState } from 'react';
import styles from './CharityEdit.module.scss';
import ItemListEdit from '@/components/ItemList/ItemListEdit';
import FormButton from '@/components/FormButton/FormButton';
import ItemList from '@/components/ItemList/ItemList';
import { ItemsIconType, SectionsIconType } from '@/components/ItemList/getIcons';
// import { useQuery } from '@tanstack/react-query';
// import { client } from '@/graphqlClient';
// import { SchoolProfile, UpdateSchoolProfileMutation } from '@/types/api';
// import { updateSchoolProfile } from '@/graphql/mutations';
// import { GraphQLQuery } from 'aws-amplify/api';
// import { EditDescription } from './EditDescription/EditDescription';
import { ContentType } from '@/types/props';
import Paths from '@/config/paths';
import { Navigate, useLocation } from 'react-router-dom';
import BackButton from '@/components/BackButton/BackButton';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
// import useGetAuthToken from '@/hooks/useGetAuthToken';
import { CharityProfile } from '../../../../../donate-to-educate-backend/appsync';
import { EditDescription } from '@/components/EditDescription/EditDescription';

const getButtonTextFromType = (type: string): string => {
  switch (type) {
    case 'tick':
      return 'Request products';
    case 'heart':
      return 'Donate products';
    case 'plus':
      return 'Take extra stock';
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

// const getKeyFromType = (type: string): string => {
//   switch (type) {
//     case 'tick':
//       return 'request';
//     case 'heart':
//       return 'donate';
//     case 'plus':
//       return 'excess';
//     default:
//       throw new Error(`Unknown type ${type}`);
//   }
// };

const getPageContent = (
  type: string
): {
  banner: string;
  helpBannerTitle: string;
  helpBannerBody: JSX.Element;
  howItWorks: string;
  actionText: string;
} => {
  switch (type) {
    case 'tick':
      return {
        banner: 'Let visitors request products from you',
        helpBannerTitle: 'Build your request products page',
        helpBannerBody: (
          <>
            <p>
              Tell your visitors what to expect when they request products. Include your collection
              or delivery times to manage their expectations. Select which products you have in
              stock and include details, if you need them.
            </p>
            <p>
              Donate to Educate will forward an email to you from visitors who want to request
              products.
            </p>
          </>
        ),
        actionText:
          "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
        howItWorks:
          'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
      };
    case 'heart':
      return {
        banner: 'Let visitors donate products to you',
        helpBannerTitle: 'Build your donate products page',
        helpBannerBody: (
          <>
            <p>
              Select the products your school needs so that the general public, other schools,
              charities and volunteer groups know what to donate.
            </p>
            <p>
              Donate to Educate will forward an email to you from visitors who want to donate
              products.
            </p>
          </>
        ),
        actionText:
          "Once we have your message about the products you can donate, we'll contact you to arrange the next steps as soon as we can.",
        howItWorks:
          "View the products we need. When you select 'donate', you can tell us how you can help.",
      };
    case 'plus':
      return {
        banner: 'Build your extra stock page',
        helpBannerTitle: 'Build your request products page',
        helpBannerBody: (
          <>
            <p>
              Select the products you have too much of so that the general public, other schools,
              charities and volunteer groups can help share it with people that need it.
            </p>
            <p>
              Donate to Educate will forward an email to you from visitors who want to help take
              some of your extra stock.
            </p>
          </>
        ),
        actionText:
          "Once we know what extra stock you can take from us, we'll contact you to arrange the next steps as soon as we can.",
        howItWorks:
          'View the products we have too much of, take it from us and share it with people who need it.',
      };
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

const CharityEdit: FC = () => {
  const location = useLocation();
  //   const navigate = useNavigate();
  const { type, donate, excess, request } =
    (location?.state as {
      type: ItemsIconType;
      donate: CharityProfile;
      excess: CharityProfile;
      request: CharityProfile;
    }) ?? {};

  const [preview, setPreview] = useState(false);
  const [items, setItems] = useState<Record<string, SectionsIconType>>({});
  const [editState, setEditState] = useState(false);
  const [editStateActionText, setEditStateActionText] = useState(false);
  const [whatToExpectTestBeforeEdit, setWhatToExpectTestBeforeEdit] = useState('');
  const [actionTextBeforeEdit, setActionTextBeforeEdit] = useState('');
  //   const authToken = useGetAuthToken();

  const { banner, helpBannerTitle, helpBannerBody, howItWorks, actionText } = getPageContent(type);
  const [content, setContent] = useState<ContentType>({
    items: '',
    actionText,
    whatToExpect: howItWorks,
  });

  //   const { refetch } = useQuery({
  //     queryKey: ['saveProfile'],
  //     enabled: false,
  //     queryFn: async () => {
  //       const result = await client.graphql<GraphQLQuery<UpdateSchoolProfileMutation>>({
  //         authMode: 'userPool',
  //         authToken,
  //         query: updateSchoolProfile,
  //         variables: {
  //           key: getKeyFromType(type),
  //           value: JSON.stringify({
  //             ...content,
  //             items: JSON.stringify(items),
  //           }),
  //         },
  //       });

  //       return result;
  //     },
  //   });

  useEffect(() => {
    switch (type) {
      case 'tick':
        if (request) {
          setContent(JSON.parse(JSON.stringify(request)) as ContentType);
        }
        break;
      case 'heart':
        if (donate) {
          setContent(JSON.parse(JSON.stringify(donate)) as ContentType);
        }
        break;
      case 'plus':
        if (excess) {
          setContent(JSON.parse(JSON.stringify(excess)) as ContentType);
        }
        break;
    }
  }, [type, donate, excess, request]);

  useEffect(() => {
    content.items !== '' && setItems(JSON.parse(content.items) as Record<string, SectionsIconType>);
  }, [content, type]);

  if (!(location.state && 'type' in location.state)) {
    return <Navigate to={Paths.CHARITIES_CREATE_EDIT_PROFILE} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
        <LogoutButton />
      </div>
      <div className={`${styles.banner} ${styles[type]}`}>
        <h2>{banner}</h2>
      </div>

      <div className={styles.card}>
        {!preview && (
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
                    setEditState(false);
                    // refetch().then(console.log).catch(console.error);
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
                    setEditStateActionText(false);
                    // refetch().then(console.log).catch(console.error);
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
                theme={'formButtonGrey'}
                onClick={(): void => setPreview(true)}
                text={'Preview'}
                ariaLabel="preview"
              />
              <FormButton
                theme={'formButtonMidBlue'}
                onClick={(): void => {
                  //   refetch()
                  //     .then(() => navigate(Paths.CHARITIES_CREATE_EDIT_PROFILE))
                  //     .catch(console.error);
                }}
                text={'Save'}
                ariaLabel="save"
              />
            </div>
          </>
        )}
        {preview && (
          <>
            <h2>What to expect</h2>
            <p>{content.whatToExpect}</p>
            <ItemList type={type} items={items} />
            {/* // TODO refactor this and the public one together */}
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
                  //   refetch()
                  //     .then(() => navigate(Paths.CHARITIES_CREATE_EDIT_PROFILE))
                  //     .catch(console.error);
                }}
                text={'Save'}
                ariaLabel="save"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CharityEdit;
