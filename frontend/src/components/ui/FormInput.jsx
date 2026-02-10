export default function FormInput({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-600">
        {label}
      </label>
      <input
        {...props}
        className="border border-slate-300 rounded-lg px-4 py-3
        focus:outline-none focus:ring-2 focus:ring-blue-500
        bg-white"
      />
    </div>
  );
}
