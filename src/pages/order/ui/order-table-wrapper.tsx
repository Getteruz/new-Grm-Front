import clsx from "clsx";

import { IOrderTable } from "../type";

export default function OrderTableWrapper({
  title,
  Colms,
  children,
  className,
}: IOrderTable) {
  return (
    <div
      className={clsx(
        "w-full bg-[#DBDAD1] border-[#CBCBC1]  border",
        className
      )}
    >
      <p className="text-[12px] leading-[14px] text-[#212121] py-[9px] px-[11px]">
        {title}
      </p>
      <ul className="w-full">
        {Colms && (
          <li className="w-full flex gap-2 items-center px-[11px] py-[3px] border-[#CBCBC1] bg-[#E0DFD6]  border-y">
            {Colms.map((e: string, i: number) => (
              <p
                key={i}
                className="text-[#A4A398] text-[12px] leading-[14px] w-full"
              >
                {e}
              </p>
            ))}
          </li>
        )}

        {children}
      </ul>
    </div>
  );
}