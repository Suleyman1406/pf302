type Props = {
  condition: boolean;
  children: React.ReactNode;
};

export const RenderIf = ({ condition, children }: Props) => {
  return condition ? <>{children}</> : null;
};
