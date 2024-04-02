import {
  CheckIcon,
  ClockIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function GoalCategory({ category }: { category: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-1 text-xs font-extralight italic",
        {
          "border-s-2 border-cblue text-black": category === "Spiritual",
          "border-s-2 border-cgreen text-black": category === "Social",
          "border-s-2 border-corange text-black": category === "Intellectual",
          "border-s-2 border-cpink text-black": category === "Physical",
        },
      )}
    >
      {category === "Spiritual" ? <>Spiritual</> : null}
      {category === "Social" ? <>Social</> : null}
      {category === "Intellectual" ? <>Intellectual</> : null}
      {category === "Physical" ? <>Physical</> : null}
    </span>
  );
}
