import Button from '@/components/Button/Button';
import Paths from '@/config/paths';
import type { SearchResult } from '@/types/api';
import type { getColumnSearchProps } from '@/types/props';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Button as SearchButton, Space } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

const getColumnSearch = <T,>({
  dataIndex,
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn,
  searchInput,
  filterClassName,
  dashboardLink,
  navigate,
  buttonClassName,
  postcode,
}: getColumnSearchProps<T>): ColumnType<T> => {
  const handleTableSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
  ): void => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleTableSearchReset = (clearFilters: () => void): void => {
    clearFilters();
    setSearchText('');
  };
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${String(dataIndex)}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() =>
            handleTableSearch(selectedKeys as string[], confirm, String(dataIndex))
          }
          style={{ marginBottom: 8, display: 'block' }}
          aria-label="search input"
        />
        <Space>
          <SearchButton
            type="primary"
            onClick={() => handleTableSearch(selectedKeys as string[], confirm, String(dataIndex))}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            aria-label="search"
          >
            Search
          </SearchButton>
          <SearchButton
            onClick={() => clearFilters && handleTableSearchReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
            aria-label="reset"
          >
            Reset
          </SearchButton>
          <SearchButton
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
            aria-label="close"
          >
            Close
          </SearchButton>
        </Space>
      </div>
    ),
    filterIcon: () => <SearchOutlined className={filterClassName} />,
    onFilter: (value, record): boolean => {
      return String(record[dataIndex])
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: (visible): void => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: string, record: T): React.ReactNode => {
      if (!dashboardLink) {
        return searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        );
      }
      const { name, id, registered } = record as SearchResult;
      if (registered || dashboardLink === Paths.CHARITY_DASHBOARD) {
        return searchedColumn === dataIndex ? (
          <Button
            key={id}
            className={buttonClassName}
            theme="link-blue"
            text={
              <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
              />
            }
            ariaLabel={`name-${text}`}
            onClick={() =>
              navigate?.(dashboardLink, {
                state: { urn: id, name, id, postcode },
              })
            }
          />
        ) : (
          <Button
            key={id}
            className={buttonClassName}
            theme="link-blue"
            text={text}
            ariaLabel={`name-${text}`}
            onClick={() =>
              navigate?.(dashboardLink, {
                state: { urn: id, name, id, postcode },
              })
            }
          />
        );
      }
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      );
    },
  };
};

export default getColumnSearch;
