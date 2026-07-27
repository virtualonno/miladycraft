# MultiMC-compatible launcher descriptor

`mmc-pack.json` is the canonical Minecraft and NeoForge component descriptor
for supported MultiMC-compatible launchers. Prism Launcher is the current
authenticated reference implementation.

Packwiz does not update this file because it is stored above the Minecraft
game directory. Fresh instance distributions must include this descriptor.
Existing instances must update their NeoForge component to the exact version
declared here before launching an updated pack.

Release verification must launch a clean test instance with this descriptor
and the Packwiz pre-launch update enabled. Server-only verification is
insufficient.

PollyMC is retired and unsupported. Compatibility with another launcher is an
explicitly verified capability, not something inferred from the descriptor
format alone.
