import * as React from 'react';
import {TableProps, ColumnProps} from 'antd/es/table/interface';
import Table from 'antd/es/table';

interface defaultSortType {
  columnKey: string;
  order: 'descend' | 'ascend';
}

interface DataTableColumnProps<T> extends ColumnProps<T> {
  visible?: boolean;
}

interface DataTableProps<T> extends TableProps<T> {
  columns: DataTableColumnProps<T>[];
  defaultSort?: defaultSortType;
  page?: object;
}

interface DataTableState<T> {
  columns: DataTableColumnProps<T>[];
}

export default class DataTable<T> extends React.Component<
  DataTableProps<T>,
  DataTableState<T>
> {
  static defaultProps = {
    page: {},
    prefixCls: 'ant-table',
    pagination: {
      showTotal: (total: any) => `共${total}条`,
      size: 'middle',
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100']
    },
    style: {
      width: '100%'
    },
    showConfig: false,
    columns: []
  };
  constructor(props: DataTableProps<T>) {
    super(props);
    this.state = {
      columns: props.columns
    };
  }
  componentWillReceiveProps(next: DataTableProps<T>) {
    this.setState({
      columns: next.columns
    });
  }
  render() {
    const {defaultSort, page, pagination, ...otherProps} = this.props;
    let newColumns = this.state.columns;
    if (defaultSort !== undefined) {
      newColumns = newColumns.map((it: DataTableColumnProps<T>) => {
        defaultSort.columnKey === it.dataIndex
          ? (it = Object.assign({}, it, {defaultSortOrder: defaultSort.order}))
          : null;
        return it;
      });
    }

    return (
      <Table
        {...otherProps}
        columns={newColumns}
        pagination={!pagination ? false : Object.assign({}, pagination, page)}
      />
    );
  }
}