'use client'
import { useState, useMemo, useRef, useEffect, KeyboardEvent } from "react";

type ComboboxProps<T> = {
    items: T[];
    getLabel: (item: T) => string;
    getValue: (item: T) => string | number;
    onChange: (item: T | null) => void;
    placeholder?: string;
    className?: string;
};

export function GenericCombobox<T>({
    items,
    getLabel,
    getValue,
    onChange,
    placeholder = "Selecione...",
    className = ""
}: ComboboxProps<T>) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Filtro memoizado
    const filteredItems = useMemo(() => {
        if (!query) return items;
        return items.filter((item) =>
            getLabel(item).toLowerCase().includes(query.toLowerCase())
        );
    }, [items, query, getLabel]);

    const handleSelect = (item: T | null) => {
        if (item) {
            setQuery(getLabel(item));
            onChange(item);
        } else {
            setQuery("");
            onChange(null);
        }
        setIsOpen(false);
        setActiveIndex(-1);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen) {
            if (e.key === "ArrowDown") setIsOpen(true);
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : prev));
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
                break;
            case "Enter":
                e.preventDefault();
                if (activeIndex >= 0 && filteredItems[activeIndex]) {
                    handleSelect(filteredItems[activeIndex]);
                }
                break;
            case "Escape":
                setIsOpen(false);
                break;
            case "Tab":
                setIsOpen(false);
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className={`relative w-full ${className}`}>
            <div
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls="combobox-options"
                className="relative"
            >
                <input
                    ref={inputRef}
                    type="text"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white focus:ring-0 transition-all text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                        setActiveIndex(0);
                        if (e.target.value === "") onChange(null);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                />

                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none transition-colors group-focus-within:text-emerald-500">
                    <svg
                        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <ul
                    id="combobox-options"
                    role="listbox"
                    className="absolute z-50 mt-2 w-full max-h-64 overflow-auto bg-white/90 backdrop-blur-xl border border-slate-100 rounded-[1.5rem] shadow-2xl shadow-slate-200/60 py-2 animate-in fade-in zoom-in-95 duration-200"
                >
                    {filteredItems.length === 0 ? (
                        <li className="px-5 py-8 text-slate-400 text-center text-xs font-bold uppercase tracking-widest">
                            Nenhum resultado para <br />
                            <span className="text-slate-900">"{query}"</span>
                        </li>
                    ) : (
                        <div className="px-2">
                            {filteredItems.map((item, index) => {
                                const isSelected = activeIndex === index;
                                return (
                                    <li
                                        key={getValue(item)}
                                        role="option"
                                        aria-selected={isSelected}
                                        className={`px-4 py-3.5 cursor-pointer text-sm font-semibold rounded-xl transition-all mb-1 last:mb-0
                  ${isSelected
                                                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 translate-x-1"
                                                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"}
                `}
                                        onClick={() => handleSelect(item)}
                                        onMouseEnter={() => setActiveIndex(index)}
                                    >
                                        <div className="flex items-center justify-between">
                                            {getLabel(item)}
                                            {isSelected && (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
}