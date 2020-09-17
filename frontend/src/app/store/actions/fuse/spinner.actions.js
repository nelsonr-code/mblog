export const OPEN_SPINNER = "[SPINNER] OPEN";
export const CLOSE_SPINNER = "[SPINNER] CLOSE";

export function closeSpinner() {
  return {
    type: CLOSE_SPINNER,
  };
}

export function openSpinner() {
  return {
    type: OPEN_SPINNER,
  };
}
