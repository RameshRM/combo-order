'use strict';

var orderFn = require('./lib/order');
var fixtures = require('./fixtures/');

var itemCategories = require('./fixtures').itemCategories(); //Build Item Category
var comboRuleSet = fixtures.buildComboRuleSet(); //Build Combo Rule Set

var Order = new orderFn({
  itemCategories: itemCategories,
  combos: fixtures.combos,
  inventory: fixtures.inventory,
  comboRuleSet: comboRuleSet,
  categoryRules: fixtures.flattenRuleCategories(fixtures.combos)
});
Order.add('4B8MA87HMQJVR');
// (Order.add("4B8MA87HMQJVR"));
Order.add('4B8MA87HMQJVR');
var result = Order.add('Z9C0CS8VP413R');
var result = Order.add('Z9C0CS8VP413R');
console.log(result);
// Order.add('4B8MA87HMQJVR');

return;
(Order.add("4B8MA87HMQJVR"));
(Order.add("4B8MA87HMQJVR"));
(Order.add("4B8MA87HMQJVR"));
(Order.add("4B8MA87HMQJVR"));
(Order.add("4B8MA87HMQJVR"));
(Order.add("4B8MA87HMQJVR"));
