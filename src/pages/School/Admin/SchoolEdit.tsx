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
import TextArea from '@/components/TextArea/TextArea';

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
  const { banner, helpBannerTitle, helpBannerBody, whatToExpect, actionText } = getPageText(type);
  const [whatToExpectText, setWhatToExpectText] = useState(whatToExpect);
  const [whatToExpectTextEdited, setWhatToExpectTextEdited] = useState(whatToExpect);
  const [actionDescription, setActionDescription] = useState(actionText);
  const [items, setItems] = useState<Record<string, SectionsIconType>>({});
  const [editState, setEditState] = useState(false);

  interface ContentType {
    items: Record<string, SectionsIconType>;
    banner: string;
    helpBannerTitle: string;
    helpBannerBody: string;
    whatToExpect: string;
    actionText: string;
  }

  const [content, setContent] = useState<ContentType>({
    items: {},
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
      const { data } = await client.graphql<GraphQLQuery<GetSchoolProfileQuery>>({
        query: getSchoolProfile,
        variables: {
          name: 'Test School Profile',
        },
      });

      return data;
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
          name: 'Test School Profile',
          //value: JSON.stringify(items),
          value: JSON.stringify({
            items: items,
            banner: banner,
            helpBannerTitle: helpBannerTitle,
            helpBannerBody: helpBannerBody,
            whatToExpect: whatToExpectText,
            actionText: actionText,
          }),
        },
      });

      return result;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (data?.getSchoolProfile && getKeyFromType(type) in (data?.getSchoolProfile ?? {})) {
        const { donate, request, excess } = data.getSchoolProfile;
        switch (type) {
          case 'tick':
            // eslint-disable-next-line
            setContent(JSON.parse(JSON.stringify(request)));
            break;
          case 'heart':
            setItems(donate ? (JSON.parse(donate) as Record<string, SectionsIconType>) : {});
            break;
          case 'plus':
            setItems(excess ? (JSON.parse(excess) as Record<string, SectionsIconType>) : {});
            break;
        }
      }
    }
  }, [isLoading, type, data?.getSchoolProfile]);

  useEffect(() => {
    setWhatToExpectText(whatToExpect);
  }, [whatToExpect]);

  useEffect(() => {
    setActionDescription(actionText);
  }, [actionText]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(items);
  }, [items]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <Button theme="darkBlue" onClick={() => setType('tick')} text="Request" />
      <Button theme="darkBlue" onClick={() => setType('heart')} text="Donate" />
      <Button theme="darkBlue" onClick={() => setType('plus')} text="Excess" />
      <div className={`${styles.banner} ${styles[type]}`}>
        <h2>{banner}</h2>
      </div>
      <div className={styles.card}>
        {!preview && (
          <>
            <div className={styles.helpBanner}>
              <h2>{helpBannerTitle}</h2>
              <p>{helpBannerBody}</p>
            </div>
            <div className={styles.whatToExpect}>
              <h2>What to expect</h2>
              {!editState ? (
                <>
                  <p>{whatToExpectText}</p>
                  <FormButton
                    text={'Edit'}
                    onClick={(): void => {
                      setEditState(true);
                    }}
                    theme="formButtonGrey"
                  />
                </>
              ) : (
                <>
                  <TextArea
                    characterLimit={1000}
                    value={whatToExpectTextEdited}
                    onChange={(val) => {
                      setWhatToExpectTextEdited(val);
                    }}
                  />
                  <div className={styles.actionContainer}>
                    <FormButton
                      text={'Save'}
                      onClick={(): void => {
                        // eslint-disable-next-line no-console
                        console.log('edit button pressed');
                        setEditState(false);
                        setWhatToExpectText(whatToExpectTextEdited);
                        // refetch()
                        //   // eslint-disable-next-line no-console
                        //   .then(console.log)
                        //   // eslint-disable-next-line no-console
                        //   .catch(console.error);
                      }}
                      theme="formButtonGreen"
                    />
                    <Button
                      theme="link"
                      className={styles.cancelButton}
                      text={'Cancel'}
                      onClick={function (): void {
                        setEditState(false);
                        setWhatToExpectTextEdited(whatToExpectText);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
            <ItemListEdit setItems={setItems} items={content.items} />
            <div className={styles.helpContact}>
              <p>{actionDescription}</p>
              <FormButton text={'Edit'} onClick={(): void => undefined} theme="formButtonGrey" />
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
                  refetch()
                    // eslint-disable-next-line no-console
                    .then(console.log)
                    // eslint-disable-next-line no-console
                    .catch(console.error);
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
                  refetch()
                    // eslint-disable-next-line no-console
                    .then(console.log)
                    // eslint-disable-next-line no-console
                    .catch(console.error);
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

const getPageText = (
  type: ItemsIconType
): {
  banner: string;
  helpBannerTitle: string;
  helpBannerBody: string;
  whatToExpect: string;
  actionText: string;
} => {
  switch (type) {
    case 'tick':
      return {
        banner: 'Request products',
        helpBannerTitle: 'Build your request products page',
        helpBannerBody:
          'Tell your visitors what to expect when they request products. Include your collection or delivery times to manage their expectations. Select which products you have in stock and include details, if you need them.',
        whatToExpect:
          'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
        actionText:
          "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
      };
    case 'heart':
      return {
        banner: 'Donate products',
        helpBannerTitle: 'Build your donate products page',
        helpBannerBody:
          'Select the products your school needs so that charities and volunteer groups know what to donate',
        whatToExpect:
          "View the products we need. When you select 'donate', you can tell us how you can help.",
        actionText:
          "Once we have your message about the products you can donate, we'll contact you to arrange the next steps as soon as we can.",
      };
    case 'plus':
      return {
        banner: 'Extra stock to share with the community',
        helpBannerTitle: 'Build your extra stock page',
        helpBannerBody:
          'Select the products you have too much of so that charities and volunteer groups can help share it with people that need it.',
        whatToExpect:
          'View the products we have too much of, take it from us and share it with people who need it.',
        actionText:
          "Once we know what extra stock you can take from us, we'll contact you to arrange the next steps as soon as we can.",
      };
    default:
      throw new Error(`Unknown type ${String(type)}`);
  }
};

export default SchoolEdit;
