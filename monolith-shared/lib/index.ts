import pluralize from 'pluralize';
import { useRef, useEffect } from 'react';

export function getPlural(str: string): string {
  return pluralize.plural(str) + 'xxx'; }

/**
 * A custom hook that uses the useRef hook internally for storing the previous value
 * @see https://usehooks.com/usePrevious/
 */
export function usePrevious<T>(value: T) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
