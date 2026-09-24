---
name: Mechlovin' 9
slug: mechlovin-9
subtitle: Drop-in PCB for Kyuu keyboard
rev: "3"
type: stock
layout: 65%
released: "2021"
featured: false
images:
  - /images/mech9.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: Onboard USB-C
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: Matte Black
layouts:
  - svg: /layouts/mechlovin9-rev-2.svg
downloads:
  - kind: Firmware
    url: https://github.com/mechlovin/PCB/tree/master/Mechlovin9/Firmware
compatibility:
  - title: Fitment
    body: Fits the Kyuu 65% keyboard specifically
changelog:
  - current: false
    rev: "1"
    date: "2020"
    summary: Orginal version with STM32F303 MCU
  - current: false
    rev: "2"
    date: "2021"
    summary: Atmega32A MCU
  - current: false
    rev: "3"
    date: "2023"
    summary: STM32F103 MCU
vendors:
  - name: Mechlovin'
    region: Global
    stock: in
    price: $42
    shipping: Worldwide
    url: https://mechlovin.studio/products/mechlovin-9-kyuu-compatible-pcb
---
