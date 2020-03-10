import {shallow, mount, render} from 'enzyme';
import React from 'react';

import DetailTable from '../index.tsx';
import Td from '../td.tsx';

const setup = props => {
  const wrapper = shallow(<DetailTable {...props} />);

  return {
    wrapper,
    props
  };
};

describe('DetailTable  render', () => {
  it('DetailTable 正确渲染', () => {
    const {wrapper, props} = setup({
      tableClass: 'aaa123',
      mode: 'object',
      dataSource: {
        a: 1,
        b: 2
      }
    });
    expect(wrapper.find('div.aaa123').exists()).toBe(true);
  });
});

describe('DetailTable method test', () => {
  it.skip('showDom props mode和datasource不匹配时', () => {
    const {wrapper, props} = setup({
      dataSource: [],
      mode: 'object'
    });

    // console.log(wrapper.instance().showDom(props.dataSource))
  });

  it('mode为object时，能正确渲染', () => {
    const {wrapper, props} = setup({
      dataSource: {
        a: 1,
        b: 2,
        c: 3
      },
      // dataSource:[1,2,3,4,5],
      mode: 'object',
      labelKey: 'name',
      valueKey: 'value'
    });

    const result = [
      [{name: 'a', value: 1}, {name: 'b', value: 2}],
      [{name: 'c', value: 3}, {name: '', value: ''}]
    ];

    expect(wrapper.instance().showDom(props.dataSource)).toEqual(
      result.map((d, k) => (
        <tr key={k}>
          {d.map((c, v) => (
            <Td
              key={v}
              dataSource={c}
              labelKey={props.labelKey}
              valueKey={props.valueKey}
            />
          ))}
        </tr>
      ))
    );
  });

  it('dataSource 不传入labelKey，valueKey,默认为name 和 value', () => {
    const {wrapper, props} = setup({
      dataSource: {
        a: 1,
        b: 2,
        c: 3
      },
      mode: 'object'
    });

    const result = [
      [{name: 'a', value: 1}, {name: 'b', value: 2}],
      [{name: 'c', value: 3}, {name: '', value: ''}]
    ];

    expect(wrapper.instance().showDom(props.dataSource)).toEqual(
      result.map((d, k) => (
        <tr key={k}>
          {d.map((c, v) => (
            <Td key={v} dataSource={c} labelKey='name' valueKey='value' />
          ))}
        </tr>
      ))
    );
  });

  it('dataSource 传入了自定义的labelKey，valueKey ', () => {
    const {wrapper, props} = setup({
      dataSource: {
        a: 1,
        b: 2,
        c: 3
      },
      mode: 'object',
      labelKey: 'labelKey',
      valueKey: 'valueKey'
    });

    const result = [
      [{labelKey: 'a', valueKey: 1}, {labelKey: 'b', valueKey: 2}],
      [{labelKey: 'c', valueKey: 3}, {labelKey: '', valueKey: ''}]
    ];

    expect(wrapper.instance().showDom(props.dataSource)).toEqual(
      result.map((d, k) => (
        <tr key={k}>
          {d.map((c, v) => (
            <Td
              key={v}
              dataSource={c}
              labelKey={props.labelKey}
              valueKey={props.valueKey}
            />
          ))}
        </tr>
      ))
    );
  });
});

describe.skip('td test', () => {
  it('td dataSource labelkey 都是基本类型  ', () => {
    const dataSource = {label: 'a', value: 1};
    console.log(Td(dataSource, 'label', 'value'));
    // expect(Td(dataSource)).toEqual([
    //   <th key={'td' + dataSource.label}>{dataSource.label}</th>,
    //   <td colSpan={null} key={'td1' + dataSource.value}>{dataSource.value}</td>
    // ])
  });
});
