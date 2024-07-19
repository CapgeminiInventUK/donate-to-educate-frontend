import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import FormButton from '@/components/FormButton/FormButton';
import ItemList from '@/components/ItemList/ItemList';
import ItemListEdit from '@/components/ItemList/ItemListEdit';
import Paths from '@/config/paths';
import { updateCharityProfile } from '@/graphql/mutations';
import { client } from '@/graphqlClient';
import useAuthToken from '@/hooks/useAuthToken';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { ProfileItems, UpdateCharityProfileMutation } from '@/types/api';
import type { ItemsIconType } from '@/types/data';
import type { ContentType } from '@/types/props';
import { openNotification } from '@/utils/formComponents';
import { checkIfInTestEnvForAuthMode } from '@/utils/globals';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditDescription } from '../../../components/EditDescription/EditDescription';
import styles from './CharityEdit.module.scss';

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

const getKeyFromType = (type: string): string => {
  switch (type) {
    case 'tick':
      return 'request';
    case 'heart':
      return 'donate';
    case 'plus':
      return 'excess';
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

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
        banner: 'Product requests',
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
        banner: 'Accept donations',
        helpBannerTitle: 'Build your donate products page',
        helpBannerBody: (
          <>
            <p>
              Select the products your charity needs so that the general public, other charities,
              schools and volunteer groups know what to donate.
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
          "View the products we need. When you select 'donate products', you can tell us how you can help.",
      };
    case 'plus':
      return {
        banner: 'Share extra stock',
        helpBannerTitle: 'Build your request products page',
        helpBannerBody: (
          <>
            <p>
              Select the products you have too much of so that the general public, other charities,
              schools and volunteer groups can help share it with people that need it.
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
  const navigate = useNavigate();
  const { state } = useLocationStateOrRedirect<{
    type: ItemsIconType;
    profile: ProfileItems;
  }>(Paths.CHARITIES_CREATE_EDIT_PROFILE);
  const { type, profile } = state;

  const [preview, setPreview] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [items, setItems] = useState<Record<number, string[]>>(
    JSON.parse(profile?.items ?? '{}') as Record<number, string[]>
  );
  const [editState, setEditState] = useState(false);
  const [editStateActionText, setEditStateActionText] = useState(false);
  const [whatToExpectTestBeforeEdit, setWhatToExpectTestBeforeEdit] = useState('');
  const [actionTextBeforeEdit, setActionTextBeforeEdit] = useState('');
  const { token: authToken } = useAuthToken();

  const { banner, helpBannerTitle, helpBannerBody, howItWorks, actionText } = getPageContent(type);
  const [content, setContent] = useState<ContentType>({
    actionText,
    whatToExpect: howItWorks,
  });

  useEffect(() => {
    setSaveDisabled(false);
  }, []);

  // TODO refactor this and the schoolEdit in a later iteration (this use exists to setSaveDisabled at the end of the process queue, once items have all been set)
  useEffect(() => {
    setTimeout(() => {
      setSaveDisabled(true);
    }, 1);
  }, []);

  const { refetch, isError } = useQuery({
    queryKey: [`saveProfileCharity-${type}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<UpdateCharityProfileMutation>>({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: updateCharityProfile,
        variables: {
          key: getKeyFromType(type),
          value: JSON.stringify({
            ...content,
            items: JSON.stringify(items),
            productTypes: Object.keys(items),
          }),
        },
      });

      return result;
    },
  });

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={`${styles.banner} ${styles[type]}`}>
        <h1>{banner}</h1>
      </div>

      <Card className={styles.editCard}>
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
              <a
                onClick={() => navigate(Paths.CHARITIES_CREATE_EDIT_PROFILE)}
                className={styles.previewLink}
              >
                Return to charity profile
              </a>
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
                  void refetch().then(() => navigate(Paths.CHARITIES_CREATE_EDIT_PROFILE));
                }}
                text={'Save'}
                ariaLabel="save"
              />
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default CharityEdit;
