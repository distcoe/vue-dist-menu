import { mount } from "@vue/test-utils";
import distMenu from "../src/distMenu.vue";

describe("distMenu.vue", () => {
  const wrapper = mount(distMenu, {
    propsData: {
      firstDeckMenu: [],
      secondDeckMenu: [],
      EventBus: {},
    }
  });
  it("no data to show", () => {
    expect(wrapper.html()).toContain("没有数据");
  });
  it("show distMenu with required props", () => {
    const firstDeckMenu = 2015
    const secondDeckMenu = [2013, 2014];
    const EventBus = {};
    wrapper.setProps({ currentTime, data });
    expect()
  });
});
