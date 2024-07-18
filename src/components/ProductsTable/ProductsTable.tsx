import minusIcon from '@/assets/icons/minusIcon.svg';
import tickIcon from '@/assets/icons/tickIcon.svg';
import { convertNumberToCategory } from '@/components/ItemList/getFullItemList';
import NoLocalOrganisations from '@/components/NoLocalOrganisations/NoLocalOrganisations';
import ProductTypeIcon from '@/components/ProductTypeIcon/ProductTypeIcon';
import Paths from '@/config/paths';
import type { SearchResult } from '@/types/api';
import type { ProductsTableProps } from '@/types/props';
import { convertMetresToMiles } from '@/utils/distance';
import getColumnSearch from '@/utils/tableUtils';
import { FilterFilled } from '@ant-design/icons';
import { type InputRef, Popover, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { type FC, Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductsTable.module.scss';

const ProductsTable: FC<ProductsTableProps> = ({
  tableData,
  type,
  iconColour,
  productsColumnHeader,
  postcode,
  hideNotJoined,
  hideNoProducts,
  hideStatus = false,
}) => {
  const dashboardLink = type === 'school' ? Paths.SCHOOLS_DASHBOARD : Paths.CHARITY_DASHBOARD;
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const columnSearchProps = {
    dataIndex: 'name' as keyof SearchResult,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    searchInput,
    filterClassName: styles.filterIcon,
    dashboardLink,
    navigate,
    buttonClassName: styles.nameBtn,
    postcode,
  };

  const columns: ColumnsType<SearchResult> = [
    {
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearch<SearchResult>(columnSearchProps),
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      render: (text: string) => `${convertMetresToMiles(text)} miles`,
    },
    {
      title: productsColumnHeader,
      dataIndex: 'productTypes',
      render: (text: number[], { registered, id }: SearchResult): JSX.Element[] => {
        if (!registered && type === 'school') {
          return [<Fragment key={id}>N/A</Fragment>];
        }
        return text.map((productType) => (
          <ProductTypeIcon key={productType} productType={productType} colour={iconColour} />
        ));
      },
      filters: Array.from(Array(6)).map((_, index) => ({
        text: convertNumberToCategory(index),
        value: index,
      })),
      onFilter: (value, record): boolean => record.productTypes.includes(Number(value)),
      filterIcon: () => <FilterFilled className={styles.filterIcon} />,
      defaultFilteredValue: hideNoProducts
        ? Array.from(Array(6)).map((_, index) => `${index}`)
        : [],
    },
  ];

  if (type === 'school' && !hideStatus) {
    columns.splice(1, 0, {
      title: 'Status',
      dataIndex: 'registered',
      filters: [
        {
          text: 'Joined',
          value: true,
        },
        {
          text: 'Not Joined',
          value: false,
        },
      ],
      render: (registered: boolean, { id }) => (
        <div key={id} className={styles.statusDiv}>
          <Popover
            content={registered ? 'Joined' : 'Not joined'}
            trigger="hover"
            className={`${styles.status} ${registered ? styles.joined : ''}`}
          >
            <span>
              {registered ? (
                <img src={tickIcon} alt="Joined" />
              ) : (
                <img src={minusIcon} alt="Not joined" />
              )}
            </span>
          </Popover>
        </div>
      ),
      onFilter: (value: boolean | React.Key, record: SearchResult): boolean =>
        record.registered === value,
      filterIcon: () => <FilterFilled className={styles.filterIcon} />,
      defaultFilteredValue: hideNotJoined ? ['true'] : [],
    });
  }

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      scroll={{ x: 'max-content' }}
      rowKey="id"
      locale={
        type === 'charity'
          ? {
              emptyText: <NoLocalOrganisations />,
            }
          : {}
      }
    />
  );
};
export default ProductsTable;
