export type MenuItem = {
  name: string;
  pronunciation?: string;
  notes: string;
  price: string;
  tag?: string;
};

export type MenuSection = {
  id: string;
  title: string;
  blurb: string;
  items: MenuItem[];
};

export const menuSections: MenuSection[] = [
  {
    id: "signatures",
    title: "Signatures",
    blurb: "Contradictions in a glass. Built in the lab, served at the bar.",
    items: [
      {
        name: "Bitter Sweetheart",
        notes: "Campari, clarified guava, salted rose, soda",
        price: "₹650",
        tag: "House favourite",
      },
      {
        name: "Loud Silence",
        notes: "Mezcal, burnt curry leaf, cacao husk, lime",
        price: "₹750",
      },
      {
        name: "Same Difference",
        notes: "Two gins, one vermouth, olive brine, pickled ice",
        price: "₹700",
      },
      {
        name: "Organised Chaos",
        notes: "Rum, banana oleo, fermented chilli, coconut fat-wash",
        price: "₹720",
        tag: "Spicy",
      },
      {
        name: "Awfully Good",
        notes: "Cheddar-washed whisky, smoked honey, black pepper",
        price: "₹780",
      },
      {
        name: "Clearly Confused",
        notes: "Clarified milk punch, jasmine, white grape, cognac",
        price: "₹800",
      },
    ],
  },
  {
    id: "classics",
    title: "Reworked Classics",
    blurb: "The ones you know, argued with politely.",
    items: [
      { name: "Negroni /15", notes: "15-day barrel rest, cascara bitters", price: "₹620" },
      { name: "Espresso, Louder", notes: "Cold-brew reduction, vodka, salted cream", price: "₹640" },
      { name: "Old Fashioned, Undressed", notes: "Rye, jaggery, three bitters, no garnish", price: "₹680" },
      { name: "Daiquiri Nº0", notes: "Three-rum blend, kaffir cordial", price: "₹600" },
    ],
  },
  {
    id: "zero",
    title: "Zero Proof",
    blurb: "All of the technique. None of the ethanol.",
    items: [
      { name: "Sober Riot", notes: "Verjus, green apple, shiso, tonic", price: "₹420" },
      { name: "Quiet Party", notes: "Toasted rice, coconut water, lime leaf", price: "₹450" },
      { name: "Almost Whisky", notes: "Smoked barley tea, oak, vanilla", price: "₹480" },
    ],
  },
  {
    id: "kitchenette",
    title: "The 15 Sq. Ft. Kitchenette",
    blurb: "Small kitchen. Loud plates.",
    items: [
      { name: "Burnt Butter Corn Ribs", notes: "Chilli, lime, curd cheese", price: "₹390" },
      { name: "Chicken 65 Toast", notes: "Milk bread, yogurt emulsion, curry leaf", price: "₹450" },
      { name: "Cold Smoked Paneer", notes: "Pickled onion, black garlic", price: "₹420" },
      { name: "Prawn Balchão Bao", notes: "Goan masala, pickled cucumber", price: "₹520" },
      { name: "Truffle Kaju Fries", notes: "Cashew cream, parmesan", price: "₹360" },
    ],
  },
];