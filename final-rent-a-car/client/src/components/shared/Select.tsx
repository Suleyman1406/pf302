import ArrowDownImg from "@/assets/icons/arrow-down.svg";
import { useMemo, useRef, useState } from "react";
import { RenderIf } from "./RenderIf";
import { useOnClickOutside } from "usehooks-ts";

type Props = {
  label: string;
  placeholder: string;
  options: { label: string; value: string }[];
  value: string | null;
  onChange: (value: string) => void;
};

export const CustomSelect = ({
  label,
  options,
  placeholder,
  value,
  onChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const selectedOptionLabel = useMemo(
    () => options.find((option) => option.value === value)?.label,
    [options, value]
  );

  function toggle() {
    setIsOpen(!isOpen);
  }

  function close() {
    setIsOpen(false);
  }

  useOnClickOutside(ref, close);
  return (
    <div>
      <h5 className="text-secondary-500 text-base font-bold leading-[20px] tracking-[-0.32px] mb-2">
        {label}
      </h5>

      <div ref={ref} className="relative">
        <div onClick={toggle} className="flex justify-between cursor-pointer">
          <p className="text-xs text-secondary-300 font-medium tracking-[-0.24px]">
            {selectedOptionLabel || placeholder}
          </p>
          <img src={ArrowDownImg} alt="Arrow Down" />
        </div>
        <RenderIf condition={isOpen}>
          <div className="absolute top-6 w-full bg-white  mt-1 border border-secondary/50 z-20">
            <ul>
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    close();
                  }}
                  className="p-2 hover:bg-information/60 cursor-pointer"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        </RenderIf>
      </div>
    </div>
  );
};
