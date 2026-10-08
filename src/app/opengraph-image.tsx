import { ImageResponse } from "next/og";

export const alt = "Temitope Samuel — Product Designer & Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  const lines = Array.from({ length: 19 }, (_, i) => i * 34 + 33);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F5F3EE", position: "relative", color: "#191510" }}>
        {lines.map((y) => (
          <div key={y} style={{ position: "absolute", left: 0, right: 0, top: y, height: 1, background: "rgba(25,21,16,0.11)" }} />
        ))}
        <div style={{ display: "flex", fontSize: 30, color: "#191510" }}>my name is</div>
        <div style={{ display: "flex", marginTop: 24, padding: "18px 48px", border: "4px solid #FF6A35", borderRadius: 6, fontSize: 150, fontWeight: 900, letterSpacing: -4 }}>TEMITOPE</div>
        <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
          <div style={{ display: "flex", background: "#F7C948", padding: "12px 26px", fontSize: 30, transform: "rotate(-3deg)" }}>Product Designer</div>
          <div style={{ display: "flex", background: "#A9DFC6", padding: "12px 26px", fontSize: 30, transform: "rotate(2deg)" }}>Design Engineer</div>
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 34, fontWeight: 600 }}>I design digital products and build them with AI.</div>
      </div>
    ),
    size,
  );
}
