export enum ItemName {
  AgedBrie = "Aged Brie",
  Sulfura = "Sulfuras, Hand of Ragnaros",
  Backstage = "Backstage passes to a TAFKAL80ETC concert",
  Conjured = "Conjured",
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const qualityMax = 50;

    this.items.forEach((item) => {
      if (item.name === ItemName.Sulfura) return;

      switch (item.name) {
        case ItemName.AgedBrie:
          if (item.quality >= qualityMax) break;
          item.quality += 1;
          break;
        case ItemName.Backstage:
          if (item.quality >= qualityMax) break;
          if (item.sellIn === 0) {
            item.quality = 0;
          } else if (item.sellIn < 6) {
            item.quality += 3;
          } else if (item.sellIn < 11) {
            item.quality += 2;
          } else {
            item.quality += 1;
          }
          break;
        default:
          if (item.quality === 0) break;
          if (item.sellIn === 0 || item.name === ItemName.Conjured) {
            item.quality -= 2;
          } else {
            item.quality -= 1;
          }
      }

      if (item.sellIn > 0) item.sellIn -= 1;
    });

    return this.items;
  }
}
