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
  removeUser,
} from '@/utils/account';
import { DeleteAccountType } from '@/types/data';
import { useNavigate } from 'react-router-dom';
import DeclineDeleteModal from '@/components/DeclineDeleteModal/DeclineDeleteModal';
import Paths from '@/config/paths';
import { useStore } from '@/stores/useStore';

const DangerZone: FC<SettingsDangerZoneProps> = ({ type, userData, numberOfUsers }) => {
  const state = useStore((state) => state);
  const navigate = useNavigate();
  const [modalProps, setModalProps] = useState<DeclineDeleteModalProps>();
  const [showModal, setShowModal] = useState(false);
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

  const logoutCallback = (): void => {
    void state.logout();
    navigate(Paths.HOME);
  };

  // TODO - Popup for type === 'localAuthority' scenario and for confirm delete in all scenarios
  // TODO - Log user out and redirect after deleting user/profile
  const onDelete = (key: string): void => {
    if (key === 'Your account') {
      setModalProps({
        showModal,
        setShowModal,
        onConfirm: () => {
          type !== 'localAuthority' && numberOfUsers < 2
            ? void removeProfile().then(logoutCallback)
            : void deleteUserRefetch().then(logoutCallback);
          void removeUser();
        },
        ...getDeleteAccountModalText(
          type,
          DeleteAccountType.SELF_USER,
          numberOfUsers,
          String(institutionName)
        ),
      });
      setShowModal(true);
      return;
    }
    if (type === 'localAuthority') {
      //popup instead of this alert
      alert('cannae do this rn');
      return;
    }
    if (numberOfUsers < 2) {
      setModalProps({
        showModal,
        setShowModal,
        onConfirm: () =>
          void removeProfile().then(() => {
            logoutCallback();
            void removeUser();
          }),
        ...getDeleteAccountModalText(
          type,
          DeleteAccountType.PROFILE,
          numberOfUsers,
          String(institutionName)
        ),
      });
      setShowModal(true);
    }
    if (numberOfUsers && numberOfUsers > 1) {
      // TODO - Popup for if more than 1 user and attempt to delete profile
    }
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
    </div>
  );
};

export default DangerZone;
