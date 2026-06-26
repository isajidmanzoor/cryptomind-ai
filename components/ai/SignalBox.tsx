export default function SignalBox({ data }: any) {
  return (
    <div className="p-4 bg-zinc-900 rounded-xl mt-4">
      <p className="text-white">
        Signal: <b>{data.signal}</b>
      </p>

      <p className="text-white">
        Confidence: {data.confidence}%
      </p>

      <p className="text-gray-400 mt-2">
        {data.reason}
      </p>
    </div>
  );
}
