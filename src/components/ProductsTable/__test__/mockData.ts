import type { SearchResult } from '@/types/api';

export const productsTablePropsCharity = {
  tableData: [
    {
      id: 'b6f194bf-9301-4b1f-b52c-178c14586afe',
      name: 'Test Charity',
      distance: 0,
      productTypes: [0, 1],
      registered: true,
      location: {
        type: 'Point',
        coordinates: [-0.165828, 50.829116],
        __typename: 'Point',
      },
      __typename: 'SearchResult',
    },
  ] as SearchResult[],
  type: 'charity' as 'charity' | 'school',
  iconColour: '#97C8EB',
  productsColumnHeader: 'Product types available' as
    | 'Product types available'
    | 'Excess stock product types'
    | 'Product types needed',
  postcode: 'bn3 3jp',
  hideStatus: false,
  hideNoProducts: true,
};

export const productsTablePropsCharityNoOrganisations = {
  tableData: [],
  type: 'charity' as 'charity' | 'school',
  iconColour: '#97C8EB',
  productsColumnHeader: 'Product types available' as
    | 'Product types available'
    | 'Excess stock product types'
    | 'Product types needed',
  postcode: 'bn3 3jp',
  hideStatus: false,
};

export const productsTablePropsSchool = {
  tableData: [
    {
      id: '133816',
      name: 'London Metropolitan University',
      distance: 300.94741046820127,
      productTypes: [],
      registered: false,
      location: {
        type: 'Point',
        coordinates: [-0.11023628530553566, 51.551819277746645],
        __typename: 'Point',
      },
      __typename: 'SearchResult',
    },
    {
      id: '100402',
      name: 'Drayton Park Primary School',
      distance: 359.45875667759157,
      productTypes: [],
      registered: true,
      location: {
        type: 'Point',
        coordinates: [-0.10573271729468504, 51.55154881637505],
        __typename: 'Point',
      },
      __typename: 'SearchResult',
    },
    {
      id: '100455',
      name: 'Highbury Fields School',
      distance: 508.6942537362899,
      productTypes: [0, 1, 2, 3],
      registered: true,
      location: {
        type: 'Point',
        coordinates: [-0.10152633834327107, 51.552802723286135],
        __typename: 'Point',
      },
      __typename: 'SearchResult',
    },
  ] as SearchResult[],
  type: 'school' as 'charity' | 'school',
  iconColour: '#97C8EB',
  productsColumnHeader: 'Product types available' as
    | 'Product types available'
    | 'Excess stock product types'
    | 'Product types needed',
  postcode: 'N7 7AJ',
  hideStatus: false,
};

export const productsTablePropsSchoolNoSchools = {
  tableData: [],
  type: 'school' as 'charity' | 'school',
  iconColour: '#97C8EB',
  productsColumnHeader: 'Product types available' as
    | 'Product types available'
    | 'Excess stock product types'
    | 'Product types needed',
  postcode: 'N7 7AJ',
  hideStatus: true,
};
