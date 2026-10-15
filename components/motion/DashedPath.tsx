"use client";

import { useId, type SVGProps } from "react";

/**
 * A dotted/dashed path that can be "drawn" with GSAP DrawSVG. DrawSVG takes over
 * stroke-dasharray, so instead we draw a solid mask path (`maskClassName`) and
 * let the dotted stroke show through it.
 */
export function DashedPath({ d, maskClassName, ...rest }: { d: string; maskClassName: string } & SVGProps<SVGPathElement>) {
  const id = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <mask id={`dm-${id}`} maskUnits="userSpaceOnUse">
          <path className={maskClassName} d={d} fill="none" stroke="#fff" strokeWidth={14} strokeLinecap="round" />
        </mask>
      </defs>
      <path d={d} fill="none" mask={`url(#dm-${id})`} {...rest} />
    </g>
  );
}
