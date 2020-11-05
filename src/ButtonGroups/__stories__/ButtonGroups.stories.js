import React from 'react';
import {storiesOf} from '@storybook/react';
import {message} from 'antd';
import CustomButton from '../Button';
import ButtonGroups from '../index';

const stories = storiesOf('ButtonGroups', module);
stories.addParameters({jest: ['index.spec.js']});

stories.add('基础使用', () => {
  const handlerMenu = function(actionkey) {
    if (actionkey === 'click1') {
      message.info('你点击了第一个按钮');
    }
    if (actionkey === 'click2') {
      message.info('你终究还是点了');
    }
    if (actionkey === 'click3') {
      message.info('这是第三个按钮');
    }
    if (actionkey === 'click4') {
      message.info('没有更多了');
    }
  };
  return (
    <ButtonGroups handleClick={handlerMenu}>
      <CustomButton actionkey='click1' confirm='这是一个无理取闹的确认框'>
        点击
      </CustomButton>
      <CustomButton actionkey='click2'>不要点我</CustomButton>
      <CustomButton actionkey='click3'>第三个按钮</CustomButton>
      <CustomButton actionkey='click4'>444</CustomButton>
    </ButtonGroups>
  );
});

stories.add('按钮组超出折叠', () => {
  const handlerMenu = function(actionkey) {
    if (actionkey === 'click1') {
      message.info('你点击了第一个按钮');
    }
    if (actionkey === 'click2') {
      message.info('你终究还是点了');
    }
    if (actionkey === 'click3') {
      message.info('这是第三个按钮');
    }
    if (actionkey === 'click4') {
      message.info('没有更多了');
    }
  };
  return (
    <ButtonGroups handleClick={handlerMenu} showSize={3} mode='ButtonMenu'>
      <CustomButton
        actionkey='click1'
        confirm={<CustomButton>测试</CustomButton>}
        confirmTitle='标题'>
        点击
      </CustomButton>
      <CustomButton actionkey='click2'>不要点我</CustomButton>
      <CustomButton actionkey='click3'>第三个按钮</CustomButton>
      <CustomButton actionkey='click4' confirm='aaa' confirmTitle={'null'}>
        444
      </CustomButton>
    </ButtonGroups>
  );
});
