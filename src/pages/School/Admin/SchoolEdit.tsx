/*  eslint-disable no-console */
import { FC, useEffect, useState } from 'react';
import styles from './SchoolEdit.module.scss';
import ItemListEdit from '@/components/ItemList/ItemListEdit';
import FormButton from '@/components/FormButton/FormButton';
import ItemList from '@/components/ItemList/ItemList';
import { ItemsIconType, SectionsIconType } from '@/components/ItemList/getIcons';
import Button from '@/components/Button/Button';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GetSchoolProfileQuery, UpdateSchoolProfileMutation } from '@/types/api';
import { updateSchoolProfile } from '@/graphql/mutations';
import { GraphQLQuery } from 'aws-amplify/api';
import { getSchoolProfile } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import { EditDescription } from './EditDescription/EditDescription';

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

const SchoolEdit: FC = () => {
  const [type, setType] = useState<ItemsIconType>('tick');
  const [preview, setPreview] = useState(false);
  const [items, setItems] = useState<Record<string, SectionsIconType>>({});
  const [editState, setEditState] = useState(false);
  const [editStateActionText, setEditStateActionText] = useState(false);
  const [whatToExpectTestBeforeEdit, setWhatToExpectTestBeforeEdit] = useState('');
  const [actionTextBeforeEdit, setActionTextBeforeEdit] = useState('');

  interface ContentType {
    items: string;
    banner: string;
    helpBannerTitle: string;
    helpBannerBody: string;
    whatToExpect: string;
    actionText: string;
  }

  const [content, setContent] = useState<ContentType>({
    items: '',
    banner: '',
    helpBannerBody: '',
    helpBannerTitle: '',
    actionText: '',
    whatToExpect: '',
  });

  // TODO need to make the query key unique for each school
  const { isLoading, data } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const data = await client.graphql<GraphQLQuery<GetSchoolProfileQuery>>({
        query: getSchoolProfile,
        variables: {
          name: 'Test School Profile 5',
        },
      });

      return data.data;
    },
  });

  const { refetch } = useQuery({
    queryKey: ['saveProfile'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<UpdateSchoolProfileMutation>>({
        query: updateSchoolProfile,
        variables: {
          key: getKeyFromType(type),
          name: 'Test School Profile 5',
          value: JSON.stringify({
            ...content,
            items: JSON.stringify(items),
          }),
        },
      });

      console.log(items);

      return result;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (data?.getSchoolProfile && getKeyFromType(type) in (data?.getSchoolProfile ?? {})) {
        const { donate, request, excess } = data.getSchoolProfile;

        switch (type) {
          case 'tick':
            setContent(JSON.parse(JSON.stringify(request)) as ContentType);
            break;
          case 'heart':
            setContent(JSON.parse(JSON.stringify(donate)) as ContentType);
            break;
          case 'plus':
            setContent(JSON.parse(JSON.stringify(excess)) as ContentType);
            break;
        }
      }
    }
  }, [isLoading, type, data?.getSchoolProfile]);

  useEffect(() => {
    console.log(content.items);
    content.items !== '' && setItems(JSON.parse(content.items) as Record<string, SectionsIconType>);
  }, [content, type]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <Button theme="darkBlue" onClick={() => setType('tick')} text="Request" />
      <Button theme="darkBlue" onClick={() => setType('heart')} text="Donate" />
      <Button theme="darkBlue" onClick={() => setType('plus')} text="Excess" />
      <div className={`${styles.banner} ${styles[type]}`}>
        <h2>{content.banner}</h2>
      </div>

      <div className={styles.card}>
        {!preview && (
          <>
            <div className={styles.helpBanner}>
              <h2>{content.helpBannerTitle}</h2>
              <p>{content.helpBannerBody}</p>
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
                    theme="formButtonGrey"
                  />
                </>
              ) : (
                <>
                  <EditDescription
                    value={content.whatToExpect}
                    setValue={(val) => {
                      setContent({ ...content, whatToExpect: val });
                    }}
                    handleSave={() => {
                      setEditState(false);
                      refetch().then(console.log).catch(console.error);
                    }}
                    handleCancel={() => {
                      setContent({ ...content, whatToExpect: whatToExpectTestBeforeEdit });
                      setEditState(false);
                    }}
                  />
                </>
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
                    refetch().then(console.log).catch(console.error);
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
              />
              <FormButton
                theme={'formButtonMidBlue'}
                onClick={(): void => {
                  refetch().then(console.log).catch(console.error);
                }}
                text={'Save'}
              />
            </div>
          </>
        )}
        {preview && (
          <>
            <ItemList type={type} items={items} />
            <div className={styles.actionButtons}>
              <FormButton
                theme={'formButtonDarkBlue'}
                onClick={(): void => setPreview(false)}
                text={'Edit'}
              />
              <FormButton
                theme={'formButtonMidBlue'}
                onClick={(): void => {
                  refetch().then(console.log).catch(console.error);
                }}
                text={'Save'}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SchoolEdit;
