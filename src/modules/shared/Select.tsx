import {
  Box,
  Select as MUISelect,
  MenuItem as MUIMenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode, useMemo } from "react";
import { StyledErrorText } from "./StyledErrorText";
import { StyleLabel } from "./StyleLabel";
export const Select = ({
  options,
  value,
  error,
  onChange,
  label,
  name,
  onBlur,
  helperText,
  required,
  size,
  sx,
  placeholder,
  disabled,
}: SelectProps) => {
  const selectOptions: SelectOpt[] = useMemo(
    () =>
      options.map((opt) => {
        if (typeof opt === "string") {
          return { label: opt, value: opt };
        }
        return opt;
      }),
    [options]
  );

  return (
    <Box>
      {label && <StyleLabel text={label} required={required} />}
      {helperText && <Typography>{helperText}</Typography>}
      <MUISelect
        size={size || "small"}
        fullWidth
        value={value?.toString() || " "}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        sx={{
          mt: label || helperText ? 1 : 0,
          ...sx,
        }}
        disabled={disabled}
      >
        {placeholder && (
          <MUIMenuItem value={" "} disabled>
            {placeholder}
          </MUIMenuItem>
        )}

        {selectOptions.map((opt) => (
          <MUIMenuItem
            key={opt.value}
            value={opt.value}
            disabled={opt.disabled ? opt.disabled : false}
          >
            {opt.label}
          </MUIMenuItem>
        ))}
      </MUISelect>
      {error && <StyledErrorText text={error} />}
    </Box>
  );
};

export interface SelectProps {
  options: SelectOpt[] | string[];
  onChange: (event: SelectChangeEvent<string>) => void;
  value: string | number;
  label: string;
  name?: string;
  error?: string;
  helperText?: string | ReactNode;
  required?: boolean;
  multiple?: boolean;
  size?: "small" | "medium" | undefined;
  sx?: any;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;

  onBlur?: () => void;
}
export interface SelectOpt {
  label: string;
  value: string | number;
  disabled?: boolean;
}
