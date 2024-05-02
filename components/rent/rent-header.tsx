import { Check } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface RentHeaderProps {
  steps: {
    title: string;
    step: number;
  }[];
  currentStep: number;
  handleChangeStep: (step: number) => void;
}

const RentHeader = ({
  steps,
  currentStep,
  handleChangeStep,
}: RentHeaderProps) => {
  return (
    <div className="border-b absolute w-full top-0 " style={{ marginTop: "100px" }}>
      <div className="container mx-auto px-6 py-4 flex justify-around items-center">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className={twMerge(
              "flex items-center justify-center gap-4 text-white/50 cursor-pointer",
              currentStep >= step.step && "text-white"
            )}
            onClick={() => handleChangeStep(step.step)}
          >
            <span
              className={twMerge(
                "size-8 rounded-full border-2 grid place-content-center border-white/50",
                currentStep === step.step && "border-primary",
                currentStep > step.step && "border-none text-white bg-primary"
              )}
            >
              {currentStep > step.step ? (
                <Check className="size-4" />
              ) : (
                step.step
              )}
            </span>
            <span
              className={twMerge(
                "hidden lg:inline",
                currentStep === step.step && "font-medium"
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentHeader;
