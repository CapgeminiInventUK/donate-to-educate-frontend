import { FC, useState } from 'react';
import styles from './Settings.module.scss';
import Caution from '@/assets/icons/Caution';
import InfoTable from '@/components/InfoTable/InfoTable';
import { checkIfInTestEnvForAuthMode, replaceSpacesWithHyphens } from '@/utils/globals';
import { DeclineDeleteModalProps, SettingsDangerZoneProps } from '@/types/props';
import useAuthToken from '@/hooks/useAuthToken';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { deleteUserProfile } from '@/graphql/mutations';
import {
  DeleteCharityProfileMutation,
  DeleteSchoolProfileMutation,
  DeleteUserProfileMutation,
} from '@/types/api';
import {
  getDeleteAccountModalText,
  getDeleteProfileQueryFromType,
  getDeleteTableData,
  getDeniedModalContent,
} from '@/utils/account';
import { AdminUserResultType, DeleteAccountType, DeniedModalContent } from '@/types/data';
import DeclineDeleteModal from '@/components/DeclineDeleteModal/DeclineDeleteModal';
import DeniedModal from '@/components/DeniedModal/DeniedModal';

const DangerZone: FC<SettingsDangerZoneProps> = ({
  type,
  userData,
  allUsers,
  setAdminUserResultType,
}) => {
  const [modalProps, setModalProps] = useState<DeclineDeleteModalProps>();
  const [showModal, setShowModal] = useState(false);
  const [showDeniedModal, setShowDeniedModal] = useState(false);
  const [deniedModalContent, setDeniedModalContent] = useState<DeniedModalContent>();
  const { institutionName, id, email, name } = userData;

  const deleteTableData = getDeleteTableData(type, institutionName, email);

  const { token: authToken } = useAuthToken();
  const { refetch: deleteUserRefetch } = useQuery({
    queryKey: [`delete-user-${type}-${replaceSpacesWithHyphens(name)}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<DeleteUserProfileMutation>>({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: deleteUserProfile,
        variables: {
          userType: type,
          name: institutionName,
          id,
          email,
        },
      });
      return result;
    },
  });

  const { refetch: removeProfile } = useQuery({
    queryKey: ['removeSchool'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<
        GraphQLQuery<DeleteSchoolProfileMutation | DeleteCharityProfileMutation>
      >({
        query: getDeleteProfileQueryFromType(type),
        variables: {
          name: institutionName,
          id,
        },
      });
      return result;
    },
  });

  const onConfirm = async (key: string): Promise<void> => {
    key === 'Your account' && (type === 'localAuthority' || allUsers.length > 1)
      ? await deleteUserRefetch()
      : await removeProfile();
  };

  const getDeleteAccountType = (key: string): DeleteAccountType =>
    key === 'Your account' ? DeleteAccountType.SELF_USER : DeleteAccountType.PROFILE;

  const onDelete = (key: string): void => {
    if (key === 'Your account' || (allUsers.length < 2 && type !== 'localAuthority')) {
      setModalProps({
        showModal,
        setShowModal,
        onConfirm: () =>
          void onConfirm(key).then(() =>
            setAdminUserResultType(
              allUsers.length < 2 && type !== 'localAuthority'
                ? AdminUserResultType.PROFILE_AND_ACCOUNT_DELETED
                : AdminUserResultType.ACCOUNT_DELETED
            )
          ),
        ...getDeleteAccountModalText(
          type,
          getDeleteAccountType(key),
          allUsers.length,
          String(institutionName)
        ),
      });
      setShowModal(true);
      return;
    }
    setDeniedModalContent(getDeniedModalContent(allUsers, userData, type));
    setShowDeniedModal(true);
  };

  return (
    <div className={styles.deleteSection}>
      <h2>Delete</h2>
      <InfoTable
        originalTableValues={deleteTableData}
        editableKeys={[]}
        isDelete={true}
        onDelete={onDelete}
        title="Danger zone"
        icon={<Caution />}
        className={styles.deleteTable}
        rowClassName={styles.deleteTableRow}
      />
      {modalProps && (
        <DeclineDeleteModal {...modalProps} setShowModal={setShowModal} showModal={showModal} />
      )}
      {deniedModalContent && (
        <DeniedModal
          showModal={showDeniedModal}
          setShowModal={setShowDeniedModal}
          {...deniedModalContent}
        />
      )}
    </div>
  );
};

export default DangerZone;
