---
name: Hex 6C
slug: hex-6c
subtitle: Commissioned PCB design for the Hex 6C keyboard.
rev: "2"
type: commission
layout: Full-Size
released: "2022"
featured: false
images:
  - https://i.imgur.com/nGf4nSP.png
  - https://i.imgur.com/iTjGh2H.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C Daughterboard
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: Matte Black
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/hex-6c.svg
downloads:
  - kind: QMK Firmware
    description: Rev. 1
    url: https://github.com/mechlovin/PCB/blob/master/Hex-Keyboard/Hex6C/mechlovin_hex6c_via.bin
  - kind: QMK Firmware
    description: Rev. 2
    url: https://github.com/mechlovin/PCB/blob/master/Hex-Keyboard/Hex6C/mechlovin_hex6c_rev2_via.bin
compatibility:
  - title: Case fitment
    body: "This PCB design fits the Hex 6C keyboard specifically. "
changelog:
  - current: false
    rev: Revision 1
    date: "2021"
    summary: Original version
    items: []
  - current: true
    rev: Revision 2
    date: "2022"
    summary: "Overall design revision to improve stability. Removed in-switch LED. "
    items: []
vendors:
  - name: Mechlovin'
    region: Global
    stock: in
    url: https://mechlovin.studio/products/commission-clearance?variant=46211484123275
    shipping: Worldwide
    price: $49
---
