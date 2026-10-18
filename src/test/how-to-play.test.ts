import { describe, expect, it } from "vitest";
import { determineWinner, gameRules } from "@/lib/how-to-play";

describe("Hostel match rules", () => {
  it("requires a 45-second elimination cooldown", () =>
    expect(gameRules.eliminationCooldownSeconds).toBe(45));
  it("requires meeting arrival within 45 seconds", () =>
    expect(gameRules.meetingArrivalSeconds).toBe(45));
  it("allows three minutes of discussion", () => expect(gameRules.discussionSeconds).toBe(180));
  it("forfeits early role-card disclosure", () =>
    expect(gameRules.roleRevealBeforeElimination).toBe("forfeit"));
  it("permits walking only", () => expect(gameRules.movement).toBe("walking"));
  it("permits conversation only in emergency council", () =>
    expect(gameRules.conversation).toBe("emergency council only"));
  it("limits contact to gentle elimination shoulder taps", () =>
    expect(gameRules.physicalContact).toBe("gentle elimination shoulder tap only"));
  it("excludes private study halls, washrooms and closed-door dorms", () =>
    expect(gameRules.offLimits).toEqual(["private study halls", "washrooms", "closed-door dorms"]));
  it("does not allow ghosts to reveal killers", () =>
    expect(gameRules.ghostsMayRevealKillers).toBe(false));
  it("awards crew victory after all impostors are ejected", () =>
    expect(determineWinner(0, 4, false)).toBe("crewmates"));
  it("awards crew victory when all survivors finish verified tasks", () =>
    expect(determineWinner(1, 4, true)).toBe("crewmates"));
  it("awards impostor victory at parity but not before", () => {
    expect(determineWinner(2, 2, false)).toBe("impostors");
    expect(determineWinner(2, 3, false)).toBeNull();
  });
});
