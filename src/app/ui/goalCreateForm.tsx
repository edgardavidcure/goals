"use client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Changed from navigation to router
import { GoalSchema } from "../lib/actions";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function GoalCreateForm() {
  const radioOptions = [
    { value: "Pending", label: "Pending" },
    { value: "InProgress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
  ];

  const categoryOptions = [
    { value: "Physical", label: "Physical" },
    { value: "Spiritual", label: "Spiritual" },
    { value: "Intellectual", label: "Intellectual" },
    { value: "Social", label: "Social" },
  ];

  const [newGoalValues, setNewGoalValues] = useState<any>({
    title: "",
    categoryId: "",
    description: "",
    status: "",
  });

  const router = useRouter();
  const { data: session } = useSession();

  const handleCreateGoal = async () => {
    try {
      const userId = session?.user?.email;
      if (!userId) {
        throw new Error("User is not authenticated.");
      }
      const validationResult = GoalSchema.safeParse({
        title: newGoalValues.title,
        categoryId: newGoalValues.categoryId,
        description: newGoalValues.description,
        status: newGoalValues.status,
      });
      if (!validationResult.success) {
        return {
          errors: validationResult.error.flatten().fieldErrors,
          message: "Missing Fields. Failed to Create Goal.",
        };
      }
      const response = await fetch("/api/createGoal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...newGoalValues }),
      });

      if (!response.ok) {
        throw new Error(
          `Error creating goal: ${response.status} - ${response.statusText}`,
        );
      } else {
        router.push(`/dashboard/goals`);
      }
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };
  const initialState: {
    message: string;
    errors: {
      title?: string[];
      description?: string[];
      status?: string[];
      categoryId?: string[];
    };
  } = { message: "", errors: {} };
  const [state, dispatch] = useFormState(handleCreateGoal, initialState);

  return (
    <div className="flex flex-col relative gap-10 bg-extra-light-orange w-full py-10 px-6 rounded-xl">
      <div>
        <h2 className="text-2xl mb-0">New goal</h2>
        <p className="mt-0 text-black text-sm font-extralight italic">
          Create your new goal
        </p>
      </div>
      <form action={dispatch} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-bold">
            Title <span>*</span>
          </label>
          <input
            type="text"
            value={newGoalValues.title}
            onChange={(e) =>
              setNewGoalValues({ ...newGoalValues, title: e.target.value })
            }
            className="bg-white border border-light-orange text-black text-sm rounded-lg focus:ring-dark-blue focus:border-dark-blue block w-full p-2.5  placeholder:italic placeholder:font-light"
            id="title"
            name="title"
            placeholder="Write your goal title here..."
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-bold">
            Description
          </label>
          <textarea
            value={newGoalValues.description}
            onChange={(e) =>
              setNewGoalValues({
                ...newGoalValues,
                description: e.target.value,
              })
            }
            id="description"
            name="description"
            className="block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-light-orange focus:ring-dark-blue focus:border-dark-blue placeholder:italic placeholder:font-light"
            placeholder="Write your goal description here..."
          />
        </div>

        <div>
          <h1 className="text-lg font-bold mb-0">
            Status <span>*</span>
          </h1>
          <div className="flex w-40 border p-1 flex-wrap  border-light-orange bg-white rounded-lg md:w-full md:max-w-full  md:justify-evenly">
            {radioOptions.map((option) => (
              <div
                key={option.value}
                className="w-full  p-2 flex items-center md:w-fit hover:bg-extra-light-orange"
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={newGoalValues.status === option.value}
                  onChange={() =>
                    setNewGoalValues({ ...newGoalValues, status: option.value })
                  }
                  id={option.value}
                  aria-describedby="status-error"
                  className={clsx("w-4 h-4 bg-white border-gray", {
                    "text-green focus:ring-white": option.value === "Completed",
                    "text-yellow focus:ring-white":
                      option.value === "InProgress",
                    "text-gray focus:ring-white": option.value === "Pending",
                  })}
                />
                <label
                  htmlFor={option.value}
                  className="whitespace-nowrap text-sm px-2"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div>
          <h1 className="text-lg font-bold m-0">
            Category <span>*</span>
          </h1>
          <div className="flex w-40 border p-1 flex-wrap  border-light-orange bg-white rounded-lg md:w-full md:max-w-full  md:justify-evenly">
            {categoryOptions.map((option) => (
              <div
                key={option.value}
                className="w-full  p-2 flex items-center md:w-fit hover:bg-extra-light-orange"
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={newGoalValues.categoryId === option.value}
                  onChange={() =>
                    setNewGoalValues({
                      ...newGoalValues,
                      categoryId: option.value,
                    })
                  }
                  id={option.value}
                  aria-describedby="categoryId-error"
                  className={clsx("w-4 h-4 bg-white border-gray", {
                    "text-cpink focus:ring-white": option.value === "Physical",
                    "text-cblue focus:ring-white": option.value === "Spiritual",
                    "text-corange focus:ring-white": option.value === "Social",
                    "text-cgreen focus:ring-white":
                      option.value === "Intellectual",
                  })}
                />
                <label
                  htmlFor={option.value}
                  className="whitespace-nowrap text-sm px-2"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div id="categoryId-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.categoryId &&
              state.errors.categoryId.map((error: string) => (
                <p className="mt-2 text-sm text-red italic" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div aria-live="polite" aria-atomic="true">
          {state?.message ? (
            <p className="mt-2 text-sm text-red italic">{state?.message}</p>
          ) : null}
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Link
            href={"/dashboard/goals/"}
            className="w-fit p-2 rounded-lg bg-extra-light-orange text-black hover:bg-light-orange"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="w-fit p-2 rounded-lg bg-dark-blue text-white hover:opacity-80"
          >
            Create Goal
          </button>
        </div>
      </form>
    </div>
  );
}
