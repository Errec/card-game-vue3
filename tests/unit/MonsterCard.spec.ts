import MonsterCard from "@/components/MonsterCard.vue";
import { Monster } from "@/schemas/monsterSchema";
import { mount } from "@vue/test-utils";

describe("MonsterCard.vue", () => {
  const monster: Monster = {
    id: "1",
    name: "Dragon",
    attack: 80,
    defense: 60,
    hp: 100,
    speed: 90,
    imageUrl: "https://example.com/dragon.jpg",
  };

  it("renders monster details correctly", () => {
    const wrapper = mount(MonsterCard, {
      props: {
        monster,
      },
    });

    // Check if the name is rendered
    expect(wrapper.text()).toContain(monster.name);

    // Check if the image URL is correct
    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe(monster.imageUrl);

    // Check if the stats are rendered correctly
    expect(wrapper.text()).toContain("Attack:");
    expect(wrapper.text()).toContain("Defense:");
    expect(wrapper.text()).toContain("HP:");
    expect(wrapper.text()).toContain("Speed:");
  });

  it("renders default image when imageUrl is missing", () => {
    const wrapper = mount(MonsterCard, {
      props: {
        monster: {
          ...monster,
          imageUrl: "", // Set imageUrl to empty to test fallback
        },
      },
    });

    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe("/src/assets/images/placeholder.png");
  });

  it("renders correct stat bars width", () => {
    const wrapper = mount(MonsterCard, {
      props: {
        monster,
      },
    });

    const statBars = wrapper.findAll(".bg-monster-green");
    const statWidths = [
      monster.attack,
      monster.defense,
      monster.hp,
      monster.speed,
    ];

    statBars.forEach((bar, index) => {
      expect(bar.attributes("style")).toContain(`width: ${statWidths[index]}%`);
    });
  });
});
