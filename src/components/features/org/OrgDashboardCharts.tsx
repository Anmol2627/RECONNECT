"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Check, Lock, Leaf } from "lucide-react";

// Mock Data for Charts
const engagementData = [
  { name: "Apr 12-18", org: 50, avg: 35 },
  { name: "Apr 19-25", org: 58, avg: 40 },
  { name: "Apr 26 - May 2", org: 55, avg: 38 },
  { name: "May 3-9", org: 60, avg: 45 },
  { name: "May 10-16", org: 78, avg: 52 },
];

const goalsData = [
  { name: "Employment Readiness", value: 58, color: "#284835" },
  { name: "Build Confidence", value: 32, color: "#E57B5C" },
  { name: "Life Skills", value: 19, color: "#E4C8A6" },
  { name: "Education", value: 13, color: "#5C6BC0" },
  { name: "Other", value: 6, color: "#E0E0E0" },
];

export function EngagementChart() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={engagementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEFEF" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "#8E9E8E" }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "#8E9E8E" }} 
            tickFormatter={(value) => `${value}%`}
          />
          <RechartsTooltip 
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            labelStyle={{ fontWeight: "bold", color: "#183626", marginBottom: "4px" }}
          />
          <Line 
            type="monotone" 
            dataKey="org" 
            stroke="#284835" 
            strokeWidth={3} 
            dot={{ r: 4, fill: "#284835" }} 
            activeDot={{ r: 6 }} 
          />
          <Line 
            type="monotone" 
            dataKey="avg" 
            stroke="#C0CCC0" 
            strokeWidth={2} 
            strokeDasharray="4 4" 
            dot={{ r: 3, fill: "#C0CCC0" }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GoalsChart() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative h-[160px] w-[160px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={goalsData}
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {goalsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-[#183626]">128</span>
          <span className="text-xs text-[#8E9E8E]">Total</span>
        </div>
      </div>
      
      <div className="flex-1 space-y-3">
        {goalsData.map((goal) => (
          <div key={goal.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: goal.color }} />
              <span className="font-medium text-[#183626]">{goal.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-[#183626]">{Math.round((goal.value / 128) * 100)}%</span>
              <span className="text-[#8E9E8E]">({goal.value})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const steps = [
  { id: 1, name: "Getting Started", count: 28, percentage: 22, status: "complete" },
  { id: 2, name: "Self Discovery", count: 34, percentage: 27, status: "complete" },
  { id: 3, name: "Employment Readiness", count: 40, percentage: 31, status: "current" },
  { id: 4, name: "Independence Building", count: 18, percentage: 14, status: "locked" },
  { id: 5, name: "Community Contribution", count: 8, percentage: 6, status: "locked" },
];

export function ParticipantProgressStepper() {
  return (
    <div className="mt-8 flex w-full justify-between relative px-2">
      {/* Background Line */}
      <div className="absolute top-[18px] left-[40px] right-[40px] h-[2px] bg-[#EFEFEF] -z-10" />
      <div className="absolute top-[18px] left-[40px] w-1/2 h-[2px] bg-[#284835] -z-10" />

      {steps.map((step) => (
        <div key={step.id} className="flex flex-col items-center text-center">
          <div 
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white ${
              step.status === "complete" 
                ? "border-[#284835] text-[#284835]" 
                : step.status === "current"
                  ? "border-[#284835] bg-[#F4F7F4] text-[#284835]"
                  : "border-[#EFEFEF] text-[#8E9E8E]"
            }`}
          >
            {step.status === "complete" ? (
              <Check className="h-5 w-5" strokeWidth={3} />
            ) : step.status === "current" ? (
              <Leaf className="h-5 w-5" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
          </div>
          <div className="mt-4 font-semibold text-xs text-[#183626] max-w-[80px] leading-tight">
            {step.name}
          </div>
          <div className="mt-2 text-xl font-display text-[#183626]">
            {step.count}
          </div>
          <div className="text-[10px] text-[#8E9E8E]">
            {step.percentage}%
          </div>
        </div>
      ))}
    </div>
  );
}
