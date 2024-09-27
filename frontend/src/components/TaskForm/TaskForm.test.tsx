import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskForm from "./TaskForm";

jest.mock("../../features/api/taskApi", () => ({
  useAddTaskMutation: () => [jest.fn()],
}));

test("renders task form", () => {
  render(<TaskForm />);
  expect(screen.getByPlaceholderText(/Task Title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Task Description/i)).toBeInTheDocument();
});

test("allows users to add a task", () => {
  render(<TaskForm />);
  fireEvent.change(screen.getByPlaceholderText(/Task Title/i), {
    target: { value: "New Task" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Task Description/i), {
    target: { value: "New Description" },
  });

  const submitButton = screen.getByText(/Add Task/i);
  fireEvent.click(submitButton);

  expect(submitButton).toBeInTheDocument();
});
