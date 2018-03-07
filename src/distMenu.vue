<template>
  <div id="menuBar" class="menuBar" v-if="firstDeckMenu.length > 0 && secondDeckMenu.length > 0">
    <div class="menuLeft" :style="{width: spanLeft}">
      <Menu theme="dark" class="oneDeckMenu" :style="{width:'100%',height:'100%'}" :active-name="currentFirstDeckName" @on-select="changeFirstDeckMenu">
        <MenuItem v-for="(item, index) in firstDeckMenu" :name="index" :key="index" class="oneDeckMenuItem">
        <Tooltip :content="item.name" placement="right" class="tooltip" :transfer="true">
          <i class="iconfont" :class="[item.icon]" style="font-size: 24px" />
        </Tooltip>
        </MenuItem>
      </Menu>
    </div>
    <div class="menuRight" :style="{width: spanRight}">
      <div v-if="Object.keys(currentMenuItems).length > 0 && spanRight !== '0'">
        <div class="searchArea" v-if="showSearch === true">
          <Input type="text" placeholder="搜索" class="searchInput" />
        </div>
      </div>
      <Menu v-if="currentMenuItems.type === 'oneDeckRouteMenu' " theme="light" :active-name="currentSecondDeckName" @on-select="changeSecondDeckMenu" :style="{width:'100%',height: 'calc(100% - 40px)',overflowY:scrollStatus,overflowX:'hidden'}">
        <MenuItem :name="index" v-for="(item,index) in currentMenuItems.items" :key="index">
        <Tooltip :content="item.name" placement="right" :transfer="true">
          <p>{{item.name}}</p>
        </Tooltip>
        </MenuItem>
      </Menu>
      <Menu v-else-if="currentMenuItems.type === 'twoDeckRouteMenu'" theme="light" :active-name="currentSecondDeckDoubleName" @on-select="changeSecondDeckDoubleMenu" :style="{width:'100%',height:'calc(100% - 40px)',overflowY:scrollStatus,overflowX:'hidden'}">
        <Submenu v-for="(submenu,index) in currentMenuItems.items" :name="index" :key="index">
          <template slot="title">
            {{submenu.templateName}}
          </template>
          <MenuItem v-for="(subItem,subIndex) in submenu.children" :name="index + '-' + subIndex" :key="subIndex">
          <router-link :to="{ path: subItem.path, query: { subMenuTitle: subItem.name }}">
            <Tooltip :content="subItem.name" placement="right" :transfer="true">
              <p>{{subItem.name}}</p>
            </Tooltip>
          </router-link>
          </MenuItem>
        </Submenu>
      </Menu>
    </div>
  </div>
</template>
<script>
export default {
  name: "distMenu",
  props: {
    firstDeckMenu: {
      type: Array,
      required: true
    },
    secondDeckMenu: {
      type: Array,
      required: true
    },
    EventBus: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      theme3: "light",
      spanLeft: "100%",
      spanRight: "0",
      showSearch: true,
      currentFirstDeckName: 0,
      currentSecondDeckName: 0,
      currentSecondDeckDoubleName: "",
      scrollStatus: "auto",
    };
  },
  watch: {

  },
  computed: {
    currentMenuItems() {
      let menus = [];
      if (
        this.secondDeckMenu &&
        this.secondDeckMenu.length > 0
      ) {
        menus = this.secondDeckMenu[this.currentFirstDeckName];
      }
      if (Object.keys(menus).length === 0) {
        this.spanLeft = "100%";
        this.spanRight = "0";
        this.$emit("showSubMenu", { isShow: false });
        // this.$emit('hideMap', { isShow: true });
      } else {
        this.spanLeft = "25%";
        this.spanRight = "75%";
        this.$emit("showSubMenu", { isShow: true });
        // this.$emit('hideMap', { isShow: true });
      }
      return menus;
    }
  },
  beforeMount() {

  },
  mounted() {
    this.hideSubMenu();
  },
  methods: {
    /** get all attributes  所有可在页面设计器中设置的属性 */
    changeFirstDeckMenu(name) {
      this.currentFirstDeckName = name;
      this.currentSecondDeckName = "";
      if (this.firstDeckMenu[name].path) {
        this.$router.push({ path: this.firstDeckMenu[name].path });
      }
    },
    changeSecondDeckMenu(name) {
      this.currentSecondDeckName = name;
      if (this.currentMenuItems.items[name].path) {
        this.$router.push({
          path: this.currentMenuItems.items[name].path,
          query: { subMenuTitle: this.currentMenuItems.items[name].name }
        });
      }
    },
    changeSecondDeckDoubleMenu(name) {
      this.currentSecondDeckDoubleName = name;
    },
    hideSubMenu() {
      const vm = this;
      this.EventBus.$on("hideSubMenu", data => {
        if (data.isShow === false) {
          vm.spanLeft = "100%";
          vm.spanRight = "0";
          vm.scrollStatus = "hidden";
        } else {
          vm.scrollStatus = "auto";
          vm.spanLeft = "25%";
          vm.spanRight = "75%";
        }
      });
    },
  }
};
</script>

<style scoped>
a {
  color: #49505f;
}

.menuBar {
  width: 100%;
  height: 100%;
}

.menuLeft {
  float: left;
  height: 100%;
  background-color: yellowgreen;
}

.oneDeckMenu {
  background-color: #0a1e3c;
  color: #fafafa;
  text-align: center;
}

.menuRight {
  float: left;
  height: 100%;
}

.tooltip {
  z-index: 9999;
}

.oneDeckMenuItem {
  height: 72px;
  padding: 0 !important;
}

.oneDeckMenuItem i {
  line-height: 72px;
  margin-right: 0px;
}

.searchArea {
  background: #f5f5f5;
  border-right: 1px solid #dddee1;
  padding: 10px 0;
}

.searchInput {
  width: 100%;
  height: 24px;
  margin-bottom: 8px;
  padding: 0 5px;
}

#secondDeck {
  font-size: 14px;
}

.menuRight p {
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
