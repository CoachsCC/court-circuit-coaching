export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className="eyb mb-2">{eyebrow}</div>
      <h2 className={`h-sec text-[clamp(26px,7vw,34px)] ${className}`}>{title}</h2>
    </>
  );
}
