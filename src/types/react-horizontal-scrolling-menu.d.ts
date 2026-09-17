declare module "react-horizontal-scrolling-menu" {
  import type { Context, ReactNode } from "react";

  export const VisibilityContext: Context<{
    scrollPrev: () => void;
    scrollNext: () => void;
  }>;

  export function ScrollMenu(props: {
    LeftArrow?: () => ReactNode;
    RightArrow?: () => ReactNode;
    children?: ReactNode;
  }): ReactNode;
}
