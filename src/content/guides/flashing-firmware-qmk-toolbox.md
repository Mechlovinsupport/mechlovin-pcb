---
title: Flashing firmware with QMK Toolbox
slug: flashing-firmware-qmk-toolbox
tag: Firmware
order: 1
platform: Windows · macOS
difficulty: Beginner
time: ~5 min
updated: 14 Sep 2025
lede: >-
  QMK Toolbox is the simplest way to flash a Mechlovin PCB on Windows or macOS. This guide
  walks through installing the app, putting your board in flashing mode, and applying the
  downloaded <code class="inline-code">.hex</code> file. Total time: about 5 minutes.
toc:
  - { id: what-youll-need, num: "01", label: "What you'll need" }
  - { id: install,         num: "02", label: "Install QMK Toolbox" }
  - { id: download-fw,     num: "03", label: "Download firmware" }
  - { id: load-hex,        num: "04", label: "Load the .hex file" }
  - { id: dfu-mode,        num: "05", label: "Put board in DFU mode" }
  - { id: flash,           num: "06", label: "Flash the board" }
  - { id: verify,          num: "07", label: "Verify it worked" }
  - { id: troubleshooting, num: "08", label: "Troubleshooting" }
  - { id: next,            num: "09", label: "Next steps" }
---

<section class="guide-section" id="what-youll-need">
<h2><span class="num">01</span>What you'll need</h2>
<p>Before you start, gather these three things. You don't need any soldering tools or special hardware — just a computer, a cable, and the firmware file from this site.</p>
<ul class="need-list">
<li><span class="marker">01</span><span><strong>QMK Toolbox</strong> — the flashing app. Free, Windows + macOS. Linked in the next step.</span></li>
<li><span class="marker">02</span><span><strong>The firmware .hex file for your PCB</strong> — grab it from the PCB's page on this site, under the Downloads section.</span></li>
<li><span class="marker">03</span><span><strong>A USB-C cable that supports data</strong> — many charging cables are power-only and won't work. If in doubt, use the cable that came with your phone or a known-good one.</span></li>
</ul>
<div class="callout"><span class="callout-label">Note</span>ZMK firmware (used by wireless PCBs) is flashed differently — see the <a href="#" class="link">Flashing wireless PCBs</a> guide instead.</div>
</section>

<section class="guide-section" id="install">
<h2><span class="num">02</span>Install QMK Toolbox</h2>
<p>Download the latest release from the official GitHub page. Both Windows and macOS builds are signed, so you shouldn't see warnings.</p>
<ul>
<li><strong>Windows</strong> — download <code class="inline-code">qmk_toolbox.exe</code>. No install needed; just run it.</li>
<li><strong>macOS</strong> — download <code class="inline-code">QMK.Toolbox.pkg</code>, open it, drag QMK Toolbox into Applications.</li>
<li><strong>Linux</strong> — QMK Toolbox isn't supported. Use <code class="inline-code">qmk flash</code> from the command line, or follow the <a href="#" class="link">CLI flashing guide</a>.</li>
</ul>
<p style="margin-top: 14px">Download from: <a href="https://github.com/qmk/qmk_toolbox/releases" class="link" target="_blank" rel="noopener">github.com/qmk/qmk_toolbox/releases</a></p>
<div class="screenshot"><div class="placeholder"><span class="kind">Screenshot — QMK Toolbox download page</span><span class="hint">The 'Latest' release section with .exe and .pkg files highlighted.</span></div></div>
</section>

<section class="guide-section" id="download-fw">
<h2><span class="num">03</span>Download the firmware</h2>
<p>Each PCB has its own firmware build. Open your PCB's detail page on this site, scroll to the Downloads section, and click <strong>Download .hex</strong> on the QMK Firmware card.</p>
<div class="callout tip"><span class="callout-label">Tip</span>Save the file somewhere you'll remember — Downloads folder is fine. You'll select it in QMK Toolbox in the next step.</div>
<p>The file is named like <code class="inline-code">adelais-v0.24.3.hex</code> and is around 90 KB. If you got a <code class="inline-code">.bin</code> or <code class="inline-code">.uf2</code> file instead, this guide doesn't apply — check the PCB page for the right flashing instructions.</p>
</section>

<section class="guide-section" id="load-hex">
<h2><span class="num">04</span>Load the .hex file into QMK Toolbox</h2>
<p>Open QMK Toolbox. You'll see a window with a file path field at the top, a console area below, and a Flash button on the right.</p>
<div class="screenshot"><div class="placeholder"><span class="kind">Screenshot — QMK Toolbox main window</span><span class="hint">Empty Toolbox window before loading firmware. File-path bar at top is highlighted.</span></div></div>
<p>Click <strong>Open</strong> (or drag the .hex file directly onto the Toolbox window). The path appears in the file-path field at the top.</p>
<div class="callout"><span class="callout-label">Important</span>Make sure the file extension is <code class="inline-code">.hex</code>. If you accidentally select the source code (a <code class="inline-code">.zip</code> or <code class="inline-code">.tar.gz</code>), Toolbox won't be able to flash.</div>
</section>

