---
name: Shuangmu x TGR Shi (87 & 88)
slug: tgr-shi-87-88
subtitle: Commissioned PCB designs for the Shuangmu x TGR Shi TKL keyboards
rev: Infinity 87/88 Rev. 3
type: commission
layout: TKL
released: "2024"
featured: false
images:
  - https://i.imgur.com/IzvyYQn.png
  - https://i.imgur.com/dld7k3u.png
switches:
  - mx
specs:
  firmware: QMK
  connector: Onboard USB-C
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: Gray (F13) | Red (F12)
  custom:
    - key: Switch Installation
      value: Hotswap
layouts:
  - svg: /layouts/infinity-88-hotswap.svg
    caption: TGR Shi (F13) 88 layout
  - svg: /layouts/infinity-87-hotswap.svg
    caption: TGR Shi VA (F12) 87 layout
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/tree/master/Shuangmu/Shi
    description: TGR Shi F13 88 layout
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/tree/master/TKL%20PCB%20-%20Infinity%20Series/Infinity87/Firmware/Rev3/Standard
    description: TGR Shi VA F12 87 layout
compatibility:
  - title: Case fitment
    body: These PCB designs fit the Shuangmu x TGR Shi keyboards specifically
---
