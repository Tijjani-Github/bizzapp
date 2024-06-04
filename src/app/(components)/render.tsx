interface RenderProps {
  condition: boolean;
  children: React.ReactNode;
}
export default function ShouldRender({ condition, children }: RenderProps) {
  if (!condition) return null;

  return children;
}
