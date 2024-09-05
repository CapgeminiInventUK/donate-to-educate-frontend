import { CharityProfile, SchoolProfile } from '@/types/api';
import { Banner } from '@/types/data';

export const schoolProfile: SchoolProfile = {
  name: 'Test School',
  id: '125821',
  localAuthority: 'West Sussex',
  postcode: 'GU27 3RN',
  header: {
    phone: '01777777777',
    email: 'test@email.com',
    website: 'www.website.com',
    uniformPolicy: '',
    __typename: 'SchoolProfileHeader',
  },
  about: null,
  request: {
    items: '{}',
    whatToExpect: 'LOREM',
    actionText:
      "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
    productTypes: [],
    __typename: 'ProfileItems',
  },
  donate: {
    items: '{"0":["Skirts"]}',
    whatToExpect:
      "View the products we need. When you select 'donate', you can tell us how you can help.",
    actionText:
      "Once we have your message about the products you can donate, we'll contact you to arrange the next steps as soon as we can.",
    productTypes: [0],
    __typename: 'ProfileItems',
  },
  excess: {
    items: '{"5":["Computer software","Internet access","Laptops","Tablets"]}',
    whatToExpect:
      'View the products we have too much of, take it from us and share it with people who need it.',
    actionText:
      "Once we know what extra stock you can take from us, we'll contact you to arrange the next steps as soon as we can.",
    productTypes: [5],
    __typename: 'ProfileItems',
  },
  __typename: 'SchoolProfile',
};

export const charityProfile: CharityProfile = {
  name: 'Test Charity',
  id: '1',
  localAuthority: 'West Sussex',
  postcode: 'n5 1ge',
  header: {
    phone: '01777777777',
    email: 'test@email.com',
    website: '',
    address: 'asdf',
    __typename: 'CharityProfileHeader',
  },
  about: null,
  request: null,
  donate: null,
  excess: null,
  __typename: 'CharityProfile',
};

export const bannerData: Banner = {
  phone: '01777777777',
  email: 'test@email.com',
  website: 'www.website.com',
};
