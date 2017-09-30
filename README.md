# Combo Order

## Install

The Module is **Dockerized**, pull the image from public [Docker Hub](https://hub.docker.com/).

``
  docker pull ramesh1211/combo-order:341cb4e477d3
``

## Usage

```
  docker pull ramesh1211/combo-order:341cb4e477d3
  docker run fea3f6262ebd //This will run the Tests associated with the Combo Order Project.
```


> Language of Choice used NodeJs

## Approach

### Build Data Sets

* **ItemCategories** Build the inventory to match items and categories.

  - Build a reverse map of Item to Category Map from the Category Collection. The result map of the Inventory will be converted to Map like below.

  ```json
  {
      "1":{
        "categories":{
          "c1":"c1",
          "c2":"c2"
        }
      }
  }
  ```

  > The Reverse item Map is used to lookup an item in O(1) when **`order.Add(itemId)`** method is called with an ItemId.

  >[Source](https://github.com/RameshRM/combo-order/blob/master/fixtures/index.js#L11)

* **CategoryRuleMap** Flatten Combo Rules & Categories. This step builds Map of Category and the matching rules. The category map is inverted from the Combo input , the converted map structure will look like below.

  ```json
  {
    "c1":{
      "ruleIds":["r1","r2", "r3"]
    }
  }
  ```
  > The Reverse Category Rule Map is used to lookup an Item Category in O(1) to find all the Rules when **`order.Add(itemId)`** method is called with an ItemId.

  >[Source](https://github.com/RameshRM/combo-order/blob/master/fixtures/index.js#L44)

### [Adding an Item to the Order](https://github.com/RameshRM/combo-order/blob/master/lib/order/index.js#L46)

* Maintain Collection of Items and add the newly added item to the collection.

* Build Order Categories Map - This Map of Categories to Items enables to lookup the Combo Rules.

* **`findMatchingRule`**

  **Input Parameters**

  - `ruleIds`: Collection of RuleIds for the Ordered Item Category.
  - `comboRuleSet` Flattened Combo Rules, Categories collection is flattened to a Map.
  - `orderCategories` Category Map for the Ordered Item & Categories.


  **Processing Logic**

  * Iterate for Every RuleIds matching the Order Category

  * Find Combo Rule for the RuleId

  * Find if the Order Category number of Items matches the Combo Rule Categories.[Source](https://github.com/RameshRM/combo-order/blob/master/lib/order/index.js#L88-L91)

  * Build the matching ruleSet collection for the Matching Rules.

  * If matching RuleSet has more than one item, find the Max Discount from the competing result. [Source](https://github.com/RameshRM/combo-order/blob/master/lib/order/index.js#L104-L111)

  * Return the matching RuleId.

**Output**

Returns the Matching Rule, which has the Maximum Discount %.
