---
title: Flashing firmware with QMK Toolbox
slug: flashing-firmware-qmk-toolbox
tag: Firmware
order: 1
platform: Windows · macOS
difficulty: Beginner
time: ~5 min
updated: 14 Sep 2025
lede: QMK Toolbox is the simplest way to flash a Mechlovin PCB on Windows or macOS. This guide walks through installing the app, putting your board in flashing mode, and applying the downloaded .hex file. Total time about 5 minutes.
---

## What you'll need

Before you start, gather these three things. You don't need any soldering tools or special hardware — just a computer, a cable, and the firmware file from this site.

- **QMK Toolbox** — the flashing app. Free, Windows + macOS. Linked in the next step.
- **The firmware .hex file for your PCB** — grab it from the PCB's page on this site, under the Downloads section.
- **A USB-C cable that supports data** — many charging cables are power-only and won't work. If in doubt, use the cable that came with your phone or a known-good one.

> **Note:** ZMK firmware (used by wireless PCBs) is flashed differently — see the Flashing wireless PCBs guide instead.

## Install QMK Toolbox

Download the latest release from the official GitHub page. Both Windows and macOS builds are signed, so you shouldn't see warnings.

- **Windows** — download `qmk_toolbox.exe`. No install needed; just run it.
- **macOS** — download `QMK.Toolbox.pkg`, open it, drag QMK Toolbox into Applications.
- **Linux** — QMK Toolbox isn't supported. Use `qmk flash` from the command line instead.

Download from: [github.com/qmk/qmk_toolbox/releases](https://github.com/qmk/qmk_toolbox/releases)

## Download the firmware

Each PCB has its own firmware build. Open your PCB's detail page on this site, scroll to the Downloads section, and open the QMK Firmware link.

> **Tip:** Save the file somewhere you'll remember — your Downloads folder is fine. You'll select it in QMK Toolbox in the next step.

The file is named like `adelais-v0.24.3.hex` and is around 90 KB. If you got a `.bin` or `.uf2` file instead, this guide doesn't apply — check the PCB page for the right flashing instructions.

## Load the .hex file into QMK Toolbox

Open QMK Toolbox. You'll see a window with a file path field at the top, a console area below, and a Flash button on the right.

Click **Open** (or drag the .hex file directly onto the Toolbox window). The path appears in the file-path field at the top.

> **Important:** Make sure the file extension is `.hex`. If you accidentally select the source code (a `.zip` or `.tar.gz`), Toolbox won't be able to flash.

## Put the board in DFU mode

DFU mode (Device Firmware Update) is the special state your PCB enters to accept new firmware. There are three ways to get there, depending on what's accessible on your board.

### Method A — Reset button (recommended)

Most Mechlovin PCBs have a small reset button on the back, near the daughterboard. Plug the board in via USB, then briefly press the reset button. The console in QMK Toolbox should print something like:

```
*** DFU device connected: Atmel Corp. ATmega32U4 (03EB:2FF4:0000)
```

### Method B — Reset key combo on a built keyboard

If your board is already built and you've assigned a reset key in your keymap (commonly `Fn + Esc`), press that combo while the board is plugged in.

### Method C — Short the reset pads

If neither button nor keymap is available, you can briefly short the two RESET pads on the back of the PCB using tweezers or a paperclip. Don't hold them — a quick tap is enough.

> **Caution:** Only short the two pads labeled `RST` and `GND`. Shorting other pads can damage the PCB.

## Flash the board

With the .hex file loaded and the board in DFU mode, click the **Flash** button on the right side of the QMK Toolbox window. The console will print the progress. You should see something like:

```
*** Attempting to flash, please don't remove device
>>> dfu-programmer atmega32u4 erase --force
>>> dfu-programmer atmega32u4 flash adelais-v0.24.3.hex
>>> dfu-programmer atmega32u4 reset
*** Validating ...  SUCCESS
*** Resetting
```

> **Don't unplug:** While the flash is running (usually 5–10 seconds), don't disconnect the USB cable. If you do, you may need to reset and start over — your board won't be permanently damaged.

## Verify it worked

Once flashing completes, the board reboots into the new firmware. Your computer should recognize it as a keyboard again. Open a text editor and type a few keys to confirm.

For a more thorough check, open the [VIA web app](https://usevia.app). If the board is recognized and your keymap loads, the firmware is working correctly.

> **Tip:** First time using VIA? Load your PCB's VIA JSON file from the Downloads section. After that, VIA remembers your board between sessions.

## Troubleshooting

**Toolbox doesn't detect the board**

- Try a different USB cable — many cables are charge-only.
- Try a different USB port. Hubs and front-panel ports can be flaky.
- On Windows, install the driver via the `Tools → Install Drivers` menu in Toolbox.
- Press the reset button again — the DFU window times out after about 10 seconds on some boards.

**Flash starts but fails partway**

- Unplug and replug the board, then retry. A flaky USB connection during write can cause this.
- Make sure no other software (VIA, Vial, another Toolbox instance) is talking to the board at the same time.

**Board flashes but doesn't type**

- Confirm you flashed the correct firmware for *your* PCB — flashing one model's firmware onto another bricks the keymap but not the board.
- Reset the EEPROM by holding the reset button while plugging in, then flash again.
- Check that your switches are seated all the way into the hot-swap sockets.

## Next steps

You've flashed the latest firmware. From here you might want to customize your keymap with VIA, build firmware from source with QMK, or back up your VIA keymap so re-flashing is painless. You can also use the [Compatibility check](/compatibility) to find another Mechlovin PCB that fits your case.
