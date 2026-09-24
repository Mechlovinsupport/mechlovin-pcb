---
title: Configure your PCB with VIA
slug: via-keymap
tag: Keymapping
order: 2
platform: Chrome · Edge
difficulty: Beginner
time: ~10 min
updated: 24 Sep 2026
lede: VIA lets you remap any key on your Mechlovin PCB in real time — no re-flashing, no coding. Changes save straight to the board and travel with it between computers. This guide covers connecting your board, remapping keys, working with layers, and backing up your layout.
---

## What VIA is (and what you'll need)

VIA is a free app for remapping your keyboard. Unlike editing firmware, changes happen **live over USB** and are written straight to the board's on-board memory — so the moment you click a key, it's remapped. There's nothing to compile and nothing to flash.

Because the layout lives on the board itself, it follows the keyboard to any computer. Plug into a different machine and your custom keymap is already there.

To follow this guide you'll need:

- **A Mechlovin PCB running VIA-enabled firmware** — every QMK build on this site has VIA turned on, so if you flashed using the [Flashing firmware with QMK Toolbox](/guides/flashing-firmware-qmk-toolbox) guide, you're ready.
- **A Chromium-based browser** — Chrome, Edge, Brave, or Opera. VIA talks to the board through WebHID, which Firefox and Safari don't support.
- **A USB-C cable that supports data** — the same cable you used to flash. Charge-only cables won't work.

> **Note:** VIA doesn't apply to wireless (ZMK) boards — those are customized in a different way. This guide is for wired QMK PCBs.

## Open VIA

VIA runs entirely in your browser — there's nothing to install.

Go to **[usevia.app](https://usevia.app)** and you'll land on the Configure screen. If you prefer a standalone app, the desktop version is available from the VIA website, but the web app is the simplest place to start.

> **Tip:** Bookmark [usevia.app](https://usevia.app). You'll come back here any time you want to tweak your layout.

## Connect your keyboard

Plug your keyboard into the computer, then in VIA click **Authorize device** (top of the screen). Your browser opens a small pop-up listing connected devices.

Select your keyboard from the list and click **Connect**. VIA reads the current layout off the board and draws it on screen.

> **Important:** Close any other app that talks to the board first — QMK Toolbox, Vial, or a second VIA tab. Only one program can hold the connection at a time, and VIA will fail to connect if something else has it.

If your board appears and its layout loads, skip ahead to [Find your way around](#find-your-way-around). If VIA says the device is unrecognized, do the next step first.

## Load your board's definition

VIA ships with definitions for many keyboards built in, but a newer or less common Mechlovin board may not be recognized yet. When that happens, you load the board's definition file by hand — a one-time step.

1. Download your PCB's **VIA JSON** file from its page on this site, under the Downloads section.
2. In VIA, open **Settings** (the gear icon, top-right) and turn on **Show Design tab**.
3. Go to the new **Design** tab and load the `.json` file you downloaded.
4. Return to **Configure** and click **Authorize device** again — your board is now recognized.

> **Note:** You only need to do this once per board. After the definition is loaded, VIA remembers it.

## Find your way around

With the board connected, the **Configure** tab shows a picture of your keyboard and a set of tabs down the side:

- **Keymap** — the main view, where you remap keys.
- **Layers** — the row of numbered buttons (0, 1, 2, 3) above the board. Layer 0 is your everyday layout; the higher layers are the "Fn" layers.
- **Lighting** — RGB and backlight controls, if your PCB supports them.
- **Macros** — record a sequence of keystrokes onto a single key.
- **Save + Load** — export your layout to a file or load one back.
- **Key Tester** — press keys to confirm the board registers them.

## Remap a key

This is the core of VIA, and it's just three clicks:

1. Make sure you're on **Layer 0** (the base layer) using the layer buttons.
2. Click the key **on the on-screen keyboard** that you want to change — it highlights.
3. Pick the **new key** from the key set shown below the board.

That's it. The change is written to the board immediately — press the key to confirm it now does the new thing.

> **Tip:** Use the **Key Tester** tab to check your work. Every key you press lights up, so you can spot a mis-mapped or dead key at a glance.

If you can't find a key in the default set, look through the categories along the bottom (letters, numbers, mods, media, and so on). Anything QMK supports is in there somewhere.

## Work with layers

Layers are what make a compact keyboard powerful. A **layer** is a second (or third) set of assignments that activates while you hold — or after you tap — a special key. That's how a 65% board fits arrows, function keys, and media controls without extra keys.

To set up a layer key:

1. Select the key you want to use as your "Fn" key (many builds use Caps Lock or a key near the spacebar).
2. In the key set, open the **Layers** category.
3. Choose a layer action — the two you'll use most are:
   - **MO(1)** — momentary: the layer is active only while you hold the key.
   - **TG(1)** — toggle: tap to switch the layer on, tap again to switch it off.
4. Now click the **Layer 1** button at the top and remap keys there — for example, put arrows on `I J K L` and media keys on the number row.

> **Note:** Keys you leave untouched on an upper layer fall through to the layer below, so you only need to fill in the keys you actually want to change.

## Record a macro

A macro types a whole sequence from one key — handy for an email address, a Discord command, or a shortcut.

1. Open the **Macros** tab and pick a slot (M0, M1, …).
2. Type or record the sequence you want.
3. Save it, then go back to **Keymap**, open the **Macro** category in the key set, and assign `M0` to any key.

> **Tip:** Keep macros short and avoid storing anything sensitive like passwords — a macro is plain text on the board and offers no security.

## Adjust lighting

If your PCB has per-key RGB or underglow, the **Lighting** tab lets you change the effect, brightness, colour, and speed. Move the sliders and the board updates live. These settings save to the board just like your keymap.

> **Note:** No Lighting tab? Your PCB either has no addressable lighting or the current firmware build doesn't expose it — that's expected on many models.

## Back up your keymap

Because your layout lives on the board, backing it up is worth two minutes — it means you can restore everything instantly after a firmware update or on a new board.

1. Open the **Save + Load** tab.
2. Click **Save Current Layout** and keep the `.layout.json` file somewhere safe.

To restore later, come back to this tab and use **Load Saved Layout**.

> **Important:** Re-flashing firmware can reset the board's memory to the layout's defaults. Save a backup **before** you re-flash, then load it back afterwards.

## Troubleshooting

**VIA doesn't list my keyboard when I click Authorize device**

- Make sure you're in **Chrome or Edge** — Firefox and Safari can't connect.
- Try a different USB cable (charge-only cables won't work) and a different port.
- Close QMK Toolbox, Vial, or any other VIA tab — only one can hold the board.
- Confirm the board is running VIA-enabled firmware from this site.

**The board connects but the layout looks wrong**

- Load the correct **VIA JSON** for your exact model — see [Load your board's definition](#load-your-boards-definition).

**My changes don't stick**

- Changes save automatically; there's no Save button for remapping. If a key reverts, you may have edited it on the wrong **layer** — check the layer buttons.
- If the board behaves erratically, reset its memory by holding the reset button while plugging in, then re-load your saved layout.

**A remapped key does nothing**

- Open **Key Tester** and press it. If nothing lights up, the switch may not be seated in its socket; if it lights up but types the wrong thing, remap it again on Layer 0.

## Next steps

Your keymap is now yours. From here you might set up a second layer for arrows and media, record a macro or two, and save a backup so you never lose your layout. If you want to go further than VIA allows — custom lighting logic, tap-dance, combos — you can build firmware from source with QMK. And if you're eyeing another board, the [Compatibility check](/compatibility) will tell you which Mechlovin PCBs fit your case.
