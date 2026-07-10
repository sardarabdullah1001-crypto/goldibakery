import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';

interface CalendarProps {
  selectedDate: string; // YYYY-MM-DD
  onChange: (date: string) => void;
}

export default function Calendar({ selectedDate, onChange }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get current date, set hours to 0 to compare purely by date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Minimum date is 2 days in the future
  const minPreorderDate = new Date(today);
  minPreorderDate.setDate(today.getDate() + 2);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // First day of current month (0-6)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const formatDateString = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  // Check if a date is selectable (at least 2 days in the future)
  const isDateSelectable = (year: number, month: number, day: number) => {
    const targetDate = new Date(year, month, day);
    targetDate.setHours(0, 0, 0, 0);
    return targetDate >= minPreorderDate;
  };

  const days = [];
  // Add empty placeholders for previous month days
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  // Add actual month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Format the selected date for human reading
  const formatReadableDate = (dateStr: string) => {
    if (!dateStr) return 'Select a date below';
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-bakery-cream-light border border-bakery-cream-dark rounded-2xl p-6 shadow-sm max-w-sm mx-auto" id="bakery-calendar-widget">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif font-bold text-lg text-bakery-brown-dark">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className="flex space-x-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-bakery-cream-dark text-bakery-brown-dark transition-colors"
            aria-label="Previous Month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-bakery-cream-dark text-bakery-brown-dark transition-colors"
            aria-label="Next Month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-bakery-brown-light mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dateStr = formatDateString(currentYear, currentMonth, day);
          const selectable = isDateSelectable(currentYear, currentMonth, day);
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={`day-${day}`}
              type="button"
              disabled={!selectable}
              onClick={() => onChange(dateStr)}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-xl font-medium transition-all relative
                ${!selectable ? 'text-bakery-brown-light/30 cursor-not-allowed line-through' : 'cursor-pointer'}
                ${selectable && !isSelected ? 'text-bakery-brown-dark hover:bg-bakery-gold-light/40 hover:text-bakery-brown-dark' : ''}
                ${isSelected ? 'bg-bakery-gold text-white font-bold scale-105 shadow-sm shadow-bakery-gold/20' : ''}
              `}
            >
              <span>{day}</span>
              {/* Highlight standard lead-time boundary */}
              {selectable && day === minPreorderDate.getDate() && currentMonth === minPreorderDate.getMonth() && currentYear === minPreorderDate.getFullYear() && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-bakery-brown-medium" />
              )}
            </button>
          );
        })}
      </div>

      {/* Info Warning */}
      <div className="mt-5 pt-4 border-t border-bakery-cream-dark text-xs text-bakery-brown-medium flex items-start gap-2.5">
        <Info size={15} className="text-bakery-gold flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-bakery-brown-dark">Pre-order Policy</p>
          <p className="mt-0.5 text-bakery-brown-light leading-relaxed">
            Every item is baked micro-batch and fresh for you. Because our sourdoughs and brioches require a 36-hour slow fermentation process, we require a <strong className="text-bakery-gold">minimum 2-day lead time</strong>.
          </p>
        </div>
      </div>

      {/* Selected Date Preview */}
      <div className="mt-4 p-3 bg-bakery-cream rounded-xl flex items-center gap-3 border border-bakery-cream-dark">
        <CalendarIcon size={16} className="text-bakery-brown-light" />
        <div className="text-left">
          <p className="text-[10px] tracking-wider uppercase text-bakery-brown-light font-bold">Selected Delivery/Pickup Date</p>
          <p className="text-xs font-semibold text-bakery-brown-dark mt-0.5">
            {formatReadableDate(selectedDate)}
          </p>
        </div>
      </div>
    </div>
  );
}
