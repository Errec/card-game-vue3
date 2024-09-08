import MonsterCard from "@/components/MonsterCard.vue";
import { shallowMount } from "@vue/test-utils";

describe("MonsterCard.vue", () => {
  it("renders monster details when monster is provided", () => {
    const monster = {
      id: "1",
      name: "Dragon",
      attack: 80,
      defense: 60,
      hp: 100,
      speed: 90,
      imageUrl: "https://example.com/dragon.jpg",
    };
    const wrapper = shallowMount(MonsterCard, {
      props: {
        monster,
        role: "Player",
      },
    });
    expect(wrapper.text()).toContain("Dragon");
    expect(wrapper.text()).toContain("Attack");
    expect(wrapper.text()).toContain("Defense");
    expect(wrapper.text()).toContain("HP");
    expect(wrapper.text()).toContain("Speed");
  });

  it("renders placeholder when no monster is provided", () => {
    const wrapper = shallowMount(MonsterCard, {
      props: {
        monster: null,
        role: "Computer",
      },
    });
    expect(wrapper.text()).toContain("Computer");
    expect(wrapper.text()).toContain("No monster selected");
  });
});
