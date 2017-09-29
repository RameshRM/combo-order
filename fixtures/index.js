'use strict';

var inventory = require('./inventory').inventory;
var combos = require('./combos').combos;


module.exports.inventory = inventory;
module.exports.combos = combos;

/**Flatten the item w/Category **/
module.exports.itemCategories = function() {
  var categoryMap = {};

  inventory.categories.forEach(function(category) {
    categoryMap[category.id] = category.items;
  });
  var items = {};

  Object.keys(categoryMap).forEach(function(category) {
    categoryMap[category].forEach(function forEach(item) {
      if (!items[item.id]) {
        items[item.id] = {
          categories: {}
        };
      }
      items[item.id].categories[category] = category;
    });
  });
  return items;
};

module.exports.comboCategories = function() {
  var comboCategories = [];
  var flatCombos = combos.map(function map(combo) {
    combo.categoryMap = {};
    combo.categories.forEach(function forEach(category) {
      combo.categoryMap[category] = combo.categoryMap[category] ? combo.categoryMap[category] + 1 : 1;
    });
    return combo;
  });
  return flatCombos;
};

module.exports.flattenRuleCategories = function flattenRuleCategories(comboRuleSets) {
  var categoryRules = {};
  comboRuleSets.forEach(function forEach(comboRule) {
    comboRule.categories.forEach(function forEach(category) {
      if (!categoryRules[category]) {
        categoryRules[category] = {
          ruleIds: []
        };
      }
      categoryRules[category].ruleIds.push(comboRule.id);
    });
  });
  return categoryRules;
};

module.exports.buildComboRules = function() {
  var flatCombos = combos.map(function map(combo) {
    combo.categoryMap = {};
    combo.categories.forEach(function forEach(category) {
      combo.categoryMap[category] = combo.categoryMap[category] ? combo.categoryMap[category] + 1 : 1;
    });
    return combo;
  });
  return flatCombos;
};

module.exports.buildComboRuleSet = function() {
  var flatCombos = combos.map(function map(combo) {
    combo.categoryMap = {};
    combo.categories.forEach(function forEach(category) {
      combo.categoryMap[category] = combo.categoryMap[category] ? combo.categoryMap[category] + 1 : 1;
    });
    return combo;
  }).reduce(function reduce(acc, item) {
    acc[item.id] = item;
    return acc;
  }, {});
  return flatCombos;
};


module.exports.dataSet = {
  inventory: require('./inventory'),
  combos: require('./combos')
};

function findItemCategories(itemId, itemMap) {
  if (itemId && itemMap) {
    return Object.keys(itemMap[itemId].categories);
  }
}
