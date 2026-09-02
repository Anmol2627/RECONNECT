"use client";
export function PageHeader({ 
  title, 
  subtitle 
}: { 
  title: React.ReactNode; 
  subtitle?: React.ReactNode; 
}) {
  return (
    <div className="mb-6">
      <h2 className="font-serif text-[32px] leading-tight text-forest mb-2">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
