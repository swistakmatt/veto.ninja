import { ReactNode } from "react";

export type ShowProps = {
  when: boolean;
  fallback?: ReactNode;
  children: ReactNode;
};

export function Show({ when, fallback, children }: ShowProps) {
  if (fallback === undefined) return <>{when && children}</>;
  return when ? <>{children}</> : <>{fallback}</>;
}
