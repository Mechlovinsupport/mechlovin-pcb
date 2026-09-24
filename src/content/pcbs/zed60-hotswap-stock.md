---
name: Zed60 Hotswap  - Stock
slug: zed60hs
subtitle: Universal Hotswap 60% PCB
rev: "1.2"
type: stock
layout: 60%
released: "2025"
featured: true
images:
  - /images/zed60hs.webp
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
  - svg: /layouts/zed60-hotswap.svg
downloads:
  - kind: Firmware
    url: https://github.com/mechlovin/PCB/tree/master/60-PCB/Zed60/Firmware
  - kind: STEP Model
    url: https://github.com/mechlovin/PCB/tree/master/60-PCB/Zed60
changelog:
  - current: true
    rev: Rev. 1.2
    date: "2025"
    summary: Original version
    items:
      - kind: add
        text: "JST-SUR low-profile connector to improve compatibility. No JST-SH
          support. "
vendors:
  - name: Mechlovin' Store
    region: Global
    stock: in
    shipping: Worldwide
    price: $48
    url: https://mechlovin.studio/products/mechlovin-zed60-zed65-hotswap-pcbs
---
