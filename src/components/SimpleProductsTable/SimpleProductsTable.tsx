import { FC, Fragment, useRef, useState } from 'react';
import { Table, InputRef } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import NoLocalOrganisations from '@/components/NoLocalOrganisations/NoLocalOrganisations';
import Paths from '@/config/paths';
import styles from './SimpleProductsTable.module.scss';
import getColumnSearch from '@/utils/tableUtils';
import { SimpleProductsTableProps } from '@/types/props';
import { InstitutionType, SimpleSearchResult } from '@/types/data';
import ProductTypeIcon from '../ProductTypeIcon/ProductTypeIcon';
import { convertNumberToCategory } from '../ItemList/getFullItemList';

const SimpleProductsTable: FC<SimpleProductsTableProps> = ({
  tableData,
  type,
  iconColour,
  productsColumnHeader,
  productsDataIndex,
  hideNoProducts,
}) => {
  const dashboardLink =
    type === InstitutionType.SCHOOL ? Paths.SCHOOLS_DASHBOARD : Paths.CHARITY_DASHBOARD;
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const columnSearchProps = {
    dataIndex: 'name' as keyof SimpleSearchResult,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    searchInput,
    filterClassName: styles.filterIcon,
    dashboardLink,
    navigate,
    buttonClassName: styles.nameBtn,
  };

  const columns: ColumnsType<SimpleSearchResult> = [
    {
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearch<SimpleSearchResult>(columnSearchProps),
    },
    {
      title: productsColumnHeader,
      dataIndex: productsDataIndex,
      render: (_, { registered, id, productTypes }: SimpleSearchResult): JSX.Element[] => {
        if ((!registered && type === InstitutionType.SCHOOL) || !productTypes) {
          return [<Fragment key={id}></Fragment>];
        }
        return productTypes.map((productType) =>
          productType !== null ? (
            <ProductTypeIcon key={productType} productType={productType} colour={iconColour} />
          ) : (
            <Fragment key={id} />
          )
        );
      },
      filters: Array.from(Array(6)).map((_, index) => ({
        text: convertNumberToCategory(index),
        value: index,
      })),
      onFilter: (value, record): boolean => !!record?.productTypes?.includes(Number(value)),
      filterIcon: () => <FilterFilled className={styles.filterIcon} />,
      defaultFilteredValue: hideNoProducts
        ? Array.from(Array(6)).map((_, index) => `${index}`)
        : [],
    },
  ];

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      scroll={{ x: 'max-content' }}
      rowKey="id"
      locale={
        type === InstitutionType.CHARITY
          ? {
              emptyText: <NoLocalOrganisations />,
            }
          : {}
      }
    />
  );
};
export default SimpleProductsTable;
