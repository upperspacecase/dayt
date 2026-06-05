export default function Plate({
  tint,
  tag,
  className,
  scrim,
  children,
}: {
  tint: string;
  tag?: string;
  className?: string;
  scrim?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={"plate " + (className || "")}
      style={{ "--tint": tint } as React.CSSProperties}
    >
      {scrim ? <div className="scrim-bottom" /> : null}
      {tag ? <div className="plate-tag">{tag}</div> : null}
      {children}
    </div>
  );
}
