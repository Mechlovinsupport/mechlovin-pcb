---
name: ZED75 - Tomo
slug: zed75-tomo
subtitle: Drop-in compatible PCB for the TGR Tomo keyboard.
rev: "1"
type: commission
layout: 75%
released: "2025"
featured: false
images:
  - https://i.imgur.com/NjJXGqU.jpeg
  - https://i.imgur.com/ZfLfUVD.png
  - https://i.imgur.com/sEvNIg5.jpeg
  - https://i.imgur.com/Dh3JD63.png
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C Daughterboard
  mcu: ARM STM32
  rgb: Blocker
  thickness: 1.6mm
  material: FR4
  solderMask: Matte Black
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/tomo-75-solder.svg
    caption: Solder Version
  - svg: /layouts/tomo-75-hotswap.svg
    caption: Hotswap Version
downloads:
  - kind: QMK Firmware & VIA JSON
    url: https://github.com/mechlovin/PCB/tree/master/Zed75/Tomo
compatibility:
  - title: Case fitment
    body: "This PCB design fits the TGR x Monokei Tomo keyboard specifically. "
vendors:
  - name: Mekibo
    region: North America
    stock: in
    shipping: Worldwide
    url: https://mekibo.com/products/monokei-x-tgr-tomo-75
    price: "-"
---
