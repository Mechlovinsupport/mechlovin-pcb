---
name: Zed65-RGB
slug: zed65-rgb
subtitle: Drop-in compatible PCB for various 65% keyboards
rev: "1"
type: stock
layout: 65%
released: "2026"
featured: false
images:
  - https://i.imgur.com/YMc5tC7.png
  - https://i.imgur.com/6LvdqL8.png
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C (Onboard & Daughterboard)
  mcu: ARM STM32
  rgb: Underglow & Per-key
  thickness: 1.6mm
  material: FR4
  solderMask: White
  custom:
    - key: DB Standard
      value: JST-SUR
layouts:
  - svg: /layouts/stellar65-space65-r1-r2-compatible-.svg
downloads:
  - url: https://github.com/mechlovin/PCB/tree/master/Zed65/RGB_LED/Rev1
    kind: QMK Firmware & VIA JSON
compatibility:
  - title: Case fitment
    body: This PCB is designed as a drop-in solution for a variety of 65% keyboards
      that use onboard USB-C or daughterboard. Please use our compatibility
      check tool for more details.
vendors:
  - name: Mechlovin'
    region: Global
    stock: in
    price: $55
    shipping: Worldwide
    url: https://mechlovin.studio/products/mechlovin-zed60-zed65-hotswap-pcbs?variant=46217836920971
---
