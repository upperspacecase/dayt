export const metadata = { title: "Privacy — Dayt Knight" };

const SECTIONS: [string, string][] = [
  ["What we collect", "Your email, if you give it to us for the daily three. Anything you type into a concept you create. That's it — we don't ask for more than we need."],
  ["How we use it", "Your email is used to send you date ideas, through Resend. We don't sell your data or share it with advertisers."],
  ["Stored on your device", "Right now, your Club access and the concepts you create are saved in your browser's local storage. When accounts arrive, they'll move to a secure database so they follow you across devices."],
  ["Unsubscribe", "Each email has an unsubscribe link. Use it any time and we'll stop."],
  ["Contact", "Want your data removed? Reply to any Dayt Knight email and we'll handle it."],
];

export default function Privacy() {
  return (
    <main className="detail">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div className="club-head" style={{ paddingBottom: 8 }}>
          <div className="lockline">Privacy</div>
          <h1 className="club-title" style={{ fontSize: "clamp(34px,4.5vw,56px)" }}>Privacy</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 24 }}>
          {SECTIONS.map(([t, d]) => (
            <div key={t}>
              <h2 className="serif" style={{ fontSize: 24, margin: 0 }}>{t}</h2>
              <p style={{ color: "var(--ink-soft)", lineHeight: 1.65, marginTop: 8 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
