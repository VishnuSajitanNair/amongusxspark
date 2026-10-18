import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RegistrationForm } from "@/components/registration-form";

describe("RegistrationForm", () => {
  it("hides the side panel on submit, displays the character in the thank-you screen, and randomizes on reset", () => {
    render(<RegistrationForm />);

    // Initially, form and side panel should both exist
    expect(screen.getByRole("heading", { name: "Registration" })).toBeInTheDocument();
    const initialAside = document.querySelector("aside.character-panel");
    expect(initialAside).toBeInTheDocument();

    const initialImg = initialAside?.querySelector("img");
    expect(initialImg).toBeInTheDocument();
    const initialSrc = initialImg?.getAttribute("src");

    // Fill form fields
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Crewmate Red" } });
    fireEvent.change(screen.getByLabelText(/Scholar No/i), { target: { value: "24U01001" } });
    fireEvent.change(screen.getByLabelText(/Email ID/i), {
      target: { value: "crewmate@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "9876543210" } });
    fireEvent.change(screen.getByLabelText(/Branch/i), { target: { value: "CSE CORE" } });
    fireEvent.change(screen.getByLabelText(/Hostel/i), { target: { value: "BHEL" } });

    // Submit form
    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);

    // After submit:
    // 1. Thank you message appears
    expect(screen.getByText(/THANK YOU. YOUR RESPONSE HAS BEEN RECORDED/i)).toBeInTheDocument();

    // 2. The side panel disappears
    expect(document.querySelector("aside.character-panel")).toBeNull();

    // 3. The image is now inside the thank you panel
    const thankYouPanel = screen
      .getByText(/THANK YOU. YOUR RESPONSE HAS BEEN RECORDED/i)
      .closest(".registration-panel");
    expect(thankYouPanel).not.toBeNull();
    const submittedImg = thankYouPanel?.querySelector("img.character-img");
    expect(submittedImg).toBeInTheDocument();
    expect(submittedImg?.getAttribute("src")).toBe(initialSrc);

    // 4. Submit Another Response button exists
    const resetBtn = screen.getByRole("button", { name: /Submit Another Response/i });
    expect(resetBtn).toBeInTheDocument();

    // Click "Submit Another Response"
    fireEvent.click(resetBtn);

    // After reset:
    // 1. Thank you message is gone
    expect(screen.queryByText(/THANK YOU. YOUR RESPONSE HAS BEEN RECORDED/i)).toBeNull();

    // 2. Side panel is back
    const newAside = document.querySelector("aside.character-panel");
    expect(newAside).toBeInTheDocument();

    // 3. New character is shown (randomized)
    const newImg = newAside?.querySelector("img");
    expect(newImg).toBeInTheDocument();
    // Since reset guarantees a different character when characters.length > 1:
    expect(newImg?.getAttribute("src")).not.toBe(initialSrc);
  });

  it("renders Branch and Hostel dropdowns with all specified options", () => {
    render(<RegistrationForm />);

    const branchSelect = screen.getByLabelText(/Branch/i) as HTMLSelectElement;
    expect(branchSelect).toBeInTheDocument();
    const branchOptionsList = Array.from(branchSelect.options).map((o) => o.value);
    expect(branchOptionsList).toEqual([
      "",
      "CSE CORE",
      "CSE SPECIALIZATION",
      "ECE",
      "IT",
      "PNC",
      "MNC",
    ]);

    const hostelSelect = screen.getByLabelText(/Hostel/i) as HTMLSelectElement;
    expect(hostelSelect).toBeInTheDocument();
    const hostelOptionsList = Array.from(hostelSelect.options).map((o) => o.value);
    expect(hostelOptionsList).toEqual(["", "BHEL", "P&T", "GIRLS HOSTEL"]);
  });
});
