import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #07110d 0%, #0f2f26 52%, #34d399 100%)",
          color: "#ecfdf5",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "18px solid rgba(236,253,245,0.2)",
            borderRadius: "50%",
            height: 368,
            position: "absolute",
            width: 368,
          }}
        />
        <div
          style={{
            alignItems: "center",
            background: "rgba(7,9,7,0.86)",
            border: "4px solid rgba(52,211,153,0.72)",
            borderRadius: 72,
            boxShadow: "0 26px 80px rgba(0,0,0,0.45)",
            display: "flex",
            flexDirection: "column",
            height: 300,
            justifyContent: "center",
            width: 300,
          }}
        >
          <div
            style={{
              color: "#34d399",
              fontSize: 118,
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
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: 0,
              lineHeight: 1,
              marginTop: 18,
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
