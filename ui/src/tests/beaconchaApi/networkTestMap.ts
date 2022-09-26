export const networkTestMap = new Map<
  string,
  { pubkeys: string[]; indexes: number[] }
>([
  [
    "mainnet",
    {
      pubkeys: [
        "0x80000001677f23a227dfed6f61b132d114be83b8ad0aa5f3c5d1d77e6ee0bf5f73b0af750cc34e8f2dae73c21dc36f4a",
        "0x800006d4b1026b6149168b342e6883d48ede9539202cc414448b1b796394440a5401e8d6620e65d7c77654bf1db199b1",
      ],
      indexes: [8499, 347967],
    },
  ],
  [
    "prater",
    {
      pubkeys: [
        "0x8000091c2ae64ee414a54c1cc1fc67dec663408bc636cb86756e0200e41a75c8f86603f104f02c856983d2783116be13",
        "0x80003a1c67216514e4ab257738e59ef38063edf43bc4a2ef9d38633bdde117384401684c6cf81aa04cf18890e75ab52c",
      ],
      indexes: [55293, 351819],
    },
  ],
  [
    "gnosis",
    {
      pubkeys: [
        "0x8000385f61788781c3514322c14bf4ef51bfee5ed743872ac9ea37a3a11e1e3496f4f5e252ef33fdb5bf3684c13ed210",
        "0x8000e5f66ffb58ef1f8bf8994172da85c77142cc7be24a63d53e572f5ba1149466c5aa0e6a383b2cddf83467cf8e688a",
      ],
      indexes: [57102, 81200],
    },
  ],
]);
