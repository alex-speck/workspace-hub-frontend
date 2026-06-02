export interface ComboboxProps<T> {
    items: T[];
    getLabel: (item: T) => string;
    getValue: (item: T) => string | number;
    onChange: (item: T | null) => void;
    placeholder?: string;
    className?: string;
}
