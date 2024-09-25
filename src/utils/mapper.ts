import { Charity, School } from '@/types/api';
import { SimpleSearchResult } from '@/types/data';

export const mapSchoolToSimpleSearchResult = (
  school: School,
  type: 'request' | 'donate' | 'excess'
): SimpleSearchResult => {
  const productTypes = school?.[type]?.productTypes ?? [];

  return {
    id: school.urn,
    name: school.name,
    productTypes,
    registered: school.registered,
    __typename: 'SearchResult',
  };
};

export const mapCharityToSimpleSearchResult = (
  charity: Charity,
  type: 'request' | 'donate' | 'excess'
): SimpleSearchResult => {
  const productTypes = charity?.[type]?.productTypes ?? [];

  return {
    id: charity.id,
    name: charity.name,
    productTypes,
    registered: true, // TODO verify this
    __typename: 'SearchResult',
  };
};
