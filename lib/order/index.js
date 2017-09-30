'use strict';
var debug = require('debug')('combo-order');

module.exports = Order;

/**
  Order Entity
**/
function Order(dataSet) {
  this.dataSet = dataSet;
  this.orderId = Date.now();
  this.items = []; /**Adds the Items added to the Order **/
  this.orderCategories = {}; /** Maintains a Map<Category, Items[]> **/
}


/**
  Summary: Builds Order per Categories and attaches the Item to the Category.
  Input:
    itemId => ItemId to be added with Order.
  Output:
    Returns Map of Keyvalue, Key => Category & Value => [Ordered Items]
**/
Order.prototype.build = function(itemId) {
  var _categories = this.dataSet.itemCategories[itemId].categories;
  var _orderCategories = this.orderCategories;
  Object.keys(_categories).forEach(function forEach(key) {
    if (_orderCategories[key]) {
      _orderCategories[key].items.push(itemId);
    } else {
      _orderCategories[key] = {
        items: [itemId]
      };
    }
  });
  return _orderCategories;
};

/***
  Summary: Add a new Item to the Order and Builds the Order Categories.

  Input:
    itemId => Input item
  Description:
    After successfully added the item, Find the Matching Combo Rule for the Items added to the order.
***/
Order.prototype.add = function add(itemId) {
  this.items.push(itemId);
  debug('Item %s', itemId);

  this.orderCategories = this.build(itemId);

  var ruleId = this.findMatchingRule(
    findRuleIdsByCategory(this.dataSet && this.dataSet.categoryRules, Object.keys(this.orderCategories)),
    this.dataSet.comboRuleSet, this.orderCategories);

  debug('Combo Rule %s', !ruleId ? 'None' : ruleId);
  return ruleId;
};

/**
  Summary: Finds the Matching Combo Rule for the Ordered categories
  Input:
    [ruleIds] => Collection of All the Matching RuleIds for the Ordered Item categories.
    [comboRuleSet] => Collection of Combo RuleSets with Categories Flattened to Map.
    [orderCategories] => Map<String, Items>, Map of Ordered Categories with Items as value.
  Output:
    Matching [Rules] for the existing Order.
**/
Order.prototype.findMatchingRule = function findMatchingRule(ruleIds, comboRuleSet, orderCategories) {
  var ruleSets = [];
  var ruleIdMap = {};

  for (var i = 0; i < ruleIds.length; i++) {
    if (ruleIdMap[ruleIds[i]]) {
      continue;
    }
    ruleIdMap[ruleIds[i]] = 1;

    var comboRule = comboRuleSet && comboRuleSet[ruleIds[i]];

    if (!comboRule) {
      continue;
    }

    var hasMatch = false;

    for (var comboCategory in comboRule.categoryMap) {
      if (!comboCategory) {
        continue;
      }

      if (orderCategories[comboCategory] && orderCategories[comboCategory].items &&
        orderCategories[comboCategory].items.length >= comboRule.categoryMap[comboCategory] &&
        (orderCategories[comboCategory].items.length % comboRule.categoryMap[comboCategory] === 0)) {
        hasMatch = true;
      } else {
        hasMatch = false;
        break;
      }
    }
    if (hasMatch) {
      ruleSets.push(comboRule);
    }
  }

  var ruleId;
  var discount;
  ruleSets.forEach(function forEach(ruleSet) {
    if (!discount) {

      ruleId = ruleSet.id;
      discount = ruleSet.discount;
    } else {
      discount = Math.min(discount, ruleSet.discount);
      if (discount === ruleSet.discount) {
        ruleId = ruleSet.id;
      }
    }
  });
  return ruleId;
};

/**
  Summary: Finds all the Matching RuleIds for the Ordered categories
  Input:
    categoryRules => Map<Category, [ruleIds]> This Map is built and inverted from Combo.json, to represent Category -> Rule Mapping.
    categories => KeySet of all order Categories.
  Output:
    Returns List<RuleId> for matching condition.
**/
function findRuleIdsByCategory(categoryRules, categories) {
  return categories && categoryRules && categories.reduce(function reduce(acc, category) {
    acc = acc.concat(categoryRules[category].ruleIds);
    return acc;
  }, []);
}
