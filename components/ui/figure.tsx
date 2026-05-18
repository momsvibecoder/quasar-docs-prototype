import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Figure({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('overflow-hidden rounded-xl border border-border bg-card p-3', className)}
      {...props}
    />
  );
}

export function ChartPlaceholder() {
  return (
    <div className="rounded-lg bg-[#f7f8fa] p-5 text-[#1b2430]">
      <div className="mb-4 text-center text-sm font-medium">Slow Queries Over Time</div>
      <svg viewBox="0 0 640 220" className="h-56 w-full">
        <path d="M40 180H610M40 135H610M40 90H610M40 45H610" stroke="#d9dde5" />
        <path d="M48 158 C72 80 88 176 114 144 S168 134 190 140 232 62 254 150 298 138 320 128 360 170 384 132 420 78 438 154 482 120 504 142 548 135 586 148" fill="none" stroke="#6469D0" strokeWidth="3" />
        <text x="42" y="210" fontSize="12" fill="#657084">07:50</text>
        <text x="300" y="210" fontSize="12" fill="#657084">08:20</text>
        <text x="548" y="210" fontSize="12" fill="#657084">08:40</text>
      </svg>
    </div>
  );
}

export function TextImageBlock() {
  return (
    <div className="q-text-image-block not-prose">
      <div className="q-text-image-copy">
        <div className="q-text-image-eyebrow">Dashboard preview</div>
        <h3>Monitor cluster behavior at a glance</h3>
        <p>
          Pair narrative guidance with a visual snapshot when the reader needs to understand what a metric means before
          they inspect the full dashboard.
        </p>
      </div>
      <div className="q-text-image-media" aria-label="Dashboard preview illustration">
        <div className="q-dashboard-window">
          <div className="q-dashboard-window-header">
            <span />
            <span />
            <span />
          </div>
          <div className="q-dashboard-grid">
            <div className="q-dashboard-stat">
              <strong>99.98%</strong>
              <span>availability</span>
            </div>
            <div className="q-dashboard-stat">
              <strong>12ms</strong>
              <span>p95 query</span>
            </div>
            <div className="q-dashboard-chart">
              <svg viewBox="0 0 360 140" aria-hidden="true">
                <path d="M20 112H340M20 76H340M20 40H340" stroke="currentColor" opacity="0.16" />
                <path
                  d="M22 98 C48 38 68 116 92 78 S134 62 154 80 196 112 218 70 258 26 282 74 312 88 338 54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
