import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Button,Icon,Tooltip,Menu,Dropdown,Modal} from 'antd'
import './index.less'
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver'
import Locale from './locale.js'
// import {hasPermission} from 'app/utils/ConfigUtils'

/*
*children 1个 多个数据格式处理
*
*/

export class Confirm extends Component{
  onConfirmClick(locale){
    const {onConfirm,title,content}=this.props
    const contextLocale = Object.assign({},locale,this.props.locale)
    return Modal.confirm({
      title: title || contextLocale.title,
      content: content,
      okText: contextLocale.okText,
      onOk:onConfirm,
      cancelText: contextLocale.cancelText
    })
  }
  renderConfirm(locale){
    let {children} =this.props
    return React.cloneElement(children,{onClick:this.onConfirmClick.bind(this,locale)})
  }
  render(){
    return React.createElement(
        LocaleReceiver,
        {
          componentName:'ButtonGroups',
          defaultLocale:Locale
        },
        this.renderConfirm.bind(this)
        // React.cloneElement(children,{onClick:this.onConfirmClick.bind(_this)})
      )
    
    // return  React.cloneElement(children,{onClick:this.onConfirmClick.bind(this)})
  }
}

export default class ButtonGroups extends Component {

  static contextTypes = {
    // appReducer:PropTypes.object
  }


  renderButtonOnly(){
    let {children} = this.props
    let childrenArray = React.Children.toArray(children)
    // let {appReducer} = this.context
    // console.log(this.context.appReducer)
    return childrenArray
      .filter((it)=>{
        if(it.props.permission === undefined){
          return true
        }else{
          return it.props.permission && it.props.permission===true
        }
     })
    .map((it,idx)=>{
      return this.renderReactElement(it,idx)
    })
  }

  renderReactElement(it,idx){
    let {handleClick,viewMode,locale} = this.props
    let {tip,confirm,confirmTitle,placement,icon,children,block,actionkey,disabled,permission,...otherProps} = it.props
    let iconProps = {actionkey:actionkey,disabled:disabled}
    
    //tip提示判断，判断没有tip属性时缺省显示text内容
    tip = !!tip ?  tip : children

    //非text文字模式下，显示icon图标，无icon属性设置时，只显示文字
    if(viewMode === 'icon' || viewMode === 'both'){
      if(!!icon){
        iconProps = Object.assign(iconProps,{icon:icon})
      }
      if(viewMode === 'icon'){
        children = !!icon ? '': children    
      }
    }
    
    

    if(confirm && !disabled){      
      return React.createElement(
        Confirm,
        Object.assign({},{locale:locale,key:idx,title:confirmTitle,content:confirm,placement:placement,onConfirm:()=>{handleClick(actionkey)}}),
        React.createElement(Tooltip,Object.assign({},{key:idx,title:tip,icon:icon}),React.createElement(Button,Object.assign(iconProps,otherProps),children))
      )
    }else{
      return React.createElement(
        Tooltip,
        Object.assign({},{key:idx,title:tip,icon:icon}),
        React.createElement(
          Button,
          Object.assign(iconProps,otherProps,!disabled?{onClick:()=>{handleClick(actionkey)}}:{}),
          children
        )
      )
    }
  }
    // return

  renderMenuReactElement(it,idx){
    let {tip,children} = it.props
    return React.createElement(
      Tooltip,
      Object.assign({},{key:idx,title:tip}),
      React.cloneElement(it,Object.assign({},it.props),children)
    )
  }

  renderMixButtonMenu(){
    let {children,showSize} = this.props
    let childrenArray = React.Children.toArray(children)

    let endArray = childrenArray.splice(showSize)

    return (
      <div>
        {
          childrenArray
          // .filter((it)=>{
          //   console.log(it.props.permission)
          //   return it.props.permission==true
          // })
          .map((it,idx)=>{
            return this.renderReactElement(it,idx)
          })
        }
        <Dropdown overlay={this.renderMenuItem(endArray)}><Button><Icon type="ellipsis"/></Button></Dropdown>
      </div>
    )
  }

  renderMenuItem(itemList){
    let {handleClick} = this.props
    return (
      <Menu onClick={handleClick}>
        {itemList.map((it,idx)=>{
          return (<Menu.Item key={idx}>
                  {this.renderMenuReactElement(it,idx)}
            </Menu.Item>)
          })}
      </Menu>
    )
  }

  renderChildren(){
    let {children,showSize,mode} = this.props
    let childrenArray = React.Children.toArray(children)

    return (
      <Button.Group>
        { mode === 'ButtonGroup' ? this.renderButtonOnly() : this.renderMixButtonMenu() }
      </Button.Group>
    )
  }

  render(){
    return (
      <div className="button-groups">
        {this.renderChildren()}
      </div>
    )
  }
}

/*
* showSize:超过收起的数目
* handleClick : 点击事件（需子元素以actionKey区分）
* viewMode : 按钮的展示模式，仅文字，仅图片，文字+图片
* 子元素如需confirm确认 子元素自身添加confirm 属性 value为提醒文字
* tip 为元素上移显示文字
*/
ButtonGroups.propTypes = {
  showSize: PropTypes.number,
  handleClick:PropTypes.func,
  viewMode:PropTypes.oneOf(['text','icon','both']),
  mode:PropTypes.oneOf(['ButtonGroup','ButtonMenu']),
  locale:PropTypes.object
}
ButtonGroups.defaultProps = {
  showSize:5,
  handleClick:function(actionkey){},
  viewMode:'text',
  mode:'ButtonGroup'
}
