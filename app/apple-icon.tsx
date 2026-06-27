import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #07110d 0%, #14543f 58%, #34d399 100%)",
          color: "#ecfdf5",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "rgba(7,9,7,0.88)",
            border: "2px solid rgba(52,211,153,0.72)",
            borderRadius: 34,
            display: "flex",
            flexDirection: "column",
            height: 126,
            justifyContent: "center",
            width: 126,
          }}
        >
          <div
            style={{
              color: "#34d399",
              fontSize: 46,
              fontWeight: 800,
              letterSpacing: 0,
              lineHeight: 1,
            }}
          >
            CM
          </div>
          <div
            style={{
              color: "#fbbf24",
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: 0,
              lineHeight: 1,
              marginTop: 8,
            }}
          >
            AI
          </div>
        </div>
      </div>
    ),
    size
  );
}
