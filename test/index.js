'use strict';

var assert = require('assert');
var debug = require('debug')('combo-order');

describe('Should be able to create Orders', function() {

  debug('Initializing and Building Data Sets');
  var OrderFn = require('../lib/order');
  var fixtures = require('../fixtures/');

  var itemCategories = fixtures.itemCategories(); //Build Item Category
  var comboRuleSet = fixtures.buildComboRuleSet(); //Build Combo Rule Set
  debug('Initializing and Building Data Sets');
  before(function(done) {
    done();
  });

  it('Should add order 4B8MA87HMQJVR No Combo Rule', function(done) {
    var order = new OrderFn({
      itemCategories: itemCategories,
      combos: fixtures.combos,
      inventory: fixtures.inventory,
      comboRuleSet: comboRuleSet,
      categoryRules: fixtures.flattenRuleCategories(fixtures.combos)
    });

    var comboRule = order.add('4B8MA87HMQJVR');
    assert.ok(!comboRule); //Returns Null / Undefined;

    done();
  });

  it('Should add orders 4B8MA87HMQJVR, TQM1F7V8YSW6M find Combo Rule N7FNFE53X2ZCT, Order with Item 4B8MA87HMQJVR', function(done) {
    var order = new OrderFn({
      itemCategories: itemCategories,
      combos: fixtures.combos,
      inventory: fixtures.inventory,
      comboRuleSet: comboRuleSet,
      categoryRules: fixtures.flattenRuleCategories(fixtures.combos)
    });
    var comboRule;

    comboRule = order.add('4B8MA87HMQJVR');

    assert.ok(!comboRule); //NO Combo

    comboRule = order.add('TQM1F7V8YSW6M');
    assert.ok(comboRule === 'N7FNFE53X2ZCT');

    done();
  });

  it('Should add orders 4B8MA87HMQJVR,4B8MA87HMQJVR, TQM1F7V8YSW6M find Combo Rule R3VC63KP6XZ1T', function(done) {
    var order = new OrderFn({
      itemCategories: itemCategories,
      combos: fixtures.combos,
      inventory: fixtures.inventory,
      comboRuleSet: comboRuleSet,
      categoryRules: fixtures.flattenRuleCategories(fixtures.combos)
    });
    var comboRule;

    comboRule = order.add('4B8MA87HMQJVR');
    assert.ok(!comboRule); //NO Combo

    comboRule = order.add('4B8MA87HMQJVR');
    assert.ok(!comboRule); //NO Combo

    comboRule = order.add('TQM1F7V8YSW6M');
    assert.ok(comboRule === 'R3VC63KP6XZ1T');

    done();
  });

  it('Should add orders 4B8MA87HMQJVR,TQM1F7V8YSW6M, Z9C0CS8VP413R find Combo Rule N7FNFE53X2ZCT', function(done) {
    var order = new OrderFn({
      itemCategories: itemCategories,
      combos: fixtures.combos,
      inventory: fixtures.inventory,
      comboRuleSet: comboRuleSet,
      categoryRules: fixtures.flattenRuleCategories(fixtures.combos)
    });
    var comboRule;

    comboRule = order.add('4B8MA87HMQJVR');
    assert.ok(!comboRule); //NO Combo

    comboRule = order.add('TQM1F7V8YSW6M');
    assert.ok(comboRule === 'N7FNFE53X2ZCT');

    comboRule = order.add('Z9C0CS8VP413R');
    assert.ok(comboRule === 'N7FNFE53X2ZCT');

    done();
  });

  it('Should add orders 4B8MA87HMQJVR,JHMB2S8V3TC7R, Z9C0CS8VP413R find Combo Rule R3VC63KP6XZ1T', function(done) {
    var order = new OrderFn({
      itemCategories: itemCategories,
      combos: fixtures.combos,
      inventory: fixtures.inventory,
      comboRuleSet: comboRuleSet,
      categoryRules: fixtures.flattenRuleCategories(fixtures.combos)
    });
    var comboRule;

    comboRule = order.add('4B8MA87HMQJVR');
    assert.ok(!comboRule); //NO Combo

    comboRule = order.add('JHMB2S8V3TC7R');
    assert.ok(!comboRule); //NO Combo

    comboRule = order.add('Z9C0CS8VP413R');
    assert.ok(comboRule === 'R3VC63KP6XZ1T');
    done();
  });

  it('Should add orders 4B8MA87HMQJVR,4B8MA87HMQJVR, Z9C0CS8VP413R,Z9C0CS8VP413R find Combo Rule R3VC63KP6XZ1T', function(done) {
    var order = new OrderFn({
      itemCategories: itemCategories,
      combos: fixtures.combos,
      inventory: fixtures.inventory,
      comboRuleSet: comboRuleSet,
      categoryRules: fixtures.flattenRuleCategories(fixtures.combos)
    });
    var comboRule;

    comboRule = order.add('4B8MA87HMQJVR');
    assert.ok(!comboRule); //NO Combo

    comboRule = order.add('4B8MA87HMQJVR');
    assert.ok(!comboRule); //NO Combo

    comboRule = order.add('Z9C0CS8VP413R');
    assert.ok(comboRule === 'R3VC63KP6XZ1T'); //COMBO R3VC63KP6XZ1T

    comboRule = order.add('Z9C0CS8VP413R');
    assert.ok(comboRule === 'R3VC63KP6XZ1T'); //COMBO R3VC63KP6XZ1T

    done();
  });

});
