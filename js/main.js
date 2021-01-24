const compose = (...functions) => (data) =>
  functions.reduceRight((value, func) => func(value), data);

const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj);
  const attrs = [];

  for (let i = 0; i < keys.length; i++) {
    let attr = keys[i];
    attrs.push(`${attr}="${obj[attr]}"`);
  }

  return attrs.join("");
};

const tagAttrs = (obj) => (content = "") =>
  `<${obj.tag}${obj.attrs ? " " : ""}${attrsToString(obj.attrs)}>${content}</${obj.tag
  }>`;

const tag = (t) => {
  if (typeof t === "string") {
    return tagAttrs({ tag: t });
  } else {
    return tagAttrs(t);
  }
};

const tableCell = tag("td");
const tableCells = (items) => items.map(tableCell).join(";");

const tableRowTag = tag("tr");
const tableRow = (items) => compose(tableRowTag, tableCells)(items);

const trashIcon = tag({ tag: 'i', attrs: { class: 'fas fa-trash-alt' } })('')


let description = $("#description");
let carbs = $("#carbs");
let calories = $("#calories");
let protein = $("#protein");

let list = [
  {
    description: "Manzana",
    calories: 20,
    carbs: 10,
    protein: 10,
  },
];

const validateInputs = () => {
  // Validate if the field is empty or not
  description.val() ? "" : description.addClass("is-invalid");
  calories.val() ? "" : calories.addClass("is-invalid");
  carbs.val() ? "" : carbs.addClass("is-invalid");
  protein.val() ? "" : protein.addClass("is-invalid");

  // If the items are not empty
  if (description.val() && calories.val() && carbs.val() && protein.val()) {
    add();
    cleanInputs();
    updateTotals()
    renderItems()
  }
};

const add = () => {
  const newItem = {
    description: description.val(),
    calories: parseInt(calories.val(), 10),
    carbs: parseInt(carbs.val(), 10),
    protein: parseInt(protein.val(), 10),
  };

  list.push(newItem);
  console.log(list);
};

const updateTotals = () => {
  let calories = 0
  let carbs = 0
  let proteins = 0

  list.map(item => {
    calories += item.calories
    carbs += item.carbs
    proteins += item.protein
  })

  $('#totalCalories').text(calories)
  $('#totalCarbs').text(carbs)
  $('#totalProteins').text(proteins)
}

const cleanInputs = () => {
  description.val("");
  calories.val("");
  carbs.val("");
  protein.val("");
};


const renderItems = () => {
  $('tbody').empty();
  list.map((item, index) => {
    const removeButton = tag({
      tag: "button",
      attrs: {
        class: 'btn btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon)
    $('tbody').append(tableRow([item.description, item.calories, item.carbs, item.protein, removeButton]))
  })
}


const removeItem = index => {
  list.splice(index,1)
  updateTotals()
  renderItems()
}

description.keypress(() => {
  description.removeClass("is-invalid");
});

calories.keypress(() => {
  calories.removeClass("is-invalid");
});

carbs.keypress(() => {
  carbs.removeClass("is-invalid");
});

protein.keypress(() => {
  protein.removeClass("is-invalid");
});
