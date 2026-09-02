"use client";
export function PillTabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
            activeTab === t
              ? "bg-sage-soft text-forest"
              : "bg-transparent border border-border text-foreground hover:bg-cream"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