<section class="guide-section" id="dfu-mode">
<h2><span class="num">05</span>Put the board in DFU mode</h2>
<p>DFU mode (Device Firmware Update) is the special state your PCB enters to accept new firmware. There are three ways to get there, depending on what's accessible on your board.</p>
<h3>Method A — Reset button (recommended)</h3>
<p>Most Mechlovin PCBs have a small reset button on the back, near the daughterboard. Plug the board in via USB, then briefly press the reset button. The console in QMK Toolbox should print something like:</p>
<pre class="code-block"><span class="comment">*** DFU device connected: Atmel Corp. ATmega32U4 (03EB:2FF4:0000)</span></pre>
<h3>Method B — Reset key combo on built keyboard</h3>
<p>If your board is already built and you've assigned a reset key in your keymap (commonly <code class="inline-code">Fn + Esc</code>), press that combo while the board is plugged in.</p>
<h3>Method C — Short the reset pads</h3>
<p>If neither button nor keymap is available, you can briefly short the two RESET pads on the back of the PCB using tweezers or a paperclip. Don't hold them — a quick tap is enough.</p>
<div class="callout warn"><span class="callout-label">Caution</span>Only short the two pads labeled <code class="inline-code">RST</code> and <code class="inline-code">GND</code>. Shorting other pads can damage the PCB.</div>
</section>

<section class="guide-section" id="flash">
<h2><span class="num">06</span>Flash the board</h2>
<p>With the .hex file loaded and the board in DFU mode, click the <strong>Flash</strong> button on the right side of the QMK Toolbox window.</p>
<div class="screenshot"><div class="placeholder"><span class="kind">Screenshot — Flash button + console output</span><span class="hint">The Flash button highlighted, with the console showing 'DFU device connected' and a Flash in progress message.</span></div></div>
<p>The console will print the progress. You should see something like:</p>
<pre class="code-block"><span class="comment">*** Attempting to flash, please don't remove device</span>
<span class="prompt">&gt;&gt;&gt;</span> dfu-programmer atmega32u4 erase --force
<span class="prompt">&gt;&gt;&gt;</span> dfu-programmer atmega32u4 flash adelais-v0.24.3.hex
<span class="prompt">&gt;&gt;&gt;</span> dfu-programmer atmega32u4 reset
<span class="comment">*** Validating ...  </span><span class="ok">SUCCESS</span>
<span class="comment">*** Resetting</span></pre>
<div class="callout warn"><span class="callout-label">Don't unplug</span>While the flash is running (usually 5–10 seconds), don't disconnect the USB cable. If you do, you may need to reset and start over — your board won't be permanently damaged.</div>
</section>

<section class="guide-section" id="verify">
<h2><span class="num">07</span>Verify it worked</h2>
<p>Once flashing completes, the board reboots into the new firmware. Your computer should recognize it as a keyboard again. Open a text editor and type a few keys to confirm.</p>
<h3>Test with VIA</h3>
<p>For a more thorough check, open the <a href="https://usevia.app" class="link" target="_blank" rel="noopener">VIA web app</a>. If the board is recognized and your keymap loads, the firmware is working correctly.</p>
<div class="callout tip"><span class="callout-label">Tip</span>First time using VIA? Load your PCB's <strong>VIA JSON</strong> file from the Downloads section. After that, VIA remembers your board between sessions.</div>
</section>

<section class="guide-section" id="troubleshooting">
<h2><span class="num">08</span>Troubleshooting</h2>
<h3>Toolbox doesn't detect the board</h3>
<ul>
<li>Try a different USB cable — many cables are charge-only.</li>
<li>Try a different USB port on your computer. USB hubs and front-panel ports can be flaky.</li>
<li>On Windows, install the driver via the <code class="inline-code">Tools → Install Drivers</code> menu in Toolbox.</li>
<li>Press the reset button again — the DFU window times out after ~10 seconds on some boards.</li>
</ul>
<h3>Flash starts but fails partway</h3>
<ul>
<li>Unplug and replug the board, then retry. A flaky USB connection during write can cause this.</li>
<li>Make sure no other software (VIA, Vial, another Toolbox instance) is talking to the board at the same time.</li>
</ul>
<h3>Board flashes but doesn't type</h3>
<ul>
<li>Confirm you flashed the correct firmware for <em>your</em> PCB — flashing one model's firmware onto another bricks the keymap but not the board.</li>
<li>Reset the EEPROM by holding the reset button while plugging in, then flash again.</li>
<li>Check that your switches are seated all the way into the hot-swap sockets.</li>
</ul>
<h3>Console shows "Bootloader not found"</h3>
<p>The board isn't in DFU mode when you click Flash. Re-do step 05, watch the console for the <code class="inline-code">DFU device connected</code> message, then click Flash.</p>
<div class="callout"><span class="callout-label">Still stuck?</span>Post in the <a href="https://discord.gg/mechlovin" class="link" target="_blank" rel="noopener">Mechlovin Discord</a> with: your PCB model, your OS, what step you're stuck on, and a screenshot of the Toolbox console output.</div>
</section>

<section class="guide-section" id="next">
<h2><span class="num">09</span>Next steps</h2>
<p>You've flashed the latest firmware. Here are a few things you might want to do next.</p>
<div class="next-grid">
<a class="next-card" href="#"><div class="kind">Guide</div><div class="title">Customize your keymap with VIA <span style="color: var(--faint)">→</span></div><div class="desc">Remap keys, set up layers, and assign macros without re-flashing.</div></a>
<a class="next-card" href="#"><div class="kind">Guide</div><div class="title">Building from source with QMK <span style="color: var(--faint)">→</span></div><div class="desc">Compile your own firmware to enable features VIA doesn't expose.</div></a>
<a class="next-card" href="#"><div class="kind">Guide</div><div class="title">Backing up your VIA keymap <span style="color: var(--faint)">→</span></div><div class="desc">Save your layout so re-flashing or moving computers is painless.</div></a>
<a class="next-card" href="/compatibility"><div class="kind">Tool</div><div class="title">Compatibility tool <span style="color: var(--faint)">→</span></div><div class="desc">Find another Mechlovin PCB that fits your case or switches.</div></a>
</div>
</section>
