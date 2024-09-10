import WinnerMonster from "@/components/WinnerMonster.vue";
import { shallowMount } from "@vue/test-utils";

describe("WinnerMonster.vue", () => {
  const playerMonster = {
    id: "1",
    name: "Dragon",
    attack: 80,
    defense: 60,
    hp: 100,
    speed: 90,
  };

  const cpuMonster = {
    id: "2",
    name: "Phoenix",
    attack: 85,
    defense: 70,
    hp: 95,
    speed: 80,
  };

  it("renders the player as the winner when playerMonster wins", () => {
    const wrapper = shallowMount(WinnerMonster, {
      props: {
        winner: playerMonster,
        tie: false,
        playerMonster,
        cpuMonster,
      },
    });
    expect(wrapper.text()).toContain("Dragon Wins!");
    expect(wrapper.classes()).toContain("bg-blue-100");
  });

  it("renders the computer as the winner when cpuMonster wins", () => {
    const wrapper = shallowMount(WinnerMonster, {
      props: {
        winner: cpuMonster,
        tie: false,
        playerMonster,
        cpuMonster,
      },
    });
    expect(wrapper.text()).toContain("Phoenix Wins!");
    expect(wrapper.classes()).toContain("bg-red-100");
  });

  it("renders the draw message when it is a tie", () => {
    const wrapper = shallowMount(WinnerMonster, {
      props: {
        winner: null,
        tie: true,
        playerMonster,
        cpuMonster,
      },
    });
    expect(wrapper.text()).toContain("Draw Battle...");
    expect(wrapper.classes()).toContain("bg-yellow-100");
  });

  it('renders "Unknown Wins!" when winner is null but tie is false', () => {
    const wrapper = shallowMount(WinnerMonster, {
      props: {
        winner: null,
        tie: false,
        playerMonster,
        cpuMonster,
      },
    });
    expect(wrapper.text()).toContain("Unknown Wins!");
    expect(wrapper.classes()).toContain("bg-gray-100");
  });

  it("has the correct accessibility role", () => {
    const wrapper = shallowMount(WinnerMonster, {
      props: {
        winner: playerMonster,
        tie: false,
        playerMonster,
        cpuMonster,
      },
    });
    expect(wrapper.attributes("role")).toBe("status");
  });
});
