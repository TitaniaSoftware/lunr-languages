/*!
 * Lunr languages, `Greek` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2014, Mihai Valentin
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory)
  } else if (typeof exports === 'object') {
    /**
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
}(this, function() {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  return function(lunr) {
    /* throw error if lunr is not yet included */
    if ('undefined' === typeof lunr) {
      throw new Error('Lunr is not present. Please include / require Lunr before this script.');
    }

    /* throw error if lunr stemmer support is not yet included */
    if ('undefined' === typeof lunr.stemmerSupport) {
      throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
    }

    /* register specific locale function */
    lunr.el = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.el.trimmer,
        lunr.el.stopWordFilter,
        lunr.el.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.el.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.el.wordCharacters = "\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65]|\uD800[\uDD40-\uDD8C\uDDA0]|\uD834[\uDE00-\uDE45";
    lunr.el.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.el.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.el.trimmer, 'trimmer-el');

    /* lunr stemmer function */
    lunr.el.stemmer = (function() {
      /* create the wrapped stemmer object */
      var Among = lunr.stemmerSupport.Among,
        SnowballProgram = lunr.stemmerSupport.SnowballProgram,
        st = new function() {
          var base = new BaseStemmer();
          /** @const */
          var a_0 = [
            ["", -1, 25],
            ["\u0386", 0, 1],
            ["\u0388", 0, 5],
            ["\u0389", 0, 7],
            ["\u038A", 0, 9],
            ["\u038C", 0, 15],
            ["\u038E", 0, 20],
            ["\u038F", 0, 24],
            ["\u0390", 0, 7],
            ["\u0391", 0, 1],
            ["\u0392", 0, 2],
            ["\u0393", 0, 3],
            ["\u0394", 0, 4],
            ["\u0395", 0, 5],
            ["\u0396", 0, 6],
            ["\u0397", 0, 7],
            ["\u0398", 0, 8],
            ["\u0399", 0, 9],
            ["\u039A", 0, 10],
            ["\u039B", 0, 11],
            ["\u039C", 0, 12],
            ["\u039D", 0, 13],
            ["\u039E", 0, 14],
            ["\u039F", 0, 15],
            ["\u03A0", 0, 16],
            ["\u03A1", 0, 17],
            ["\u03A3", 0, 18],
            ["\u03A4", 0, 19],
            ["\u03A5", 0, 20],
            ["\u03A6", 0, 21],
            ["\u03A7", 0, 22],
            ["\u03A8", 0, 23],
            ["\u03A9", 0, 24],
            ["\u03AA", 0, 9],
            ["\u03AB", 0, 20],
            ["\u03AC", 0, 1],
            ["\u03AD", 0, 5],
            ["\u03AE", 0, 7],
            ["\u03AF", 0, 9],
            ["\u03B0", 0, 20],
            ["\u03C2", 0, 18],
            ["\u03CA", 0, 7],
            ["\u03CB", 0, 20],
            ["\u03CC", 0, 15],
            ["\u03CD", 0, 20],
            ["\u03CE", 0, 24]
          ];

          /** @const */
          var a_1 = [
            ["\u03C3\u03BA\u03B1\u03B3\u03B9\u03B1", -1, 2],
            ["\u03C6\u03B1\u03B3\u03B9\u03B1", -1, 1],
            ["\u03BF\u03BB\u03BF\u03B3\u03B9\u03B1", -1, 3],
            ["\u03C3\u03BF\u03B3\u03B9\u03B1", -1, 4],
            ["\u03C4\u03B1\u03C4\u03BF\u03B3\u03B9\u03B1", -1, 5],
            ["\u03BA\u03C1\u03B5\u03B1\u03C4\u03B1", -1, 6],
            ["\u03C0\u03B5\u03C1\u03B1\u03C4\u03B1", -1, 7],
            ["\u03C4\u03B5\u03C1\u03B1\u03C4\u03B1", -1, 8],
            ["\u03B3\u03B5\u03B3\u03BF\u03BD\u03BF\u03C4\u03B1", -1, 11],
            ["\u03BA\u03B1\u03B8\u03B5\u03C3\u03C4\u03C9\u03C4\u03B1", -1, 10],
            ["\u03C6\u03C9\u03C4\u03B1", -1, 9],
            ["\u03C0\u03B5\u03C1\u03B1\u03C4\u03B7", -1, 7],
            ["\u03C3\u03BA\u03B1\u03B3\u03B9\u03C9\u03BD", -1, 2],
            ["\u03C6\u03B1\u03B3\u03B9\u03C9\u03BD", -1, 1],
            ["\u03BF\u03BB\u03BF\u03B3\u03B9\u03C9\u03BD", -1, 3],
            ["\u03C3\u03BF\u03B3\u03B9\u03C9\u03BD", -1, 4],
            ["\u03C4\u03B1\u03C4\u03BF\u03B3\u03B9\u03C9\u03BD", -1, 5],
            ["\u03BA\u03C1\u03B5\u03B1\u03C4\u03C9\u03BD", -1, 6],
            ["\u03C0\u03B5\u03C1\u03B1\u03C4\u03C9\u03BD", -1, 7],
            ["\u03C4\u03B5\u03C1\u03B1\u03C4\u03C9\u03BD", -1, 8],
            ["\u03B3\u03B5\u03B3\u03BF\u03BD\u03BF\u03C4\u03C9\u03BD", -1, 11],
            ["\u03BA\u03B1\u03B8\u03B5\u03C3\u03C4\u03C9\u03C4\u03C9\u03BD", -1, 10],
            ["\u03C6\u03C9\u03C4\u03C9\u03BD", -1, 9],
            ["\u03BA\u03C1\u03B5\u03B1\u03C3", -1, 6],
            ["\u03C0\u03B5\u03C1\u03B1\u03C3", -1, 7],
            ["\u03C4\u03B5\u03C1\u03B1\u03C3", -1, 8],
            ["\u03B3\u03B5\u03B3\u03BF\u03BD\u03BF\u03C3", -1, 11],
            ["\u03BA\u03C1\u03B5\u03B1\u03C4\u03BF\u03C3", -1, 6],
            ["\u03C0\u03B5\u03C1\u03B1\u03C4\u03BF\u03C3", -1, 7],
            ["\u03C4\u03B5\u03C1\u03B1\u03C4\u03BF\u03C3", -1, 8],
            ["\u03B3\u03B5\u03B3\u03BF\u03BD\u03BF\u03C4\u03BF\u03C3", -1, 11],
            ["\u03BA\u03B1\u03B8\u03B5\u03C3\u03C4\u03C9\u03C4\u03BF\u03C3", -1, 10],
            ["\u03C6\u03C9\u03C4\u03BF\u03C3", -1, 9],
            ["\u03BA\u03B1\u03B8\u03B5\u03C3\u03C4\u03C9\u03C3", -1, 10],
            ["\u03C6\u03C9\u03C3", -1, 9],
            ["\u03C3\u03BA\u03B1\u03B3\u03B9\u03BF\u03C5", -1, 2],
            ["\u03C6\u03B1\u03B3\u03B9\u03BF\u03C5", -1, 1],
            ["\u03BF\u03BB\u03BF\u03B3\u03B9\u03BF\u03C5", -1, 3],
            ["\u03C3\u03BF\u03B3\u03B9\u03BF\u03C5", -1, 4],
            ["\u03C4\u03B1\u03C4\u03BF\u03B3\u03B9\u03BF\u03C5", -1, 5]
          ];

          /** @const */
          var a_2 = [
            ["\u03C0\u03B1", -1, 1],
            ["\u03BE\u03B1\u03BD\u03B1\u03C0\u03B1", 0, 1],
            ["\u03B5\u03C0\u03B1", 0, 1],
            ["\u03C0\u03B5\u03C1\u03B9\u03C0\u03B1", 0, 1],
            ["\u03B1\u03BD\u03B1\u03BC\u03C0\u03B1", 0, 1],
            ["\u03B5\u03BC\u03C0\u03B1", 0, 1],
            ["\u03B4\u03B1\u03BD\u03B5", -1, 1],
            ["\u03B1\u03B8\u03C1\u03BF", -1, 1],
            ["\u03C3\u03C5\u03BD\u03B1\u03B8\u03C1\u03BF", 7, 1]
          ];

          /** @const */
          var a_3 = [
            ["\u03B2", -1, 1],
            ["\u03B2\u03B1\u03B8\u03C5\u03C1\u03B9", -1, 1],
            ["\u03B2\u03B1\u03C1\u03BA", -1, 1],
            ["\u03BC\u03B1\u03C1\u03BA", -1, 1],
            ["\u03BB", -1, 1],
            ["\u03BC", -1, 1],
            ["\u03BA\u03BF\u03C1\u03BD", -1, 1],
            ["\u03C0", -1, 1],
            ["\u03B9\u03BC\u03C0", 7, 1],
            ["\u03C1", -1, 1],
            ["\u03BC\u03B1\u03C1", 9, 1],
            ["\u03B1\u03BC\u03C0\u03B1\u03C1", 9, 1],
            ["\u03B3\u03BA\u03C1", 9, 1],
            ["\u03B2\u03BF\u03BB\u03B2\u03BF\u03C1", 9, 1],
            ["\u03B3\u03BB\u03C5\u03BA\u03BF\u03C1", 9, 1],
            ["\u03C0\u03B9\u03C0\u03B5\u03C1\u03BF\u03C1", 9, 1],
            ["\u03C0\u03C1", 9, 1],
            ["\u03BC\u03C0\u03C1", 16, 1],
            ["\u03B1\u03C1\u03C1", 9, 1],
            ["\u03B3\u03BB\u03C5\u03BA\u03C5\u03C1", 9, 1],
            ["\u03C0\u03BF\u03BB\u03C5\u03C1", 9, 1],
            ["\u03BB\u03BF\u03C5", -1, 1]
          ];

          /** @const */
          var a_4 = [
            ["\u03B9\u03B6\u03B1", -1, 1],
            ["\u03B9\u03B6\u03B5", -1, 1],
            ["\u03B9\u03B6\u03B1\u03BC\u03B5", -1, 1],
            ["\u03B9\u03B6\u03BF\u03C5\u03BC\u03B5", -1, 1],
            ["\u03B9\u03B6\u03B1\u03BD\u03B5", -1, 1],
            ["\u03B9\u03B6\u03BF\u03C5\u03BD\u03B5", -1, 1],
            ["\u03B9\u03B6\u03B1\u03C4\u03B5", -1, 1],
            ["\u03B9\u03B6\u03B5\u03C4\u03B5", -1, 1],
            ["\u03B9\u03B6\u03B5\u03B9", -1, 1],
            ["\u03B9\u03B6\u03B1\u03BD", -1, 1],
            ["\u03B9\u03B6\u03BF\u03C5\u03BD", -1, 1],
            ["\u03B9\u03B6\u03B5\u03C3", -1, 1],
            ["\u03B9\u03B6\u03B5\u03B9\u03C3", -1, 1],
            ["\u03B9\u03B6\u03C9", -1, 1]
          ];

          /** @const */
          var a_5 = [
            ["\u03B2\u03B9", -1, 1],
            ["\u03BB\u03B9", -1, 1],
            ["\u03B1\u03BB", -1, 1],
            ["\u03B5\u03BD", -1, 1],
            ["\u03C3", -1, 1],
            ["\u03C7", -1, 1],
            ["\u03C5\u03C8", -1, 1],
            ["\u03B6\u03C9", -1, 1]
          ];

          /** @const */
          var a_6 = [
            ["\u03C9\u03B8\u03B7\u03BA\u03B1", -1, 1],
            ["\u03C9\u03B8\u03B7\u03BA\u03B5", -1, 1],
            ["\u03C9\u03B8\u03B7\u03BA\u03B1\u03BC\u03B5", -1, 1],
            ["\u03C9\u03B8\u03B7\u03BA\u03B1\u03BD\u03B5", -1, 1],
            ["\u03C9\u03B8\u03B7\u03BA\u03B1\u03C4\u03B5", -1, 1],
            ["\u03C9\u03B8\u03B7\u03BA\u03B1\u03BD", -1, 1],
            ["\u03C9\u03B8\u03B7\u03BA\u03B5\u03C3", -1, 1]
          ];

          /** @const */
          var a_7 = [
            ["\u03BE\u03B1\u03BD\u03B1\u03C0\u03B1", -1, 1],
            ["\u03B5\u03C0\u03B1", -1, 1],
            ["\u03C0\u03B5\u03C1\u03B9\u03C0\u03B1", -1, 1],
            ["\u03B1\u03BD\u03B1\u03BC\u03C0\u03B1", -1, 1],
            ["\u03B5\u03BC\u03C0\u03B1", -1, 1],
            ["\u03C7\u03B1\u03C1\u03C4\u03BF\u03C0\u03B1", -1, 1],
            ["\u03B5\u03BE\u03B1\u03C1\u03C7\u03B1", -1, 1],
            ["\u03BA\u03BB\u03B5", -1, 1],
            ["\u03B5\u03BA\u03BB\u03B5", 7, 1],
            ["\u03B1\u03C0\u03B5\u03BA\u03BB\u03B5", 8, 1],
            ["\u03B1\u03C0\u03BF\u03BA\u03BB\u03B5", 7, 1],
            ["\u03B5\u03C3\u03C9\u03BA\u03BB\u03B5", 7, 1],
            ["\u03B4\u03B1\u03BD\u03B5", -1, 1],
            ["\u03C0\u03B5", -1, 1],
            ["\u03B5\u03C0\u03B5", 13, 1],
            ["\u03BC\u03B5\u03C4\u03B5\u03C0\u03B5", 14, 1],
            ["\u03B5\u03C3\u03B5", -1, 1],
            ["\u03B1\u03B8\u03C1\u03BF", -1, 1],
            ["\u03C3\u03C5\u03BD\u03B1\u03B8\u03C1\u03BF", 17, 1]
          ];

          /** @const */
          var a_8 = [
            ["\u03B3\u03B5", -1, 1],
            ["\u03B3\u03BA\u03B5", -1, 1],
            ["\u03B3\u03BA", -1, 1],
            ["\u03BC", -1, 1],
            ["\u03C0\u03BF\u03C5\u03BA\u03B1\u03BC", 3, 1],
            ["\u03BA\u03BF\u03BC", 3, 1],
            ["\u03B1\u03BD", -1, 1],
            ["\u03BF\u03BB\u03BF", -1, 1],
            ["\u03C0", -1, 1],
            ["\u03BB\u03B1\u03C1", -1, 1],
            ["\u03B4\u03B7\u03BC\u03BF\u03BA\u03C1\u03B1\u03C4", -1, 1],
            ["\u03B1\u03C6", -1, 1],
            ["\u03B3\u03B9\u03B3\u03B1\u03BD\u03C4\u03BF\u03B1\u03C6", 11, 1]
          ];

          /** @const */
          var a_9 = [
            ["\u03B9\u03C3\u03B1", -1, 1],
            ["\u03B9\u03C3\u03B1\u03BC\u03B5", -1, 1],
            ["\u03B9\u03C3\u03B1\u03BD\u03B5", -1, 1],
            ["\u03B9\u03C3\u03B5", -1, 1],
            ["\u03B9\u03C3\u03B1\u03C4\u03B5", -1, 1],
            ["\u03B9\u03C3\u03B1\u03BD", -1, 1],
            ["\u03B9\u03C3\u03B5\u03C3", -1, 1]
          ];

          /** @const */
          var a_10 = [
            ["\u03BE\u03B1\u03BD\u03B1\u03C0\u03B1", -1, 1],
            ["\u03B5\u03C0\u03B1", -1, 1],
            ["\u03C0\u03B5\u03C1\u03B9\u03C0\u03B1", -1, 1],
            ["\u03B1\u03BD\u03B1\u03BC\u03C0\u03B1", -1, 1],
            ["\u03B5\u03BC\u03C0\u03B1", -1, 1],
            ["\u03C7\u03B1\u03C1\u03C4\u03BF\u03C0\u03B1", -1, 1],
            ["\u03B5\u03BE\u03B1\u03C1\u03C7\u03B1", -1, 1],
            ["\u03BA\u03BB\u03B5", -1, 1],
            ["\u03B5\u03BA\u03BB\u03B5", 7, 1],
            ["\u03B1\u03C0\u03B5\u03BA\u03BB\u03B5", 8, 1],
            ["\u03B1\u03C0\u03BF\u03BA\u03BB\u03B5", 7, 1],
            ["\u03B5\u03C3\u03C9\u03BA\u03BB\u03B5", 7, 1],
            ["\u03B4\u03B1\u03BD\u03B5", -1, 1],
            ["\u03C0\u03B5", -1, 1],
            ["\u03B5\u03C0\u03B5", 13, 1],
            ["\u03BC\u03B5\u03C4\u03B5\u03C0\u03B5", 14, 1],
            ["\u03B5\u03C3\u03B5", -1, 1],
            ["\u03B1\u03B8\u03C1\u03BF", -1, 1],
            ["\u03C3\u03C5\u03BD\u03B1\u03B8\u03C1\u03BF", 17, 1]
          ];

          /** @const */
          var a_11 = [
            ["\u03B9\u03C3\u03BF\u03C5\u03BC\u03B5", -1, 1],
            ["\u03B9\u03C3\u03BF\u03C5\u03BD\u03B5", -1, 1],
            ["\u03B9\u03C3\u03B5\u03C4\u03B5", -1, 1],
            ["\u03B9\u03C3\u03B5\u03B9", -1, 1],
            ["\u03B9\u03C3\u03BF\u03C5\u03BD", -1, 1],
            ["\u03B9\u03C3\u03B5\u03B9\u03C3", -1, 1],
            ["\u03B9\u03C3\u03C9", -1, 1]
          ];

          /** @const */
          var a_12 = [
            ["\u03BA\u03BB\u03B5", -1, 1],
            ["\u03B5\u03C3\u03C9\u03BA\u03BB\u03B5", 0, 1],
            ["\u03C0\u03BB\u03B5", -1, 1],
            ["\u03B4\u03B1\u03BD\u03B5", -1, 1],
            ["\u03C3\u03B5", -1, 1],
            ["\u03B1\u03C3\u03B5", 4, 1],
            ["\u03C3\u03C5\u03BD\u03B1\u03B8\u03C1\u03BF", -1, 1]
          ];

          /** @const */
          var a_13 = [
            ["\u03B1\u03C4\u03B1", -1, 1],
            ["\u03C6\u03B1", -1, 1],
            ["\u03B7\u03C6\u03B1", 1, 1],
            ["\u03BC\u03B5\u03B3", -1, 1],
            ["\u03BB\u03C5\u03B3", -1, 1],
            ["\u03B7\u03B4", -1, 1],
            ["\u03BA\u03B1\u03B8", -1, 1],
            ["\u03B5\u03C7\u03B8", -1, 1],
            ["\u03BA\u03B1\u03BA", -1, 1],
            ["\u03BC\u03B1\u03BA", -1, 1],
            ["\u03C3\u03BA", -1, 1],
            ["\u03C6\u03B9\u03BB", -1, 1],
            ["\u03BA\u03C5\u03BB", -1, 1],
            ["\u03BC", -1, 1],
            ["\u03B3\u03B5\u03BC", 13, 1],
            ["\u03B1\u03C7\u03BD", -1, 1],
            ["\u03C0", -1, 1],
            ["\u03B1\u03C0", 16, 1],
            ["\u03B5\u03BC\u03C0", 16, 1],
            ["\u03B5\u03C5\u03C0", 16, 1],
            ["\u03B1\u03C1", -1, 1],
            ["\u03B1\u03BF\u03C1", -1, 1],
            ["\u03B3\u03C5\u03C1", -1, 1],
            ["\u03C7\u03C1", -1, 1],
            ["\u03C7\u03C9\u03C1", -1, 1],
            ["\u03BA\u03C4", -1, 1],
            ["\u03B1\u03BA\u03C4", 25, 1],
            ["\u03C7\u03C4", -1, 1],
            ["\u03B1\u03C7\u03C4", 27, 1],
            ["\u03C4\u03B1\u03C7", -1, 1],
            ["\u03C3\u03C7", -1, 1],
            ["\u03B1\u03C3\u03C7", 30, 1],
            ["\u03C5\u03C8", -1, 1]
          ];

          /** @const */
          var a_14 = [
            ["\u03B9\u03C3\u03C4\u03B1", -1, 1],
            ["\u03B9\u03C3\u03C4\u03B5", -1, 1],
            ["\u03B9\u03C3\u03C4\u03B7", -1, 1],
            ["\u03B9\u03C3\u03C4\u03BF\u03B9", -1, 1],
            ["\u03B9\u03C3\u03C4\u03C9\u03BD", -1, 1],
            ["\u03B9\u03C3\u03C4\u03BF", -1, 1],
            ["\u03B9\u03C3\u03C4\u03B5\u03C3", -1, 1],
            ["\u03B9\u03C3\u03C4\u03B7\u03C3", -1, 1],
            ["\u03B9\u03C3\u03C4\u03BF\u03C3", -1, 1],
            ["\u03B9\u03C3\u03C4\u03BF\u03C5\u03C3", -1, 1],
            ["\u03B9\u03C3\u03C4\u03BF\u03C5", -1, 1]
          ];

          /** @const */
          var a_15 = [
            ["\u03B5\u03B3\u03BA\u03BB\u03B5", -1, 1],
            ["\u03B1\u03C0\u03BF\u03BA\u03BB\u03B5", -1, 1],
            ["\u03C3\u03B5", -1, 1],
            ["\u03BC\u03B5\u03C4\u03B1\u03C3\u03B5", 2, 1],
            ["\u03BC\u03B9\u03BA\u03C1\u03BF\u03C3\u03B5", 2, 1]
          ];

          /** @const */
          var a_16 = [
            ["\u03B4\u03B1\u03BD\u03B5", -1, 1],
            ["\u03B1\u03BD\u03C4\u03B9\u03B4\u03B1\u03BD\u03B5", 0, 1]
          ];

          /** @const */
          var a_17 = [
            ["\u03B1\u03C4\u03BF\u03BC\u03B9\u03BA", -1, 2],
            ["\u03B5\u03B8\u03BD\u03B9\u03BA", -1, 4],
            ["\u03C4\u03BF\u03C0\u03B9\u03BA", -1, 7],
            ["\u03B5\u03BA\u03BB\u03B5\u03BA\u03C4\u03B9\u03BA", -1, 5],
            ["\u03C3\u03BA\u03B5\u03C0\u03C4\u03B9\u03BA", -1, 6],
            ["\u03B3\u03BD\u03C9\u03C3\u03C4\u03B9\u03BA", -1, 3],
            ["\u03B1\u03B3\u03BD\u03C9\u03C3\u03C4\u03B9\u03BA", 5, 1],
            ["\u03B1\u03BB\u03B5\u03BE\u03B1\u03BD\u03B4\u03C1\u03B9\u03BD", -1, 8],
            ["\u03B8\u03B5\u03B1\u03C4\u03C1\u03B9\u03BD", -1, 10],
            ["\u03B2\u03C5\u03B6\u03B1\u03BD\u03C4\u03B9\u03BD", -1, 9]
          ];

          /** @const */
          var a_18 = [
            ["\u03B9\u03C3\u03BC\u03BF\u03B9", -1, 1],
            ["\u03B9\u03C3\u03BC\u03C9\u03BD", -1, 1],
            ["\u03B9\u03C3\u03BC\u03BF", -1, 1],
            ["\u03B9\u03C3\u03BC\u03BF\u03C3", -1, 1],
            ["\u03B9\u03C3\u03BC\u03BF\u03C5\u03C3", -1, 1],
            ["\u03B9\u03C3\u03BC\u03BF\u03C5", -1, 1]
          ];

          /** @const */
          var a_19 = [
            ["\u03C3", -1, 1],
            ["\u03C7", -1, 1]
          ];

          /** @const */
          var a_20 = [
            ["\u03BF\u03C5\u03B4\u03B1\u03BA\u03B9\u03B1", -1, 1],
            ["\u03B1\u03C1\u03B1\u03BA\u03B9\u03B1", -1, 1],
            ["\u03BF\u03C5\u03B4\u03B1\u03BA\u03B9", -1, 1],
            ["\u03B1\u03C1\u03B1\u03BA\u03B9", -1, 1]
          ];

          /** @const */
          var a_21 = [
            ["\u03B2\u03B1\u03BC\u03B2", -1, 1],
            ["\u03C3\u03BB\u03BF\u03B2", -1, 1],
            ["\u03C4\u03C3\u03B5\u03C7\u03BF\u03C3\u03BB\u03BF\u03B2", 1, 1],
            ["\u03C4\u03B6", -1, 1],
            ["\u03BA", -1, 1],
            ["\u03BA\u03B1\u03C0\u03B1\u03BA", 4, 1],
            ["\u03C3\u03BF\u03BA", 4, 1],
            ["\u03C3\u03BA", 4, 1],
            ["\u03BC\u03B1\u03BB", -1, 1],
            ["\u03C0\u03BB", -1, 1],
            ["\u03BB\u03BF\u03C5\u03BB", -1, 1],
            ["\u03C6\u03C5\u03BB", -1, 1],
            ["\u03BA\u03B1\u03B9\u03BC", -1, 1],
            ["\u03BA\u03BB\u03B9\u03BC", -1, 1],
            ["\u03C6\u03B1\u03C1\u03BC", -1, 1],
            ["\u03C3\u03C0\u03B1\u03BD", -1, 1],
            ["\u03BA\u03BF\u03BD", -1, 1],
            ["\u03BA\u03B1\u03C4\u03C1\u03B1\u03C0", -1, 1],
            ["\u03C1", -1, 1],
            ["\u03B2\u03C1", 18, 1],
            ["\u03BB\u03B1\u03B2\u03C1", 19, 1],
            ["\u03B1\u03BC\u03B2\u03C1", 19, 1],
            ["\u03BC\u03B5\u03C1", 18, 1],
            ["\u03B1\u03BD\u03B8\u03C1", 18, 1],
            ["\u03BA\u03BF\u03C1", 18, 1],
            ["\u03C3", -1, 1],
            ["\u03BD\u03B1\u03B3\u03BA\u03B1\u03C3", 25, 1],
            ["\u03BC\u03BF\u03C5\u03C3\u03C4", -1, 1],
            ["\u03C1\u03C5", -1, 1],
            ["\u03C6", -1, 1],
            ["\u03C3\u03C6", 29, 1],
            ["\u03B1\u03BB\u03B9\u03C3\u03C6", 30, 1],
            ["\u03C7", -1, 1]
          ];

          /** @const */
          var a_22 = [
            ["\u03B2", -1, 1],
            ["\u03BA\u03B1\u03C1\u03B4", -1, 1],
            ["\u03B6", -1, 1],
            ["\u03C3\u03BA", -1, 1],
            ["\u03B2\u03B1\u03BB", -1, 1],
            ["\u03B3\u03BB", -1, 1],
            ["\u03C4\u03C1\u03B9\u03C0\u03BF\u03BB", -1, 1],
            ["\u03B3\u03B9\u03B1\u03BD", -1, 1],
            ["\u03B7\u03B3\u03BF\u03C5\u03BC\u03B5\u03BD", -1, 1],
            ["\u03BA\u03BF\u03BD", -1, 1],
            ["\u03BC\u03B1\u03BA\u03C1\u03C5\u03BD", -1, 1],
            ["\u03C0", -1, 1],
            ["\u03C0\u03B1\u03C4\u03B5\u03C1", -1, 1],
            ["\u03C4\u03BF\u03C3", -1, 1],
            ["\u03BD\u03C5\u03C6", -1, 1]
          ];

          /** @const */
          var a_23 = [
            ["\u03B1\u03BA\u03B9\u03B1", -1, 1],
            ["\u03B1\u03C1\u03B1\u03BA\u03B9\u03B1", 0, 1],
            ["\u03B9\u03C4\u03C3\u03B1", -1, 1],
            ["\u03B1\u03BA\u03B9", -1, 1],
            ["\u03B1\u03C1\u03B1\u03BA\u03B9", 3, 1],
            ["\u03B9\u03C4\u03C3\u03C9\u03BD", -1, 1],
            ["\u03B9\u03C4\u03C3\u03B1\u03C3", -1, 1],
            ["\u03B9\u03C4\u03C3\u03B5\u03C3", -1, 1]
          ];

          /** @const */
          var a_24 = [
            ["\u03C8\u03B1\u03BB", -1, 1],
            ["\u03B1\u03B9\u03C6\u03BD", -1, 1],
            ["\u03BF\u03BB\u03BF", -1, 1],
            ["\u03B9\u03C1", -1, 1]
          ];

          /** @const */
          var a_25 = [
            ["\u03B5", -1, 1],
            ["\u03C0\u03B1\u03B9\u03C7\u03BD", -1, 1]
          ];

          /** @const */
          var a_26 = [
            ["\u03B9\u03B4\u03B9\u03B1", -1, 1],
            ["\u03B9\u03B4\u03B9\u03C9\u03BD", -1, 1],
            ["\u03B9\u03B4\u03B9\u03BF", -1, 1]
          ];

          /** @const */
          var a_27 = [
            ["\u03B9\u03B2", -1, 1],
            ["\u03B4", -1, 1],
            ["\u03C6\u03C1\u03B1\u03B3\u03BA", -1, 1],
            ["\u03BB\u03C5\u03BA", -1, 1],
            ["\u03BF\u03B2\u03B5\u03BB", -1, 1],
            ["\u03BC\u03B7\u03BD", -1, 1],
            ["\u03C1", -1, 1]
          ];

          /** @const */
          var a_28 = [
            ["\u03B9\u03C3\u03BA\u03B5", -1, 1],
            ["\u03B9\u03C3\u03BA\u03BF", -1, 1],
            ["\u03B9\u03C3\u03BA\u03BF\u03C3", -1, 1],
            ["\u03B9\u03C3\u03BA\u03BF\u03C5", -1, 1]
          ];

          /** @const */
          var a_29 = [
            ["\u03B1\u03B4\u03C9\u03BD", -1, 1],
            ["\u03B1\u03B4\u03B5\u03C3", -1, 1]
          ];

          /** @const */
          var a_30 = [
            ["\u03B3\u03B9\u03B1\u03B3\u03B9", -1, -1],
            ["\u03B8\u03B5\u03B9", -1, -1],
            ["\u03BF\u03BA", -1, -1],
            ["\u03BC\u03B1\u03BC", -1, -1],
            ["\u03BC\u03B1\u03BD", -1, -1],
            ["\u03BC\u03C0\u03B1\u03BC\u03C0", -1, -1],
            ["\u03C0\u03B5\u03B8\u03B5\u03C1", -1, -1],
            ["\u03C0\u03B1\u03C4\u03B5\u03C1", -1, -1],
            ["\u03BA\u03C5\u03C1", -1, -1],
            ["\u03BD\u03C4\u03B1\u03BD\u03C4", -1, -1]
          ];

          /** @const */
          var a_31 = [
            ["\u03B5\u03B4\u03C9\u03BD", -1, 1],
            ["\u03B5\u03B4\u03B5\u03C3", -1, 1]
          ];

          /** @const */
          var a_32 = [
            ["\u03BC\u03B9\u03BB", -1, 1],
            ["\u03B4\u03B1\u03C0", -1, 1],
            ["\u03B3\u03B7\u03C0", -1, 1],
            ["\u03B9\u03C0", -1, 1],
            ["\u03B5\u03BC\u03C0", -1, 1],
            ["\u03BF\u03C0", -1, 1],
            ["\u03BA\u03C1\u03B1\u03C3\u03C0", -1, 1],
            ["\u03C5\u03C0", -1, 1]
          ];

          /** @const */
          var a_33 = [
            ["\u03BF\u03C5\u03B4\u03C9\u03BD", -1, 1],
            ["\u03BF\u03C5\u03B4\u03B5\u03C3", -1, 1]
          ];

          /** @const */
          var a_34 = [
            ["\u03C4\u03C1\u03B1\u03B3", -1, 1],
            ["\u03C6\u03B5", -1, 1],
            ["\u03BA\u03B1\u03BB\u03B9\u03B1\u03BA", -1, 1],
            ["\u03B1\u03C1\u03BA", -1, 1],
            ["\u03C3\u03BA", -1, 1],
            ["\u03C0\u03B5\u03C4\u03B1\u03BB", -1, 1],
            ["\u03B2\u03B5\u03BB", -1, 1],
            ["\u03BB\u03BF\u03C5\u03BB", -1, 1],
            ["\u03C6\u03BB", -1, 1],
            ["\u03C7\u03BD", -1, 1],
            ["\u03C0\u03BB\u03B5\u03BE", -1, 1],
            ["\u03C3\u03C0", -1, 1],
            ["\u03C6\u03C1", -1, 1],
            ["\u03C3", -1, 1],
            ["\u03BB\u03B9\u03C7", -1, 1]
          ];

          /** @const */
          var a_35 = [
            ["\u03B5\u03C9\u03BD", -1, 1],
            ["\u03B5\u03C9\u03C3", -1, 1]
          ];

          /** @const */
          var a_36 = [
            ["\u03B4", -1, 1],
            ["\u03B9\u03B4", 0, 1],
            ["\u03B8", -1, 1],
            ["\u03B3\u03B1\u03BB", -1, 1],
            ["\u03B5\u03BB", -1, 1],
            ["\u03BD", -1, 1],
            ["\u03C0", -1, 1],
            ["\u03C0\u03B1\u03C1", -1, 1]
          ];

          /** @const */
          var a_37 = [
            ["\u03B9\u03B1", -1, 1],
            ["\u03B9\u03C9\u03BD", -1, 1],
            ["\u03B9\u03BF\u03C5", -1, 1]
          ];

          /** @const */
          var a_38 = [
            ["\u03B9\u03BA\u03B1", -1, 1],
            ["\u03B9\u03BA\u03C9\u03BD", -1, 1],
            ["\u03B9\u03BA\u03BF", -1, 1],
            ["\u03B9\u03BA\u03BF\u03C5", -1, 1]
          ];

          /** @const */
          var a_39 = [
            ["\u03B1\u03B4", -1, 1],
            ["\u03C3\u03C5\u03BD\u03B1\u03B4", 0, 1],
            ["\u03BA\u03B1\u03C4\u03B1\u03B4", 0, 1],
            ["\u03B1\u03BD\u03C4\u03B9\u03B4", -1, 1],
            ["\u03B5\u03BD\u03B4", -1, 1],
            ["\u03C6\u03C5\u03BB\u03BF\u03B4", -1, 1],
            ["\u03C5\u03C0\u03BF\u03B4", -1, 1],
            ["\u03C0\u03C1\u03C9\u03C4\u03BF\u03B4", -1, 1],
            ["\u03B5\u03BE\u03C9\u03B4", -1, 1],
            ["\u03B7\u03B8", -1, 1],
            ["\u03B1\u03BD\u03B7\u03B8", 9, 1],
            ["\u03BE\u03B9\u03BA", -1, 1],
            ["\u03B1\u03BB", -1, 1],
            ["\u03B1\u03BC\u03BC\u03BF\u03C7\u03B1\u03BB", 12, 1],
            ["\u03C3\u03C5\u03BD\u03BF\u03BC\u03B7\u03BB", -1, 1],
            ["\u03BC\u03C0\u03BF\u03BB", -1, 1],
            ["\u03BC\u03BF\u03C5\u03BB", -1, 1],
            ["\u03C4\u03C3\u03B1\u03BC", -1, 1],
            ["\u03B2\u03C1\u03C9\u03BC", -1, 1],
            ["\u03B1\u03BC\u03B1\u03BD", -1, 1],
            ["\u03BC\u03C0\u03B1\u03BD", -1, 1],
            ["\u03BA\u03B1\u03BB\u03BB\u03B9\u03BD", -1, 1],
            ["\u03C0\u03BF\u03C3\u03C4\u03B5\u03BB\u03BD", -1, 1],
            ["\u03C6\u03B9\u03BB\u03BF\u03BD", -1, 1],
            ["\u03BA\u03B1\u03BB\u03C0", -1, 1],
            ["\u03B3\u03B5\u03C1", -1, 1],
            ["\u03C7\u03B1\u03C3", -1, 1],
            ["\u03BC\u03C0\u03BF\u03C3", -1, 1],
            ["\u03C0\u03BB\u03B9\u03B1\u03C4\u03C3", -1, 1],
            ["\u03C0\u03B5\u03C4\u03C3", -1, 1],
            ["\u03C0\u03B9\u03C4\u03C3", -1, 1],
            ["\u03C6\u03C5\u03C3", -1, 1],
            ["\u03BC\u03C0\u03B1\u03B3\u03B9\u03B1\u03C4", -1, 1],
            ["\u03BD\u03B9\u03C4", -1, 1],
            ["\u03C0\u03B9\u03BA\u03B1\u03BD\u03C4", -1, 1],
            ["\u03C3\u03B5\u03C1\u03C4", -1, 1]
          ];

          /** @const */
          var a_40 = [
            ["\u03B1\u03B3\u03B1\u03BC\u03B5", -1, 1],
            ["\u03B7\u03BA\u03B1\u03BC\u03B5", -1, 1],
            ["\u03B7\u03B8\u03B7\u03BA\u03B1\u03BC\u03B5", 1, 1],
            ["\u03B7\u03C3\u03B1\u03BC\u03B5", -1, 1],
            ["\u03BF\u03C5\u03C3\u03B1\u03BC\u03B5", -1, 1]
          ];

          /** @const */
          var a_41 = [
            ["\u03B2\u03BF\u03C5\u03B2", -1, 1],
            ["\u03BE\u03B5\u03B8", -1, 1],
            ["\u03C0\u03B5\u03B8", -1, 1],
            ["\u03B1\u03C0\u03BF\u03B8", -1, 1],
            ["\u03B1\u03C0\u03BF\u03BA", -1, 1],
            ["\u03BF\u03C5\u03BB", -1, 1],
            ["\u03B1\u03BD\u03B1\u03C0", -1, 1],
            ["\u03C0\u03B9\u03BA\u03C1", -1, 1],
            ["\u03C0\u03BF\u03C4", -1, 1],
            ["\u03B1\u03C0\u03BF\u03C3\u03C4", -1, 1],
            ["\u03C7", -1, 1],
            ["\u03C3\u03B9\u03C7", 10, 1]
          ];

          /** @const */
          var a_42 = [
            ["\u03C4\u03C1", -1, 1],
            ["\u03C4\u03C3", -1, 1]
          ];

          /** @const */
          var a_43 = [
            ["\u03B1\u03B3\u03B1\u03BD\u03B5", -1, 1],
            ["\u03B7\u03BA\u03B1\u03BD\u03B5", -1, 1],
            ["\u03B7\u03B8\u03B7\u03BA\u03B1\u03BD\u03B5", 1, 1],
            ["\u03B7\u03C3\u03B1\u03BD\u03B5", -1, 1],
            ["\u03BF\u03C5\u03C3\u03B1\u03BD\u03B5", -1, 1],
            ["\u03BF\u03BD\u03C4\u03B1\u03BD\u03B5", -1, 1],
            ["\u03B9\u03BF\u03BD\u03C4\u03B1\u03BD\u03B5", 5, 1],
            ["\u03BF\u03C5\u03BD\u03C4\u03B1\u03BD\u03B5", -1, 1],
            ["\u03B9\u03BF\u03C5\u03BD\u03C4\u03B1\u03BD\u03B5", 7, 1],
            ["\u03BF\u03C4\u03B1\u03BD\u03B5", -1, 1],
            ["\u03B9\u03BF\u03C4\u03B1\u03BD\u03B5", 9, 1]
          ];

          /** @const */
          var a_44 = [
            ["\u03C4\u03B1\u03B2", -1, 1],
            ["\u03BD\u03C4\u03B1\u03B2", 0, 1],
            ["\u03C8\u03B7\u03BB\u03BF\u03C4\u03B1\u03B2", 0, 1],
            ["\u03BB\u03B9\u03B2", -1, 1],
            ["\u03BA\u03BB\u03B9\u03B2", 3, 1],
            ["\u03BE\u03B7\u03C1\u03BF\u03BA\u03BB\u03B9\u03B2", 4, 1],
            ["\u03B3", -1, 1],
            ["\u03B1\u03B3", 6, 1],
            ["\u03C4\u03C1\u03B1\u03B3", 7, 1],
            ["\u03C4\u03C3\u03B1\u03B3", 7, 1],
            ["\u03B1\u03B8\u03B9\u03B3\u03B3", 6, 1],
            ["\u03C4\u03C3\u03B9\u03B3\u03B3", 6, 1],
            ["\u03B1\u03C4\u03C3\u03B9\u03B3\u03B3", 11, 1],
            ["\u03C3\u03C4\u03B5\u03B3", 6, 1],
            ["\u03B1\u03C0\u03B7\u03B3", 6, 1],
            ["\u03C3\u03B9\u03B3", 6, 1],
            ["\u03B1\u03BD\u03BF\u03C1\u03B3", 6, 1],
            ["\u03B5\u03BD\u03BF\u03C1\u03B3", 6, 1],
            ["\u03BA\u03B1\u03BB\u03C0\u03BF\u03C5\u03B6", -1, 1],
            ["\u03B8", -1, 1],
            ["\u03BC\u03C9\u03B1\u03BC\u03B5\u03B8", 19, 1],
            ["\u03C0\u03B9\u03B8", 19, 1],
            ["\u03B1\u03C0\u03B9\u03B8", 21, 1],
            ["\u03B4\u03B5\u03BA", -1, 1],
            ["\u03C0\u03B5\u03BB\u03B5\u03BA", -1, 1],
            ["\u03B9\u03BA", -1, 1],
            ["\u03B1\u03BD\u03B9\u03BA", 25, 1],
            ["\u03B2\u03BF\u03C5\u03BB\u03BA", -1, 1],
            ["\u03B2\u03B1\u03C3\u03BA", -1, 1],
            ["\u03B2\u03C1\u03B1\u03C7\u03C5\u03BA", -1, 1],
            ["\u03B3\u03B1\u03BB", -1, 1],
            ["\u03BA\u03B1\u03C4\u03B1\u03B3\u03B1\u03BB", 30, 1],
            ["\u03BF\u03BB\u03BF\u03B3\u03B1\u03BB", 30, 1],
            ["\u03B2\u03B1\u03B8\u03C5\u03B3\u03B1\u03BB", 30, 1],
            ["\u03BC\u03B5\u03BB", -1, 1],
            ["\u03BA\u03B1\u03C3\u03C4\u03B5\u03BB", -1, 1],
            ["\u03C0\u03BF\u03C1\u03C4\u03BF\u03BB", -1, 1],
            ["\u03C0\u03BB", -1, 1],
            ["\u03B4\u03B9\u03C0\u03BB", 37, 1],
            ["\u03BB\u03B1\u03BF\u03C0\u03BB", 37, 1],
            ["\u03C8\u03C5\u03C7\u03BF\u03C0\u03BB", 37, 1],
            ["\u03BF\u03C5\u03BB", -1, 1],
            ["\u03BC", -1, 1],
            ["\u03BF\u03BB\u03B9\u03B3\u03BF\u03B4\u03B1\u03BC", 42, 1],
            ["\u03BC\u03BF\u03C5\u03C3\u03BF\u03C5\u03BB\u03BC", 42, 1],
            ["\u03B4\u03C1\u03B1\u03B4\u03BF\u03C5\u03BC", 42, 1],
            ["\u03B2\u03C1\u03B1\u03C7\u03BC", 42, 1],
            ["\u03BD", -1, 1],
            ["\u03B1\u03BC\u03B5\u03C1\u03B9\u03BA\u03B1\u03BD", 47, 1],
            ["\u03C0", -1, 1],
            ["\u03B1\u03B4\u03B1\u03C0", 49, 1],
            ["\u03C7\u03B1\u03BC\u03B7\u03BB\u03BF\u03B4\u03B1\u03C0", 49, 1],
            ["\u03C0\u03BF\u03BB\u03C5\u03B4\u03B1\u03C0", 49, 1],
            ["\u03BA\u03BF\u03C0", 49, 1],
            ["\u03C5\u03C0\u03BF\u03BA\u03BF\u03C0", 53, 1],
            ["\u03C4\u03C3\u03BF\u03C0", 49, 1],
            ["\u03C3\u03C0", 49, 1],
            ["\u03B5\u03C1", -1, 1],
            ["\u03B3\u03B5\u03C1", 57, 1],
            ["\u03B2\u03B5\u03C4\u03B5\u03C1", 57, 1],
            ["\u03BB\u03BF\u03C5\u03B8\u03B7\u03C1", -1, 1],
            ["\u03BA\u03BF\u03C1\u03BC\u03BF\u03C1", -1, 1],
            ["\u03C0\u03B5\u03C1\u03B9\u03C4\u03C1", -1, 1],
            ["\u03BF\u03C5\u03C1", -1, 1],
            ["\u03C3", -1, 1],
            ["\u03B2\u03B1\u03C3", 64, 1],
            ["\u03C0\u03BF\u03BB\u03B9\u03C3", 64, 1],
            ["\u03C3\u03B1\u03C1\u03B1\u03BA\u03B1\u03C4\u03C3", 64, 1],
            ["\u03B8\u03C5\u03C3", 64, 1],
            ["\u03B4\u03B9\u03B1\u03C4", -1, 1],
            ["\u03C0\u03BB\u03B1\u03C4", -1, 1],
            ["\u03C4\u03C3\u03B1\u03C1\u03BB\u03B1\u03C4", -1, 1],
            ["\u03C4\u03B5\u03C4", -1, 1],
            ["\u03C0\u03BF\u03C5\u03C1\u03B9\u03C4", -1, 1],
            ["\u03C3\u03BF\u03C5\u03BB\u03C4", -1, 1],
            ["\u03BC\u03B1\u03B9\u03BD\u03C4", -1, 1],
            ["\u03B6\u03C9\u03BD\u03C4", -1, 1],
            ["\u03BA\u03B1\u03C3\u03C4", -1, 1],
            ["\u03C6", -1, 1],
            ["\u03B4\u03B9\u03B1\u03C6", 78, 1],
            ["\u03C3\u03C4\u03B5\u03C6", 78, 1],
            ["\u03C6\u03C9\u03C4\u03BF\u03C3\u03C4\u03B5\u03C6", 80, 1],
            ["\u03C0\u03B5\u03C1\u03B7\u03C6", 78, 1],
            ["\u03C5\u03C0\u03B5\u03C1\u03B7\u03C6", 82, 1],
            ["\u03BA\u03BF\u03B9\u03BB\u03B1\u03C1\u03C6", 78, 1],
            ["\u03C0\u03B5\u03BD\u03C4\u03B1\u03C1\u03C6", 78, 1],
            ["\u03BF\u03C1\u03C6", 78, 1],
            ["\u03C7", -1, 1],
            ["\u03B1\u03BC\u03B7\u03C7", 87, 1],
            ["\u03B2\u03B9\u03BF\u03BC\u03B7\u03C7", 87, 1],
            ["\u03BC\u03B5\u03B3\u03BB\u03BF\u03B2\u03B9\u03BF\u03BC\u03B7\u03C7", 89, 1],
            ["\u03BA\u03B1\u03C0\u03BD\u03BF\u03B2\u03B9\u03BF\u03BC\u03B7\u03C7", 89, 1],
            ["\u03BC\u03B9\u03BA\u03C1\u03BF\u03B2\u03B9\u03BF\u03BC\u03B7\u03C7", 89, 1],
            ["\u03C0\u03BF\u03BB\u03C5\u03BC\u03B7\u03C7", 87, 1],
            ["\u03BB\u03B9\u03C7", 87, 1]
          ];

          /** @const */
          var a_45 = [
            ["\u03B7\u03C3\u03B5\u03C4\u03B5", -1, 1]
          ];

          /** @const */
          var a_46 = [
            ["\u03B5\u03BD\u03B4", -1, 1],
            ["\u03C3\u03C5\u03BD\u03B4", -1, 1],
            ["\u03BF\u03B4", -1, 1],
            ["\u03B4\u03B9\u03B1\u03B8", -1, 1],
            ["\u03BA\u03B1\u03B8", -1, 1],
            ["\u03C1\u03B1\u03B8", -1, 1],
            ["\u03C4\u03B1\u03B8", -1, 1],
            ["\u03C4\u03B9\u03B8", -1, 1],
            ["\u03B5\u03BA\u03B8", -1, 1],
            ["\u03B5\u03BD\u03B8", -1, 1],
            ["\u03C3\u03C5\u03BD\u03B8", -1, 1],
            ["\u03C1\u03BF\u03B8", -1, 1],
            ["\u03C5\u03C0\u03B5\u03C1\u03B8", -1, 1],
            ["\u03C3\u03B8", -1, 1],
            ["\u03B5\u03C5\u03B8", -1, 1],
            ["\u03B1\u03C1\u03BA", -1, 1],
            ["\u03C9\u03C6\u03B5\u03BB", -1, 1],
            ["\u03B2\u03BF\u03BB", -1, 1],
            ["\u03B1\u03B9\u03BD", -1, 1],
            ["\u03C0\u03BF\u03BD", -1, 1],
            ["\u03C1\u03BF\u03BD", -1, 1],
            ["\u03C3\u03C5\u03BD", -1, 1],
            ["\u03B2\u03B1\u03C1", -1, 1],
            ["\u03B2\u03C1", -1, 1],
            ["\u03B1\u03B9\u03C1", -1, 1],
            ["\u03C6\u03BF\u03C1", -1, 1],
            ["\u03B5\u03C5\u03C1", -1, 1],
            ["\u03C0\u03C5\u03C1", -1, 1],
            ["\u03C7\u03C9\u03C1", -1, 1],
            ["\u03BD\u03B5\u03C4", -1, 1],
            ["\u03C3\u03C7", -1, 1]
          ];

          /** @const */
          var a_47 = [
            ["\u03C0\u03B1\u03B3", -1, 1],
            ["\u03B4", -1, 1],
            ["\u03B1\u03B4", 1, 1],
            ["\u03B8", -1, 1],
            ["\u03B1\u03B8", 3, 1],
            ["\u03C4\u03BF\u03BA", -1, 1],
            ["\u03C3\u03BA", -1, 1],
            ["\u03C0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB", -1, 1],
            ["\u03C3\u03BA\u03B5\u03BB", -1, 1],
            ["\u03B1\u03C0\u03BB", -1, 1],
            ["\u03B5\u03BC", -1, 1],
            ["\u03B1\u03BD", -1, 1],
            ["\u03B2\u03B5\u03BD", -1, 1],
            ["\u03B2\u03B1\u03C1\u03BF\u03BD", -1, 1],
            ["\u03BA\u03BF\u03C0", -1, 1],
            ["\u03C3\u03B5\u03C1\u03C0", -1, 1],
            ["\u03B1\u03B2\u03B1\u03C1", -1, 1],
            ["\u03B5\u03BD\u03B1\u03C1", -1, 1],
            ["\u03B1\u03B2\u03C1", -1, 1],
            ["\u03BC\u03C0\u03BF\u03C1", -1, 1],
            ["\u03B8\u03B1\u03C1\u03C1", -1, 1],
            ["\u03BD\u03C4\u03C1", -1, 1],
            ["\u03C5", -1, 1],
            ["\u03BD\u03B9\u03C6", -1, 1],
            ["\u03C3\u03C5\u03C1\u03C6", -1, 1]
          ];

          /** @const */
          var a_48 = [
            ["\u03BF\u03BD\u03C4\u03B1\u03C3", -1, 1],
            ["\u03C9\u03BD\u03C4\u03B1\u03C3", -1, 1]
          ];

          /** @const */
          var a_49 = [
            ["\u03BF\u03BC\u03B1\u03C3\u03C4\u03B5", -1, 1],
            ["\u03B9\u03BF\u03BC\u03B1\u03C3\u03C4\u03B5", 0, 1]
          ];

          /** @const */
          var a_50 = [
            ["\u03C0", -1, 1],
            ["\u03B1\u03C0", 0, 1],
            ["\u03B1\u03BA\u03B1\u03C4\u03B1\u03C0", 1, 1],
            ["\u03C3\u03C5\u03BC\u03C0", 0, 1],
            ["\u03B1\u03C3\u03C5\u03BC\u03C0", 3, 1],
            ["\u03B1\u03BC\u03B5\u03C4\u03B1\u03BC\u03C6", -1, 1]
          ];

          /** @const */
          var a_51 = [
            ["\u03B6", -1, 1],
            ["\u03B1\u03BB", -1, 1],
            ["\u03C0\u03B1\u03C1\u03B1\u03BA\u03B1\u03BB", 1, 1],
            ["\u03B5\u03BA\u03C4\u03B5\u03BB", -1, 1],
            ["\u03BC", -1, 1],
            ["\u03BE", -1, 1],
            ["\u03C0\u03C1\u03BF", -1, 1],
            ["\u03B1\u03C1", -1, 1],
            ["\u03BD\u03B9\u03C3", -1, 1]
          ];

          /** @const */
          var a_52 = [
            ["\u03B7\u03B8\u03B7\u03BA\u03B1", -1, 1],
            ["\u03B7\u03B8\u03B7\u03BA\u03B5", -1, 1],
            ["\u03B7\u03B8\u03B7\u03BA\u03B5\u03C3", -1, 1]
          ];

          /** @const */
          var a_53 = [
            ["\u03C0\u03B9\u03B8", -1, 1],
            ["\u03BF\u03B8", -1, 1],
            ["\u03BD\u03B1\u03C1\u03B8", -1, 1],
            ["\u03C3\u03BA\u03BF\u03C5\u03BB", -1, 1],
            ["\u03C3\u03BA\u03C9\u03BB", -1, 1],
            ["\u03C3\u03C6", -1, 1]
          ];

          /** @const */
          var a_54 = [
            ["\u03B8", -1, 1],
            ["\u03B4\u03B9\u03B1\u03B8", 0, 1],
            ["\u03C0\u03B1\u03C1\u03B1\u03BA\u03B1\u03C4\u03B1\u03B8", 0, 1],
            ["\u03C3\u03C5\u03BD\u03B8", 0, 1],
            ["\u03C0\u03C1\u03BF\u03C3\u03B8", 0, 1]
          ];

          /** @const */
          var a_55 = [
            ["\u03B7\u03BA\u03B1", -1, 1],
            ["\u03B7\u03BA\u03B5", -1, 1],
            ["\u03B7\u03BA\u03B5\u03C3", -1, 1]
          ];

          /** @const */
          var a_56 = [
            ["\u03C6\u03B1\u03B3", -1, 1],
            ["\u03BB\u03B7\u03B3", -1, 1],
            ["\u03C6\u03C1\u03C5\u03B4", -1, 1],
            ["\u03BC\u03B1\u03BD\u03C4\u03B9\u03BB", -1, 1],
            ["\u03BC\u03B1\u03BB\u03BB", -1, 1],
            ["\u03BF\u03BC", -1, 1],
            ["\u03B2\u03BB\u03B5\u03C0", -1, 1],
            ["\u03C0\u03BF\u03B4\u03B1\u03C1", -1, 1],
            ["\u03BA\u03C5\u03BC\u03B1\u03C4", -1, 1],
            ["\u03C0\u03C1\u03C9\u03C4", -1, 1],
            ["\u03BB\u03B1\u03C7", -1, 1],
            ["\u03C0\u03B1\u03BD\u03C4\u03B1\u03C7", -1, 1]
          ];

          /** @const */
          var a_57 = [
            ["\u03C4\u03C3\u03B1", -1, 1],
            ["\u03C7\u03B1\u03B4", -1, 1],
            ["\u03BC\u03B5\u03B4", -1, 1],
            ["\u03BB\u03B1\u03BC\u03C0\u03B9\u03B4", -1, 1],
            ["\u03B4\u03B5", -1, 1],
            ["\u03C0\u03BB\u03B5", -1, 1],
            ["\u03BC\u03B5\u03C3\u03B1\u03B6", -1, 1],
            ["\u03B4\u03B5\u03C3\u03C0\u03BF\u03B6", -1, 1],
            ["\u03B1\u03B9\u03B8", -1, 1],
            ["\u03C6\u03B1\u03C1\u03BC\u03B1\u03BA", -1, 1],
            ["\u03B1\u03B3\u03BA", -1, 1],
            ["\u03B1\u03BD\u03B7\u03BA", -1, 1],
            ["\u03BB", -1, 1],
            ["\u03BC", -1, 1],
            ["\u03B1\u03BC", 13, 1],
            ["\u03B2\u03C1\u03BF\u03BC", 13, 1],
            ["\u03C5\u03C0\u03BF\u03C4\u03B5\u03B9\u03BD", -1, 1],
            ["\u03B5\u03BA\u03BB\u03B9\u03C0", -1, 1],
            ["\u03C1", -1, 1],
            ["\u03B5\u03BD\u03B4\u03B9\u03B1\u03C6\u03B5\u03C1", 18, 1],
            ["\u03B1\u03BD\u03B1\u03C1\u03C1", 18, 1],
            ["\u03C0\u03B1\u03C4", -1, 1],
            ["\u03BA\u03B1\u03B8\u03B1\u03C1\u03B5\u03C5", -1, 1],
            ["\u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03B5\u03C5", -1, 1],
            ["\u03BB\u03B5\u03C7", -1, 1]
          ];

          /** @const */
          var a_58 = [
            ["\u03BF\u03C5\u03C3\u03B1", -1, 1],
            ["\u03BF\u03C5\u03C3\u03B5", -1, 1],
            ["\u03BF\u03C5\u03C3\u03B5\u03C3", -1, 1]
          ];

          /** @const */
          var a_59 = [
            ["\u03C8\u03BF\u03C6", -1, -1],
            ["\u03BD\u03B1\u03C5\u03BB\u03BF\u03C7", -1, -1]
          ];

          /** @const */
          var a_60 = [
            ["\u03C0\u03B5\u03BB", -1, 1],
            ["\u03BB\u03BB", -1, 1],
            ["\u03C3\u03BC\u03B7\u03BD", -1, 1],
            ["\u03C1\u03C0", -1, 1],
            ["\u03C0\u03C1", -1, 1],
            ["\u03C6\u03C1", -1, 1],
            ["\u03C7\u03BF\u03C1\u03C4", -1, 1],
            ["\u03BF\u03C6", -1, 1],
            ["\u03C3\u03C6", -1, 1],
            ["\u03BB\u03BF\u03C7", -1, 1]
          ];

          /** @const */
          var a_61 = [
            ["\u03B1\u03BC\u03B1\u03BB\u03BB\u03B9", -1, 1],
            ["\u03BB", -1, 1],
            ["\u03B1\u03BC\u03B1\u03BB", 1, 1],
            ["\u03BC", -1, 1],
            ["\u03BF\u03C5\u03BB\u03B1\u03BC", 3, 1],
            ["\u03B5\u03BD", -1, 1],
            ["\u03B4\u03B5\u03C1\u03B2\u03B5\u03BD", 5, 1],
            ["\u03C0", -1, 1],
            ["\u03B1\u03B5\u03B9\u03C0", 7, 1],
            ["\u03B1\u03C1\u03C4\u03B9\u03C0", 7, 1],
            ["\u03C3\u03C5\u03BC\u03C0", 7, 1],
            ["\u03BD\u03B5\u03BF\u03C0", 7, 1],
            ["\u03BA\u03C1\u03BF\u03BA\u03B1\u03BB\u03BF\u03C0", 7, 1],
            ["\u03BF\u03BB\u03BF\u03C0", 7, 1],
            ["\u03C0\u03C1\u03BF\u03C3\u03C9\u03C0\u03BF\u03C0", 7, 1],
            ["\u03C3\u03B9\u03B4\u03B7\u03C1\u03BF\u03C0", 7, 1],
            ["\u03B4\u03C1\u03BF\u03C3\u03BF\u03C0", 7, 1],
            ["\u03B1\u03C3\u03C0", 7, 1],
            ["\u03B1\u03BD\u03C5\u03C0", 7, 1],
            ["\u03C1", -1, 1],
            ["\u03B1\u03C3\u03C0\u03B1\u03C1", 19, 1],
            ["\u03C7\u03B1\u03C1", 19, 1],
            ["\u03B1\u03C7\u03B1\u03C1", 21, 1],
            ["\u03B1\u03C0\u03B5\u03C1", 19, 1],
            ["\u03C4\u03C1", 19, 1],
            ["\u03BF\u03C5\u03C1", 19, 1],
            ["\u03C4", -1, 1],
            ["\u03B4\u03B9\u03B1\u03C4", 26, 1],
            ["\u03B5\u03C0\u03B9\u03C4", 26, 1],
            ["\u03C3\u03C5\u03BD\u03C4", 26, 1],
            ["\u03BF\u03BC\u03BF\u03C4", 26, 1],
            ["\u03BD\u03BF\u03BC\u03BF\u03C4", 30, 1],
            ["\u03B1\u03C0\u03BF\u03C4", 26, 1],
            ["\u03C5\u03C0\u03BF\u03C4", 26, 1],
            ["\u03B1\u03B2\u03B1\u03C3\u03C4", 26, 1],
            ["\u03B1\u03B9\u03BC\u03BF\u03C3\u03C4", 26, 1],
            ["\u03C0\u03C1\u03BF\u03C3\u03C4", 26, 1],
            ["\u03B1\u03BD\u03C5\u03C3\u03C4", 26, 1],
            ["\u03BD\u03B1\u03C5", -1, 1],
            ["\u03B1\u03C6", -1, 1],
            ["\u03BE\u03B5\u03C6", -1, 1],
            ["\u03B1\u03B4\u03B7\u03C6", -1, 1],
            ["\u03C0\u03B1\u03BC\u03C6", -1, 1],
            ["\u03C0\u03BF\u03BB\u03C5\u03C6", -1, 1]
          ];

          /** @const */
          var a_62 = [
            ["\u03B1\u03B3\u03B1", -1, 1],
            ["\u03B1\u03B3\u03B5", -1, 1],
            ["\u03B1\u03B3\u03B5\u03C3", -1, 1]
          ];

          /** @const */
          var a_63 = [
            ["\u03B7\u03C3\u03B1", -1, 1],
            ["\u03B7\u03C3\u03B5", -1, 1],
            ["\u03B7\u03C3\u03BF\u03C5", -1, 1]
          ];

          /** @const */
          var a_64 = [
            ["\u03BD", -1, 1],
            ["\u03B4\u03C9\u03B4\u03B5\u03BA\u03B1\u03BD", 0, 1],
            ["\u03B5\u03C0\u03C4\u03B1\u03BD", 0, 1],
            ["\u03BC\u03B5\u03B3\u03B1\u03BB\u03BF\u03BD", 0, 1],
            ["\u03B5\u03C1\u03B7\u03BC\u03BF\u03BD", 0, 1],
            ["\u03C7\u03B5\u03C1\u03C3\u03BF\u03BD", 0, 1]
          ];

          /** @const */
          var a_65 = [
            ["\u03B7\u03C3\u03C4\u03B5", -1, 1]
          ];

          /** @const */
          var a_66 = [
            ["\u03C3\u03B2", -1, 1],
            ["\u03B1\u03C3\u03B2", 0, 1],
            ["\u03B1\u03C0\u03BB", -1, 1],
            ["\u03B1\u03B5\u03B9\u03BC\u03BD", -1, 1],
            ["\u03C7\u03C1", -1, 1],
            ["\u03B1\u03C7\u03C1", 4, 1],
            ["\u03BA\u03BF\u03B9\u03BD\u03BF\u03C7\u03C1", 4, 1],
            ["\u03B4\u03C5\u03C3\u03C7\u03C1", 4, 1],
            ["\u03B5\u03C5\u03C7\u03C1", 4, 1],
            ["\u03C0\u03B1\u03BB\u03B9\u03BC\u03C8", -1, 1]
          ];

          /** @const */
          var a_67 = [
            ["\u03BF\u03C5\u03BD\u03B5", -1, 1],
            ["\u03B7\u03B8\u03BF\u03C5\u03BD\u03B5", 0, 1],
            ["\u03B7\u03C3\u03BF\u03C5\u03BD\u03B5", 0, 1]
          ];

          /** @const */
          var a_68 = [
            ["\u03C3\u03C0\u03B9", -1, 1],
            ["\u03BD", -1, 1],
            ["\u03B5\u03BE\u03C9\u03BD", 1, 1],
            ["\u03C1", -1, 1],
            ["\u03C3\u03C4\u03C1\u03B1\u03B2\u03BF\u03BC\u03BF\u03C5\u03C4\u03C3", -1, 1],
            ["\u03BA\u03B1\u03BA\u03BF\u03BC\u03BF\u03C5\u03C4\u03C3", -1, 1]
          ];

          /** @const */
          var a_69 = [
            ["\u03BF\u03C5\u03BC\u03B5", -1, 1],
            ["\u03B7\u03B8\u03BF\u03C5\u03BC\u03B5", 0, 1],
            ["\u03B7\u03C3\u03BF\u03C5\u03BC\u03B5", 0, 1]
          ];

          /** @const */
          var a_70 = [
            ["\u03B1\u03B6", -1, 1],
            ["\u03C9\u03C1\u03B9\u03BF\u03C0\u03BB", -1, 1],
            ["\u03B1\u03C3\u03BF\u03C5\u03C3", -1, 1],
            ["\u03C0\u03B1\u03C1\u03B1\u03C3\u03BF\u03C5\u03C3", 2, 1],
            ["\u03B1\u03BB\u03BB\u03BF\u03C3\u03BF\u03C5\u03C3", -1, 1],
            ["\u03C6", -1, 1],
            ["\u03C7", -1, 1]
          ];

          /** @const */
          var a_71 = [
            ["\u03BC\u03B1\u03C4\u03B1", -1, 1],
            ["\u03BC\u03B1\u03C4\u03C9\u03BD", -1, 1],
            ["\u03BC\u03B1\u03C4\u03BF\u03C3", -1, 1]
          ];

          /** @const */
          var a_72 = [
            ["\u03B1", -1, 1],
            ["\u03B9\u03BF\u03C5\u03BC\u03B1", 0, 1],
            ["\u03BF\u03BC\u03BF\u03C5\u03BD\u03B1", 0, 1],
            ["\u03B9\u03BF\u03BC\u03BF\u03C5\u03BD\u03B1", 2, 1],
            ["\u03BF\u03C3\u03BF\u03C5\u03BD\u03B1", 0, 1],
            ["\u03B9\u03BF\u03C3\u03BF\u03C5\u03BD\u03B1", 4, 1],
            ["\u03B5", -1, 1],
            ["\u03B1\u03B3\u03B1\u03C4\u03B5", 6, 1],
            ["\u03B7\u03BA\u03B1\u03C4\u03B5", 6, 1],
            ["\u03B7\u03B8\u03B7\u03BA\u03B1\u03C4\u03B5", 8, 1],
            ["\u03B7\u03C3\u03B1\u03C4\u03B5", 6, 1],
            ["\u03BF\u03C5\u03C3\u03B1\u03C4\u03B5", 6, 1],
            ["\u03B5\u03B9\u03C4\u03B5", 6, 1],
            ["\u03B7\u03B8\u03B5\u03B9\u03C4\u03B5", 12, 1],
            ["\u03B9\u03B5\u03BC\u03B1\u03C3\u03C4\u03B5", 6, 1],
            ["\u03BF\u03C5\u03BC\u03B1\u03C3\u03C4\u03B5", 6, 1],
            ["\u03B9\u03BF\u03C5\u03BC\u03B1\u03C3\u03C4\u03B5", 15, 1],
            ["\u03B9\u03B5\u03C3\u03B1\u03C3\u03C4\u03B5", 6, 1],
            ["\u03BF\u03C3\u03B1\u03C3\u03C4\u03B5", 6, 1],
            ["\u03B9\u03BF\u03C3\u03B1\u03C3\u03C4\u03B5", 18, 1],
            ["\u03B7", -1, 1],
            ["\u03B9", -1, 1],
            ["\u03B1\u03BC\u03B1\u03B9", 21, 1],
            ["\u03B9\u03B5\u03BC\u03B1\u03B9", 21, 1],
            ["\u03BF\u03BC\u03B1\u03B9", 21, 1],
            ["\u03BF\u03C5\u03BC\u03B1\u03B9", 21, 1],
            ["\u03B1\u03C3\u03B1\u03B9", 21, 1],
            ["\u03B5\u03C3\u03B1\u03B9", 21, 1],
            ["\u03B9\u03B5\u03C3\u03B1\u03B9", 27, 1],
            ["\u03B1\u03C4\u03B1\u03B9", 21, 1],
            ["\u03B5\u03C4\u03B1\u03B9", 21, 1],
            ["\u03B9\u03B5\u03C4\u03B1\u03B9", 30, 1],
            ["\u03BF\u03BD\u03C4\u03B1\u03B9", 21, 1],
            ["\u03BF\u03C5\u03BD\u03C4\u03B1\u03B9", 21, 1],
            ["\u03B9\u03BF\u03C5\u03BD\u03C4\u03B1\u03B9", 33, 1],
            ["\u03B5\u03B9", 21, 1],
            ["\u03B1\u03B5\u03B9", 35, 1],
            ["\u03B7\u03B8\u03B5\u03B9", 35, 1],
            ["\u03B7\u03C3\u03B5\u03B9", 35, 1],
            ["\u03BF\u03B9", 21, 1],
            ["\u03B1\u03BD", -1, 1],
            ["\u03B1\u03B3\u03B1\u03BD", 40, 1],
            ["\u03B7\u03BA\u03B1\u03BD", 40, 1],
            ["\u03B7\u03B8\u03B7\u03BA\u03B1\u03BD", 42, 1],
            ["\u03B7\u03C3\u03B1\u03BD", 40, 1],
            ["\u03BF\u03C5\u03C3\u03B1\u03BD", 40, 1],
            ["\u03BF\u03BD\u03C4\u03BF\u03C5\u03C3\u03B1\u03BD", 45, 1],
            ["\u03B9\u03BF\u03BD\u03C4\u03BF\u03C5\u03C3\u03B1\u03BD", 46, 1],
            ["\u03BF\u03BD\u03C4\u03B1\u03BD", 40, 1],
            ["\u03B9\u03BF\u03BD\u03C4\u03B1\u03BD", 48, 1],
            ["\u03BF\u03C5\u03BD\u03C4\u03B1\u03BD", 40, 1],
            ["\u03B9\u03BF\u03C5\u03BD\u03C4\u03B1\u03BD", 50, 1],
            ["\u03BF\u03C4\u03B1\u03BD", 40, 1],
            ["\u03B9\u03BF\u03C4\u03B1\u03BD", 52, 1],
            ["\u03BF\u03BC\u03B1\u03C3\u03C4\u03B1\u03BD", 40, 1],
            ["\u03B9\u03BF\u03BC\u03B1\u03C3\u03C4\u03B1\u03BD", 54, 1],
            ["\u03BF\u03C3\u03B1\u03C3\u03C4\u03B1\u03BD", 40, 1],
            ["\u03B9\u03BF\u03C3\u03B1\u03C3\u03C4\u03B1\u03BD", 56, 1],
            ["\u03BF\u03C5\u03BD", -1, 1],
            ["\u03B7\u03B8\u03BF\u03C5\u03BD", 58, 1],
            ["\u03BF\u03BC\u03BF\u03C5\u03BD", 58, 1],
            ["\u03B9\u03BF\u03BC\u03BF\u03C5\u03BD", 60, 1],
            ["\u03B7\u03C3\u03BF\u03C5\u03BD", 58, 1],
            ["\u03BF\u03C3\u03BF\u03C5\u03BD", 58, 1],
            ["\u03B9\u03BF\u03C3\u03BF\u03C5\u03BD", 63, 1],
            ["\u03C9\u03BD", -1, 1],
            ["\u03B7\u03B4\u03C9\u03BD", 65, 1],
            ["\u03BF", -1, 1],
            ["\u03B1\u03C3", -1, 1],
            ["\u03B5\u03C3", -1, 1],
            ["\u03B7\u03B4\u03B5\u03C3", 69, 1],
            ["\u03B7\u03C3\u03B5\u03C3", 69, 1],
            ["\u03B7\u03C3", -1, 1],
            ["\u03B5\u03B9\u03C3", -1, 1],
            ["\u03B7\u03B8\u03B5\u03B9\u03C3", 73, 1],
            ["\u03BF\u03C3", -1, 1],
            ["\u03C5\u03C3", -1, 1],
            ["\u03BF\u03C5\u03C3", 76, 1],
            ["\u03C5", -1, 1],
            ["\u03BF\u03C5", 78, 1],
            ["\u03C9", -1, 1],
            ["\u03B1\u03C9", 80, 1],
            ["\u03B7\u03B8\u03C9", 80, 1],
            ["\u03B7\u03C3\u03C9", 80, 1]
          ];

          /** @const */
          var a_73 = [
            ["\u03BF\u03C4\u03B5\u03C1", -1, 1],
            ["\u03B5\u03C3\u03C4\u03B5\u03C1", -1, 1],
            ["\u03C5\u03C4\u03B5\u03C1", -1, 1],
            ["\u03C9\u03C4\u03B5\u03C1", -1, 1],
            ["\u03BF\u03C4\u03B1\u03C4", -1, 1],
            ["\u03B5\u03C3\u03C4\u03B1\u03C4", -1, 1],
            ["\u03C5\u03C4\u03B1\u03C4", -1, 1],
            ["\u03C9\u03C4\u03B1\u03C4", -1, 1]
          ];

          /** @const */
          var /** Array<int> */ g_v = [81, 65, 16, 1];

          /** @const */
          var /** Array<int> */ g_v2 = [81, 65, 0, 1];

          var /** string */ S_s = '';
          var /** boolean */ B_test1 = false;


          /** @return {boolean} */
          function r_has_min_length() {
            // (, line 110
            if (!(base.current.length >= 3)) {
              return false;
            }
            return true;
          };

          /** @return {boolean} */
          function r_tolower() {
            var /** number */ among_var;
            // (, line 114
            // repeat, line 115
            replab0: while (true) {
              var /** number */ v_1 = base.limit - base.cursor;
              lab1: {
                // (, line 115
                // [, line 116
                base.ket = base.cursor;
                // substring, line 116
                among_var = base.find_among_b(a_0);
                if (among_var == 0) {
                  break lab1;
                }
                // ], line 116
                base.bra = base.cursor;
                switch (among_var) {
                  case 1:
                    // (, line 117
                    // <-, line 117
                    if (!base.slice_from("\u03B1")) {
                      return false;
                    }
                    break;
                  case 2:
                    // (, line 118
                    // <-, line 118
                    if (!base.slice_from("\u03B2")) {
                      return false;
                    }
                    break;
                  case 3:
                    // (, line 119
                    // <-, line 119
                    if (!base.slice_from("\u03B3")) {
                      return false;
                    }
                    break;
                  case 4:
                    // (, line 120
                    // <-, line 120
                    if (!base.slice_from("\u03B4")) {
                      return false;
                    }
                    break;
                  case 5:
                    // (, line 121
                    // <-, line 121
                    if (!base.slice_from("\u03B5")) {
                      return false;
                    }
                    break;
                  case 6:
                    // (, line 122
                    // <-, line 122
                    if (!base.slice_from("\u03B6")) {
                      return false;
                    }
                    break;
                  case 7:
                    // (, line 123
                    // <-, line 123
                    if (!base.slice_from("\u03B7")) {
                      return false;
                    }
                    break;
                  case 8:
                    // (, line 124
                    // <-, line 124
                    if (!base.slice_from("\u03B8")) {
                      return false;
                    }
                    break;
                  case 9:
                    // (, line 125
                    // <-, line 125
                    if (!base.slice_from("\u03B9")) {
                      return false;
                    }
                    break;
                  case 10:
                    // (, line 126
                    // <-, line 126
                    if (!base.slice_from("\u03BA")) {
                      return false;
                    }
                    break;
                  case 11:
                    // (, line 127
                    // <-, line 127
                    if (!base.slice_from("\u03BB")) {
                      return false;
                    }
                    break;
                  case 12:
                    // (, line 128
                    // <-, line 128
                    if (!base.slice_from("\u03BC")) {
                      return false;
                    }
                    break;
                  case 13:
                    // (, line 129
                    // <-, line 129
                    if (!base.slice_from("\u03BD")) {
                      return false;
                    }
                    break;
                  case 14:
                    // (, line 130
                    // <-, line 130
                    if (!base.slice_from("\u03BE")) {
                      return false;
                    }
                    break;
                  case 15:
                    // (, line 131
                    // <-, line 131
                    if (!base.slice_from("\u03BF")) {
                      return false;
                    }
                    break;
                  case 16:
                    // (, line 132
                    // <-, line 132
                    if (!base.slice_from("\u03C0")) {
                      return false;
                    }
                    break;
                  case 17:
                    // (, line 133
                    // <-, line 133
                    if (!base.slice_from("\u03C1")) {
                      return false;
                    }
                    break;
                  case 18:
                    // (, line 134
                    // <-, line 134
                    if (!base.slice_from("\u03C3")) {
                      return false;
                    }
                    break;
                  case 19:
                    // (, line 135
                    // <-, line 135
                    if (!base.slice_from("\u03C4")) {
                      return false;
                    }
                    break;
                  case 20:
                    // (, line 136
                    // <-, line 136
                    if (!base.slice_from("\u03C5")) {
                      return false;
                    }
                    break;
                  case 21:
                    // (, line 137
                    // <-, line 137
                    if (!base.slice_from("\u03C6")) {
                      return false;
                    }
                    break;
                  case 22:
                    // (, line 138
                    // <-, line 138
                    if (!base.slice_from("\u03C7")) {
                      return false;
                    }
                    break;
                  case 23:
                    // (, line 139
                    // <-, line 139
                    if (!base.slice_from("\u03C8")) {
                      return false;
                    }
                    break;
                  case 24:
                    // (, line 140
                    // <-, line 140
                    if (!base.slice_from("\u03C9")) {
                      return false;
                    }
                    break;
                  case 25:
                    // (, line 162
                    // next, line 162
                    if (base.cursor <= base.limit_backward) {
                      break lab1;
                    }
                    base.cursor--;
                    break;
                }
                continue replab0;
              }
              base.cursor = base.limit - v_1;
              break replab0;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step1() {
            var /** number */ among_var;
            // (, line 167
            // [, line 168
            base.ket = base.cursor;
            // substring, line 168
            among_var = base.find_among_b(a_1);
            if (among_var == 0) {
              return false;
            }
            // ], line 168
            base.bra = base.cursor;
            switch (among_var) {
              case 1:
                // (, line 169
                // <-, line 169
                if (!base.slice_from("\u03C6\u03B1")) {
                  return false;
                }
                break;
              case 2:
                // (, line 170
                // <-, line 170
                if (!base.slice_from("\u03C3\u03BA\u03B1")) {
                  return false;
                }
                break;
              case 3:
                // (, line 171
                // <-, line 171
                if (!base.slice_from("\u03BF\u03BB\u03BF")) {
                  return false;
                }
                break;
              case 4:
                // (, line 172
                // <-, line 172
                if (!base.slice_from("\u03C3\u03BF")) {
                  return false;
                }
                break;
              case 5:
                // (, line 173
                // <-, line 173
                if (!base.slice_from("\u03C4\u03B1\u03C4\u03BF")) {
                  return false;
                }
                break;
              case 6:
                // (, line 174
                // <-, line 174
                if (!base.slice_from("\u03BA\u03C1\u03B5")) {
                  return false;
                }
                break;
              case 7:
                // (, line 175
                // <-, line 175
                if (!base.slice_from("\u03C0\u03B5\u03C1")) {
                  return false;
                }
                break;
              case 8:
                // (, line 176
                // <-, line 176
                if (!base.slice_from("\u03C4\u03B5\u03C1")) {
                  return false;
                }
                break;
              case 9:
                // (, line 177
                // <-, line 177
                if (!base.slice_from("\u03C6\u03C9")) {
                  return false;
                }
                break;
              case 10:
                // (, line 178
                // <-, line 178
                if (!base.slice_from("\u03BA\u03B1\u03B8\u03B5\u03C3\u03C4")) {
                  return false;
                }
                break;
              case 11:
                // (, line 179
                // <-, line 179
                if (!base.slice_from("\u03B3\u03B5\u03B3\u03BF\u03BD")) {
                  return false;
                }
                break;
            }
            // unset test1, line 181
            B_test1 = false;
            return true;
          };

          /** @return {boolean} */
          function r_steps1() {
            // (, line 184
            // [, line 185
            base.ket = base.cursor;
            // substring, line 185
            if (base.find_among_b(a_4) == 0) {
              return false;
            }
            // ], line 185
            base.bra = base.cursor;
            // (, line 187
            // delete, line 188
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 189
            B_test1 = false;
            // or, line 193
            lab0: {
              var /** number */ v_1 = base.limit - base.cursor;
              lab1: {
                // (, line 190
                // [, line 190
                base.ket = base.cursor;
                // substring, line 190
                if (base.find_among_b(a_2) == 0) {
                  break lab1;
                }
                // ], line 190
                base.bra = base.cursor;
                // atlimit, line 190
                if (base.cursor > base.limit_backward) {
                  break lab1;
                }
                // (, line 192
                // -> s, line 192
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 192
                if (!base.slice_from("\u03B9")) {
                  return false;
                }
                // <+ s, line 192
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              // (, line 194
              // [, line 194
              base.ket = base.cursor;
              // substring, line 194
              if (base.find_among_b(a_3) == 0) {
                return false;
              }
              // ], line 194
              base.bra = base.cursor;
              // atlimit, line 194
              if (base.cursor > base.limit_backward) {
                return false;
              }
              // (, line 198
              // -> s, line 198
              S_s = base.slice_to();
              if (S_s == '') {
                return false;
              }
              // <-, line 198
              if (!base.slice_from("\u03B9\u03B6")) {
                return false;
              }
              // <+ s, line 198
              {
                var /** number */ c2 = base.cursor;
                base.insert(base.cursor, base.cursor, S_s);
                base.cursor = c2;
              }
            }
            return true;
          };

          /** @return {boolean} */
          function r_steps2() {
            // (, line 204
            // [, line 205
            base.ket = base.cursor;
            // substring, line 205
            if (base.find_among_b(a_6) == 0) {
              return false;
            }
            // ], line 205
            base.bra = base.cursor;
            // (, line 206
            // delete, line 207
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 208
            B_test1 = false;
            // [, line 209
            base.ket = base.cursor;
            // substring, line 209
            if (base.find_among_b(a_5) == 0) {
              return false;
            }
            // ], line 209
            base.bra = base.cursor;
            // atlimit, line 209
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 210
            // -> s, line 210
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 210
            if (!base.slice_from("\u03C9\u03BD")) {
              return false;
            }
            // <+ s, line 210
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_steps3() {
            // (, line 216
            // [, line 217
            base.ket = base.cursor;
            // substring, line 217
            if (base.find_among_b(a_9) == 0) {
              return false;
            }
            // ], line 217
            base.bra = base.cursor;
            // (, line 218
            // delete, line 219
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 220
            B_test1 = false;
            // or, line 221
            lab0: {
              var /** number */ v_1 = base.limit - base.cursor;
              lab1: {
                // (, line 221
                // literal, line 221
                if (!(base.eq_s_b("\u03B9\u03C3\u03B1"))) {
                  break lab1;
                }
                // atlimit, line 221
                if (base.cursor > base.limit_backward) {
                  break lab1;
                }
                // <-, line 221
                if (!base.slice_from("\u03B9\u03C3")) {
                  return false;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              lab2: {
                // (, line 222
                // [, line 222
                base.ket = base.cursor;
                // substring, line 222
                if (base.find_among_b(a_7) == 0) {
                  break lab2;
                }
                // ], line 222
                base.bra = base.cursor;
                // atlimit, line 222
                if (base.cursor > base.limit_backward) {
                  break lab2;
                }
                // (, line 226
                // -> s, line 226
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 226
                if (!base.slice_from("\u03B9")) {
                  return false;
                }
                // <+ s, line 226
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              // (, line 228
              // [, line 228
              base.ket = base.cursor;
              // substring, line 228
              if (base.find_among_b(a_8) == 0) {
                return false;
              }
              // ], line 228
              base.bra = base.cursor;
              // atlimit, line 228
              if (base.cursor > base.limit_backward) {
                return false;
              }
              // (, line 231
              // -> s, line 231
              S_s = base.slice_to();
              if (S_s == '') {
                return false;
              }
              // <-, line 231
              if (!base.slice_from("\u03B9\u03C3")) {
                return false;
              }
              // <+ s, line 231
              {
                var /** number */ c2 = base.cursor;
                base.insert(base.cursor, base.cursor, S_s);
                base.cursor = c2;
              }
            }
            return true;
          };

          /** @return {boolean} */
          function r_steps4() {
            // (, line 237
            // [, line 238
            base.ket = base.cursor;
            // substring, line 238
            if (base.find_among_b(a_11) == 0) {
              return false;
            }
            // ], line 238
            base.bra = base.cursor;
            // (, line 239
            // delete, line 240
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 241
            B_test1 = false;
            // [, line 242
            base.ket = base.cursor;
            // substring, line 242
            if (base.find_among_b(a_10) == 0) {
              return false;
            }
            // ], line 242
            base.bra = base.cursor;
            // atlimit, line 242
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 246
            // -> s, line 246
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 246
            if (!base.slice_from("\u03B9")) {
              return false;
            }
            // <+ s, line 246
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_steps5() {
            // (, line 252
            // [, line 253
            base.ket = base.cursor;
            // substring, line 253
            if (base.find_among_b(a_14) == 0) {
              return false;
            }
            // ], line 253
            base.bra = base.cursor;
            // (, line 255
            // delete, line 256
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 257
            B_test1 = false;
            // or, line 261
            lab0: {
              var /** number */ v_1 = base.limit - base.cursor;
              lab1: {
                // (, line 258
                // [, line 258
                base.ket = base.cursor;
                // substring, line 258
                if (base.find_among_b(a_12) == 0) {
                  break lab1;
                }
                // ], line 258
                base.bra = base.cursor;
                // atlimit, line 258
                if (base.cursor > base.limit_backward) {
                  break lab1;
                }
                // (, line 260
                // -> s, line 260
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 260
                if (!base.slice_from("\u03B9")) {
                  return false;
                }
                // <+ s, line 260
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              // (, line 262
              // [, line 262
              base.ket = base.cursor;
              // substring, line 262
              if (base.find_among_b(a_13) == 0) {
                return false;
              }
              // ], line 262
              base.bra = base.cursor;
              // atlimit, line 262
              if (base.cursor > base.limit_backward) {
                return false;
              }
              // (, line 266
              // -> s, line 266
              S_s = base.slice_to();
              if (S_s == '') {
                return false;
              }
              // <-, line 266
              if (!base.slice_from("\u03B9\u03C3\u03C4")) {
                return false;
              }
              // <+ s, line 266
              {
                var /** number */ c2 = base.cursor;
                base.insert(base.cursor, base.cursor, S_s);
                base.cursor = c2;
              }
            }
            return true;
          };

          /** @return {boolean} */
          function r_steps6() {
            var /** number */ among_var;
            // (, line 272
            // [, line 273
            base.ket = base.cursor;
            // substring, line 273
            if (base.find_among_b(a_18) == 0) {
              return false;
            }
            // ], line 273
            base.bra = base.cursor;
            // (, line 274
            // delete, line 275
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 276
            B_test1 = false;
            // or, line 280
            lab0: {
              var /** number */ v_1 = base.limit - base.cursor;
              lab1: {
                // (, line 277
                // [, line 277
                base.ket = base.cursor;
                // substring, line 277
                if (base.find_among_b(a_15) == 0) {
                  break lab1;
                }
                // ], line 277
                base.bra = base.cursor;
                // atlimit, line 277
                if (base.cursor > base.limit_backward) {
                  break lab1;
                }
                // (, line 279
                // -> s, line 279
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 279
                if (!base.slice_from("\u03B9\u03C3\u03BC")) {
                  return false;
                }
                // <+ s, line 279
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              lab2: {
                // (, line 281
                // [, line 281
                base.ket = base.cursor;
                // substring, line 281
                if (base.find_among_b(a_16) == 0) {
                  break lab2;
                }
                // ], line 281
                base.bra = base.cursor;
                // atlimit, line 281
                if (base.cursor > base.limit_backward) {
                  break lab2;
                }
                // (, line 283
                // -> s, line 283
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 283
                if (!base.slice_from("\u03B9")) {
                  return false;
                }
                // <+ s, line 283
                {
                  var /** number */ c2 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c2;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              // (, line 285
              // [, line 285
              base.ket = base.cursor;
              // substring, line 285
              among_var = base.find_among_b(a_17);
              if (among_var == 0) {
                return false;
              }
              // ], line 285
              base.bra = base.cursor;
              switch (among_var) {
                case 1:
                  // (, line 286
                  // <-, line 286
                  if (!base.slice_from("\u03B1\u03B3\u03BD\u03C9\u03C3\u03C4")) {
                    return false;
                  }
                  break;
                case 2:
                  // (, line 287
                  // <-, line 287
                  if (!base.slice_from("\u03B1\u03C4\u03BF\u03BC")) {
                    return false;
                  }
                  break;
                case 3:
                  // (, line 288
                  // <-, line 288
                  if (!base.slice_from("\u03B3\u03BD\u03C9\u03C3\u03C4")) {
                    return false;
                  }
                  break;
                case 4:
                  // (, line 289
                  // <-, line 289
                  if (!base.slice_from("\u03B5\u03B8\u03BD")) {
                    return false;
                  }
                  break;
                case 5:
                  // (, line 290
                  // <-, line 290
                  if (!base.slice_from("\u03B5\u03BA\u03BB\u03B5\u03BA\u03C4")) {
                    return false;
                  }
                  break;
                case 6:
                  // (, line 291
                  // <-, line 291
                  if (!base.slice_from("\u03C3\u03BA\u03B5\u03C0\u03C4")) {
                    return false;
                  }
                  break;
                case 7:
                  // (, line 292
                  // <-, line 292
                  if (!base.slice_from("\u03C4\u03BF\u03C0")) {
                    return false;
                  }
                  break;
                case 8:
                  // (, line 293
                  // <-, line 293
                  if (!base.slice_from("\u03B1\u03BB\u03B5\u03BE\u03B1\u03BD\u03B4\u03C1")) {
                    return false;
                  }
                  break;
                case 9:
                  // (, line 294
                  // <-, line 294
                  if (!base.slice_from("\u03B2\u03C5\u03B6\u03B1\u03BD\u03C4")) {
                    return false;
                  }
                  break;
                case 10:
                  // (, line 295
                  // <-, line 295
                  if (!base.slice_from("\u03B8\u03B5\u03B1\u03C4\u03C1")) {
                    return false;
                  }
                  break;
              }
            }
            return true;
          };

          /** @return {boolean} */
          function r_steps7() {
            // (, line 301
            // [, line 302
            base.ket = base.cursor;
            // substring, line 302
            if (base.find_among_b(a_20) == 0) {
              return false;
            }
            // ], line 302
            base.bra = base.cursor;
            // (, line 303
            // delete, line 304
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 305
            B_test1 = false;
            // [, line 306
            base.ket = base.cursor;
            // substring, line 306
            if (base.find_among_b(a_19) == 0) {
              return false;
            }
            // ], line 306
            base.bra = base.cursor;
            // atlimit, line 306
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 308
            // -> s, line 308
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 308
            if (!base.slice_from("\u03B1\u03C1\u03B1\u03BA")) {
              return false;
            }
            // <+ s, line 308
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_steps8() {
            // (, line 314
            // [, line 315
            base.ket = base.cursor;
            // substring, line 315
            if (base.find_among_b(a_23) == 0) {
              return false;
            }
            // ], line 315
            base.bra = base.cursor;
            // (, line 316
            // delete, line 317
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 318
            B_test1 = false;
            // or, line 325
            lab0: {
              var /** number */ v_1 = base.limit - base.cursor;
              lab1: {
                // (, line 319
                // [, line 319
                base.ket = base.cursor;
                // substring, line 319
                if (base.find_among_b(a_21) == 0) {
                  break lab1;
                }
                // ], line 319
                base.bra = base.cursor;
                // atlimit, line 319
                if (base.cursor > base.limit_backward) {
                  break lab1;
                }
                // (, line 324
                // -> s, line 324
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 324
                if (!base.slice_from("\u03B1\u03BA")) {
                  return false;
                }
                // <+ s, line 324
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              lab2: {
                // (, line 326
                // [, line 326
                base.ket = base.cursor;
                // substring, line 326
                if (base.find_among_b(a_22) == 0) {
                  break lab2;
                }
                // ], line 326
                base.bra = base.cursor;
                // atlimit, line 326
                if (base.cursor > base.limit_backward) {
                  break lab2;
                }
                // (, line 329
                // -> s, line 329
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 329
                if (!base.slice_from("\u03B9\u03C4\u03C3")) {
                  return false;
                }
                // <+ s, line 329
                {
                  var /** number */ c2 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c2;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              // (, line 331
              // [, line 331
              base.ket = base.cursor;
              // literal, line 331
              if (!(base.eq_s_b("\u03BA\u03BF\u03C1"))) {
                return false;
              }
              // ], line 331
              base.bra = base.cursor;
              // -> s, line 331
              S_s = base.slice_to();
              if (S_s == '') {
                return false;
              }
              // <-, line 331
              if (!base.slice_from("\u03B9\u03C4\u03C3")) {
                return false;
              }
              // <+ s, line 331
              {
                var /** number */ c3 = base.cursor;
                base.insert(base.cursor, base.cursor, S_s);
                base.cursor = c3;
              }
            }
            return true;
          };

          /** @return {boolean} */
          function r_steps9() {
            // (, line 336
            // [, line 337
            base.ket = base.cursor;
            // substring, line 337
            if (base.find_among_b(a_26) == 0) {
              return false;
            }
            // ], line 337
            base.bra = base.cursor;
            // (, line 338
            // delete, line 339
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 340
            B_test1 = false;
            // or, line 343
            lab0: {
              var /** number */ v_1 = base.limit - base.cursor;
              lab1: {
                // (, line 341
                // [, line 341
                base.ket = base.cursor;
                // substring, line 341
                if (base.find_among_b(a_24) == 0) {
                  break lab1;
                }
                // ], line 341
                base.bra = base.cursor;
                // atlimit, line 341
                if (base.cursor > base.limit_backward) {
                  break lab1;
                }
                // (, line 342
                // -> s, line 342
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 342
                if (!base.slice_from("\u03B9\u03B4")) {
                  return false;
                }
                // <+ s, line 342
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              // (, line 344
              // [, line 344
              base.ket = base.cursor;
              // substring, line 344
              if (base.find_among_b(a_25) == 0) {
                return false;
              }
              // ], line 344
              base.bra = base.cursor;
              // (, line 345
              // -> s, line 345
              S_s = base.slice_to();
              if (S_s == '') {
                return false;
              }
              // <-, line 345
              if (!base.slice_from("\u03B9\u03B4")) {
                return false;
              }
              // <+ s, line 345
              {
                var /** number */ c2 = base.cursor;
                base.insert(base.cursor, base.cursor, S_s);
                base.cursor = c2;
              }
            }
            return true;
          };

          /** @return {boolean} */
          function r_steps10() {
            // (, line 351
            // [, line 352
            base.ket = base.cursor;
            // substring, line 352
            if (base.find_among_b(a_28) == 0) {
              return false;
            }
            // ], line 352
            base.bra = base.cursor;
            // (, line 353
            // delete, line 354
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 355
            B_test1 = false;
            // [, line 356
            base.ket = base.cursor;
            // substring, line 356
            if (base.find_among_b(a_27) == 0) {
              return false;
            }
            // ], line 356
            base.bra = base.cursor;
            // atlimit, line 356
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 358
            // -> s, line 358
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 358
            if (!base.slice_from("\u03B9\u03C3\u03BA")) {
              return false;
            }
            // <+ s, line 358
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step2a() {
            // (, line 364
            // [, line 365
            base.ket = base.cursor;
            // substring, line 365
            if (base.find_among_b(a_29) == 0) {
              return false;
            }
            // ], line 365
            base.bra = base.cursor;
            // (, line 366
            // delete, line 366
            if (!base.slice_del()) {
              return false;
            }
            // not, line 368
            {
              var /** number */ v_1 = base.limit - base.cursor;
              lab0: {
                // (, line 368
                // [, line 368
                base.ket = base.cursor;
                // substring, line 368
                if (base.find_among_b(a_30) == 0) {
                  break lab0;
                }
                // ], line 368
                base.bra = base.cursor;
                return false;
              }
              base.cursor = base.limit - v_1;
            }
            // <+, line 371
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, "\u03B1\u03B4");
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step2b() {
            // (, line 374
            // [, line 375
            base.ket = base.cursor;
            // substring, line 375
            if (base.find_among_b(a_31) == 0) {
              return false;
            }
            // ], line 375
            base.bra = base.cursor;
            // (, line 376
            // delete, line 376
            if (!base.slice_del()) {
              return false;
            }
            // [, line 378
            base.ket = base.cursor;
            // substring, line 378
            if (base.find_among_b(a_32) == 0) {
              return false;
            }
            // ], line 378
            base.bra = base.cursor;
            // (, line 379
            // -> s, line 379
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 379
            if (!base.slice_from("\u03B5\u03B4")) {
              return false;
            }
            // <+ s, line 379
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step2c() {
            // (, line 383
            // [, line 384
            base.ket = base.cursor;
            // substring, line 384
            if (base.find_among_b(a_33) == 0) {
              return false;
            }
            // ], line 384
            base.bra = base.cursor;
            // (, line 385
            // delete, line 385
            if (!base.slice_del()) {
              return false;
            }
            // [, line 387
            base.ket = base.cursor;
            // substring, line 387
            if (base.find_among_b(a_34) == 0) {
              return false;
            }
            // ], line 387
            base.bra = base.cursor;
            // (, line 389
            // -> s, line 389
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 389
            if (!base.slice_from("\u03BF\u03C5\u03B4")) {
              return false;
            }
            // <+ s, line 389
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step2d() {
            // (, line 393
            // [, line 394
            base.ket = base.cursor;
            // substring, line 394
            if (base.find_among_b(a_35) == 0) {
              return false;
            }
            // ], line 394
            base.bra = base.cursor;
            // (, line 395
            // delete, line 395
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 395
            B_test1 = false;
            // [, line 397
            base.ket = base.cursor;
            // substring, line 397
            if (base.find_among_b(a_36) == 0) {
              return false;
            }
            // ], line 397
            base.bra = base.cursor;
            // atlimit, line 397
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 398
            // -> s, line 398
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 398
            if (!base.slice_from("\u03B5")) {
              return false;
            }
            // <+ s, line 398
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step3() {
            // (, line 402
            // [, line 403
            base.ket = base.cursor;
            // substring, line 403
            if (base.find_among_b(a_37) == 0) {
              return false;
            }
            // ], line 403
            base.bra = base.cursor;
            // (, line 404
            // delete, line 404
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 404
            B_test1 = false;
            // (, line 406
            // [, line 406
            base.ket = base.cursor;
            if (!(base.in_grouping_b(g_v, 945, 969))) {
              return false;
            }
            // ], line 406
            base.bra = base.cursor;
            // -> s, line 406
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 406
            if (!base.slice_from("\u03B9")) {
              return false;
            }
            // <+ s, line 406
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step4() {
            // (, line 409
            // [, line 410
            base.ket = base.cursor;
            // substring, line 410
            if (base.find_among_b(a_38) == 0) {
              return false;
            }
            // ], line 410
            base.bra = base.cursor;
            // (, line 411
            // delete, line 411
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 411
            B_test1 = false;
            // or, line 413
            lab0: {
              var /** number */ v_1 = base.limit - base.cursor;
              lab1: {
                // (, line 413
                // [, line 413
                base.ket = base.cursor;
                if (!(base.in_grouping_b(g_v, 945, 969))) {
                  break lab1;
                }
                // ], line 413
                base.bra = base.cursor;
                // -> s, line 413
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 413
                if (!base.slice_from("\u03B9\u03BA")) {
                  return false;
                }
                // <+ s, line 413
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              // [, line 414
              base.ket = base.cursor;
            }
            // substring, line 414
            if (base.find_among_b(a_39) == 0) {
              return false;
            }
            // ], line 414
            base.bra = base.cursor;
            // atlimit, line 414
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 419
            // -> s, line 419
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 419
            if (!base.slice_from("\u03B9\u03BA")) {
              return false;
            }
            // <+ s, line 419
            {
              var /** number */ c2 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c2;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5a() {
            // (, line 423
            // do, line 424
            var /** number */ v_1 = base.limit - base.cursor;
            lab0: {
              // (, line 424
              // literal, line 424
              if (!(base.eq_s_b("\u03B1\u03B3\u03B1\u03BC\u03B5"))) {
                break lab0;
              }
              // atlimit, line 424
              if (base.cursor > base.limit_backward) {
                break lab0;
              }
              // <-, line 424
              if (!base.slice_from("\u03B1\u03B3\u03B1\u03BC")) {
                return false;
              }
            }
            base.cursor = base.limit - v_1;
            // do, line 425
            var /** number */ v_2 = base.limit - base.cursor;
            lab1: {
              // (, line 425
              // [, line 426
              base.ket = base.cursor;
              // substring, line 426
              if (base.find_among_b(a_40) == 0) {
                break lab1;
              }
              // ], line 426
              base.bra = base.cursor;
              // (, line 427
              // delete, line 427
              if (!base.slice_del()) {
                return false;
              }
              // unset test1, line 427
              B_test1 = false;
            }
            base.cursor = base.limit - v_2;
            // [, line 430
            base.ket = base.cursor;
            // literal, line 430
            if (!(base.eq_s_b("\u03B1\u03BC\u03B5"))) {
              return false;
            }
            // ], line 430
            base.bra = base.cursor;
            // delete, line 431
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 432
            B_test1 = false;
            // [, line 433
            base.ket = base.cursor;
            // substring, line 433
            if (base.find_among_b(a_41) == 0) {
              return false;
            }
            // ], line 433
            base.bra = base.cursor;
            // atlimit, line 433
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 435
            // -> s, line 435
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 435
            if (!base.slice_from("\u03B1\u03BC")) {
              return false;
            }
            // <+ s, line 435
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5b() {
            // (, line 439
            // do, line 440
            var /** number */ v_1 = base.limit - base.cursor;
            lab0: {
              // (, line 440
              // [, line 441
              base.ket = base.cursor;
              // substring, line 441
              if (base.find_among_b(a_43) == 0) {
                break lab0;
              }
              // ], line 441
              base.bra = base.cursor;
              // (, line 443
              // delete, line 444
              if (!base.slice_del()) {
                return false;
              }
              // unset test1, line 445
              B_test1 = false;
              // [, line 446
              base.ket = base.cursor;
              // substring, line 446
              if (base.find_among_b(a_42) == 0) {
                break lab0;
              }
              // ], line 446
              base.bra = base.cursor;
              // atlimit, line 446
              if (base.cursor > base.limit_backward) {
                break lab0;
              }
              // (, line 447
              // -> s, line 447
              S_s = base.slice_to();
              if (S_s == '') {
                return false;
              }
              // <-, line 447
              if (!base.slice_from("\u03B1\u03B3\u03B1\u03BD")) {
                return false;
              }
              // <+ s, line 447
              {
                var /** number */ c1 = base.cursor;
                base.insert(base.cursor, base.cursor, S_s);
                base.cursor = c1;
              }
            }
            base.cursor = base.limit - v_1;
            // [, line 452
            base.ket = base.cursor;
            // literal, line 452
            if (!(base.eq_s_b("\u03B1\u03BD\u03B5"))) {
              return false;
            }
            // ], line 452
            base.bra = base.cursor;
            // delete, line 453
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 454
            B_test1 = false;
            // or, line 455
            lab1: {
              var /** number */ v_2 = base.limit - base.cursor;
              lab2: {
                // (, line 455
                // [, line 455
                base.ket = base.cursor;
                if (!(base.in_grouping_b(g_v2, 945, 969))) {
                  break lab2;
                }
                // ], line 455
                base.bra = base.cursor;
                // -> s, line 455
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 455
                if (!base.slice_from("\u03B1\u03BD")) {
                  return false;
                }
                // <+ s, line 455
                {
                  var /** number */ c2 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c2;
                }
                break lab1;
              }
              base.cursor = base.limit - v_2;
              // [, line 456
              base.ket = base.cursor;
            }
            // substring, line 456
            if (base.find_among_b(a_44) == 0) {
              return false;
            }
            // ], line 456
            base.bra = base.cursor;
            // atlimit, line 456
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 473
            // -> s, line 473
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 473
            if (!base.slice_from("\u03B1\u03BD")) {
              return false;
            }
            // <+ s, line 473
            {
              var /** number */ c3 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c3;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5c() {
            // (, line 477
            // do, line 478
            var /** number */ v_1 = base.limit - base.cursor;
            lab0: {
              // (, line 478
              // [, line 479
              base.ket = base.cursor;
              // substring, line 479
              if (base.find_among_b(a_45) == 0) {
                break lab0;
              }
              // ], line 479
              base.bra = base.cursor;
              // (, line 480
              // delete, line 480
              if (!base.slice_del()) {
                return false;
              }
              // unset test1, line 480
              B_test1 = false;
            }
            base.cursor = base.limit - v_1;
            // [, line 483
            base.ket = base.cursor;
            // literal, line 483
            if (!(base.eq_s_b("\u03B5\u03C4\u03B5"))) {
              return false;
            }
            // ], line 483
            base.bra = base.cursor;
            // delete, line 484
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 485
            B_test1 = false;
            // or, line 486
            lab1: {
              var /** number */ v_2 = base.limit - base.cursor;
              lab2: {
                // (, line 486
                // [, line 486
                base.ket = base.cursor;
                if (!(base.in_grouping_b(g_v2, 945, 969))) {
                  break lab2;
                }
                // ], line 486
                base.bra = base.cursor;
                // -> s, line 486
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 486
                if (!base.slice_from("\u03B5\u03C4")) {
                  return false;
                }
                // <+ s, line 486
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab1;
              }
              base.cursor = base.limit - v_2;
              lab3: {
                // (, line 487
                // [, line 487
                base.ket = base.cursor;
                // substring, line 487
                if (base.find_among_b(a_46) == 0) {
                  break lab3;
                }
                // ], line 487
                base.bra = base.cursor;
                // (, line 491
                // -> s, line 491
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 491
                if (!base.slice_from("\u03B5\u03C4")) {
                  return false;
                }
                // <+ s, line 491
                {
                  var /** number */ c2 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c2;
                }
                break lab1;
              }
              base.cursor = base.limit - v_2;
              // [, line 493
              base.ket = base.cursor;
            }
            // substring, line 493
            if (base.find_among_b(a_47) == 0) {
              return false;
            }
            // ], line 493
            base.bra = base.cursor;
            // atlimit, line 493
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 497
            // -> s, line 497
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 497
            if (!base.slice_from("\u03B5\u03C4")) {
              return false;
            }
            // <+ s, line 497
            {
              var /** number */ c3 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c3;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5d() {
            // (, line 501
            // [, line 502
            base.ket = base.cursor;
            // substring, line 502
            if (base.find_among_b(a_48) == 0) {
              return false;
            }
            // ], line 502
            base.bra = base.cursor;
            // (, line 503
            // delete, line 504
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 505
            B_test1 = false;
            // or, line 506
            lab0: {
              var /** number */ v_1 = base.limit - base.cursor;
              lab1: {
                // (, line 506
                // [, line 506
                base.ket = base.cursor;
                // literal, line 506
                if (!(base.eq_s_b("\u03B1\u03C1\u03C7"))) {
                  break lab1;
                }
                // ], line 506
                base.bra = base.cursor;
                // atlimit, line 506
                if (base.cursor > base.limit_backward) {
                  break lab1;
                }
                // -> s, line 506
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 506
                if (!base.slice_from("\u03BF\u03BD\u03C4")) {
                  return false;
                }
                // <+ s, line 506
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              // (, line 507
              // [, line 507
              base.ket = base.cursor;
              // literal, line 507
              if (!(base.eq_s_b("\u03BA\u03C1\u03B5"))) {
                return false;
              }
              // ], line 507
              base.bra = base.cursor;
              // -> s, line 507
              S_s = base.slice_to();
              if (S_s == '') {
                return false;
              }
              // <-, line 507
              if (!base.slice_from("\u03C9\u03BD\u03C4")) {
                return false;
              }
              // <+ s, line 507
              {
                var /** number */ c2 = base.cursor;
                base.insert(base.cursor, base.cursor, S_s);
                base.cursor = c2;
              }
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5e() {
            // (, line 512
            // [, line 513
            base.ket = base.cursor;
            // substring, line 513
            if (base.find_among_b(a_49) == 0) {
              return false;
            }
            // ], line 513
            base.bra = base.cursor;
            // (, line 514
            // delete, line 515
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 516
            B_test1 = false;
            // (, line 517
            // [, line 517
            base.ket = base.cursor;
            // literal, line 517
            if (!(base.eq_s_b("\u03BF\u03BD"))) {
              return false;
            }
            // ], line 517
            base.bra = base.cursor;
            // atlimit, line 517
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // -> s, line 517
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 517
            if (!base.slice_from("\u03BF\u03BC\u03B1\u03C3\u03C4")) {
              return false;
            }
            // <+ s, line 517
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5f() {
            // (, line 522
            // do, line 523
            var /** number */ v_1 = base.limit - base.cursor;
            lab0: {
              // (, line 523
              // [, line 524
              base.ket = base.cursor;
              // literal, line 524
              if (!(base.eq_s_b("\u03B9\u03B5\u03C3\u03C4\u03B5"))) {
                break lab0;
              }
              // ], line 524
              base.bra = base.cursor;
              // delete, line 525
              if (!base.slice_del()) {
                return false;
              }
              // unset test1, line 526
              B_test1 = false;
              // [, line 527
              base.ket = base.cursor;
              // substring, line 527
              if (base.find_among_b(a_50) == 0) {
                break lab0;
              }
              // ], line 527
              base.bra = base.cursor;
              // atlimit, line 527
              if (base.cursor > base.limit_backward) {
                break lab0;
              }
              // (, line 528
              // -> s, line 528
              S_s = base.slice_to();
              if (S_s == '') {
                return false;
              }
              // <-, line 528
              if (!base.slice_from("\u03B9\u03B5\u03C3\u03C4")) {
                return false;
              }
              // <+ s, line 528
              {
                var /** number */ c1 = base.cursor;
                base.insert(base.cursor, base.cursor, S_s);
                base.cursor = c1;
              }
            }
            base.cursor = base.limit - v_1;
            // [, line 531
            base.ket = base.cursor;
            // literal, line 531
            if (!(base.eq_s_b("\u03B5\u03C3\u03C4\u03B5"))) {
              return false;
            }
            // ], line 531
            base.bra = base.cursor;
            // delete, line 532
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 533
            B_test1 = false;
            // [, line 534
            base.ket = base.cursor;
            // substring, line 534
            if (base.find_among_b(a_51) == 0) {
              return false;
            }
            // ], line 534
            base.bra = base.cursor;
            // atlimit, line 534
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 536
            // -> s, line 536
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 536
            if (!base.slice_from("\u03B9\u03B5\u03C3\u03C4")) {
              return false;
            }
            // <+ s, line 536
            {
              var /** number */ c2 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c2;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5g() {
            // (, line 540
            // do, line 541
            var /** number */ v_1 = base.limit - base.cursor;
            lab0: {
              // (, line 541
              // [, line 542
              base.ket = base.cursor;
              // substring, line 542
              if (base.find_among_b(a_52) == 0) {
                break lab0;
              }
              // ], line 542
              base.bra = base.cursor;
              // (, line 543
              // delete, line 543
              if (!base.slice_del()) {
                return false;
              }
              // unset test1, line 543
              B_test1 = false;
            }
            base.cursor = base.limit - v_1;
            // [, line 546
            base.ket = base.cursor;
            // substring, line 546
            if (base.find_among_b(a_55) == 0) {
              return false;
            }
            // ], line 546
            base.bra = base.cursor;
            // (, line 547
            // delete, line 548
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 549
            B_test1 = false;
            // or, line 552
            lab1: {
              var /** number */ v_2 = base.limit - base.cursor;
              lab2: {
                // (, line 550
                // [, line 550
                base.ket = base.cursor;
                // substring, line 550
                if (base.find_among_b(a_53) == 0) {
                  break lab2;
                }
                // ], line 550
                base.bra = base.cursor;
                // (, line 551
                // -> s, line 551
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 551
                if (!base.slice_from("\u03B7\u03BA")) {
                  return false;
                }
                // <+ s, line 551
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab1;
              }
              base.cursor = base.limit - v_2;
              // (, line 553
              // [, line 553
              base.ket = base.cursor;
              // substring, line 553
              if (base.find_among_b(a_54) == 0) {
                return false;
              }
              // ], line 553
              base.bra = base.cursor;
              // atlimit, line 553
              if (base.cursor > base.limit_backward) {
                return false;
              }
              // (, line 554
              // -> s, line 554
              S_s = base.slice_to();
              if (S_s == '') {
                return false;
              }
              // <-, line 554
              if (!base.slice_from("\u03B7\u03BA")) {
                return false;
              }
              // <+ s, line 554
              {
                var /** number */ c2 = base.cursor;
                base.insert(base.cursor, base.cursor, S_s);
                base.cursor = c2;
              }
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5h() {
            // (, line 560
            // [, line 561
            base.ket = base.cursor;
            // substring, line 561
            if (base.find_among_b(a_58) == 0) {
              return false;
            }
            // ], line 561
            base.bra = base.cursor;
            // (, line 562
            // delete, line 563
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 564
            B_test1 = false;
            // or, line 569
            lab0: {
              var /** number */ v_1 = base.limit - base.cursor;
              lab1: {
                // (, line 565
                // [, line 565
                base.ket = base.cursor;
                // substring, line 565
                if (base.find_among_b(a_56) == 0) {
                  break lab1;
                }
                // ], line 565
                base.bra = base.cursor;
                // (, line 567
                // -> s, line 567
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 567
                if (!base.slice_from("\u03BF\u03C5\u03C3")) {
                  return false;
                }
                // <+ s, line 567
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              // (, line 570
              // [, line 570
              base.ket = base.cursor;
              // substring, line 570
              if (base.find_among_b(a_57) == 0) {
                return false;
              }
              // ], line 570
              base.bra = base.cursor;
              // atlimit, line 570
              if (base.cursor > base.limit_backward) {
                return false;
              }
              // (, line 574
              // -> s, line 574
              S_s = base.slice_to();
              if (S_s == '') {
                return false;
              }
              // <-, line 574
              if (!base.slice_from("\u03BF\u03C5\u03C3")) {
                return false;
              }
              // <+ s, line 574
              {
                var /** number */ c2 = base.cursor;
                base.insert(base.cursor, base.cursor, S_s);
                base.cursor = c2;
              }
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5i() {
            // (, line 580
            // [, line 581
            base.ket = base.cursor;
            // substring, line 581
            if (base.find_among_b(a_62) == 0) {
              return false;
            }
            // ], line 581
            base.bra = base.cursor;
            // (, line 582
            // delete, line 583
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 584
            B_test1 = false;
            // or, line 585
            lab0: {
              var /** number */ v_1 = base.limit - base.cursor;
              lab1: {
                // (, line 585
                // [, line 585
                base.ket = base.cursor;
                // literal, line 585
                if (!(base.eq_s_b("\u03BA\u03BF\u03BB\u03BB"))) {
                  break lab1;
                }
                // ], line 585
                base.bra = base.cursor;
                // -> s, line 585
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 585
                if (!base.slice_from("\u03B1\u03B3")) {
                  return false;
                }
                // <+ s, line 585
                {
                  var /** number */ c1 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c1;
                }
                break lab0;
              }
              base.cursor = base.limit - v_1;
              // (, line 585
              // not, line 586
              {
                var /** number */ v_2 = base.limit - base.cursor;
                lab2: {
                  // (, line 586
                  // [, line 586
                  base.ket = base.cursor;
                  // substring, line 586
                  if (base.find_among_b(a_59) == 0) {
                    break lab2;
                  }
                  // ], line 586
                  base.bra = base.cursor;
                  return false;
                }
                base.cursor = base.limit - v_2;
              }
              // or, line 590
              lab3: {
                var /** number */ v_3 = base.limit - base.cursor;
                lab4: {
                  // (, line 587
                  // [, line 587
                  base.ket = base.cursor;
                  // substring, line 587
                  if (base.find_among_b(a_60) == 0) {
                    break lab4;
                  }
                  // ], line 587
                  base.bra = base.cursor;
                  // (, line 589
                  // -> s, line 589
                  S_s = base.slice_to();
                  if (S_s == '') {
                    return false;
                  }
                  // <-, line 589
                  if (!base.slice_from("\u03B1\u03B3")) {
                    return false;
                  }
                  // <+ s, line 589
                  {
                    var /** number */ c2 = base.cursor;
                    base.insert(base.cursor, base.cursor, S_s);
                    base.cursor = c2;
                  }
                  break lab3;
                }
                base.cursor = base.limit - v_3;
                // (, line 591
                // [, line 591
                base.ket = base.cursor;
                // substring, line 591
                if (base.find_among_b(a_61) == 0) {
                  return false;
                }
                // ], line 591
                base.bra = base.cursor;
                // atlimit, line 591
                if (base.cursor > base.limit_backward) {
                  return false;
                }
                // (, line 597
                // -> s, line 597
                S_s = base.slice_to();
                if (S_s == '') {
                  return false;
                }
                // <-, line 597
                if (!base.slice_from("\u03B1\u03B3")) {
                  return false;
                }
                // <+ s, line 597
                {
                  var /** number */ c3 = base.cursor;
                  base.insert(base.cursor, base.cursor, S_s);
                  base.cursor = c3;
                }
              }
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5j() {
            // (, line 604
            // [, line 605
            base.ket = base.cursor;
            // substring, line 605
            if (base.find_among_b(a_63) == 0) {
              return false;
            }
            // ], line 605
            base.bra = base.cursor;
            // (, line 606
            // delete, line 606
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 606
            B_test1 = false;
            // [, line 608
            base.ket = base.cursor;
            // substring, line 608
            if (base.find_among_b(a_64) == 0) {
              return false;
            }
            // ], line 608
            base.bra = base.cursor;
            // atlimit, line 608
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 609
            // -> s, line 609
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 609
            if (!base.slice_from("\u03B7\u03C3")) {
              return false;
            }
            // <+ s, line 609
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5k() {
            // (, line 613
            // [, line 614
            base.ket = base.cursor;
            // substring, line 614
            if (base.find_among_b(a_65) == 0) {
              return false;
            }
            // ], line 614
            base.bra = base.cursor;
            // (, line 615
            // delete, line 615
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 615
            B_test1 = false;
            // [, line 617
            base.ket = base.cursor;
            // substring, line 617
            if (base.find_among_b(a_66) == 0) {
              return false;
            }
            // ], line 617
            base.bra = base.cursor;
            // atlimit, line 617
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 619
            // -> s, line 619
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 619
            if (!base.slice_from("\u03B7\u03C3\u03C4")) {
              return false;
            }
            // <+ s, line 619
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5l() {
            // (, line 623
            // [, line 624
            base.ket = base.cursor;
            // substring, line 624
            if (base.find_among_b(a_67) == 0) {
              return false;
            }
            // ], line 624
            base.bra = base.cursor;
            // (, line 625
            // delete, line 625
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 625
            B_test1 = false;
            // [, line 627
            base.ket = base.cursor;
            // substring, line 627
            if (base.find_among_b(a_68) == 0) {
              return false;
            }
            // ], line 627
            base.bra = base.cursor;
            // atlimit, line 627
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 628
            // -> s, line 628
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 628
            if (!base.slice_from("\u03BF\u03C5\u03BD")) {
              return false;
            }
            // <+ s, line 628
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step5m() {
            // (, line 632
            // [, line 633
            base.ket = base.cursor;
            // substring, line 633
            if (base.find_among_b(a_69) == 0) {
              return false;
            }
            // ], line 633
            base.bra = base.cursor;
            // (, line 634
            // delete, line 634
            if (!base.slice_del()) {
              return false;
            }
            // unset test1, line 634
            B_test1 = false;
            // [, line 636
            base.ket = base.cursor;
            // substring, line 636
            if (base.find_among_b(a_70) == 0) {
              return false;
            }
            // ], line 636
            base.bra = base.cursor;
            // atlimit, line 636
            if (base.cursor > base.limit_backward) {
              return false;
            }
            // (, line 638
            // -> s, line 638
            S_s = base.slice_to();
            if (S_s == '') {
              return false;
            }
            // <-, line 638
            if (!base.slice_from("\u03BF\u03C5\u03BC")) {
              return false;
            }
            // <+ s, line 638
            {
              var /** number */ c1 = base.cursor;
              base.insert(base.cursor, base.cursor, S_s);
              base.cursor = c1;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step6() {
            // (, line 642
            // do, line 643
            var /** number */ v_1 = base.limit - base.cursor;
            lab0: {
              // (, line 643
              // [, line 644
              base.ket = base.cursor;
              // substring, line 644
              if (base.find_among_b(a_71) == 0) {
                break lab0;
              }
              // ], line 644
              base.bra = base.cursor;
              // (, line 645
              // <-, line 645
              if (!base.slice_from("\u03BC\u03B1")) {
                return false;
              }
            }
            base.cursor = base.limit - v_1;
            // Boolean test test1, line 648
            if (!B_test1) {
              return false;
            }
            // [, line 649
            base.ket = base.cursor;
            // substring, line 649
            if (base.find_among_b(a_72) == 0) {
              return false;
            }
            // ], line 649
            base.bra = base.cursor;
            // (, line 659
            // delete, line 659
            if (!base.slice_del()) {
              return false;
            }
            return true;
          };

          /** @return {boolean} */
          function r_step7() {
            // (, line 663
            // [, line 664
            base.ket = base.cursor;
            // substring, line 664
            if (base.find_among_b(a_73) == 0) {
              return false;
            }
            // ], line 664
            base.bra = base.cursor;
            // (, line 665
            // delete, line 665
            if (!base.slice_del()) {
              return false;
            }
            return true;
          };

          this.stem = /** @return {boolean} */ function() {
            // (, line 670
            // backwards, line 671
            base.limit_backward = base.cursor;
            base.cursor = base.limit;
            // (, line 671
            // do, line 672
            var /** number */ v_1 = base.limit - base.cursor;
            lab0: {
              // call tolower, line 672
              if (!r_tolower()) {
                break lab0;
              }
            }
            base.cursor = base.limit - v_1;
            // call has_min_length, line 673
            if (!r_has_min_length()) {
              return false;
            }
            // set test1, line 674
            B_test1 = true;
            // do, line 675
            var /** number */ v_2 = base.limit - base.cursor;
            lab1: {
              // call step1, line 675
              if (!r_step1()) {
                break lab1;
              }
            }
            base.cursor = base.limit - v_2;
            // do, line 676
            var /** number */ v_3 = base.limit - base.cursor;
            lab2: {
              // call steps1, line 676
              if (!r_steps1()) {
                break lab2;
              }
            }
            base.cursor = base.limit - v_3;
            // do, line 677
            var /** number */ v_4 = base.limit - base.cursor;
            lab3: {
              // call steps2, line 677
              if (!r_steps2()) {
                break lab3;
              }
            }
            base.cursor = base.limit - v_4;
            // do, line 678
            var /** number */ v_5 = base.limit - base.cursor;
            lab4: {
              // call steps3, line 678
              if (!r_steps3()) {
                break lab4;
              }
            }
            base.cursor = base.limit - v_5;
            // do, line 679
            var /** number */ v_6 = base.limit - base.cursor;
            lab5: {
              // call steps4, line 679
              if (!r_steps4()) {
                break lab5;
              }
            }
            base.cursor = base.limit - v_6;
            // do, line 680
            var /** number */ v_7 = base.limit - base.cursor;
            lab6: {
              // call steps5, line 680
              if (!r_steps5()) {
                break lab6;
              }
            }
            base.cursor = base.limit - v_7;
            // do, line 681
            var /** number */ v_8 = base.limit - base.cursor;
            lab7: {
              // call steps6, line 681
              if (!r_steps6()) {
                break lab7;
              }
            }
            base.cursor = base.limit - v_8;
            // do, line 682
            var /** number */ v_9 = base.limit - base.cursor;
            lab8: {
              // call steps7, line 682
              if (!r_steps7()) {
                break lab8;
              }
            }
            base.cursor = base.limit - v_9;
            // do, line 683
            var /** number */ v_10 = base.limit - base.cursor;
            lab9: {
              // call steps8, line 683
              if (!r_steps8()) {
                break lab9;
              }
            }
            base.cursor = base.limit - v_10;
            // do, line 684
            var /** number */ v_11 = base.limit - base.cursor;
            lab10: {
              // call steps9, line 684
              if (!r_steps9()) {
                break lab10;
              }
            }
            base.cursor = base.limit - v_11;
            // do, line 685
            var /** number */ v_12 = base.limit - base.cursor;
            lab11: {
              // call steps10, line 685
              if (!r_steps10()) {
                break lab11;
              }
            }
            base.cursor = base.limit - v_12;
            // do, line 686
            var /** number */ v_13 = base.limit - base.cursor;
            lab12: {
              // call step2a, line 686
              if (!r_step2a()) {
                break lab12;
              }
            }
            base.cursor = base.limit - v_13;
            // do, line 687
            var /** number */ v_14 = base.limit - base.cursor;
            lab13: {
              // call step2b, line 687
              if (!r_step2b()) {
                break lab13;
              }
            }
            base.cursor = base.limit - v_14;
            // do, line 688
            var /** number */ v_15 = base.limit - base.cursor;
            lab14: {
              // call step2c, line 688
              if (!r_step2c()) {
                break lab14;
              }
            }
            base.cursor = base.limit - v_15;
            // do, line 689
            var /** number */ v_16 = base.limit - base.cursor;
            lab15: {
              // call step2d, line 689
              if (!r_step2d()) {
                break lab15;
              }
            }
            base.cursor = base.limit - v_16;
            // do, line 690
            var /** number */ v_17 = base.limit - base.cursor;
            lab16: {
              // call step3, line 690
              if (!r_step3()) {
                break lab16;
              }
            }
            base.cursor = base.limit - v_17;
            // do, line 691
            var /** number */ v_18 = base.limit - base.cursor;
            lab17: {
              // call step4, line 691
              if (!r_step4()) {
                break lab17;
              }
            }
            base.cursor = base.limit - v_18;
            // do, line 692
            var /** number */ v_19 = base.limit - base.cursor;
            lab18: {
              // call step5a, line 692
              if (!r_step5a()) {
                break lab18;
              }
            }
            base.cursor = base.limit - v_19;
            // do, line 693
            var /** number */ v_20 = base.limit - base.cursor;
            lab19: {
              // call step5b, line 693
              if (!r_step5b()) {
                break lab19;
              }
            }
            base.cursor = base.limit - v_20;
            // do, line 694
            var /** number */ v_21 = base.limit - base.cursor;
            lab20: {
              // call step5c, line 694
              if (!r_step5c()) {
                break lab20;
              }
            }
            base.cursor = base.limit - v_21;
            // do, line 695
            var /** number */ v_22 = base.limit - base.cursor;
            lab21: {
              // call step5d, line 695
              if (!r_step5d()) {
                break lab21;
              }
            }
            base.cursor = base.limit - v_22;
            // do, line 696
            var /** number */ v_23 = base.limit - base.cursor;
            lab22: {
              // call step5e, line 696
              if (!r_step5e()) {
                break lab22;
              }
            }
            base.cursor = base.limit - v_23;
            // do, line 697
            var /** number */ v_24 = base.limit - base.cursor;
            lab23: {
              // call step5f, line 697
              if (!r_step5f()) {
                break lab23;
              }
            }
            base.cursor = base.limit - v_24;
            // do, line 698
            var /** number */ v_25 = base.limit - base.cursor;
            lab24: {
              // call step5g, line 698
              if (!r_step5g()) {
                break lab24;
              }
            }
            base.cursor = base.limit - v_25;
            // do, line 699
            var /** number */ v_26 = base.limit - base.cursor;
            lab25: {
              // call step5h, line 699
              if (!r_step5h()) {
                break lab25;
              }
            }
            base.cursor = base.limit - v_26;
            // do, line 700
            var /** number */ v_27 = base.limit - base.cursor;
            lab26: {
              // call step5j, line 700
              if (!r_step5j()) {
                break lab26;
              }
            }
            base.cursor = base.limit - v_27;
            // do, line 701
            var /** number */ v_28 = base.limit - base.cursor;
            lab27: {
              // call step5i, line 701
              if (!r_step5i()) {
                break lab27;
              }
            }
            base.cursor = base.limit - v_28;
            // do, line 702
            var /** number */ v_29 = base.limit - base.cursor;
            lab28: {
              // call step5k, line 702
              if (!r_step5k()) {
                break lab28;
              }
            }
            base.cursor = base.limit - v_29;
            // do, line 703
            var /** number */ v_30 = base.limit - base.cursor;
            lab29: {
              // call step5l, line 703
              if (!r_step5l()) {
                break lab29;
              }
            }
            base.cursor = base.limit - v_30;
            // do, line 704
            var /** number */ v_31 = base.limit - base.cursor;
            lab30: {
              // call step5m, line 704
              if (!r_step5m()) {
                break lab30;
              }
            }
            base.cursor = base.limit - v_31;
            // do, line 705
            var /** number */ v_32 = base.limit - base.cursor;
            lab31: {
              // call step6, line 705
              if (!r_step6()) {
                break lab31;
              }
            }
            base.cursor = base.limit - v_32;
            // do, line 706
            var /** number */ v_33 = base.limit - base.cursor;
            lab32: {
              // call step7, line 706
              if (!r_step7()) {
                break lab32;
              }
            }
            base.cursor = base.limit - v_33;
            base.cursor = base.limit_backward;
            return true;
          };

          /**@return{string}*/
          this['stemWord'] = function( /**string*/ word) {
            base.setCurrent(word);
            this.stem();
            return base.getCurrent();
          };
        };;

      /* and return a function that stems a word for the current locale */
      return function(token) {
        // for lunr version 2
        if (typeof token.update === "function") {
          return token.update(function(word) {
            st.setCurrent(word);
            st.stem();
            return st.getCurrent();
          })
        } else { // for lunr version <= 1
          st.setCurrent(token);
          st.stem();
          return st.getCurrent();
        }
      }
    })();

    lunr.Pipeline.registerFunction(lunr.el.stemmer, 'stemmer-el');

    lunr.el.stopWordFilter = lunr.generateStopWordFilter(' άλλα άλλες  άλλη άλλην άλλης άλλο άλλοι άλλον άλλος  άλλοτε άλλου άλλους άλλων άνευ άραγε άρεζαν άρεζε άρεσαν άρεσε έγινα έγιναν έγινες έγινες έγκαιρα ένα έναν ένας ένεκα έξω έπειτα έτσι έχει έχεις έχετε έχοντας έχουμε έχουν έχουνε έχω έως ήδη ήθελα ήθελαν ήθελε ήθελες ήμασταν ήμαστε ήμουν ήσασταν ήσαστε ήσουν ήταν ίσαμε ίσως ακριβώς ακόμα ακόμη αλλά αλλιώς αλλιώς αλλιώτικα αλλού αμέσως αμφί αν ανά ανάμεσα αναμεταξύ ανατολικά αναφορά αναφορές αναφορικά αντί αντίπερα ανωτέρω απλά αποτέλεσμα αποτελέσματα από απόψε αρέσει αρέσουν αρέσουνε αργά αρεστός αριστερά αυτά αυτές  αυτές  αυτή  αυτήν αυτής  αυτηνής αυτοί αυτουνού αυτού αυτούς αυτωνών αυτό αυτόν αυτός αφορά αύριο αύτων βέβαια βεβαίως βόρεια γίναμε γίνατε γίνε γίνει γίνεις γίνεσαι γίνεστε γίνεται γίνετε γίνετε γίνομαι γίνονται γίνονταν γίνουμε γίνουν γίνω για γινόμασταν γινόμαστε γινόμαστε γινόμουν γινόμουνα γινόντουσαν γινόσασταν γινόσαστε γινόσαστε γινόσουν γινόσουνα γινόταν γινότανε γρήγορα γύρω δίπλα δίχως δε δείνα δεδομένου δεν δεξιά διά διαρκώς δικά δικές δική δικήν δικής δικοί δικού δικούς δικό δικόν δικός δικών διόλου δυτικά εάν είμαι είμαστε είναι είσαι είστε είτε είχα είχαμε είχαν είχατε είχε είχες εαυτέ εαυτοί εαυτού εαυτούς εαυτό εαυτόν εαυτός εαυτών εγώ ειδικά εις εκ εκείνα εκείνες εκείνη εκείνην εκείνης εκείνο εκείνοι εκείνον εκείνος εκείνου εκείνους εκείνων εκτός εμάς εμένα εμείς εμού εμπρός εν εναντίον εντελώς εντός ενός ενώ εξ\' εξής εξίσου εξαιτίας επάνω επί επίσης επειδή εσάς εσένα εσείς εσού εσύ ετούτα ετούτες ετούτη  ετούτην ετούτης ετούτο ετούτοι ετούτον ετούτος ετούτου ετούτους ετούτων ευθέως ευτυχώς η θέλήσω θέλαμε θέλανε θέλατε θέλει θέλεις θέλετε θέλησα θέλησαν θέλησε θέλησες θέλοντας θέλουμε θέλουν θέλουνε θέλω θα θελήσαμε θελήσανε θελήσατε θελήσει θελήσεις θελήσετε θελήσουμε θελήσουν θελήσουνε ιδίως κ\' κάθε κάμποσο κάποια κάποια κάποιαν κάποιας κάποιες κάποιο κάποιοι κάποιον κάποιος κάποιου κάποιους κάποιων κάποτε κάπου κάπως κάτι κάτω καθένα καθέναν καθένας καθεμία καθεμίαν καθεμίας καθεμιά καθεμιάν καθεμιάς καθενός καθόλου καθώς και κακά καλά καλώς καμία καμίαν καμίας καμιά καμιάν καμιάς κανένα κανέναν κανένας κανείς κανενός κανονικά κατ κατά καταγής κατιτί κατόπιν κει κι κιόλας κοντά κυρίως λίγα λίγες λίγη λίγην λίγης λίγο λίγο λίγο λίγοι λίγον λίγος λίγου λίγους λίγων λόγω μάλιστα μάλλον μέσα μέσω μέχρι μία μίαν μίας μα μαζί μακριά μας με μεθαύριο μερικά μερικές μερική μερικήν μερικής μερικοί μερικού μερικούς μερικό μερικόν μερικός μερικών  μετά μεταξύ μη μην μια μιαν μιας μονάχα μου μπορέσαμε μπορέσατε μπορέσει μπορέσεις μπορέσετε μπορέσουμε μπορέσουν μπορέσω μπορεί μπορείς μπορείτε μπορούμε μπορούν μπορούσα μπορούσαμε μπορούσαν μπορούσατε μπορούσε μπορούσες μπορώ μπρος μπόρεσα μπόρεσαν μπόρεσε μπόρεσες  μόλις μόνα μόνα μόνες μόνη μόνην μόνης μόνο μόνο μόνοι μόνον μόνος μόνου μόνους μόνων να ναι νωρίς νωρίτερα νότια ξανά ο οι ολόγυρα ολότελα οποία οποίαν  οποίας οποίες οποίες οποίο οποίοι οποίον οποίος οποίου οποίους οποίων οποιαδήποτε οποιανδήποτε οποιασδήποτε οποιεσδήποτε οποιοιδήποτε οποιονδήποτε οποιοσδήποτε  οποιουδήποτε οποιουσδήποτε οποιωνδήποτε οποτεδήποτε οπουδήποτε οπωσδήποτε οπότε οτιδήποτε πάλι πάντα πάνω πάρα πέρα πέρσι πέρυσι πίσω παντού παρ παρά περί περίπου πια πιθανόν πιο πλάι πλην ποια ποια ποιαν ποιανής ποιανού ποιανών ποιας ποιες ποιο ποιοι ποιον ποιος ποιου ποιους ποιων πολλά πολλές πολλή πολλήν πολλής πολλοί πολλούς πολλών  πολύ πολύ πολύς ποτέ που πού πρέπει πριν προ προς προτού προχτες πρωτύτερα πρόπερσι πως πόσα πόσες  πόση πόσην πόσης πόσο πόσοι πόσον πόσος πόσου πόσους πόσων πότε πώς σήμερα σαν σας σε σιγά σου στα στη στην στης στις στο στον στου στους στων συν συνάμα συνήθως συχνά σύμφωνα τάδε τέτοια τέτοια τέτοιαν τέτοιας τέτοιες τέτοιο τέτοιοι τέτοιον τέτοιος τέτοιου τέτοιους τέτοιων  τίποτα τίποτε τα τη την της τι τι τις το τον του τουλάχιστον τους τούτα τούτες τούτη τούτην τούτης  τούτο τούτοι τούτον τούτος τούτους τούτων τυχόν των τόσα τόσα τόσες τόσες τόση τόση τόσην τόσην τόσης τόσης τόσο τόσο τόσοι τόσοι τόσον τόσον τόσος τόσος τόσου τόσου τόσους τόσους τόσων τόσων τότε τότε τόυτου τώρα υπέρ υπό φέτος φυσικά χαμηλά χτες χωρίς ψηλά ωραία ως ό όλα όλες  όλη  όλην όλης όλο όλοι όλον όλος όλου όλους όλων όμως όντας όποια όποια όποιας όποιες όποιο όποιοι όποιον όποιος όποιου όποιους όποιων όποτε όπου όπως όπως όσα όσες όση όσην όσης όσο όσο όσοι όσον όσος όσου όσους όσων ότι όχι ύστερα ώστε'.split(' '));

    lunr.Pipeline.registerFunction(lunr.el.stopWordFilter, 'stopWordFilter-el');
  };
}))