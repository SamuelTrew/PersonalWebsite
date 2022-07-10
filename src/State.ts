import { createSignal } from 'solid-js';

export type Box = 'closed' | 'Solidatus' | 'Hadean' | 'Occam'

export const boxState = createSignal<Box>('closed')