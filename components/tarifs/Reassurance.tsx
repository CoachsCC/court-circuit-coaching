const ITEMS = ["Pas de frais cachés", "Pas de vente forcée", "1re séance offerte"];

export function Reassurance() {
  return (
    <section className="pad py-5">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        {ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#F07336"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="flex-none"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="text-[13px] font-semibold">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
