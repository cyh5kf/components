import React from 'react';
import {Button, Icon} from 'antd';

export function noop() {}

/**
 * moveToLeft：数据移向左侧事件，必须
 * moveToRight：数据移向右侧事件，必须
 * leftArrowText：左箭头text，非必须
 * rightArrowText：右箭头text，非必须
 * leftActive：左箭头是否disabled，非必须
 * rightActive：右箭头是否disabled，非必须
 * className：整个操作模块className 前缀，非必须
 */

interface ItemProps {
  moveToLeft: () => void;
  moveToRight: () => void;
  leftArrowText?: string;
  rightArrowText?: string;
  leftActive?: boolean;
  rightActive?: boolean;
  className?: string;
}

export const Operation: React.FC<ItemProps> = (props: ItemProps) => {
  const {
    leftActive,
    rightActive,
    moveToLeft,
    moveToRight,
    leftArrowText,
    rightArrowText,
    className
  } = props;
  const moveToLeftButton = (
    <Button
      type='primary'
      size='small'
      //@ts-ignore
      disabled={!leftActive}
      onClick={moveToLeft}>
      {
        <span>
          <Icon type='left' />
          {leftArrowText}
        </span>
      }
    </Button>
  );
  const moveToRightButton = (
    <Button
      type='primary'
      size='small'
      //@ts-ignore
      disabled={!rightActive}
      onClick={moveToRight}>
      {
        <span>
          {rightArrowText}
          <Icon type='right' />
        </span>
      }
    </Button>
  );
  return (
    <div className={className}>
      {moveToRightButton}
      {moveToLeftButton}
    </div>
  );
};
