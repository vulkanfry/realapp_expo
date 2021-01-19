export const dataDefaults = [
  { status: 0, name: popup(0) },
  { status: 1, name: popup(1) },
  { status: 2, name: popup(2) }
];

export function icon(status) {
  switch (status) {
    case 0: return 'arrow-up';
    case 2: return 'arrow-down';
    case 1: return 'done-all';
  }
}

export function popup(status) {
  switch (status) {
    case 0: return 'A thing in progress';
    case 2: return 'Failed submission';
    case 1: return 'Scanned text data ready to be sent';
  }
};