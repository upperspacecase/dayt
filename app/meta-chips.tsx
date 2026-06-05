export default function MetaChips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      {items.map((t, i) => (
        <span className="meta-chip" key={i}>
          <span className="dot" />
          {t}
        </span>
      ))}
    </div>
  );
}
