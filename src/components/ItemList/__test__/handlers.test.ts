import type { SectionsIconType } from '@/types/data';
import { getItems, getSelectedNames, removeEmptyItems, selectAll } from '../handlers';

describe('handlers', () => {
  describe('removeEmptyItems', () => {
    it('should remove object items if its value is an array with length 0', () => {
      const inputItemsObject = {
        1: [],
        2: ['Guitars'],
      };
      const expectedOutput = { 2: ['Guitars'] };
      expect(removeEmptyItems(inputItemsObject)).toEqual(expectedOutput);
    });
  });

  describe('getItems', () => {
    it('should handle removal of an item', () => {
      const previousItems = {
        1: ['Water bottle'],
        2: ['Guitars'],
      };
      expect(getItems(previousItems, false, 'Water bottle', 'Sports')).toEqual({
        2: ['Guitars'],
      });
    });

    it('should keep selected item in array when select all clicked', () => {
      const previousItems = {
        1: ['Football boots'],
      };
      expect(getItems(previousItems, true, 'Football boots', 'Sports')).toEqual(previousItems);
    });
  });

  describe('selectAll', () => {
    it('should deselect all items under named category', () => {
      const itemsList = [
        'Football boots',
        'Footballs',
        'Gym bag',
        'Gym shoes',
        'Gym vest',
        'Hockey balls',
        'Hockey sticks',
        'Hoodies',
        'Jumpers',
        'Mouth guards',
        'Netballs',
        'Plimsolls',
        'Shin pads',
        'Shorts',
        'Skirts',
        'Skorts',
        'Socks',
        'T-shirts',
        'Trainers',
        'Water bottle',
      ];
      const allSelectedNames: SectionsIconType[] = ['Sports'];
      const setAllSelectedNames = vi.fn();
      const setItems = vi.fn();

      selectAll(false, 'Sports', itemsList, allSelectedNames, setAllSelectedNames, setItems);
      expect(setAllSelectedNames).toHaveBeenCalledWith([]);
    });
  });

  describe('getSelectedNames', () => {
    it('should return an array of category names with all items selected', () => {
      const selectedItems = {
        '0': ['Blazers', 'Jumpers', 'Name labels'],
        '1': [
          'Football boots',
          'Footballs',
          'Gym bag',
          'Gym shoes',
          'Gym vest',
          'Hockey balls',
          'Hockey sticks',
          'Hoodies',
          'Jumpers',
          'Mouth guards',
          'Netballs',
          'Plimsolls',
          'Shin pads',
          'Shorts',
          'Skirts',
          'Skorts',
          'Socks',
          'T-shirts',
          'Trainers',
          'Water bottle',
        ],
      };
      expect(getSelectedNames(selectedItems)).toEqual(['Sports']);
    });
  });
});
