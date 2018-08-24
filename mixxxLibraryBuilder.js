/*
* Copyright 2018 Nik Martin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * Mixxx Library Builder
 * using the smallest playable mp3 file (144 bytes), this script will generate a configurable amount of
 * tracks, in a configurable amount of genres, organized by genre/artist
 */

// how many tracks to generate
const trackCount = 10000;

//how many artists per genre
const artistCount = 8;

//how many albums per artist
const albumCount = 2;

const minBPM = 50;
const maxBPM = 180;
const libraryPath = './library';

// the list of genres to assign. Each genre gets evenly distrubuted across the library. Add more to get more
const genreList = [
  'Alternative',
  'Blues',
  'Country',
  'Disco',
  'Electronic',
  'Funk',
  'Goth',
  'Hip-Hop',
  'Industrial',
  'Jazz',
  'K-Pop',
  'Latino',
  'Merengue',
];

var fs = require('fs');
const id3 = require('node-id3');

// the mp3 file as a base64 string.
// Its an 8kbps mono file with just 2 samples of complete silence.
// the smallest file mixx will read
const mp3Base64String =
  '/+MYxAAAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

const buff = Buffer.alloc(mp3Base64String.length, mp3Base64String, 'base64');

const tracksPerGenre = Math.floor(trackCount / genreList.length);
genreList.forEach(genre => {
  console.log('creating', genre, 'genre');
  // make a dir for the genre
  try {
    fs.mkdirSync(`${libraryPath}/${genre}`);
  } catch (error) {
    // don't care
  }

  // for each genre, create artistCount artists
  for (let i = 0; i < artistCount; i++) {
    let artist = makeRandomString(20);

    try {
      fs.mkdirSync(`${libraryPath}/${genre}/${artist}`);
    } catch (error) {}

    //evenly distribute the tracks across each artist/genre/album
    let tracksPerArtist = Math.floor(tracksPerGenre / artistCount);

    let tracksPerAlbum = tracksPerArtist / albumCount;

    for (let i = 0; i < albumCount; i++) {
      let albumTitle = makeRandomString(13);

      try {
        fs.mkdirSync(`${libraryPath}/${genre}/${artist}/${albumTitle}`);
      } catch (error) {}
      //generate the mp3 tags
      for (let i = 0; i < tracksPerAlbum; i++) {
        //generate a random song title
        let title = makeRandomString(16);

        // generate random bpm
        let bpm = (Math.random() * (maxBPM - minBPM) + minBPM).toFixed(2);

        let tags = {
          TIT2: title,
          TPE1: artist,
          TALB: albumTitle,
          TYER: 2018,
          TKEY: 'Ab',
          TBPM: bpm,
          TCON: genre,
          COMM: { language: 'eng', text: makeRandomString(20) },
        };

        // write tags into mp3 buffer
        let outBuff = id3.write(tags, buff);

        // write mp3 buffer to file
        // do it synchronously because having too many file open < performance
        fs.writeFileSync(`${libraryPath}/${genre}/${artist}/${albumTitle}/${artist} - ${title}.mp3`, outBuff);
      } // track
    } //album
  } // artist
}); //genre

function makeRandomString(length) {
  let text = [];
  const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text.push(allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)));
  }
  return text.join('');
}
