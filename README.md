# Mixxx Library Builder

## Description

This script builds an mp3 library of any size for testing Mixxx. It can be used to test any software that
needs to read a LOT of mp3s. It's pretty fast, and can build a 1 million track library in about a minute.

## Requirements

Node.js

## Usage

Install dependencies with

```
npm i
```

the only dependency is an ID3 tag writing library.

Open mixxxLibraryBuilder.js and edit the configurable items at the top, then run

```
npm start
```

OR

```
node mixxxLibraryBuilder.js
```

and watch in amazement as it builds a library structure organized by genre/artist/album using random data.
That data is also written to each file as an ID3v2.3 tag

## Repository

This repository uses the gitflow development workflow, so the latest development branch is `develop`, and
`master` is the latest released version.

## Disclaimer

This software has no warranty, and probably has bugs.

## License

Copyright 2018 Nik Martin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

```
