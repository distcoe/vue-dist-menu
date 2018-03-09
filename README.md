# vue-dist-menu

Feature & characteristcs

* no dependency

## Install & Basic Usage

`Install`

### npm install vue-dist-menu

`Basic Usage`

1.在vue文件中import菜单栏组件
``` javascript
<script>
  import distMenu from 'vue-dist-menu';
  // 由于需要向menu组件中传入总线EventBus，因此还需引入EventBus
  import EventBus from './utils/EventBus';
</script>
```
2.在template中使用组件
```html
<template>
  <distMenu @showSubMenu="showSubMenu" :firstDeckMenu="firstDeck" :secondDeckMenu="menuItems" :EventBus="eventBus"></distMenu>
</template>
```
3.向组件distMenu异步加载传输数据，并赋值给firstDeckMenu，secondDeckMenu
```javascript
    this.$http.get("static/mockdata/firstDeckMenu.json").then(res => {
      if (res.status === 200) {
        this.firstDeck = res.data;
      }
    });

    this.$http.get("static/mockdata/secondDeckMenu.json").then(res => {
      if (res.status === 200) {
        this.menuItems = res.data;
      }
    });
```
4.若menu组件的二级菜单为空的话，则可以选择不显示二级菜单。具体操作如下：
设置菜单栏的容器宽度spanLeft为x%,设置菜单栏右侧spanRight的渲染框的宽度为y%，（x + y = 100）。<br>
可添加方法showSubMenu，接收menu组件传来的是否显示二级菜单的消息。
``` javascript
    showSubMenu(data) {
      if (data.isShow === false) {
        this.spanLeft = '5%';
        this.spanRight = '95%';
      } else {
        this.spanLeft = '20%';
        this.spanRight = '80%';
      }
    }
```
5.菜单栏数据分为两类数据，分别为一级菜单栏数据、二级菜单栏数据,其数据结构分别如下：
  ### 一级菜单栏数据结构（如上firstDeckMenu):
  ```javascript
    [
        {
            "name": "一级菜单1",
            "icon": "XXXX1",
            "path": "/XXXXXX1"
        },
        {
            "name": "一级菜单2",
            "icon": "XXXX2",
            "path": "/XXXX2"
        },
        ........
    ]
  ```
  其中name为菜单栏名，icon为菜单对应图标，path为菜单跳转的路由
  
 ### 二级菜单栏数据结构（如上secondDeckMenu):
```javascript
[
    {
    "type": "twoDeckRouteMenu", 
    "items": [
      {
        "path": "/XXXX1",
        "templateName": "二级菜单1",
        "children": [
          {
            "path": "/xxxx/1",
            "name": "二级子菜单1"
          },
          {
            "path": "/xxxx/2",
            "name": "二级子菜单2"
          }
        ]
      },
      {
        "path": "/XXXX2",
        "templateName": "二级菜单2",
        "children": [
          {
            "path": "/xxxx/3",
            "name": "二级子菜单3"
          },
          {
            "path": "/xxxx/4",
            "name": "二级子菜单4"
          }
        ]
      }
    ]
  },
  {
    "type": "oneDeckRouteMenu",
    "items": [
      {
        "path": "/XXXX",
        "name": "二级菜单3"
      },
      {
        "path": "/XXXX",
        "name": "二级菜单4"
      }
    ]
  }
]
```
其中type为菜单类型，主要分为单层级菜单(`oneDeckRouteMenu`)和两层级菜单(`twoDeckRouteMenu`)。单层级菜单没有二级子菜单，多层级菜单有二级子菜单，icon为菜单对应图标，path为菜单跳转的路由，templateName为两层级导航的菜单名


## JSFiddle

## Examples

## Props config
