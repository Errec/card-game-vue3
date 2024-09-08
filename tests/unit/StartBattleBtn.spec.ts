import StartBattleBtn from "@/components/StartBattleBtn.vue";
import { mount } from "@vue/test-utils";

describe("StartBattleBtn.vue", () => {
  it("is enabled when enabled prop is true", () => {
    const wrapper = mount(StartBattleBtn, { props: { enabled: true } });
    expect(wrapper.find("button").attributes("disabled")).toBeFalsy();
  });

  it("is disabled when enabled prop is false", () => {
    const wrapper = mount(StartBattleBtn, { props: { enabled: false } });
    expect(wrapper.find("button").attributes("disabled")).toBe("");
  });

  it("emits start-battle event when clicked and enabled", async () => {
    const wrapper = mount(StartBattleBtn, { props: { enabled: true } });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("start-battle")).toBeTruthy();
  });

  it("renders correct text", () => {
    const wrapper = mount(StartBattleBtn, { props: { enabled: true } });
    expect(wrapper.text()).toBe("Start Battle");
  });
});
