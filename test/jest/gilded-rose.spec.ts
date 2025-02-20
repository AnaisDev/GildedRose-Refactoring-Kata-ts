import { ItemName, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  let fooItem;
  let agedBrieItem;
  let sulfurasItem;
  let backstageItem;
  let conjuredItem;

  fooItem = {
    name: "foo",
    sellIn: 2,
    quality: 4,
  };

  agedBrieItem = { name: ItemName.AgedBrie, sellIn: 2, quality: 4 };

  sulfurasItem = {
    name: ItemName.Sulfura,
    sellIn: 16,
    quality: 10,
  };

  backstageItem = {
    name: ItemName.Backstage,
    sellIn: 10,
    quality: 10,
  };

  conjuredItem = {
    name: ItemName.Conjured,
    sellIn: 15,
    quality: 15,
  };

  it("should foo", () => {
    const gildedRose = new GildedRose([{ ...fooItem }]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it(`should have a item with the "sellIn" and "quality" properties type of number`, () => {
    const gildedRose = new GildedRose([{ ...fooItem }]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toHaveProperty("sellIn");
    expect(items[0]).toHaveProperty("quality");
    expect(typeof items[0].quality).toBe("number");
    expect(typeof items[0].sellIn).toBe("number");
  });

  it(`should have a positive item quality`, () => {
    const gildedRose = new GildedRose([{ ...fooItem, sellIn: 0 }]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(0);
  });

  it(`should lower both values for every item at the end of each day our system `, () => {
    const gildedRose = new GildedRose([{ ...fooItem }]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThan(fooItem.quality);
    expect(items[0].sellIn).toBeLessThan(fooItem.sellIn);
  });

  it(`should have a quality no greater than 50`, () => {
    const gildedRose = new GildedRose([{ ...backstageItem, quality: 50 }]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(50);
  });

  it(`should have a quality that degrades twice as fast once the sell-by date has passed.`, () => {
    const gildedRose = new GildedRose([{ ...fooItem, sellIn: 0 }]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(fooItem.quality - 2);
  });

  it(`should actually have the 'Aged Brie' quality increase the older it gets.`, () => {
    const gildedRose = new GildedRose([{ ...agedBrieItem }]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThan(agedBrieItem.quality);
    expect(items[0].sellIn).toBeLessThan(agedBrieItem.sellIn);
  });

  it(`should have a 'Sulfuras' that is never sold or whose quality does not decrease`, () => {
    const gildedRose = new GildedRose([{ ...sulfurasItem }]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(sulfurasItem.quality);
    expect(items[0].sellIn).toBe(sulfurasItem.sellIn);
  });

  it(`should have its quality increase by 1 when there are more than 10 days remaining for the Backstage Passes.`, () => {
    const gildedRose = new GildedRose([{ ...backstageItem, sellIn: 15 }]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(backstageItem.quality + 1);
  });

  it(`should have its quality increase by 2 when there are 10 days or less remaining for the Backstage Passes.`, () => {
    const gildedRose = new GildedRose([{ ...backstageItem }]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(backstageItem.quality + 2);
  });

  it(`should have its quality increase by 3 when there are 5 days or less remaining for the Backstage Pass`, () => {
    const gildedRose = new GildedRose([{ ...backstageItem, sellIn: 5 }]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(backstageItem.quality + 3);
  });

  it(`should have its quality drop to 0 after the Backstage Pass concert.`, () => {
    const gildedRose = new GildedRose([{ ...backstageItem, sellIn: 0 }]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it(`should have conjured items that degrade in quality twice as fast as normal items`, () => {
    const gildedRose = new GildedRose([{ ...conjuredItem }]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(conjuredItem.quality - 2);
  });
});
