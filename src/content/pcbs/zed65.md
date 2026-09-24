---
name: Zed65 Solder
slug: zed65
rev: "1.3"
type: stock
layout: 65%
released: "2023"
featured: false
images:
  - /images/ooe9rtt-1-.webp
  - /images/j9ihcu5.webp
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C (Onboard & Daughterboard) or Mini-USB
  mcu: ARM STM32
  rgb: Underglow
  thickness: 1.6mm
  material: FR4
  solderMask: Purple
  custom:
    - key: JST Standard
      value: JST-SH or JST-SUR
layouts:
  - svg: /layouts/gsk-tgr-910-mechlovin-zed65-solder.svg
downloads:
  - url: https://github.com/mechlovin/PCB/tree/master/Zed65/Rev1/Firmware
    kind: Firmware
  - kind: STEP Model
    url: https://github.com/mechlovin/PCB/tree/master/Zed65/Rev1/Step-files
compatibility:
  - body: Fits a variety of 65% boards that use onboard-USB or USB Daughterboard
    title: Fitment
changelog:
  - current: false
    rev: "1"
    date: "2023"
    summary: Original version
  - current: false
    rev: "1.1"
    date: "2023"
    summary: Minor fixes and improvements
    items:
      - kind: add
        text: 910 Blocker LEDs
      - kind: add
        text: Resistor to support USB 3.0 PD cable
  - current: false
    rev: "1.2"
    date: "2024"
    summary: Minor fixes and improvements
    items:
      - kind: add
        text: Outline for Leaf65 keyboard
      - kind: add
        text: Separate controls for underglow RGB and blocker RGB
      - kind: add
        text: Low-profile JST-SUR connector to improve compatibility
  - current: true
    rev: "1.3"
    date: "2026"
    summary: Improve compatibility
    items:
      - kind: add
        text: PCB cutouts for GAF/GSK910
      - kind: add
        text: Support for Kohaku and Vega65 (with recessed USB-C)
vendors:
  - name: Mechlovin'
    region: Global
    stock: in
    price: "45"
    shipping: Worldwide
    url: https://mechlovin.studio/products/mechlovin-zed65-65-pcb
---
