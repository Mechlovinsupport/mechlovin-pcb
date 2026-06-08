---
name: GSK x TGR 910
slug: gsk-x-tgr-910
subtitle: Commissioned PCB designs for the GSK x TGR 910 keyboards
rev: ZED65 Rev. 1
type: commission
layout: 65%
released: "2024"
featured: false
images:
  - https://i.imgur.com/icFolOV.jpeg
  - https://i.imgur.com/RrVcntU.jpeg
  - https://i.imgur.com/aASiU09.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: Custom USB-C Daughterboard
  mcu: ARM STM32
  rgb: Blocker (R1) | Underglow (R2)
  thickness: 1.6mm
  material: FR4
  solderMask: Gray
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/gsk-tgr-910-mechlovin-zed65-solder.svg
    caption: Solder Version
  - svg: /layouts/gsk-tgr-910-mechlovin-zed65-hotswap.svg
    caption: Hotswap Version
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/tree/master/Zed65/910/GSK/Alu
    description: R1 Aluminum version (2024)
  - kind: QMK Firmware & VIA JSON
    url: https://github.com/mechlovin/PCB/tree/master/Zed65/910/GSK/Poly
    description: R2 Polycarbonate version (2026)
compatibility:
  - title: Case fitment
    body: These PCB designs fit the GSK x TGR 910 keyboards specifically. Also fit
      the GAF x TGR 910 due to a shared design platform
---
