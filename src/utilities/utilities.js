const ascOrdering = (a, b) => {
  return b.value - a.value;
};

export const getCategories = (level) => {
  return level.categories.map((category) => category.type);
};

export const balanceData = (exceedArray, lackArray) => {
  const recomendationsList = [];
  while (exceedArray.length > 0) {
    exceedArray.sort(ascOrdering);
    lackArray.sort(ascOrdering);
    if (lackArray[0].value >= exceedArray[0].value) {
      let itemToRemove = exceedArray.shift();
      let itemToChange = lackArray[0];
      if (itemToChange.value - itemToRemove.value == 0) {
        lackArray.shift();
      } else {
        lackArray[0].value = parseFloat(
          (itemToChange.value - itemToRemove.value).toFixed(2)
        );
      }
      recomendationsList.push(
        `Transfer $${itemToRemove.value} from ${itemToRemove.name} to ${itemToChange.name}`
      );
    } else {
      let itemToRemove = lackArray.shift();
      let itemToChange = exceedArray[0];
      if (itemToChange.value - itemToRemove.value == 0) {
        exceedArray.shift();
      } else {
        exceedArray[0].value = parseFloat(
          (itemToChange.value - itemToRemove.value).toFixed(2)
        );
      }
      recomendationsList.push(
        `Transfer $${itemToRemove.value} from ${itemToRemove.name} to ${itemToChange.name}`
      );
    }
  }
  return recomendationsList;
};

export const calculateItemsToBalance = (table) => {
  let sum = 0;
  for (let i = 0; i < table.length; i++) {
    let row = table[i];
    let rowValue = parseFloat(row.querySelector(".user_input").value);
    sum += rowValue;
  }
  let valuesToTransfer = [];
  let valuesToAdd = [];

  for (let i = 0; i < table.length; i++) {
    let row = table[i];
    let weight = parseFloat(row.dataset.weight);
    let userValue = parseFloat(row.querySelector(".user_input").value);
    let newValue = (sum * weight) / 100;
    let difference = parseFloat((newValue - userValue).toFixed(2));

    row.querySelector(".user_new").value = newValue;
    row.querySelector(".user_difference").value = difference;

    let typeLabel = row.querySelector("label").dataset.label;
    if (difference >= 0) {
      row.querySelector(".user_difference").style.color = "green";
      if (difference > 0) {
        valuesToAdd.push({
          name: typeLabel,
          value: difference,
        });
      }
    } else {
      row.querySelector(".user_difference").style.color = "red";
      valuesToTransfer.push({
        name: typeLabel,
        value: -difference,
      });
    }
  }
  return { valuesToTransfer, valuesToAdd };
};
