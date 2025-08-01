import { tv } from "tailwind-variants";

export interface CircularProgressIndicatorProps {
  label: string;
  color: "blue" | "pink" | "orange" | "turquoise";
  currentProgress: number;
  target: number;
}

const buttonVariants = tv({
  base: "w-full h-full flex items-center justify-center rounded-full",
  variants: {
    color: {
      blue: "bg-blue-200",
      pink: "bg-pink-200",
      orange: "bg-orange-200",
      turquoise: "bg-turquoise-200",
    },
  },
});

export function CircularProgressIndicator({
  label,
  color,
  currentProgress,
  target,
}: CircularProgressIndicatorProps) {
  const progressDegree = (currentProgress / target) * 360;
  const progressColor = `--color-${color}-300`;

  return (
    <div
      className={buttonVariants({ color })}
      style={{
        backgroundImage: `conic-gradient(var(${progressColor}) 0deg, var(${progressColor}) ${progressDegree}deg, transparent ${progressDegree}deg, transparent 360deg)`,
      }}
    >
      <div className="flex size-4/5 flex-col items-center justify-center rounded-full bg-white text-sm lg:text-lg">
        <h4 className="w-3/4 text-center font-semibold lg:w-4/5">{label}</h4>
        <h5>
          {currentProgress} / {target}
        </h5>
      </div>
    </div>
  );
}
