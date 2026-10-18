import { describe, expect, it } from "vitest";
import { eventDetails } from "@/lib/event-details";

describe("Event schedule", () => {
  it("takes place on 14 November 2026", () => expect(eventDetails.date).toBe("2026-11-14"));
  it("starts at 4 pm", () => expect(eventDetails.startTime).toBe("16:00"));
  it("ends at 8 pm", () => expect(eventDetails.endTime).toBe("20:00"));
  it("takes place at BHEL Hostel", () => expect(eventDetails.location).toBe("BHEL Hostel"));
});
