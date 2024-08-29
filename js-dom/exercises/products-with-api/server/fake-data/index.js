const products = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    category: "Electronics",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 499.99,
    category: "Electronics",
    inStock: false,
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818",
  },
  {
    id: 3,
    name: "Headphones",
    price: 79.99,
    category: "Electronics",
    inStock: true,
    imageUrl:
      "https://www.headphonezone.in/cdn/shop/products/Headphone-Zone-Sony-WH-XB910N-Black-01.jpg?v=1645786228&width=1160",
  },
  {
    id: 4,
    name: "Backpack",
    price: 39.99,
    category: "Fashion",
    inStock: true,
    imageUrl:
      "https://cdn.thewirecutter.com/wp-content/media/2022/09/backpacks-2048px-9904.jpg",
  },
  {
    id: 5,
    name: "Watch",
    price: 129.99,
    category: "Fashion",
    inStock: true,
    imageUrl:
      "https://media.wired.com/photos/6511aab1189c419c40374c92/4:3/w_1803,h_1352,c_limit/Apple-Watch-Ultra-2-Alt-Gear.jpg",
  },
  {
    id: 6,
    name: "Coffee Maker",
    price: 49.99,
    category: "Appliances",
    inStock: false,
    imageUrl:
      "https://www.delonghi.com/medias/en-Automatic-Old-EE-Cold-Brew-Sidecard-Mobile-A.jpeg?context=bWFzdGVyfHJvb3R8NTIyNzZ8aW1hZ2UvanBlZ3xoZDIvaDcwLzMwMzUyMjg1NDAxMTE4L2VuX0F1dG9tYXRpYy1PbGRfRUUtQ29sZC1CcmV3LVNpZGVjYXJkLU1vYmlsZS1BLmpwZWd8ODgzYTdkYjMzNjRmYjBiY2ZjZmU4ZTk1YWQ4Njg3MjQ1ZDM3NGJlOGUyYjllYjYxNWVhNTY4ZTY5MjljZWY2ZQ",
  },
  {
    id: 7,
    name: "Gaming Console",
    price: 299.99,
    category: "Electronics",
    inStock: true,
    imageUrl:
      "https://media.4rgos.it/i/Argos/0621-m0014-m007-m050-asym-m008-m022-gamingconsoleguide-8349024?w=auto&qlt=50&fmt=auto&noiser=0&fmt.jpeg.interlaced=true&fmt.jp2.qlt=40&",
  },
  {
    id: 8,
    name: "Running Shoes",
    price: 79.99,
    category: "Sports",
    inStock: true,
    imageUrl:
      "https://cdn.thewirecutter.com/wp-content/media/2021/10/running-shoes-2048px-3097.jpg",
  },
  {
    id: 9,
    name: "Blender",
    price: 34.99,
    category: "Appliances",
    inStock: true,
    imageUrl: "https://www.pamperedchef.com/iceberg/com/product/100125-lg.jpg",
  },
  {
    id: 10,
    name: "Sunglasses",
    price: 49.99,
    category: "Fashion",
    inStock: false,
    imageUrl:
      "https://ampere.shop/cdn/shop/files/Dusk-Blackframewithdarktint_polarizedlenses_969c55e5-54b3-44bc-ad49-3c0eac2e49f5_1100x.jpg?v=1699957738",
  },
  {
    id: 11,
    name: "Desk Chair",
    price: 129.99,
    category: "Furniture",
    inStock: true,
    imageUrl: "https://img.zcdn.com.au/lf/50/hash/38080/19694906/4/.jpg",
  },
  {
    id: 12,
    name: "Dumbbells Set",
    price: 89.99,
    category: "Sports",
    inStock: true,
    imageUrl:
      "https://m.media-amazon.com/images/I/61aJekgkd2L._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 13,
    name: "Microwave Oven",
    price: 79.99,
    category: "Appliances",
    inStock: true,
    imageUrl:
      "https://images.samsung.com/is/image/samsung/p6pim/ph/mg30t5018cc-tc/gallery/ph-mw5000t-mg30t5018cc-tc-530524580?$650_519_PNG$",
  },
  {
    id: 14,
    name: "Digital Camera",
    price: 349.99,
    category: "Electronics",
    inStock: false,
    imageUrl:
      "https://in.canon/media/image/2018/11/19/b639ce271d2b450c974112ee3a7246ba_PowerShot-SX70-HS-Front-Slant.png",
  },
  {
    id: 15,
    name: "Hiking Boots",
    price: 69.99,
    category: "Outdoor",
    inStock: true,
    imageUrl:
      "https://www.switchbacktravel.com/sites/default/files/articles%20/Hiking%20Boots%20%28Lowa%20Renegade%20GTX%20on%20rock%29%20%28m%29.jpg",
  },
];

module.exports = {
  products,
};
