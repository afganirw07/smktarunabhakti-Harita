"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/public/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";

interface SketchCalendarPickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  variant?: "default" | "minimal" | "artistic" | "gradient" | "neon" | "candy";
}

export function SketchCalendarPicker({
  value,
  onChange,
  className,
  variant = "default",
}: SketchCalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get day names with Sunday as first day
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate padding days for the first week
  const firstDayOfMonth = monthStart.getDay();
  const paddingDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) =>
      new Date(
        monthStart.getFullYear(),
        monthStart.getMonth(),
        -firstDayOfMonth + i + 1,
      ),
  );

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800";
      case "artistic":
        return "bg-[url('/paper-texture.png')] bg-cover border-2 border-zinc-800  [filter:contrast(1.1)] [box-shadow:4px_4px_0_0_rgba(0,0,0,0.2)]";
      case "gradient":
        return "bg-linear-to-br from-violet-500 via-purple-500 to-indigo-500 border-none text-white [box-shadow:0_8px_32px_rgba(124,58,237,0.2)]";
      case "neon":
        return "bg-zinc-950 border-2 border-emerald-500 text-emerald-500 [text-shadow:0_0_10px_rgba(16,185,129,0.5)] [box-shadow:0_0_20px_rgba(16,185,129,0.3),inset_0_0_20px_rgba(16,185,129,0.2)]";
      case "candy":
        return "bg-linear-to-br from-pink-300 via-rose-300 to-pink-400 border-white/20 border-2 backdrop-blur-xl text-white [box-shadow:0_8px_32px_rgba(244,114,182,0.2)]";
      default:
        return "bg-linear-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800";
    }
  };

  const getDayStyles = (
    isSelected: boolean | undefined,
    isCurrentDate: boolean,
    isCurrentMonth: boolean,
  ) => {
    const baseStyles =
      "relative flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors";

    if (!isCurrentMonth) {
      return cn(baseStyles, "text-zinc-300 dark:text-zinc-700");
    }

    if (isSelected) {
      switch (variant) {
        case "gradient":
          return cn(baseStyles, "bg-white/20 font-semibold text-white");
        case "neon":
          return cn(
            baseStyles,
            "bg-emerald-500/20 font-semibold text-emerald-400 [text-shadow:0_0_10px_rgba(16,185,129,0.8)]",
          );
        case "candy":
          return cn(baseStyles, "bg-white/30 font-semibold text-white");
        default:
          return cn(
            baseStyles,
            "bg-green-700 font-semibold text-primary-foreground",
          );
      }
    }

    if (isCurrentDate) {
      switch (variant) {
        case "gradient":
          return cn(baseStyles, "font-medium text-white");
        case "neon":
          return cn(baseStyles, "font-medium text-emerald-400");
        case "candy":
          return cn(baseStyles, "font-medium text-white");
        default:
          return cn(baseStyles, "font-medium text-primary");
      }
    }

    switch (variant) {
      case "gradient":
        return cn(baseStyles, "text-white/90 hover:bg-white/10");
      case "neon":
        return cn(baseStyles, "text-emerald-500/90 hover:bg-emerald-500/10");
      case "candy":
        return cn(baseStyles, "text-white/90 hover:bg-white/10");
      default:
        return cn(baseStyles, "hover:bg-zinc-100 dark:hover:bg-zinc-800");
    }
  };

  const getHeaderStyles = () => {
    switch (variant) {
      case "gradient":
      case "candy":
        return "text-white/70";
      case "neon":
        return "text-emerald-500/70";
      default:
        return "text-zinc-500 dark:text-zinc-400";
    }
  };

  const getButtonStyles = () => {
    switch (variant) {
      case "gradient":
      case "candy":
        return "text-white/90 hover:bg-white/10";
      case "neon":
        return "text-emerald-500 hover:bg-emerald-500/10";
      default:
        return "hover:bg-zinc-100 dark:hover:bg-zinc-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "w-[320px] rounded-xl p-4 shadow-lg backdrop-blur-xs",
        getVariantStyles(),
        className,
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevMonth}
          className={cn("rounded-lg p-1", getButtonStyles())}
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
        <h2
          className={cn(
            "text-lg font-semibold",
            variant === "gradient" || variant === "candy"
              ? "text-white"
              : variant === "neon"
                ? "text-emerald-500"
                : undefined,
          )}
        >
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNextMonth}
          className={cn("rounded-lg p-1", getButtonStyles())}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Names */}
        {dayNames.map((day) => (
          <div
            key={day}
            className={cn("text-center text-sm font-medium", getHeaderStyles())}
          >
            {day}
          </div>
        ))}

        {/* Padding Days */}
        {paddingDays.map((date, i) => (
          <div
            key={`padding-${i}`}
            className={cn(
              "text-center text-sm",
              variant === "gradient" || variant === "candy"
                ? "text-white/30"
                : variant === "neon"
                  ? "text-emerald-500/30"
                  : "text-zinc-300 dark:text-zinc-700",
            )}
          >
            {date.getDate()}
          </div>
        ))}

        {/* Actual Days */}
        {daysInMonth.map((date) => {
          const isSelected = value && isSameDay(date, value);
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isCurrentDate = isToday(date);
          const isHovered = hoveredDate && isSameDay(date, hoveredDate);

          return (
            <motion.button
              key={date.toISOString()}
              onClick={() => onChange?.(date)}
              onHoverStart={() => setHoveredDate(date)}
              onHoverEnd={() => setHoveredDate(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={getDayStyles(
                isSelected,
                isCurrentDate,
                isCurrentMonth,
              )}
            >
              {isHovered && variant === "artistic" && (
                <motion.div
                  layoutId="hover-effect"
                  className="absolute inset-0 rounded-lg border-2 border-dashed border-green-600"
                  transition={{ duration: 0.2 }}
                />
              )}
              <span>{date.getDate()}</span>
              {isCurrentDate && !isSelected && (
                <div
                  className={cn(
                    "absolute bottom-1 h-1 w-1 rounded-full",
                    variant === "gradient" || variant === "candy"
                      ? "bg-white"
                      : variant === "neon"
                        ? "bg-emerald-500"
                        : "bg-primary",
                  )}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
