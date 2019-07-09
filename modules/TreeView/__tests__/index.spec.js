import React from "react";
import { shallow, mount, render } from "enzyme";

import { Input, Select, Tree } from "antd";
import TreeView from "../index";

const setup = (props = {}) => {
  // 模拟 props

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<TreeView {...props} />);

  return {
    props,
    wrapper
  };
};

describe.skip("TreeView shallow render", () => {
  it("render without params", done => {
    const { wrapper, props } = setup();
    expect(wrapper.find(".ant-tree-view").exists()).toBe(true);
    done();
  });

  it("tree default render ", () => {
    const { wrapper, props } = setup({
      treeData: [
        {
          value: "abc",
          children: [
            {
              value: "efg"
            },
            {
              value: "hij"
            }
          ]
        }
      ],
      renderItem: ita => {
        console.log(ita);
      }
    });
    expect(wrapper.instance()).toBeInstanceOf(TreeView);
  });
});