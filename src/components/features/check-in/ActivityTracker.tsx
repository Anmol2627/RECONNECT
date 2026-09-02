"use client";

import { useMemo, useState } from "react";
import { format, subDays, isSameDay, differenceInDays, startOfDay, getDay, addDays, startOfMonth, isSameMonth } from "date-fns";
import { cn } from "@/lib/utils";

type ActivityTrackerProps = {
  checkInDates: string[]; // ISO date strings
};

export function ActivityTracker({ checkInDates }: ActivityTrackerProps) {
  const { total, longestStreak, activityMap, monthGroups } = useMemo(() => {
    const today = startOfDay(new Date());
    
    // Normalize unique dates
    const normalizedDates = Array.from(
      new Set(checkInDates.map(d => startOfDay(new Date(d)).getTime()))
    ).map(t => new Date(t)).sort((a, b) => b.getTime() - a.getTime());

    // Calculate total
    const total = normalizedDates.length;

    // Calculate streaks
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate: Date | null = null;

    for (let i = 0; i < normalizedDates.length; i++) {
      const d = normalizedDates[i];
      if (!lastDate) {
        tempStreak = 1;
      } else {
        const diff = differenceInDays(lastDate, d);
        if (diff === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      lastDate = d;
    }

    const startDate = subDays(today, 364);
    const startDayOfWeek = getDay(startDate);
    
    const activityMap = new Map<string, number>();
    normalizedDates.forEach(d => {
      activityMap.set(format(d, "yyyy-MM-dd"), 1);
    });

    // Build columns first
    const columns: any[][] = [];
    let currentColumn: any[] = [];
    
    // Pad first column
    for (let i = 0; i < startDayOfWeek; i++) {
      currentColumn.push({ type: 'empty', id: `empty-start-${i}` });
    }

    for (let i = 0; i <= 364; i++) {
      const date = addDays(startDate, i);
      const dateStr = format(date, "yyyy-MM-dd");
      const active = activityMap.has(dateStr);
      
      currentColumn.push({
        type: 'day',
        id: dateStr,
        date,
        dateStr,
        active,
        label: format(date, "MMM d, yyyy")
      });

      if (currentColumn.length === 7) {
        columns.push(currentColumn);
        currentColumn = [];
      }
    }
    
    // Push the last partial column if exists
    if (currentColumn.length > 0) {
      while (currentColumn.length < 7) {
        currentColumn.push({ type: 'empty', id: `empty-end-${currentColumn.length}` });
      }
      columns.push(currentColumn);
    }

    // Group columns by month. We use the month of the last valid day in the column to decide.
    const monthGroups: { month: string, columns: any[][] }[] = [];
    let currentMonthGroup = { month: '', columns: [] as any[][] };

    columns.forEach(col => {
      // Find the first actual day in the column to determine its month
      const validDay = col.find(c => c.type === 'day');
      if (validDay) {
        const monthName = format(validDay.date, "MMM");
        if (currentMonthGroup.month !== monthName) {
          if (currentMonthGroup.month !== '') {
            monthGroups.push(currentMonthGroup);
          }
          currentMonthGroup = { month: monthName, columns: [] };
        }
      }
      currentMonthGroup.columns.push(col);
    });
    if (currentMonthGroup.columns.length > 0) {
      monthGroups.push(currentMonthGroup);
    }

    return { total, longestStreak, activityMap, monthGroups };
  }, [checkInDates]);

  const [hoveredCell, setHoveredCell] = useState<{label: string, active: boolean, x: number, y: number} | null>(null);

  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 overflow-hidden">
      {/* Header Stats */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium text-foreground">{total}</span>
          <span className="text-sm text-muted-foreground">check-ins in the past one year</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">Total active days: </span>
            <span className="font-medium text-foreground">{total}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Max streak: </span>
            <span className="font-medium text-foreground">{longestStreak}</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="relative overflow-x-auto pb-4">
        <div className="min-w-[800px] flex justify-between">
          {monthGroups.map((group, gIdx) => (
            <div key={gIdx} className="flex flex-col items-center">
              <div className="flex gap-[3px]">
                {group.columns.map((col, cIdx) => (
                  <div key={cIdx} className="flex flex-col gap-[3px]">
                    {col.map((cell: any) => {
                      if (cell.type === 'empty') {
                        return <div key={cell.id} className="w-[11px] h-[11px]" />;
                      }
                      return (
                        <div 
                          key={cell.id}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredCell({
                              label: cell.label!,
                              active: cell.active!,
                              x: rect.left + rect.width / 2,
                              y: rect.top
                            });
                          }}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={cn(
                            "w-[11px] h-[11px] rounded-[2px] transition-colors duration-200 cursor-pointer",
                            cell.active ? "bg-[#284835] hover:bg-[#1A3F2A]" : "bg-[#F3F4F6] hover:bg-[#E5E7EB]"
                          )}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <span className="text-xs text-muted-foreground mt-2">{group.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Tooltip */}
      {hoveredCell && (
        <div 
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full pb-2"
          style={{ left: hoveredCell.x, top: hoveredCell.y }}
        >
          <div className="bg-gray-900 text-white text-xs py-1.5 px-3 rounded shadow-lg whitespace-nowrap">
            <span className="font-medium">{hoveredCell.active ? '1 check-in' : 'No check-ins'}</span>
            <span className="text-gray-400 ml-2">{hoveredCell.label}</span>
          </div>
        </div>
      )}
    </div>
  );
}
