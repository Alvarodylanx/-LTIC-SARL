'use client';

import { useState, forwardRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface EmailInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
  /** Called with the current validity state on each change */
  onValidityChange?: (valid: boolean) => void;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ className, onChange, onBlur, value, defaultValue, onValidityChange, ...props }, ref) => {
    const [internal, setInternal] = useState((value ?? defaultValue ?? '') as string);
    const [touched, setTouched] = useState(false);

    // Keep in sync when parent drives value
    useEffect(() => {
      if (value !== undefined) setInternal(value as string);
    }, [value]);

    const isValid = EMAIL_RE.test(internal);
    const showIndicator = touched && internal.length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternal(e.target.value);
      onValidityChange?.(EMAIL_RE.test(e.target.value));
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched(true);
      onBlur?.(e);
    };

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          type="email"
          value={value !== undefined ? internal : undefined}
          defaultValue={value !== undefined ? undefined : (defaultValue as string)}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 pr-9 text-sm',
            'ring-offset-background placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            touched && internal && !isValid && 'border-destructive focus-visible:ring-destructive',
            className
          )}
        />
        {showIndicator && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {isValid
              ? <Check className="h-4 w-4 text-green-500" />
              : <X className="h-4 w-4 text-destructive" />
            }
          </span>
        )}
      </div>
    );
  }
);
EmailInput.displayName = 'EmailInput';
