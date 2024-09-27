import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "./TaskList";
import * as taskApi from "../../features/api/taskApi"; // Import the taskApi to mock its hooks

// Mock API hooks from taskApi
jest.mock("../../features/api/taskApi", () => ({
  __esModule: true,
  ...jest.requireActual("../../features/api/taskApi"),
  useGetTasksQuery: jest.fn(),
  useUpdateTaskMutation: jest.fn(),
  useDeleteTaskMutation: jest.fn(),
}));

describe("TaskList Component", () => {
  // Define mock functions
  const mockUpdateTask = jest.fn();
  const mockDeleteTask = jest.fn();

  beforeEach(() => {
    // Cast the mocks to `jest.Mock` to avoid TypeScript errors
    (taskApi.useGetTasksQuery as jest.Mock).mockReturnValue({
      data: [
        {
          id: "1",
          title: "Task 1",
          description: "Description 1",
          status: "pending",
          createdAt: new Date().toISOString(),
        },
      ],
      isLoading: false,
    });

    (taskApi.useUpdateTaskMutation as jest.Mock).mockReturnValue([
      mockUpdateTask,
      { isLoading: false },
    ]);

    (taskApi.useDeleteTaskMutation as jest.Mock).mockReturnValue([
      mockDeleteTask,
      { isLoading: false },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks to reset state between tests
  });

  it("renders task list with tasks", () => {
    render(<TaskList />);
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
  });

  it("shows loading spinner when loading", () => {
    // Update the mock implementation to simulate loading state
    (taskApi.useGetTasksQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
    });

    render(<TaskList />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
