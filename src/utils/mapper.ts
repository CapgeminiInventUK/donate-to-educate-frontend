import { disabledCategories } from '@/components/ItemList/getFullItemList';
import { Charity, School, SimpleSearchResult } from '@/types/api';

export const mapSchoolToSimpleSearchResult = (school: School): SimpleSearchResult => {
  const requestProductTypes = school?.request?.productTypes?.filter(
    (productType) => !disabledCategories.includes(productType ?? -1)
  );

  const donateProductTypes = school?.donate?.productTypes?.filter(
    (productType) => !disabledCategories.includes(productType ?? -1)
  );

  const excessProductTypes = school?.excess?.productTypes?.filter(
    (productType) => !disabledCategories.includes(productType ?? -1)
  );

  return {
    id: school.urn,
    name: school.name,
    request: {
      ...school.request,
      productTypes: requestProductTypes,
    },
    donate: {
      ...school.donate,
      productTypes: donateProductTypes,
    },
    excess: {
      ...school.excess,
      productTypes: excessProductTypes,
    },
    registered: school.registered,
    __typename: 'SearchResult',
  };
};

export const mapCharityToSimpleSearchResult = (charity: Charity): SimpleSearchResult => {
  const requestProductTypes = charity?.request?.productTypes?.filter(
    (productType) => !disabledCategories.includes(productType ?? -1)
  );

  const donateProductTypes = charity?.donate?.productTypes?.filter(
    (productType) => !disabledCategories.includes(productType ?? -1)
  );

  const excessProductTypes = charity?.excess?.productTypes?.filter(
    (productType) => !disabledCategories.includes(productType ?? -1)
  );

  return {
    id: charity.id,
    name: charity.name,
    request: {
      ...charity.request,
      productTypes: requestProductTypes,
    },
    donate: {
      ...charity.donate,
      productTypes: donateProductTypes,
    },
    excess: {
      ...charity.excess,
      productTypes: excessProductTypes,
    },
    registered: true, // TODO verify this
    __typename: 'SearchResult',
  };
};
