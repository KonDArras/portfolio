import type { ReactNode, CSSProperties, MouseEventHandler } from "react";

export interface SectionHeadingProps { title: string; intro?: string; id?: string }
export interface PanelProps { title?: string; spotlight?: boolean; as?: string; className?: string; style?: CSSProperties; children?: ReactNode }
export interface PanelGridProps { columns?: number; children?: ReactNode }
export interface TagsProps { items: string[] }
export interface FilterPillProps { active?: boolean; onClick?: MouseEventHandler<HTMLButtonElement>; children: ReactNode }
export interface StatusDotProps { live?: boolean; children?: ReactNode }
/** load: 0–100, or omit for the dashed "idle" track. */
export interface MeterProps { name: string; level?: string; load?: number }
export interface StatProps { value: number | string; suffix?: string; label: string }
export interface LinkRowLink { label: string; href: string; primary?: boolean; download?: boolean }
export interface LinkRowProps { links: LinkRowLink[] }
export interface TopNavLink { label: string; href: string }
export interface TopNavProps { links: TopNavLink[]; active?: string; mark?: string; homeHref?: string }
export interface TerminalLine { type: "cmd" | "out"; text: string }
export interface TerminalProps { title: string; lines: TerminalLine[]; typing?: string }
export interface HobbyChipProps { icon?: string; children: ReactNode }
export interface EmptyStateProps { title: string; sub?: string }

export declare const SectionHeading: (p: SectionHeadingProps) => JSX.Element;
export declare const Panel: ((p: PanelProps) => JSX.Element) & { Grid: (p: PanelGridProps) => JSX.Element };
export declare const Tags: (p: TagsProps) => JSX.Element;
export declare const FilterPill: (p: FilterPillProps) => JSX.Element;
export declare const StatusDot: (p: StatusDotProps) => JSX.Element;
export declare const Meter: (p: MeterProps) => JSX.Element;
export declare const Stat: (p: StatProps) => JSX.Element;
export declare const LinkRow: (p: LinkRowProps) => JSX.Element;
export declare const TopNav: (p: TopNavProps) => JSX.Element;
export declare const Terminal: (p: TerminalProps) => JSX.Element;
export declare const HobbyChip: (p: HobbyChipProps) => JSX.Element;
export declare const EmptyState: (p: EmptyStateProps) => JSX.Element;
