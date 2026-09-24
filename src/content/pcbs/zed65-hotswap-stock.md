---
name: Zed65 Hotswap - Stock
slug: zed65hs
subtitle: Drop-in PCB for a variety of 65% keyboards
rev: "1.2"
type: stock
layout: 65%
released: "2025"
featured: true
images:
  - /images/zed65hs.webp
  - /images/zed65hs2.webp
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C (Onboard & Daughterboard)
  mcu: ARM STM32
  rgb: Underglow
  thickness: 1.6mm
  material: FR4
  solderMask: Black
  custom:
    - key: JST Standard
      value: Low-profile JST-SUR
layouts:
  - svg: /layouts/zed65-hotswap-1-.svg
downloads:
  - url: https://github.com/mechlovin/PCB/tree/master/Zed65/Rev1/Firmware/Rev1.2
    kind: Firmware
  - kind: STEP Model
    url: https://github.com/mechlovin/PCB/tree/master/Zed65/Rev1/Step-files
compatibility:
  - body: Fits a variety of 65% boards that use onboard-USB or USB Daughterboard
    title: Fitment
changelog:
  - current: true
    rev: "1.2"
    date: "2025"
    summary: "Original hot-swap version. Version named 1.2 to match with the Solder
      counterpart. "
vendors:
  - name: Mechlovin'
    region: Global
    stock: in
    price: "48"
    shipping: Worldwide
    url: https://mechlovin.studio/products/mechlovin-zed60-zed65-hotswap-pcbs
---
