import { render, screen } from "@testing-library/react";

import DisplayName from "./DisplayName";

describe("DisplayName", () => {
  it("renders first and last name", () => {
    render(<DisplayName first="Amara" last="Nwosu" />);
    expect(screen.getByText("Amara Nwosu")).toBeTruthy();
  });
});
