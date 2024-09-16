import { FC } from 'react';
import ItemSelection from '@/components/ItemSelection/ItemSelection';
import { ProfileItems } from '@/types/api';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Paths from '@/config/paths';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { InstitutionType } from '@/types/data';
import { disabledCategories } from '@/components/ItemList/getFullItemList';

const SchoolEdit: FC = () => {
  const { state } = useLocationStateOrRedirect<{
    profile: ProfileItems;
    name: string;
    id: string;
    previewMode?: boolean;
    postcode?: string;
  }>(Paths.SCHOOLS_DASHBOARD);

  const { profile, id, name, previewMode, postcode } = state ?? {};
  const { items, actionText, whatToExpect } = profile ?? {};

  const parsedItems = JSON.parse(items ?? '{}') as Record<number, string[]>;

  const getItems = (): Record<number, string[]> => {
    for (const disabledCategory of disabledCategories) {
      delete parsedItems[disabledCategory];
    }

    return parsedItems;
  };

  return (
    <ItemSelection
      schoolOrCharity={InstitutionType.SCHOOL}
      items={getItems()}
      actionText={checkForStringAndReturnEmptyIfFalsy(actionText)}
      whatToExpect={checkForStringAndReturnEmptyIfFalsy(whatToExpect)}
      id={checkForStringAndReturnEmptyIfFalsy(id)}
      name={checkForStringAndReturnEmptyIfFalsy(name)}
      previewMode={previewMode}
      postcode={postcode}
    />
  );
};

export default SchoolEdit;
