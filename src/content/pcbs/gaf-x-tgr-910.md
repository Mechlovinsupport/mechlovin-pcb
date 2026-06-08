---
name: GAF x TGR 910
slug: gaf-x-tgr-910
subtitle: Commissioned PCB designs for the GAF x TGR 910 keyboard
type: commission
layout: 65%
released: "2023"
featured: false
images:
  - https://i.imgur.com/FX0YcLV.png
  - https://i.imgur.com/CXObbaw.png
  - https://i.imgur.com/8ZObo6o.jpeg
  - https://i.imgur.com/GFlX7Ko.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: Custom USB-C Daughterboard
  mcu: Atmega32U4 or ARM STM32
  rgb: Underglow
  thickness: 1.6mm
  material: FR4
  solderMask: Yellow (R1) |  White (R2)
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/gaf-x-tgr-910-r1.svg
    caption: GAF x TGR R1 (Aluminum)
  - svg: /layouts/gsk-tgr-910-mechlovin-zed65-solder.svg
    caption: GAF x TGR 910 R2 (PC) Solder
  - svg: /layouts/gsk-tgr-910-mechlovin-zed65-hotswap.svg
    caption: GAF x TGR 910 R2 (PC) Hotswap
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/tree/master/Zed65/910/GAF/Hannah910_Rev2
    description: R1 Aluminium
  - kind: QMK Firmware & VIA JSON
    url: https://github.com/mechlovin/PCB/tree/master/Zed65/910/GAF/Zed65/Solder
    description: R2 Polycarbonate - Solder
  - kind: QMK Firmware & VIA JSON
    description: R2 Polycarbonate - Hotswap
    url: https://github.com/mechlovin/PCB/tree/master/Zed65/910/GAF/Zed65/Hotswap
compatibility:
  - title: Case fitment
    body: These PCB designs fit the GAF x TGR 910 keyboards specifically
changelog: []
---
