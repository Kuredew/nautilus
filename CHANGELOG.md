# Changelog

## [2.0.0](https://github.com/Kuredew/nautilus/compare/v1.4.1...v2.0.0) (2026-03-07)


### ⚠ BREAKING CHANGES

* Convert nautilus scripts to es6 syntax
* **build:** Now Nautilus must build with extendscriptr
* Move all scripts to src folder
* Change the Nautilus Control effect to be neater and more structured

### 🎉 New Features

* Add Based On text animator switcher ([777b063](https://github.com/Kuredew/nautilus/commit/777b0636e24e19e5a490177bc340e3c2ac47507e))
* Add remove nautilus feature to remove nautilus from Text/Comp/Precomp layer ([ccec91e](https://github.com/Kuredew/nautilus/commit/ccec91e6f389f1afff56b38ce66375d50aee7ff5))
* **layer:** Add Mirror mode ([1edc686](https://github.com/Kuredew/nautilus/commit/1edc686f00a53376b2b9276305cbde7ba2f702b6))
* **text:** Add Mirror mode ([20d9a6f](https://github.com/Kuredew/nautilus/commit/20d9a6f472c6f1d833b95b23a12d8e6abb01c7c6))


### ✨ UI Changes

* Add settings button ([75a6ba3](https://github.com/Kuredew/nautilus/commit/75a6ba34afbd876ac8c5c7642bc979a3888eabb7))
* Add switch mode between Text layer and Comp Layer ([16296dd](https://github.com/Kuredew/nautilus/commit/16296ddf39d6b6bf827ec90a3db432626d59f1c3))
* Change about alert to use After Effect Window Dialog ([8c17f2a](https://github.com/Kuredew/nautilus/commit/8c17f2abf7f5c32bbe65fe875e42186886c72996))
* Change button to iconbutton and adjust the layout ([04d5d56](https://github.com/Kuredew/nautilus/commit/04d5d5696dd8a2e07844a929f8842416eb826d86))
* Create responsive button layout ([a7de1ad](https://github.com/Kuredew/nautilus/commit/a7de1adf6724d90535d023c47c94df6b24a0ccc0))
* Improve iconbutton img ([1230229](https://github.com/Kuredew/nautilus/commit/1230229f89cc50ff7550bc32547a561de0580849))
* Separate nautilus function error from global handleError function ([ca5cf7d](https://github.com/Kuredew/nautilus/commit/ca5cf7da4b66fdf882cb3d86bbd975cb9b557cfe))


### 🔨 Bug Fixes

* Difficult to reduce the scale of letters in the text layer ([176c1b6](https://github.com/Kuredew/nautilus/commit/176c1b6545a1ab033e1ed9e7490763b74d80e276))
* Other letters disappear if they are not attached by a point mask ([d9e15c9](https://github.com/Kuredew/nautilus/commit/d9e15c9e3756b07ba5cf701c5573b8f81b29bf4f))
* **text,layer:** Index text and comp are not in sync with each other ([9980f2a](https://github.com/Kuredew/nautilus/commit/9980f2af8cd4a0f54debe14edebcba5000155d62))
* **text:** Variable undefined error ([3393467](https://github.com/Kuredew/nautilus/commit/3393467eb204a34c71c8fd6cf419b2daac5148a1))


### 🚀 Performance

* **layer:** Get mask info if needed only ([6ac3033](https://github.com/Kuredew/nautilus/commit/6ac3033fd4637eb889bbc5ed5eaa0e3e1ee6d521))
* **layer:** Only call valueAtTime on needed ([c332283](https://github.com/Kuredew/nautilus/commit/c332283c2e77ce6e1ba26b25ea9741c97e1fcd95))
* **text:** Implement lazy load for valueAtTime call ([4ab764a](https://github.com/Kuredew/nautilus/commit/4ab764a633d5c6295d0e34d918450f2800d751f9))


### 🩹 Refactors

* **build:** Now Nautilus must build with extendscriptr ([ab48716](https://github.com/Kuredew/nautilus/commit/ab48716c72d1fb9fc507d6abe7cd3e9c5e229422))
* Change the Nautilus Control effect to be neater and more structured ([d099cc1](https://github.com/Kuredew/nautilus/commit/d099cc1a321a884377c3152e232672baa81de028))
* Convert nautilus scripts to es6 syntax ([c3c8e5b](https://github.com/Kuredew/nautilus/commit/c3c8e5b2bb1dc69239294e77b2eeef36f546e7d3))
* **effect:** Add interval slider and change `mirror index` to `interval` ([65f541d](https://github.com/Kuredew/nautilus/commit/65f541d88a5afaf6f06bb716fa9779b1f5a06982))
* **layer:** Adjust effect index property reference ([f8e4c95](https://github.com/Kuredew/nautilus/commit/f8e4c95d63a31bd1a986ac85445c02f8b16d8d02))
* Move all scripts to src folder ([dca0e35](https://github.com/Kuredew/nautilus/commit/dca0e35837b7872add005c746677725b6cb872b6))
* **text,layer:** Change defaultVariable to `template` ([a120df4](https://github.com/Kuredew/nautilus/commit/a120df4aaf1995a4ac3f5d438544037480fed13c))
* **text:** Adjust effect index property reference ([41fd8e0](https://github.com/Kuredew/nautilus/commit/41fd8e0d3ada2326902b49c6bbd52fe902bb9127))
* **ui:** Don't put windowRef into state again ([7ab08a6](https://github.com/Kuredew/nautilus/commit/7ab08a683df9067541f3485bcefc315e29ade443))


### 📃 Documentation

* change license badge from GPLv3 to MIT License ([a7b8aa4](https://github.com/Kuredew/nautilus/commit/a7b8aa4200728c3b5d82ce9fd125e186a0e4b8ab))


### 🎧 Maintenance

* Add cmd `pnpm run dev` to run script ([5e485d7](https://github.com/Kuredew/nautilus/commit/5e485d7929267a3d8ba5b46288128b54b9def077))
* Add emoji to section changelog ([ba8ea97](https://github.com/Kuredew/nautilus/commit/ba8ea97f3e67f7b5243fe5c031c9ab43132e505a))
* Add script runner for development ([06eb528](https://github.com/Kuredew/nautilus/commit/06eb5289b88be5c12d011910d7ff20ccc516b05c))
* Add UI Changes section in changelog ([ef56816](https://github.com/Kuredew/nautilus/commit/ef56816cb9bbdcbb6ccb47afe3db16cadb782209))
* Change nautilusAssets to nautilusLib ([a020b90](https://github.com/Kuredew/nautilus/commit/a020b900ea20b823cb69eaba8cdb89052a448c29))
* **config:** Add commitizen configuration ([b842afd](https://github.com/Kuredew/nautilus/commit/b842afdb9e799373fb46cef52f495c5cc4e7b00c))
* **config:** Add Performace section in changelog ([725c070](https://github.com/Kuredew/nautilus/commit/725c0703b4a8500c7cf17810baa93afaeca156f1))
* **config:** Adjust to compatible module project ([d013133](https://github.com/Kuredew/nautilus/commit/d013133e825894d3e7fd173bf43363e60e92f286))
* **config:** Refactor build to use `src` folder ([5662f8a](https://github.com/Kuredew/nautilus/commit/5662f8aed557a7c95a925b763cdeb5e3f7f13a55))
* **config:** Update build command and script ([949b94b](https://github.com/Kuredew/nautilus/commit/949b94be0c6e5a64bcab4c6562624bcf317aa656))

## [1.4.1](https://github.com/Kuredew/nautilus/compare/v1.4.0...v1.4.1) (2026-02-23)


### Maintenance

* add license to about ([91b2f24](https://github.com/Kuredew/nautilus/commit/91b2f24f85233aa89cd440f6ab6df89b0a750845))
* add LICENSE.txt to release ([8a03f72](https://github.com/Kuredew/nautilus/commit/8a03f726db9c07691aeb3ca908358b96503a20f4))
* add MIT License to the project ([ea6db73](https://github.com/Kuredew/nautilus/commit/ea6db731d5fa9cd0d058209e5d6981f177456889))
* update build script ([0ab119a](https://github.com/Kuredew/nautilus/commit/0ab119a2a8270c6d647307670160efe01de8a31f))

## [1.4.0](https://github.com/Kuredew/nautilus/compare/v1.3.0...v1.4.0) (2026-02-22)


### New Features

* Add Apply text layer button ([94730a7](https://github.com/Kuredew/nautilus/commit/94730a71b3fb613622506e60e91aebe9c2698f93))
* add apply text layer feature ([971610a](https://github.com/Kuredew/nautilus/commit/971610aa64932f7c26401cf1e17c7dce966b4c28))


### Bug Fixes

* effect preset backward compatibility ([a949baa](https://github.com/Kuredew/nautilus/commit/a949baae6f4ef621f2a13b7f19d0ef9da2ea003c))
* includes function is undefined in after effect 2025+ ([84b1e74](https://github.com/Kuredew/nautilus/commit/84b1e743d81d4f7bd0991ed3df8b638bd5235826))
* scale bug because value is accessed from actual scale layer ([777b84d](https://github.com/Kuredew/nautilus/commit/777b84d14f8d73b6568cbb5353483f7574fc7c56))


### Refactors

* move all layer expression to layer folder ([657a4a2](https://github.com/Kuredew/nautilus/commit/657a4a297c9cd531f8ac7202983ada36dc4db8c8))


### Documentation

* Revise README with installation and roadmap sections ([e12e6e7](https://github.com/Kuredew/nautilus/commit/e12e6e7701c90f3f490f1d79fcf1559513d3fd7d))


### Maintenance

* make the readme more informative and detailed ([dac8e27](https://github.com/Kuredew/nautilus/commit/dac8e2741f7d545315235ee6d8b92c048e2c4dc7))
* make the readme more informative and detailed ([4bc07c3](https://github.com/Kuredew/nautilus/commit/4bc07c386ff0c7cee1349d279be996c3da6f9452))
* remove unnecessary info in about ([5580b18](https://github.com/Kuredew/nautilus/commit/5580b18aabaf9910dab58c8860cf268a5f62cd7d))

## [1.3.0](https://github.com/Kuredew/nautilus/compare/v1.2.0...v1.3.0) (2026-02-02)


### New Features

* add extract text layer feature ([eb41e17](https://github.com/Kuredew/nautilus/commit/eb41e17cc4c4f19eb4f0293983f95c87edbe5d62))


### Maintenance

* change nautilus info in above code ([5dffaa3](https://github.com/Kuredew/nautilus/commit/5dffaa3f61db543fcbf93a46f76724f41feec0b9))
* make nautilus MUST be applied to precomp ([8457a4a](https://github.com/Kuredew/nautilus/commit/8457a4acf74d5c1eeb99ee689c57aec5c4c289cd))

## [1.2.0](https://github.com/Kuredew/nautilus/compare/v1.1.0...v1.2.0) (2026-02-01)


### New Features

* add support for more direction (inward, outward, and random) ([3a82800](https://github.com/Kuredew/nautilus/commit/3a8280016d901ad7e9c5dc96400df6dd920c744b))
* add wiggle feature for position, rotation, and scale ([2cddd09](https://github.com/Kuredew/nautilus/commit/2cddd094e9380a1c64f19ee4d35ea757df9065dc))
* nautilus effect applied to precomp support ([248a835](https://github.com/Kuredew/nautilus/commit/248a835599606d26392867ed1523cfb83f623770))


### Bug Fixes

* expression error if Nautilus effect deleted ([a345a62](https://github.com/Kuredew/nautilus/commit/a345a62348c86e93843ded2011b3fa3d4718a58f))


### Refactors

* add wiggle control to nauitlus effect ([96aeb5a](https://github.com/Kuredew/nautilus/commit/96aeb5ac3f74b06fa0f648be04d0bc6d57afd95f))
* deprecate old nautilus mode ([f2082bb](https://github.com/Kuredew/nautilus/commit/f2082bbfa93a9e53667308cc5feefc696ea47990))


### Maintenance

* add release-please config ([33d3673](https://github.com/Kuredew/nautilus/commit/33d3673d193fb7a811164cd2b240f775d9a8c533))
* **ci:** add include-component-in-tag configuration option ([b55bede](https://github.com/Kuredew/nautilus/commit/b55bede7b55a0a4adefbb7cc875cd779d03d8161))
* **ci:** add release-please manifest ([6661d37](https://github.com/Kuredew/nautilus/commit/6661d37c18994bd443e746655fed492eb4ab1669))
* **ci:** change project version to 1.1.0 ([895201e](https://github.com/Kuredew/nautilus/commit/895201e54b0aa08e890d801cbca618a937e5f7c7))
* **ci:** refactor release-please config to usse manifest mode ([c759272](https://github.com/Kuredew/nautilus/commit/c759272b69a0b333d53b985feb33efcfc612f5ef))
* **ci:** update release-please.yml file ([7dbe0c8](https://github.com/Kuredew/nautilus/commit/7dbe0c805642e218a3652d38da15787ec1553c33))
* ignore ```package.json``` in nautilusAssets ([e380719](https://github.com/Kuredew/nautilus/commit/e3807192d229bf13fc49d83962a0ba90de23cd1f))
* remove build-info cuz we dont use it anymore ([f07456a](https://github.com/Kuredew/nautilus/commit/f07456ab5b51bc2e6d04bb9df9073383dafd865c))

## [1.1.0](https://github.com/Kuredew/nautilus/compare/v1.0.2...v1.1.0) (2026-01-21)


### Features

* bump version automatically ([c47b1f6](https://github.com/Kuredew/nautilus/commit/c47b1f6d9eef42f2e95a9dcb4655e27f27e47eda))


### Bug Fixes

* layer animation not follow effect keyframes correctly ([105e5d2](https://github.com/Kuredew/nautilus/commit/105e5d226a437e36f5d2963d3a84e4c147c42a88))

## [1.0.2](https://github.com/Kuredew/nautilus/compare/v1.0.1...v1.0.2) (2026-01-21)


### Bug Fixes

* **ci:** change name jobs typo ([#14](https://github.com/Kuredew/nautilus/issues/14)) ([9c33ccd](https://github.com/Kuredew/nautilus/commit/9c33ccd99313f6b24b50dcc095622ad3893fc578))
* **ci:** upload assets no triggered ([#12](https://github.com/Kuredew/nautilus/issues/12)) ([163cbd0](https://github.com/Kuredew/nautilus/commit/163cbd0f234aab88355f100a768ae0c736b71cd3))

## [1.0.1](https://github.com/Kuredew/nautilus/compare/v1.0.0...v1.0.1) (2026-01-21)


### Bug Fixes

* tests ci ([#10](https://github.com/Kuredew/nautilus/issues/10)) ([1685521](https://github.com/Kuredew/nautilus/commit/168552143ed0a1fc42e042d32269e8e336105ce1))

## 1.0.0 (2026-01-21)


### Bug Fixes

* **ci:** error run already defined ([4991e0e](https://github.com/Kuredew/nautilus/commit/4991e0e6f789a7395a277bd67fa8b5c47a321dc7))
* **ci:** fix .dist folder not found ([0bdfc53](https://github.com/Kuredew/nautilus/commit/0bdfc53d43ac8d8c0a5bfff49985194982724497))
* **ci:** unexprected outputs key ([4820d02](https://github.com/Kuredew/nautilus/commit/4820d02b58e47a85187cc142714824ac902631ab))
* **ci:** use window-latest for release-please and use builtin powershell zip ([e0f5d82](https://github.com/Kuredew/nautilus/commit/e0f5d82e1ca461b0a9ef49cdb87b68b5c11683bb))
* nautilus version typo ([120f565](https://github.com/Kuredew/nautilus/commit/120f565d75e5034ee2542bad326202350596c7fa))
* nautilus version typo ([3f88d61](https://github.com/Kuredew/nautilus/commit/3f88d612e9c8ba0782124983b9181b2aecb6583a))
