// store.js

import { atom } from "jotai";

export const openMenu = atom(false);

export const selectedBet = atom([
  [
    {
      event_name: "ATM vs ATB",
      market_name: "Exact Number of Goal",
      runner_name: "1.8",
      back: [
        {
          price: 1.8,
          size: 100,
        },
        {
          price: 1.9,
          size: 100,
        },
      ],
      lay: [
        {
          price: 1.8,
          size: 100,
        },
        {
          price: 1.9,
          size: 100,
        },
      ],
    },
  ],
]);
