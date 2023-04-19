let items = [
    { name: "chair", 
      color: "green", 
      price: 140, 
      locations: ["Seattle", "Kent", "Auburn"]},

    { name: "table", 
      color: "blue", 
      price: 170, 
      locations: ["Seattle", "Tacoma", "Auburn"]},

    { name: "couch", 
      color: "black", 
      price: 1400, 
      locations: ["Seattle", "Kent", "Auburn", "Fife"]},

    { name: "lamp", 
      color: "yellow", 
      price: 244, 
      locations: ["Seattle", "Fife"]},
];

const getAll = () => {
    return items;
}

const getItem = (name) => {
    return items.find((item) => item.name === name);
}

export { getAll, getItem }