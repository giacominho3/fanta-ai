// Configurazioni dei moduli
export const FORMATIONS = {
  '343': {
    name: '3-4-3',
    positions: [
      // Riga 1 - Portiere
      [{ role: 'Por', x: 50 }],
      // Riga 2 - Difensori
      [
        { role: 'Dc', x: 25 },
        { role: 'Dc', x: 50 },
        { role: 'Dc/B', x: 75 }
      ],
      // Riga 3 - Centrocampisti
      [
        { role: 'E', x: 15 },
        { role: 'M/C', x: 35 },
        { role: 'M/C', x: 65 },
        { role: 'E', x: 85 }
      ],
      // Riga 4 - Esterni/Trequartisti
      [
        { role: 'W/A', x: 25 },
        { role: 'W/A', x: 75 }
      ],
      // Riga 5 - Attaccanti
      [{ role: 'A/Pc', x: 50 }]
    ]
  },
  '3412': {
    name: '3-4-1-2',
    positions: [
      // Riga 1 - Portiere
      [{ role: 'Por', x: 50 }],
      // Riga 2 - Difensori
      [
        { role: 'Dc', x: 25 },
        { role: 'Dc', x: 50 },
        { role: 'Dc/B', x: 75 }
      ],
      // Riga 3 - Centrocampisti
      [
        { role: 'E', x: 15 },
        { role: 'M/C', x: 35 },
        { role: 'M/C', x: 65 },
        { role: 'E', x: 85 }
      ],
      // Riga 4 - Trequartista
      [{ role: 'T', x: 50 }],
      // Riga 5 - Attaccanti
      [
        { role: 'A/Pc', x: 35 },
        { role: 'A/Pc', x: 65 }
      ]
    ]
  },
  '4312': {
    name: '4-3-1-2',
    positions: [
      // Riga 1 - Portiere
      [{ role: 'Por', x: 50 }],
      // Riga 2 - Difensori
      [
          { role: 'Dd', x: 15 },
          { role: 'Dc', x: 35 },
          { role: 'Dc', x: 65 },
          { role: 'Ds', x: 85 }
      ],
      // Riga 3 - Centrocampisti
      [
        { role: 'M', x: 25 },
        { role: 'M/C', x: 50 },
        { role: 'M/C', x: 75 }
      ],
      // Riga 4 - Trequartista
      [{ role: 'T', x: 50 }],
      // Riga 5 - Attaccanti
      [
        { role: 'A/Pc', x: 35 },
        { role: 'A/Pc', x: 65 }
      ]
    ]
  }
};