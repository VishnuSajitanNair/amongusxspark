import roleVideo from "@/assets/role-assignment.mp4.asset.json";
import roleSound from "@/assets/role-assignment.mp3.asset.json";
import tasksVideo from "@/assets/tasks.mp4.asset.json";
import tasksSound from "@/assets/tasks.mp3.asset.json";
import eliminationVideo from "@/assets/elimination.mp4.asset.json";
import eliminationSound from "@/assets/elimination.mp3.asset.json";
import emergencyVideo from "@/assets/emergency.mp4.asset.json";
import emergencySound from "@/assets/emergency.mp3.asset.json";
import winningVideo from "@/assets/winning.mp4.asset.json";
import rulesVideo from "@/assets/rules.mp4.asset.json";

export const gameRules = {
  eliminationCooldownSeconds: 45,
  meetingArrivalSeconds: 45,
  discussionSeconds: 180,
  roleRevealBeforeElimination: "forfeit",
  movement: "walking",
  conversation: "emergency council only",
  physicalContact: "gentle elimination shoulder tap only",
  offLimits: ["private study halls", "washrooms", "closed-door dorms"],
  ghostsMayRevealKillers: false,
} as const;

export function determineWinner(impostors: number, crewmates: number, allSurvivingCrewTasksVerified: boolean) {
  if (impostors === 0 || allSurvivingCrewTasksVerified) return "crewmates";
  if (impostors >= crewmates) return "impostors";
  return null;
}

export const howToPlay = [
  {
    id: "role-assignment", title: "ROLE ASSIGNMENT", video: roleVideo.url, sound: roleSound.url,
    description: `At the start of the round, every player draws a single folded slip or index card from the Game Master to determine their covert identity for the match. Marked discreetly with either a "C" for Crewmate or an "I" for Impostor, this card must remain an absolute secret—checking your role requires a stealthy glance away from wandering eyes, and flashing your card to anyone before elimination results in an immediate game ${gameRules.roleRevealBeforeElimination}. Depending on your draw, you either step out into the corridor as an innocent worker rushing to fix the floor, or as a silent predator ready to blend into the crowd and strike from the shadows.`,
  },
  {
    id: "tasks", title: "TASKS", video: tasksVideo.url, sound: tasksSound.url,
    description: `Armed with a personalized manifest at spawn, your primary mission as a Crewmate is to navigate the floor and complete hands-on maintenance stations—from stabilizing cup grids and routing cables to clocking timed data uploads—without getting caught alone in a dark corner. Every station you clear chips away at the collective task bar, giving your team a direct path to victory without ever having to identify a single killer. However, focus comes with immense vulnerability: eyes glued to a stopwatch or untangling a knot means your back is wide open, making constant spatial awareness and buddy systems the only real buffer between completing your shift and becoming the next corpse on the corridor floor.`,
  },
  {
    id: "elimination", title: "ELIMINATION", video: eliminationVideo.url, sound: eliminationSound.url,
    description: `Stealth, timing, and nerves of steel define the Impostor’s lethal playbook: your mission is to systematically pick off isolated Crewmates while faking chores to blend seamlessly into the crowd. An elimination is executed with a subtle, silent tap on a lone target's shoulder, instantly freezing them into a mute corpse on the floor before they even realize you were there. The moment the strike lands, your mandatory ${gameRules.eliminationCooldownSeconds}-second cooldown timer begins ticking on your phone—meaning you cannot eliminate again until it runs out, forcing you to swiftly slip away, establish a clean alibi at a nearby task station, and act completely baffled when the alarm inevitably echoes down the hallway.`,
  },
  {
    id: "emergency", title: "EMERGENCY", video: emergencyVideo.url, sound: emergencySound.url,
    description: `The moment a frantic shout of "DEAD BODY!" rings down the wing or someone slams the central emergency bell, all operations freeze and every surviving resident must report to the common room within ${gameRules.meetingArrivalSeconds} seconds for high-stakes interrogation. With eliminated players forced into strict silence as spectator ghosts, the living crew gets three chaotic minutes to cross-examine whereabouts, poke holes in flimsy alibis, and call out suspicious lingering near completed stations. Once deliberation wraps, the Game Master counts down to three and everyone simultaneously points an accusing finger at their prime suspect—or raises a closed fist to skip—sending whichever player collects the plurality of votes straight out the airlock to reveal whether the hostel just exiled a ruthless Impostor or mistakenly betrayed one of their own.`,
  },
  {
    id: "winning", title: "WINNING", video: winningVideo.url, sound: winningVideo.url,
    description: `Victory in the wing is decided by speed and deception in equal measure, with two entirely distinct paths to the winner's circle. The Crewmates seize victory the moment they successfully unmask and vote out every hidden Impostor in emergency council, or by sheer discipline if every surviving member races through their chores and turns in fully verified task manifests to the Game Master before the body count piles up. On the flip side, the Impostors clinch the game the instant their covert strikes dwindle the crew's numbers down to parity—meaning the count of living Impostors equals the remaining Crewmates—sealing the fate of the hostel floor in total sabotage and letting the traitors walk away unchecked.`,
  },
  {
    id: "rules", title: "RULES", video: rulesVideo.url, sound: rulesVideo.url,
    description: `To keep the match fair, safe, and free from administrative chaos, every participant must strictly adhere to the floor’s core code of conduct. Hallways operate under absolute radio silence—no side conversations, whispers, or hand gestures are permitted outside of official emergency council, meaning players can only talk when the room gathers to deliberate. Movement is strictly capped at a ${gameRules.movement} pace to prevent slips, collisions, or disturbance to neighbors, and physical contact is limited exclusively to the gentle elimination shoulder tap. Furthermore, private study halls, washrooms, and closed-door dorms remain completely off-limits, while eliminated "ghost" players are bound by an honor code never to speak, gesture, or shadow their killer to give the game away.`,
  },
];