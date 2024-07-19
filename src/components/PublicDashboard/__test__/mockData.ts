import type { InstitutionProfile } from '@/types/data';
import type { PublicDashboardActionTilesProps } from '@/types/props';

export const mockSchoolProfile: InstitutionProfile = {
  name: 'Test School',
  id: '125821',
  localAuthority: 'West Sussex',
  postcode: 'GU27 3RN',
  location: {
    type: 'Point',
    coordinates: [],
    __typename: 'Point',
  },
  header: {
    phone: '1234567',
    email: 'test@test.com',
    website: 'www.webbymcsite.com',
    __typename: 'SchoolProfileHeader',
  },
  about:
    'Test School has pre-loved school products to help children thrive at school.\n\nRequest the things you need or donate products to help the next child. Charities can also take our extra stock to share with the communities that need it most.',
  request: {
    items: '{"0":["Blazers","Jumpers"],"2":["Triangles"]}',
    whatToExpect:
      'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
    actionText:
      "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
    productTypes: [0, 2],
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
};

export const mockCharityProfileNoDetails: InstitutionProfile = {
  name: 'Test Charity',
  id: '123456',
  localAuthority: 'West Sussex',
  postcode: null,
  location: null,
  header: null,
  about: null,
  request: null,
  donate: null,
  excess: null,
};

export const schoolPublicDashboardTilesProps: PublicDashboardActionTilesProps = {
  request: {
    items: '{"0":["Blazers","Jumpers"],"2":["Triangles"]}',
    whatToExpect:
      'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
    actionText:
      "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
    productTypes: [0, 2],
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
  type: 'school',
  id: '125821',
  name: 'Test School',
  postcode: 'GU27 3RN',
};

export const charityPublicDashboardTilesProps: PublicDashboardActionTilesProps = {
  request: {
    items:
      '{"0":["Blazers","Cardigans","Coats","Dresses","Gloves","Hats","Jumpers","Name labels","Pinafores","Polo shirts","Scarves","Shirts","Shoes","Shorts","Skirts","Socks","Summer dresses","Summer pinafores","Ties","Tights","Trousers","Wellies"],"1":["Football boots","Footballs","Gym bag","Gym shoes","Gym vest","Hockey balls","Hockey sticks","Hoodies","Jumpers","Mouth guards","Netballs","Plimsolls","Shin pads","Shorts","Skirts","Skorts","Socks","T-shirts","Trainers","Water bottle"]}',
    whatToExpect:
      'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
    actionText:
      "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
    productTypes: [0, 1],
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
    items:
      '{"2":["Crayons","Felt tips","Flutes","Glue stick","Guitars","Keyboards","Music score books","Paints","Pencils","Recorders","Rubbers","Sketch books","Triangles","Violins"]}',
    whatToExpect:
      'View the products we have too much of, take it from us and share it with people who need it.',
    actionText:
      "Once we know what extra stock you can take from us, we'll contact you to arrange the next steps as soon as we can.",
    productTypes: [2],
    __typename: 'ProfileItems',
  },
  type: 'charity',
  name: 'Test Charity',
  id: '123456',
  postcode: 'BN3 3JP',
};
