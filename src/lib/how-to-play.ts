import roleVideo from "@/assets/role-assignment.webm.asset.json";
import roleSound from "@/assets/role-assignment.mp3.asset.json";
import tasksVideo from "@/assets/tasks.webm.asset.json";
import tasksSound from "@/assets/tasks.mp3.asset.json";
import eliminationVideo from "@/assets/elimination.webm.asset.json";
import eliminationSound from "@/assets/elimination-new.mp3.asset.json";
import emergencyVideo from "@/assets/emergency.webm.asset.json";
import emergencySound from "@/assets/emergency.mp3.asset.json";
import winningVideo from "@/assets/winning.webm.asset.json";
import rulesVideo from "@/assets/rules-new.webm.asset.json";
import rulesSound from "@/assets/rules-sound.mp3.asset.json";
import victorySound from "@/assets/victory.mp3.asset.json";

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

export function determineWinner(
  impostors: number,
  crewmates: number,
  allSurvivingCrewTasksVerified: boolean,
) {
  if (impostors === 0 || allSurvivingCrewTasksVerified) return "crewmates";
  if (impostors >= crewmates) return "impostors";
  return null;
}

export const howToPlay = [
  {
    id: "role-assignment",
    title: "ROLE ASSIGNMENT",
    video: roleVideo.url,
    sound: roleSound.url,
    description: `Before the game begins, everyone picks a folded slip of paper from the Game Master. If your slip has a "C", you are an innocent Crewmate; if it has an "I", you are an Impostor. Check your letter quietly and keep it completely secret—never show your paper to anyone until you are eliminated or the game ends.`,
  },
  {
    id: "tasks",
    title: "TASKS",
    video: tasksVideo.url,
    sound: tasksSound.url,
    description: `As a Crewmate, your main job is to finish all the chores listed on your task card across the floor. You’ll do quick, fun activities like timing a 20-second download on your phone, untangling cables, or tossing paper balls into a bin. Completing all your tasks helps your team win, but keep an eye on your surroundings—standing still to do a task leaves you open to an attack!`,
  },
  {
    id: "elimination",
    title: "ELIMINATION",
    video: eliminationVideo.url,
    sound: eliminationSound.url,
    description: `As an Impostor, your goal is to secretly eliminate Crewmates without getting caught. When you find a player alone, gently tap them on the shoulder to knock them out of the game. Once you make a kill, you must start a 45-second timer on your phone and wait until it runs out before you can tap anyone else, giving you time to walk away and pretend you were doing tasks.`,
  },
  {
    id: "emergency",
    title: "EMERGENCY",
    video: emergencyVideo.url,
    sound: emergencySound.url,
    description: `Whenever someone spots a tapped player and yells "DEAD BODY!" or hits the emergency bell in the common room, all players must stop and gather immediately. You get 3 minutes to discuss who looks suspicious, share where you were, and spot the liars. At the end, everyone points at their top suspect on the count of three; whoever gets the most votes is kicked out of the round, while eliminated players must sit quietly and cannot talk or vote.`,
  },
  {
    id: "winning",
    title: "WINNING",
    video: winningVideo.url,
    sound: victorySound.url,
    description: `The Crewmates win if they work together to vote out every Impostor, or if all surviving players finish every single task on their cards. The Impostors win if they eliminate enough Crewmates so that both sides have an equal number of players left (for example, 2 Impostors vs 2 Crewmates).`,
  },
  {
    id: "rules",
    title: "RULES",
    video: rulesVideo.url,
    sound: rulesSound.url,
    description: `To keep things fun and fair, there is strictly no talking in the corridors—you can only speak during Emergency Meetings. Always walk normally (no running, sliding, or pushing) to stay safe and quiet. Respect private spaces by staying out of washrooms and closed dorm rooms, and remember: if you are eliminated, you must stay completely silent and never give away who tapped you.`,
  },
];
