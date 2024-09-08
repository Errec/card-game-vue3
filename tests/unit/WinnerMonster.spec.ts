import WinnerMonster from "@/components/WinnerMonster.vue";
import { Monster } from "@/schemas/monsterSchema";
import { shallowMount } from "@vue/test-utils";

describe("WinnerMonster.vue", () => {
  const minimalMonster: Monster = {
    id: "1",
    name: "Dragon",
    attack: 0,
    defense: 0,
    hp: 0,
    speed: 0,
  };

  it("renders the winner message when there is a winner", () => {
    const wrapper = shallowMount(WinnerMonster, {
      props: {
        winner: minimalMonster,
        tie: false,
      },
    });
    expect(wrapper.text()).toContain("Dragon Wins!");
  });

  it("renders the draw message when it is a tie", () => {
    const wrapper = shallowMount(WinnerMonster, {
      props: {
        winner: null,
        tie: true,
      },
    });
    expect(wrapper.text()).toContain("Draw Battle...");
  });

  it('renders "Unknown Wins!" when winner is null but tie is false', () => {
    const wrapper = shallowMount(WinnerMonster, {
      props: {
        winner: null,
        tie: false,
      },
    });
    expect(wrapper.text()).toContain("Unknown Wins!");
  });

  it("has the correct accessibility role", () => {
    const wrapper = shallowMount(WinnerMonster, {
      props: {
        winner: minimalMonster,
        tie: false,
      },
    });
    expect(wrapper.attributes("role")).toBe("status");
  });
});
