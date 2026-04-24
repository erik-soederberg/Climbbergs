// Template definitions for hangboard wizard
export const HANGBOARD_TEMPLATES = {
  beginner: {
    id: "beginner",
    name: "Beginner Board",
    description: "Perfect för nybörjare - stora grepp och enkel layout",
    difficulty: "beginner",
    basePrice: 899,
    image: "/images/templates/beginner.svg",
    grips: [
      // Top row - Jugs
      { type: "Jug", x: 100, y: 50, size: 55, rotation: 0, depth: 30 },
      { type: "Jug", x: 250, y: 50, size: 55, rotation: 0, depth: 30 },
      { type: "Jug", x: 350, y: 50, size: 55, rotation: 0, depth: 30 },
      { type: "Jug", x: 500, y: 50, size: 55, rotation: 0, depth: 30 },

      // Bottom row - Easy grips
      { type: "Edge", x: 150, y: 140, size: 50, rotation: 0, depth: 20 },
      { type: "Edge", x: 300, y: 140, size: 50, rotation: 0, depth: 20 },
      { type: "Edge", x: 450, y: 140, size: 50, rotation: 0, depth: 20 }
    ]
  },

  intermediate: {
    id: "intermediate",
    name: "Intermediate Board",
    description: "Allsidig träning - blandning av grepp-typer",
    difficulty: "intermediate",
    basePrice: 1299,
    image: "/images/templates/intermediate.svg",
    grips: [
      // Top row
      { type: "Jug", x: 75, y: 50, size: 50, rotation: 0, depth: 25 },
      { type: "Edge", x: 180, y: 50, size: 45, rotation: 0, depth: 15 },
      { type: "Crimp", x: 280, y: 50, size: 40, rotation: 0, depth: 10 },
      { type: "Crimp", x: 320, y: 50, size: 40, rotation: 0, depth: 10 },
      { type: "Edge", x: 420, y: 50, size: 45, rotation: 0, depth: 15 },
      { type: "Jug", x: 525, y: 50, size: 50, rotation: 0, depth: 25 },

      // Bottom row
      { type: "Sloper", x: 120, y: 140, size: 50, rotation: 0, depth: 20 },
      { type: "Pocket", x: 220, y: 140, size: 38, rotation: 0, depth: 35 },
      { type: "Pinch", x: 300, y: 140, size: 40, rotation: 0, depth: 30 },
      { type: "Pocket", x: 380, y: 140, size: 38, rotation: 0, depth: 35 },
      { type: "Sloper", x: 480, y: 140, size: 50, rotation: 0, depth: 20 }
    ]
  },

  advanced: {
    id: "advanced",
    name: "Advanced Board",
    description: "För experter - små grepp och teknisk träning",
    difficulty: "advanced",
    basePrice: 1599,
    image: "/images/templates/advanced.svg",
    grips: [
      // Top row - small crimps
      { type: "Crimp", x: 70, y: 45, size: 35, rotation: 0, depth: 8 },
      { type: "Crimp", x: 130, y: 45, size: 33, rotation: 0, depth: 7 },
      { type: "Pocket", x: 190, y: 45, size: 32, rotation: 0, depth: 35 },
      { type: "Edge", x: 250, y: 45, size: 38, rotation: 0, depth: 10 },
      { type: "Crimp", x: 300, y: 45, size: 33, rotation: 0, depth: 7 },
      { type: "Crimp", x: 300, y: 45, size: 33, rotation: 0, depth: 7 },
      { type: "Edge", x: 350, y: 45, size: 38, rotation: 0, depth: 10 },
      { type: "Pocket", x: 410, y: 45, size: 32, rotation: 0, depth: 35 },
      { type: "Crimp", x: 470, y: 45, size: 33, rotation: 0, depth: 7 },
      { type: "Crimp", x: 530, y: 45, size: 35, rotation: 0, depth: 8 },

      // Middle row
      { type: "Sloper", x: 100, y: 100, size: 45, rotation: -10, depth: 15 },
      { type: "Pinch", x: 200, y: 100, size: 35, rotation: 0, depth: 40 },
      { type: "Pocket", x: 300, y: 100, size: 30, rotation: 0, depth: 45 },
      { type: "Pinch", x: 400, y: 100, size: 35, rotation: 0, depth: 40 },
      { type: "Sloper", x: 500, y: 100, size: 45, rotation: 10, depth: 15 },

      // Bottom row
      { type: "Edge", x: 150, y: 155, size: 40, rotation: 0, depth: 12 },
      { type: "Pocket", x: 250, y: 155, size: 32, rotation: 0, depth: 38 },
      { type: "Edge", x: 300, y: 155, size: 40, rotation: 0, depth: 12 },
      { type: "Pocket", x: 350, y: 155, size: 32, rotation: 0, depth: 38 },
      { type: "Edge", x: 450, y: 155, size: 40, rotation: 0, depth: 12 }
    ]
  },

  custom: {
    id: "custom",
    name: "Custom Board",
    description: "Bygg från grunden - helt anpassningsbar",
    difficulty: "custom",
    basePrice: 1199,
    image: "/images/templates/custom.svg",
    grips: []
  }
};

export const DIFFICULTY_COLORS = {
  beginner: {
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-700",
    badge: "bg-green-100"
  },
  intermediate: {
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-700",
    badge: "bg-yellow-100"
  },
  advanced: {
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-700",
    badge: "bg-red-100"
  },
  custom: {
    bg: "bg-purple-50",
    border: "border-purple-300",
    text: "text-purple-700",
    badge: "bg-purple-100"
  }
};

export const MATERIALS = {
  birch: {
    id: "birch",
    name: "Björkplywood",
    description: "Classic träkänsla - hållbart och prisvärt",
    price: 0,
    color: "#D4A574"
  },
  walnut: {
    id: "walnut",
    name: "Valnöt",
    description: "Premium mörkt trä - exklusivt utseende",
    price: 400,
    color: "#5C4033"
  },
  concrete: {
    id: "concrete",
    name: "Betong-komposit",
    description: "Modern känsla - extra hållbart",
    price: 200,
    color: "#C8C8C0"
  }
};

export const FINISHES = {
  matte: {
    id: "matte",
    name: "Matt lack",
    description: "Skyddande yta - bra grepp",
    price: 0
  },
  oiled: {
    id: "oiled",
    name: "Oljevaxad",
    description: "Naturlig känsla - underhållskrävande",
    price: 100
  },
  untreated: {
    id: "untreated",
    name: "Obehandlad",
    description: "Rå träkänsla - kräver egen behandling",
    price: -50
  }
};

export const EXTRAS = {
  "wall-mount": {
    id: "wall-mount",
    name: "Väggfäste",
    description: "Komplett monteringskit med skruvar",
    price: 199
  },
  "training-guide": {
    id: "training-guide",
    name: "Träningsguide (PDF)",
    description: "Digital guide med övningar",
    price: 0
  }
};
