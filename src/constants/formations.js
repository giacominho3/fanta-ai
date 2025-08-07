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
        { role: 'C', x: 65 },
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
        { role: 'C', x: 65 },
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
  '3421': {
    name: '3-4-2-1',
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
          { role: 'M', x: 35 },
          { role: 'M/C', x: 65 },
          { role: 'E', x: 85 }
    ],
    // Riga 4 - Trequartista
    [
        { role: 'E/W', x: 15 },
        { role: 'T', x: 35 },
        { role: 'T/A', x: 65 }
    ],
      // Riga 5 - Attaccanti
      [
        { role: 'A/Pc', x: 50 }
      ]
    ]
  },
  '352': {
    name: '3-5-2',
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
          { role: 'M/C', x: 35 },
          { role: 'M', x: 50 },
          { role: 'C', x: 65 },
          { role: 'E', x: 85 }
    ],
    // Riga 4 - Trequartista
    [
        { role: 'E/W', x: 15 },
    ],
      // Riga 5 - Attaccanti
      [
        { role: 'A/Pc', x: 35 },
        { role: 'A/Pc', x: 65 }
      ]
    ]
  },
  '3511': {
    name: '3-5-1-1',
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
          { role: 'M', x: 35 },
          { role: 'M', x: 65 },
          { role: 'C', x: 50 }
    ],
    // Riga 4 - Trequartista
    [
        { role: 'E/W', x: 15 },
        { role: 'T/A', x: 50 },
        { role: 'E/W', x: 85 },
    ],
      // Riga 5 - Attaccanti
      [
        { role: 'A/Pc', x: 50 }
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
        { role: 'M/C', x: 25 },
        { role: 'M', x: 50 },
        { role: 'C', x: 75 }
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
  '433': {
    name: '4-3-3',
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
        { role: 'M/C', x: 25 },
        { role: 'M', x: 50 },
        { role: 'C', x: 75 }
      ],
      // Riga 4 - Trequartista
      [
        { role: 'W/A', x: 25 },
        { role: 'W/A', x: 75 }
      ],
      // Riga 5 - Attaccanti
      [{ role: 'A/Pc', x: 50 }]
    ]
  },
  '4141': {
    name: '4-1-4-1',
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
        { role: 'M', x: 50 }
      ],
      // Riga 4 - Trequartista
      [
        { role: 'E/W', x: 15 },
        { role: 'C/T', x: 35 },
        { role: 'T', x: 65 },
        { role: 'W', x: 85 }
      ],
      // Riga 5 - Attaccanti
      [{ role: 'A/Pc', x: 50 }]
    ]
  },
  '4231': {
    name: '4-2-3-1',
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
        { role: 'M', x: 35 },
        { role: 'M/C', x: 65 }
      ],
      // Riga 4 - Trequartista
      [
        { role: 'W/T', x: 25 },
        { role: 'T', x: 50 },
        { role: 'W/A', x: 75 }
      ],
      // Riga 5 - Attaccanti
      [{ role: 'A/Pc', x: 50 }]
    ]
  },
  '442': {
    name: '4-4-2',
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
          { role: 'M/C', x: 35 },
          { role: 'C', x: 65 },
          { role: 'E', x: 85 }
      ],
      // Riga 4 - Trequartista
      [
        { role: 'E/W', x: 15 }
      ],
      // Riga 5 - Attaccanti
      [
        { role: 'A/Pc', x: 35 },
        { role: 'A/Pc', x: 65 },
      ]
    ]
  },
  '4411': {
    name: '4-4-1-1',
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
          { role: 'M', x: 35 },
          { role: 'C', x: 65 },
      ],
      // Riga 4 - Trequartista
      [
        { role: 'E/W', x: 15 },
        { role: 'T/A', x: 50 },
        { role: 'E/W', x: 85 },
      ],
      // Riga 5 - Attaccanti
      [
        { role: 'A/Pc', x: 50 }
      ]
    ]
  },
};