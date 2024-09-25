import { ItemList, SectionsIconType } from '@/types/data';

export const getFullItemList = (): ItemList[] => {
  return [
    {
      name: 'Clothing and uniform',
      items: [
        'Coats',
        'Shoes',
        'Hats',
        'Wellies',
        'Trousers',
        'Shirts',
        'Dresses',
        'Skirts',
        'Polo shirts',
        'Socks',
        'Shorts',
        'Cardigans',
        'Blazers',
        'Jumpers',
        'Ties',
        'Tights',
        'Summer dresses',
        'Name labels',
        'Gloves',
        'Scarves',
        'Pinafores',
        'Summer pinafores',
      ].sort(),
    },
    {
      name: 'Sports',
      items: [
        'Football boots',
        'Trainers',
        'Gym shoes',
        'T-shirts',
        'Shorts',
        'Jumpers',
        'Hoodies',
        'Plimsolls',
        'Socks',
        'Gym bag',
        'Skirts',
        'Gym vest',
        'Hockey sticks',
        'Footballs',
        'Netballs',
        'Hockey balls',
        'Skorts',
        'Mouth guards',
        'Shin pads',
        'Water bottle',
      ].sort(),
    },
    {
      name: 'Art and music',
      items: [
        'Sketch books',
        'Pencils',
        'Paints',
        'Crayons',
        'Felt tips',
        'Rubbers',
        'Glue stick',
        'Recorders',
        'Violins',
        'Flutes',
        'Triangles',
        'Keyboards',
        'Guitars',
        'Music score books',
      ].sort(),
    },
    {
      name: 'Study',
      items: [
        'Book bags',
        'Backpacks',
        'Lunchboxes',
        'Textbooks',
        'Revision guides',
        'Books',
        'Dictionary',
        'Thesaurus',
        'Anthologies',
        'Online tuition',
        'Past exam papers',
        'Pencil cases',
        'Highlighters',
        'Rulers',
        'Pencils',
        'Sharpeners',
        'Calculators',
        'Protractor',
        'Geometry sets',
        'Handwriting pens',
        'Rubbers',
        'Glue stick',
        'Lined notebook',
        'Compass',
      ].sort(),
    },
    {
      name: 'Toiletries',
      items: [
        'Shower gel',
        'Handwash',
        'Sanitary pads',
        'Tampons',
        'Toothbrushes',
        'Toothpaste',
        'Shampoo',
        'Conditioner',
        'Reusable period care',
      ].sort(),
    },
    {
      name: 'Computing and technology',
      items: ['Laptops', 'Tablets', 'Computer software', 'Internet access'].sort(),
    },
  ];
};

export const convertCategoryToNumber = (category: SectionsIconType): number => {
  switch (category) {
    case 'Clothing and uniform':
      return 0;
    case 'Sports':
      return 1;
    case 'Art and music':
      return 2;
    case 'Study':
      return 3;
    case 'Toiletries':
      return 4;
    case 'Computing and technology':
      return 5;
  }
};

export const convertNumberToCategory = (number: number): SectionsIconType => {
  switch (Number(number)) {
    case 0:
      return 'Clothing and uniform';
    case 1:
      return 'Sports';
    case 2:
      return 'Art and music';
    case 3:
      return 'Study';
    case 4:
      return 'Toiletries';
    case 5:
      return 'Computing and technology';
    default:
      throw new Error(`Invalid category number ${number}`);
  }
};
