import React from "react";
import { render } from "@testing-library/react";
import App from "App";

test("renders greeting when not logged in", () => {
  const { getByText } = render(<App />);
  const greeting = getByText(/Sign in/i);
  expect(greeting).toBeInTheDocument();
});
