# The First Grove — experimental public test

Build: **First Grove 0.1.1-test.3**. This is an early test, not the finished game or final graphics standard.

## Activate hosting once

In this repository, open **Settings → Pages**. Under Build and deployment choose **Deploy from a branch**, select **main**, select **/(root)**, and click **Save**. GitHub will show the site URL and deployment status there. Use the displayed URL only after the deployment succeeds. Later reviewed updates to main use the same publishing source.

The playable site files are at the repository root: `index.html`, `release.json`, `.nojekyll`, and `robots.txt`. The robots file is not an access control: the repository and eventual hosted preview are public. The former `/docs` deployment copies were removed when the project was standardized on root publishing.

The separate Verify public preview workflow checks artifact hashes, JavaScript syntax and packaging. It does not activate Pages and does not test the browser. Run the same checks locally with `node verify-release.mjs` (Node 22 or later recommended). Branch-based Pages publishing and the verification workflow are separate; a green check is not proof of successful site deployment or runtime graphics.

## First live test

Open the game and confirm the bottom bar or Help shows **First Grove 0.1.1-test.3**. Select Fernwatch landing, connect it to the Hearth, choose the canopy garden and confirm construction. Assign an elf and watch the first harvest return. Try pause, resume, camera orbit, zoom and canopy cutaway.

Open **? → Test this build → Run logic checks**. These eight checks run in an isolated settlement, not your current grove. They do not validate graphics or accessibility. Save the grove, reload the page, and confirm progress restores. Export a save before trying New grove or importing another file.

Use **Export diagnostics** to keep a local report of the build, rendering path, viewport, observed frame rate and basic settlement counts. Nothing is automatically uploaded. When reporting a problem, include device/browser, build identifier, expected behavior and exact reproduction steps. Do not include credentials or personal information in public issues.

## Known boundaries

Local browser execution was administrator-blocked during preparation. Headless browser smoke checks now cover the live runtime separately. Physical devices, Safari/iOS, complete accessibility and target-device performance remain unverified. The software rendering fallback is labeled; it is not evidence of GPU-quality graphics. Procedural assets, fixed construction anchors, immediate building completion and simplified tree vitality remain prototype limitations.

No purchases, third-party runtime packages, advertising, analytics or account login were added. Only reviewed runtime delivery and public operational files belong in this repository. No private project records or private Git history are needed to run the game.

## Test.3 layout correction

The preceding preview exposed a short-landscape overlap between the inspector and building catalogue. Test.3 adds a bounded scrolling inspector and a viewport-fitting landscape layout. The simulation and save format are unchanged. Keep the original failed test evidence when evaluating the corrected release.
