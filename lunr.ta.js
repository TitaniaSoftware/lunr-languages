/*!
 * Lunr languages, `tamil-stemmer.js` language
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
    lunr.ta = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.ta.trimmer,
        lunr.ta.stopWordFilter,
        lunr.ta.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.ta.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.ta.wordCharacters = "\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA";
    lunr.ta.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.ta.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.ta.trimmer, 'trimmer-ta');

    /* lunr stemmer function */
    lunr.ta.stemmer = (function() {
      /* create the wrapped stemmer object */
      var st = new function() {
        var base = new BaseStemmer();
        /** @const */
        var a_0 = [
          ["\u0B95", -1, -1],
          ["\u0B99", -1, -1],
          ["\u0B9A", -1, -1],
          ["\u0B9E", -1, -1],
          ["\u0BA4", -1, -1],
          ["\u0BA8", -1, -1],
          ["\u0BAA", -1, -1],
          ["\u0BAE", -1, -1],
          ["\u0BAF", -1, -1],
          ["\u0BB5", -1, -1]
        ];

        /** @const */
        var a_1 = [
          ["\u0BA8\u0BCD\u0BA4", -1, -1],
          ["\u0BA8\u0BCD\u0BA4\u0BCD", -1, -1],
          ["\u0BA8\u0BCD", -1, -1]
        ];

        /** @const */
        var a_2 = [
          ["\u0BBF", -1, -1],
          ["\u0BC0", -1, -1],
          ["\u0BC8", -1, -1]
        ];

        /** @const */
        var a_3 = [
          ["\u0B95", -1, -1],
          ["\u0B9A", -1, -1],
          ["\u0B9F", -1, -1],
          ["\u0BA4", -1, -1],
          ["\u0BAA", -1, -1],
          ["\u0BB1", -1, -1]
        ];

        /** @const */
        var a_4 = [
          ["\u0B95", -1, -1],
          ["\u0B9A", -1, -1],
          ["\u0B9F", -1, -1],
          ["\u0BA4", -1, -1],
          ["\u0BAA", -1, -1],
          ["\u0BB1", -1, -1]
        ];

        /** @const */
        var a_5 = [
          ["\u0B95", -1, -1],
          ["\u0B9A", -1, -1],
          ["\u0B9F", -1, -1],
          ["\u0BA4", -1, -1],
          ["\u0BAA", -1, -1],
          ["\u0BB1", -1, -1]
        ];

        /** @const */
        var a_6 = [
          ["\u0BAF", -1, -1],
          ["\u0BB0", -1, -1],
          ["\u0BB2", -1, -1],
          ["\u0BB3", -1, -1],
          ["\u0BB4", -1, -1],
          ["\u0BB5", -1, -1]
        ];

        /** @const */
        var a_7 = [
          ["\u0B99", -1, -1],
          ["\u0B9E", -1, -1],
          ["\u0BA3", -1, -1],
          ["\u0BA8", -1, -1],
          ["\u0BA9", -1, -1],
          ["\u0BAE", -1, -1]
        ];

        /** @const */
        var a_8 = [
          ["\u0BAF", -1, -1],
          ["\u0BB5", -1, -1],
          ["\u0BB5\u0BCD", -1, -1]
        ];

        /** @const */
        var a_9 = [
          ["\u0BBE", -1, -1],
          ["\u0BBF", -1, -1],
          ["\u0BC0", -1, -1],
          ["\u0BC1", -1, -1],
          ["\u0BC2", -1, -1],
          ["\u0BC6", -1, -1],
          ["\u0BC7", -1, -1],
          ["\u0BC8", -1, -1]
        ];

        /** @const */
        var a_10 = [
          ["\u0BBE", -1, -1],
          ["\u0BBF", -1, -1],
          ["\u0BC0", -1, -1],
          ["\u0BC1", -1, -1],
          ["\u0BC2", -1, -1],
          ["\u0BC6", -1, -1],
          ["\u0BC7", -1, -1],
          ["\u0BC8", -1, -1]
        ];

        /** @const */
        var a_11 = [
          ["\u0B85", -1, -1],
          ["\u0B87", -1, -1],
          ["\u0B89", -1, -1]
        ];

        /** @const */
        var a_12 = [
          ["\u0B95", -1, -1],
          ["\u0B99", -1, -1],
          ["\u0B9A", -1, -1],
          ["\u0B9E", -1, -1],
          ["\u0BA4", -1, -1],
          ["\u0BA8", -1, -1],
          ["\u0BAA", -1, -1],
          ["\u0BAE", -1, -1],
          ["\u0BAF", -1, -1],
          ["\u0BB5", -1, -1]
        ];

        /** @const */
        var a_13 = [
          ["\u0B95", -1, -1],
          ["\u0B9A", -1, -1],
          ["\u0B9F", -1, -1],
          ["\u0BA4", -1, -1],
          ["\u0BAA", -1, -1],
          ["\u0BB1", -1, -1]
        ];

        /** @const */
        var a_14 = [
          ["\u0BBE", -1, -1],
          ["\u0BC7", -1, -1],
          ["\u0BCB", -1, -1]
        ];

        /** @const */
        var a_15 = [
          ["\u0BAA\u0BBF", -1, -1],
          ["\u0BB5\u0BBF", -1, -1]
        ];

        /** @const */
        var a_16 = [
          ["\u0BBE", -1, -1],
          ["\u0BBF", -1, -1],
          ["\u0BC0", -1, -1],
          ["\u0BC1", -1, -1],
          ["\u0BC2", -1, -1],
          ["\u0BC6", -1, -1],
          ["\u0BC7", -1, -1],
          ["\u0BC8", -1, -1]
        ];

        /** @const */
        var a_17 = [
          ["\u0BAA\u0B9F\u0BCD\u0B9F", -1, -1],
          ["\u0BAA\u0B9F\u0BCD\u0B9F\u0BA3", -1, -1],
          ["\u0BA4\u0BBE\u0BA9", -1, -1],
          ["\u0BAA\u0B9F\u0BBF\u0BA4\u0BBE\u0BA9", 2, -1],
          ["\u0B95\u0BC1\u0BB0\u0BBF\u0BAF", -1, -1],
          ["\u0BAA\u0B9F\u0BBF", -1, -1],
          ["\u0BAA\u0BB1\u0BCD\u0BB1\u0BBF", -1, -1],
          ["\u0BAA\u0B9F\u0BC1", -1, -1],
          ["\u0BB5\u0BBF\u0B9F\u0BC1", -1, -1],
          ["\u0BAA\u0B9F\u0BCD\u0B9F\u0BC1", -1, -1],
          ["\u0BB5\u0BBF\u0B9F\u0BCD\u0B9F\u0BC1", -1, -1],
          ["\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1", -1, -1],
          ["\u0BC6\u0BB2\u0BCD\u0BB2\u0BBE\u0BAE\u0BCD", -1, -1]
        ];

        /** @const */
        var a_18 = [
          ["\u0B95", -1, -1],
          ["\u0B9A", -1, -1],
          ["\u0B9F", -1, -1],
          ["\u0BA4", -1, -1],
          ["\u0BAA", -1, -1],
          ["\u0BB1", -1, -1]
        ];

        /** @const */
        var a_19 = [
          ["\u0B95", -1, -1],
          ["\u0B9A", -1, -1],
          ["\u0B9F", -1, -1],
          ["\u0BA4", -1, -1],
          ["\u0BAA", -1, -1],
          ["\u0BB1", -1, -1]
        ];

        /** @const */
        var a_20 = [
          ["\u0BBE", -1, -1],
          ["\u0BBF", -1, -1],
          ["\u0BC0", -1, -1],
          ["\u0BC1", -1, -1],
          ["\u0BC2", -1, -1],
          ["\u0BC6", -1, -1],
          ["\u0BC7", -1, -1],
          ["\u0BC8", -1, -1]
        ];

        /** @const */
        var a_21 = [
          ["\u0BBE", -1, -1],
          ["\u0BBF", -1, -1],
          ["\u0BC0", -1, -1],
          ["\u0BC1", -1, -1],
          ["\u0BC2", -1, -1],
          ["\u0BC6", -1, -1],
          ["\u0BC7", -1, -1],
          ["\u0BC8", -1, -1]
        ];

        /** @const */
        var a_22 = [
          ["\u0BAA\u0B9F\u0BC1", -1, -1],
          ["\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BCD", -1, -1]
        ];

        /** @const */
        var a_23 = [
          ["\u0B85", -1, -1],
          ["\u0B86", -1, -1],
          ["\u0B87", -1, -1],
          ["\u0B88", -1, -1],
          ["\u0B89", -1, -1],
          ["\u0B8A", -1, -1],
          ["\u0B8E", -1, -1],
          ["\u0B8F", -1, -1],
          ["\u0B90", -1, -1],
          ["\u0B92", -1, -1],
          ["\u0B93", -1, -1],
          ["\u0B94", -1, -1]
        ];

        /** @const */
        var a_24 = [
          ["\u0BBE", -1, -1],
          ["\u0BBF", -1, -1],
          ["\u0BC0", -1, -1],
          ["\u0BC1", -1, -1],
          ["\u0BC2", -1, -1],
          ["\u0BC6", -1, -1],
          ["\u0BC7", -1, -1],
          ["\u0BC8", -1, -1]
        ];

        /** @const */
        var a_25 = [
          ["\u0B95\u0BBF\u0BB1", -1, -1],
          ["\u0B95\u0BBF\u0BA9\u0BCD\u0BB1", -1, -1],
          ["\u0BBE\u0BA8\u0BBF\u0BA9\u0BCD\u0BB1", -1, -1],
          ["\u0B95\u0BBF\u0BB1\u0BCD", -1, -1],
          ["\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BCD", -1, -1],
          ["\u0BBE\u0BA8\u0BBF\u0BA9\u0BCD\u0BB1\u0BCD", -1, -1]
        ];

        var /** boolean */ B_found_vetrumai_urupu = false;
        var /** boolean */ B_found_a_match = false;


        /** @return {boolean} */
        function r_has_min_length() {
          // (, line 99
          if (!(base.current.length > 4)) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_fix_va_start() {
          // (, line 103
          // or, line 104
          lab0: {
            var /** number */ v_1 = base.cursor;
            lab1: {
              // (, line 104
              // and, line 104
              var /** number */ v_2 = base.cursor;
              // try, line 104
              var /** number */ v_3 = base.cursor;
              lab2: {
                // literal, line 104
                if (!(base.eq_s("\u0BB5\u0BCB"))) {
                  base.cursor = v_3;
                  break lab2;
                }
              }
              base.cursor = v_2;
              // [, line 104
              base.bra = base.cursor;
              // literal, line 104
              if (!(base.eq_s("\u0BB5\u0BCB"))) {
                break lab1;
              }
              // ], line 104
              base.ket = base.cursor;
              // <-, line 104
              if (!base.slice_from("\u0B93")) {
                return false;
              }
              break lab0;
            }
            base.cursor = v_1;
            lab3: {
              // (, line 105
              // and, line 105
              var /** number */ v_4 = base.cursor;
              // try, line 105
              var /** number */ v_5 = base.cursor;
              lab4: {
                // literal, line 105
                if (!(base.eq_s("\u0BB5\u0BCA"))) {
                  base.cursor = v_5;
                  break lab4;
                }
              }
              base.cursor = v_4;
              // [, line 105
              base.bra = base.cursor;
              // literal, line 105
              if (!(base.eq_s("\u0BB5\u0BCA"))) {
                break lab3;
              }
              // ], line 105
              base.ket = base.cursor;
              // <-, line 105
              if (!base.slice_from("\u0B92")) {
                return false;
              }
              break lab0;
            }
            base.cursor = v_1;
            lab5: {
              // (, line 106
              // and, line 106
              var /** number */ v_6 = base.cursor;
              // try, line 106
              var /** number */ v_7 = base.cursor;
              lab6: {
                // literal, line 106
                if (!(base.eq_s("\u0BB5\u0BC1"))) {
                  base.cursor = v_7;
                  break lab6;
                }
              }
              base.cursor = v_6;
              // [, line 106
              base.bra = base.cursor;
              // literal, line 106
              if (!(base.eq_s("\u0BB5\u0BC1"))) {
                break lab5;
              }
              // ], line 106
              base.ket = base.cursor;
              // <-, line 106
              if (!base.slice_from("\u0B89")) {
                return false;
              }
              break lab0;
            }
            base.cursor = v_1;
            // (, line 107
            // and, line 107
            var /** number */ v_8 = base.cursor;
            // try, line 107
            var /** number */ v_9 = base.cursor;
            lab7: {
              // literal, line 107
              if (!(base.eq_s("\u0BB5\u0BC2"))) {
                base.cursor = v_9;
                break lab7;
              }
            }
            base.cursor = v_8;
            // [, line 107
            base.bra = base.cursor;
            // literal, line 107
            if (!(base.eq_s("\u0BB5\u0BC2"))) {
              return false;
            }
            // ], line 107
            base.ket = base.cursor;
            // <-, line 107
            if (!base.slice_from("\u0B8A")) {
              return false;
            }
          }
          return true;
        };

        /** @return {boolean} */
        function r_fix_endings() {
          // (, line 110
          // do, line 111
          var /** number */ v_1 = base.cursor;
          lab0: {
            // repeat, line 111
            replab1: while (true) {
              var /** number */ v_2 = base.cursor;
              lab2: {
                // call fix_ending, line 111
                if (!r_fix_ending()) {
                  break lab2;
                }
                continue replab1;
              }
              base.cursor = v_2;
              break replab1;
            }
          }
          base.cursor = v_1;
          return true;
        };

        /** @return {boolean} */
        function r_remove_question_prefixes() {
          // (, line 114
          // [, line 115
          base.bra = base.cursor;
          // (, line 115
          // literal, line 115
          if (!(base.eq_s("\u0B8E"))) {
            return false;
          }
          // among, line 115
          if (base.find_among(a_0) == 0) {
            return false;
          }
          // literal, line 115
          if (!(base.eq_s("\u0BCD"))) {
            return false;
          }
          // ], line 115
          base.ket = base.cursor;
          // delete, line 115
          if (!base.slice_del()) {
            return false;
          }
          // do, line 116
          var /** number */ v_1 = base.cursor;
          lab0: {
            // call fix_va_start, line 116
            if (!r_fix_va_start()) {
              break lab0;
            }
          }
          base.cursor = v_1;
          return true;
        };

        /** @return {boolean} */
        function r_fix_ending() {
          // (, line 120
          if (!(base.current.length > 3)) {
            return false;
          }
          // backwards, line 122
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 122
          // or, line 124
          lab0: {
            var /** number */ v_1 = base.limit - base.cursor;
            lab1: {
              // (, line 123
              // [, line 123
              base.ket = base.cursor;
              // among, line 123
              if (base.find_among_b(a_1) == 0) {
                break lab1;
              }
              // ], line 123
              base.bra = base.cursor;
              // delete, line 123
              if (!base.slice_del()) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab2: {
              // (, line 125
              // [, line 125
              base.ket = base.cursor;
              // literal, line 125
              if (!(base.eq_s_b("\u0BAF\u0BCD"))) {
                break lab2;
              }
              // test, line 125
              var /** number */ v_2 = base.limit - base.cursor;
              // among, line 125
              if (base.find_among_b(a_2) == 0) {
                break lab2;
              }
              base.cursor = base.limit - v_2;
              // ], line 125
              base.bra = base.cursor;
              // delete, line 125
              if (!base.slice_del()) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab3: {
              // (, line 127
              // [, line 127
              base.ket = base.cursor;
              // or, line 127
              lab4: {
                var /** number */ v_3 = base.limit - base.cursor;
                lab5: {
                  // literal, line 127
                  if (!(base.eq_s_b("\u0B9F\u0BCD\u0BAA\u0BCD"))) {
                    break lab5;
                  }
                  break lab4;
                }
                base.cursor = base.limit - v_3;
                // literal, line 127
                if (!(base.eq_s_b("\u0B9F\u0BCD\u0B95\u0BCD"))) {
                  break lab3;
                }
              }
              // ], line 127
              base.bra = base.cursor;
              // <-, line 127
              if (!base.slice_from("\u0BB3\u0BCD")) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab6: {
              // (, line 129
              // [, line 129
              base.ket = base.cursor;
              // literal, line 129
              if (!(base.eq_s_b("\u0BA9\u0BCD\u0BB1\u0BCD"))) {
                break lab6;
              }
              // ], line 129
              base.bra = base.cursor;
              // <-, line 129
              if (!base.slice_from("\u0BB2\u0BCD")) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab7: {
              // (, line 132
              // [, line 132
              base.ket = base.cursor;
              // literal, line 132
              if (!(base.eq_s_b("\u0BB1\u0BCD\u0B95\u0BCD"))) {
                break lab7;
              }
              // ], line 132
              base.bra = base.cursor;
              // <-, line 132
              if (!base.slice_from("\u0BB2\u0BCD")) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab8: {
              // (, line 134
              // [, line 134
              base.ket = base.cursor;
              // literal, line 134
              if (!(base.eq_s_b("\u0B9F\u0BCD\u0B9F\u0BCD"))) {
                break lab8;
              }
              // ], line 134
              base.bra = base.cursor;
              // <-, line 134
              if (!base.slice_from("\u0B9F\u0BC1")) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab9: {
              // (, line 136
              // Boolean test found_vetrumai_urupu, line 136
              if (!B_found_vetrumai_urupu) {
                break lab9;
              }
              // [, line 136
              base.ket = base.cursor;
              // literal, line 136
              if (!(base.eq_s_b("\u0BA4\u0BCD\u0BA4\u0BCD"))) {
                break lab9;
              }
              // (, line 136
              // test, line 136
              var /** number */ v_4 = base.limit - base.cursor;
              // not, line 136
              {
                var /** number */ v_5 = base.limit - base.cursor;
                lab10: {
                  // literal, line 136
                  if (!(base.eq_s_b("\u0BC8"))) {
                    break lab10;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_5;
              }
              base.cursor = base.limit - v_4;
              // ], line 136
              base.bra = base.cursor;
              // <-, line 136
              if (!base.slice_from("\u0BAE\u0BCD")) {
                return false;
              }
              // ], line 136
              base.bra = base.cursor;
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab11: {
              // (, line 138
              // [, line 138
              base.ket = base.cursor;
              // or, line 138
              lab12: {
                var /** number */ v_6 = base.limit - base.cursor;
                lab13: {
                  // literal, line 138
                  if (!(base.eq_s_b("\u0BC1\u0B95\u0BCD"))) {
                    break lab13;
                  }
                  break lab12;
                }
                base.cursor = base.limit - v_6;
                // literal, line 138
                if (!(base.eq_s_b("\u0BC1\u0B95\u0BCD\u0B95\u0BCD"))) {
                  break lab11;
                }
              }
              // ], line 138
              base.bra = base.cursor;
              // <-, line 138
              if (!base.slice_from("\u0BCD")) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab14: {
              // (, line 140
              // [, line 140
              base.ket = base.cursor;
              // literal, line 140
              if (!(base.eq_s_b("\u0BCD"))) {
                break lab14;
              }
              // among, line 140
              if (base.find_among_b(a_3) == 0) {
                break lab14;
              }
              // literal, line 140
              if (!(base.eq_s_b("\u0BCD"))) {
                break lab14;
              }
              // among, line 140
              if (base.find_among_b(a_4) == 0) {
                break lab14;
              }
              // ], line 140
              base.bra = base.cursor;
              // delete, line 140
              if (!base.slice_del()) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab15: {
              // (, line 142
              // [, line 142
              base.ket = base.cursor;
              // literal, line 142
              if (!(base.eq_s_b("\u0BC1\u0B95\u0BCD"))) {
                break lab15;
              }
              // ], line 142
              base.bra = base.cursor;
              // <-, line 142
              if (!base.slice_from("\u0BCD")) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab16: {
              // (, line 144
              // [, line 144
              base.ket = base.cursor;
              // literal, line 144
              if (!(base.eq_s_b("\u0BCD"))) {
                break lab16;
              }
              // among, line 144
              if (base.find_among_b(a_5) == 0) {
                break lab16;
              }
              // ], line 144
              base.bra = base.cursor;
              // delete, line 144
              if (!base.slice_del()) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab17: {
              // (, line 146
              // [, line 146
              base.ket = base.cursor;
              // literal, line 146
              if (!(base.eq_s_b("\u0BCD"))) {
                break lab17;
              }
              // (, line 146
              // or, line 146
              lab18: {
                var /** number */ v_7 = base.limit - base.cursor;
                lab19: {
                  // among, line 146
                  if (base.find_among_b(a_6) == 0) {
                    break lab19;
                  }
                  break lab18;
                }
                base.cursor = base.limit - v_7;
                // among, line 146
                if (base.find_among_b(a_7) == 0) {
                  break lab17;
                }
              }
              // literal, line 146
              if (!(base.eq_s_b("\u0BCD"))) {
                break lab17;
              }
              // ], line 146
              base.bra = base.cursor;
              // <-, line 146
              if (!base.slice_from("\u0BCD")) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab20: {
              // (, line 148
              // [, line 148
              base.ket = base.cursor;
              // among, line 148
              if (base.find_among_b(a_8) == 0) {
                break lab20;
              }
              // ], line 148
              base.bra = base.cursor;
              // delete, line 148
              if (!base.slice_del()) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab21: {
              // (, line 150
              // [, line 150
              base.ket = base.cursor;
              // literal, line 150
              if (!(base.eq_s_b("\u0BA9\u0BC1"))) {
                break lab21;
              }
              // (, line 150
              // test, line 150
              var /** number */ v_8 = base.limit - base.cursor;
              // not, line 150
              {
                var /** number */ v_9 = base.limit - base.cursor;
                lab22: {
                  // among, line 150
                  if (base.find_among_b(a_9) == 0) {
                    break lab22;
                  }
                  break lab21;
                }
                base.cursor = base.limit - v_9;
              }
              base.cursor = base.limit - v_8;
              // ], line 150
              base.bra = base.cursor;
              // delete, line 150
              if (!base.slice_del()) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab23: {
              // (, line 152
              // [, line 152
              base.ket = base.cursor;
              // literal, line 152
              if (!(base.eq_s_b("\u0B99\u0BCD"))) {
                break lab23;
              }
              // (, line 152
              // test, line 152
              var /** number */ v_10 = base.limit - base.cursor;
              // not, line 152
              {
                var /** number */ v_11 = base.limit - base.cursor;
                lab24: {
                  // literal, line 152
                  if (!(base.eq_s_b("\u0BC8"))) {
                    break lab24;
                  }
                  break lab23;
                }
                base.cursor = base.limit - v_11;
              }
              base.cursor = base.limit - v_10;
              // ], line 152
              base.bra = base.cursor;
              // <-, line 152
              if (!base.slice_from("\u0BAE\u0BCD")) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab25: {
              // (, line 154
              // [, line 154
              base.ket = base.cursor;
              // literal, line 154
              if (!(base.eq_s_b("\u0B99\u0BCD"))) {
                break lab25;
              }
              // ], line 154
              base.bra = base.cursor;
              // delete, line 154
              if (!base.slice_del()) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            // (, line 156
            // [, line 156
            base.ket = base.cursor;
            // literal, line 156
            if (!(base.eq_s_b("\u0BCD"))) {
              return false;
            }
            // (, line 156
            // test, line 156
            var /** number */ v_12 = base.limit - base.cursor;
            // (, line 156
            // or, line 156
            lab26: {
              var /** number */ v_13 = base.limit - base.cursor;
              lab27: {
                // among, line 156
                if (base.find_among_b(a_10) == 0) {
                  break lab27;
                }
                break lab26;
              }
              base.cursor = base.limit - v_13;
              // literal, line 156
              if (!(base.eq_s_b("\u0BCD"))) {
                return false;
              }
            }
            base.cursor = base.limit - v_12;
            // ], line 156
            base.bra = base.cursor;
            // delete, line 156
            if (!base.slice_del()) {
              return false;
            }
          }
          base.cursor = base.limit_backward;
          return true;
        };

        /** @return {boolean} */
        function r_remove_pronoun_prefixes() {
          // (, line 160
          // unset found_a_match, line 161
          B_found_a_match = false;
          // [, line 162
          base.bra = base.cursor;
          // among, line 162
          if (base.find_among(a_11) == 0) {
            return false;
          }
          // among, line 162
          if (base.find_among(a_12) == 0) {
            return false;
          }
          // literal, line 162
          if (!(base.eq_s("\u0BCD"))) {
            return false;
          }
          // ], line 162
          base.ket = base.cursor;
          // delete, line 162
          if (!base.slice_del()) {
            return false;
          }
          // (, line 163
          // set found_a_match, line 163
          B_found_a_match = true;
          // do, line 164
          var /** number */ v_1 = base.cursor;
          lab0: {
            // call fix_va_start, line 164
            if (!r_fix_va_start()) {
              break lab0;
            }
          }
          base.cursor = v_1;
          return true;
        };

        /** @return {boolean} */
        function r_remove_plural_suffix() {
          // (, line 167
          // unset found_a_match, line 168
          B_found_a_match = false;
          // backwards, line 169
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 169
          // or, line 170
          lab0: {
            var /** number */ v_1 = base.limit - base.cursor;
            lab1: {
              // (, line 170
              // [, line 170
              base.ket = base.cursor;
              // literal, line 170
              if (!(base.eq_s_b("\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD"))) {
                break lab1;
              }
              // (, line 170
              // test, line 170
              var /** number */ v_2 = base.limit - base.cursor;
              // not, line 170
              {
                var /** number */ v_3 = base.limit - base.cursor;
                lab2: {
                  // among, line 170
                  if (base.find_among_b(a_13) == 0) {
                    break lab2;
                  }
                  break lab1;
                }
                base.cursor = base.limit - v_3;
              }
              base.cursor = base.limit - v_2;
              // ], line 170
              base.bra = base.cursor;
              // <-, line 170
              if (!base.slice_from("\u0BCD")) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab3: {
              // (, line 171
              // [, line 171
              base.ket = base.cursor;
              // literal, line 171
              if (!(base.eq_s_b("\u0BB1\u0BCD\u0B95\u0BB3\u0BCD"))) {
                break lab3;
              }
              // ], line 171
              base.bra = base.cursor;
              // <-, line 171
              if (!base.slice_from("\u0BB2\u0BCD")) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab4: {
              // (, line 172
              // [, line 172
              base.ket = base.cursor;
              // literal, line 172
              if (!(base.eq_s_b("\u0B9F\u0BCD\u0B95\u0BB3\u0BCD"))) {
                break lab4;
              }
              // ], line 172
              base.bra = base.cursor;
              // <-, line 172
              if (!base.slice_from("\u0BB3\u0BCD")) {
                return false;
              }
              break lab0;
            }
            base.cursor = base.limit - v_1;
            // (, line 173
            // [, line 173
            base.ket = base.cursor;
            // literal, line 173
            if (!(base.eq_s_b("\u0B95\u0BB3\u0BCD"))) {
              return false;
            }
            // ], line 173
            base.bra = base.cursor;
            // delete, line 173
            if (!base.slice_del()) {
              return false;
            }
          }
          // (, line 174
          // set found_a_match, line 174
          B_found_a_match = true;
          base.cursor = base.limit_backward;
          return true;
        };

        /** @return {boolean} */
        function r_remove_question_suffixes() {
          // (, line 178
          // call has_min_length, line 179
          if (!r_has_min_length()) {
            return false;
          }
          // unset found_a_match, line 180
          B_found_a_match = false;
          // backwards, line 181
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 181
          // do, line 182
          var /** number */ v_1 = base.limit - base.cursor;
          lab0: {
            // (, line 182
            // [, line 183
            base.ket = base.cursor;
            // among, line 183
            if (base.find_among_b(a_14) == 0) {
              break lab0;
            }
            // ], line 183
            base.bra = base.cursor;
            // <-, line 183
            if (!base.slice_from("\u0BCD")) {
              return false;
            }
            // (, line 184
            // set found_a_match, line 184
            B_found_a_match = true;
          }
          base.cursor = base.limit - v_1;
          base.cursor = base.limit_backward;
          // do, line 187
          lab1: {
            // call fix_endings, line 187
            if (!r_fix_endings()) {
              break lab1;
            }
          }
          return true;
        };

        /** @return {boolean} */
        function r_remove_command_suffixes() {
          // (, line 190
          // call has_min_length, line 191
          if (!r_has_min_length()) {
            return false;
          }
          // unset found_a_match, line 192
          B_found_a_match = false;
          // backwards, line 193
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 193
          // [, line 194
          base.ket = base.cursor;
          // among, line 194
          if (base.find_among_b(a_15) == 0) {
            return false;
          }
          // ], line 194
          base.bra = base.cursor;
          // delete, line 194
          if (!base.slice_del()) {
            return false;
          }
          // (, line 195
          // set found_a_match, line 195
          B_found_a_match = true;
          base.cursor = base.limit_backward;
          return true;
        };

        /** @return {boolean} */
        function r_remove_um() {
          // (, line 199
          // unset found_a_match, line 200
          B_found_a_match = false;
          // call has_min_length, line 201
          if (!r_has_min_length()) {
            return false;
          }
          // backwards, line 202
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 202
          // [, line 202
          base.ket = base.cursor;
          // literal, line 202
          if (!(base.eq_s_b("\u0BC1\u0BAE\u0BCD"))) {
            return false;
          }
          // ], line 202
          base.bra = base.cursor;
          // <-, line 202
          if (!base.slice_from("\u0BCD")) {
            return false;
          }
          // (, line 203
          // set found_a_match, line 203
          B_found_a_match = true;
          base.cursor = base.limit_backward;
          // do, line 205
          var /** number */ v_1 = base.cursor;
          lab0: {
            // call fix_ending, line 205
            if (!r_fix_ending()) {
              break lab0;
            }
          }
          base.cursor = v_1;
          return true;
        };

        /** @return {boolean} */
        function r_remove_common_word_endings() {
          // (, line 208
          // unset found_a_match, line 212
          B_found_a_match = false;
          // call has_min_length, line 213
          if (!r_has_min_length()) {
            return false;
          }
          // backwards, line 214
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 214
          // or, line 231
          lab0: {
            var /** number */ v_1 = base.limit - base.cursor;
            lab1: {
              // test, line 215
              var /** number */ v_2 = base.limit - base.cursor;
              // (, line 215
              // [, line 215
              base.ket = base.cursor;
              // or, line 215
              lab2: {
                var /** number */ v_3 = base.limit - base.cursor;
                lab3: {
                  // literal, line 215
                  if (!(base.eq_s_b("\u0BC1\u0B9F\u0BA9\u0BCD"))) {
                    break lab3;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab4: {
                  // literal, line 216
                  if (!(base.eq_s_b("\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8"))) {
                    break lab4;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab5: {
                  // literal, line 217
                  if (!(base.eq_s_b("\u0BBF\u0B9F\u0BAE\u0BCD"))) {
                    break lab5;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab6: {
                  // literal, line 218
                  if (!(base.eq_s_b("\u0BBF\u0BA9\u0BCD\u0BB1\u0BBF"))) {
                    break lab6;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab7: {
                  // literal, line 219
                  if (!(base.eq_s_b("\u0BBE\u0B95\u0BBF"))) {
                    break lab7;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab8: {
                  // literal, line 220
                  if (!(base.eq_s_b("\u0BBE\u0B95\u0BBF\u0BAF"))) {
                    break lab8;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab9: {
                  // literal, line 221
                  if (!(base.eq_s_b("\u0BC6\u0BA9\u0BCD\u0BB1\u0BC1"))) {
                    break lab9;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab10: {
                  // literal, line 222
                  if (!(base.eq_s_b("\u0BC1\u0BB3\u0BCD\u0BB3"))) {
                    break lab10;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab11: {
                  // literal, line 223
                  if (!(base.eq_s_b("\u0BC1\u0B9F\u0BC8\u0BAF"))) {
                    break lab11;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab12: {
                  // literal, line 224
                  if (!(base.eq_s_b("\u0BC1\u0B9F\u0BC8"))) {
                    break lab12;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab13: {
                  // literal, line 225
                  if (!(base.eq_s_b("\u0BC6\u0BA9\u0BC1\u0BAE\u0BCD"))) {
                    break lab13;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab14: {
                  // (, line 226
                  // literal, line 226
                  if (!(base.eq_s_b("\u0BB2\u0BCD\u0BB2"))) {
                    break lab14;
                  }
                  // test, line 226
                  var /** number */ v_4 = base.limit - base.cursor;
                  // (, line 226
                  // not, line 226
                  {
                    var /** number */ v_5 = base.limit - base.cursor;
                    lab15: {
                      // among, line 226
                      if (base.find_among_b(a_16) == 0) {
                        break lab15;
                      }
                      break lab14;
                    }
                    base.cursor = base.limit - v_5;
                  }
                  base.cursor = base.limit - v_4;
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                lab16: {
                  // literal, line 227
                  if (!(base.eq_s_b("\u0BC6\u0BA9"))) {
                    break lab16;
                  }
                  break lab2;
                }
                base.cursor = base.limit - v_3;
                // literal, line 228
                if (!(base.eq_s_b("\u0BBE\u0B95\u0BBF"))) {
                  break lab1;
                }
              }
              // ], line 228
              base.bra = base.cursor;
              // <-, line 228
              if (!base.slice_from("\u0BCD")) {
                return false;
              }
              // (, line 229
              // set found_a_match, line 229
              B_found_a_match = true;
              base.cursor = base.limit - v_2;
              break lab0;
            }
            base.cursor = base.limit - v_1;
            // test, line 232
            var /** number */ v_6 = base.limit - base.cursor;
            // (, line 232
            // [, line 232
            base.ket = base.cursor;
            // among, line 232
            if (base.find_among_b(a_17) == 0) {
              return false;
            }
            // ], line 245
            base.bra = base.cursor;
            // delete, line 245
            if (!base.slice_del()) {
              return false;
            }
            // (, line 246
            // set found_a_match, line 246
            B_found_a_match = true;
            base.cursor = base.limit - v_6;
          }
          base.cursor = base.limit_backward;
          // do, line 249
          lab17: {
            // call fix_endings, line 249
            if (!r_fix_endings()) {
              break lab17;
            }
          }
          return true;
        };

        /** @return {boolean} */
        function r_remove_vetrumai_urupukal() {
          // (, line 252
          // unset found_a_match, line 253
          B_found_a_match = false;
          // unset found_vetrumai_urupu, line 254
          B_found_vetrumai_urupu = false;
          // call has_min_length, line 255
          if (!r_has_min_length()) {
            return false;
          }
          // backwards, line 256
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 256
          // (, line 257
          // or, line 259
          lab0: {
            var /** number */ v_1 = base.limit - base.cursor;
            lab1: {
              // test, line 258
              var /** number */ v_2 = base.limit - base.cursor;
              // (, line 258
              // [, line 258
              base.ket = base.cursor;
              // literal, line 258
              if (!(base.eq_s_b("\u0BA9\u0BC8"))) {
                break lab1;
              }
              // ], line 258
              base.bra = base.cursor;
              // delete, line 258
              if (!base.slice_del()) {
                return false;
              }
              base.cursor = base.limit - v_2;
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab2: {
              // test, line 260
              var /** number */ v_3 = base.limit - base.cursor;
              // (, line 260
              // [, line 260
              base.ket = base.cursor;
              // or, line 261
              lab3: {
                var /** number */ v_4 = base.limit - base.cursor;
                lab4: {
                  // (, line 260
                  // or, line 260
                  lab5: {
                    var /** number */ v_5 = base.limit - base.cursor;
                    lab6: {
                      // literal, line 260
                      if (!(base.eq_s_b("\u0BBF\u0BA9\u0BC8"))) {
                        break lab6;
                      }
                      break lab5;
                    }
                    base.cursor = base.limit - v_5;
                    // literal, line 261
                    if (!(base.eq_s_b("\u0BC8"))) {
                      break lab4;
                    }
                  }
                  // (, line 261
                  // test, line 261
                  var /** number */ v_6 = base.limit - base.cursor;
                  // not, line 261
                  {
                    var /** number */ v_7 = base.limit - base.cursor;
                    lab7: {
                      // among, line 261
                      if (base.find_among_b(a_18) == 0) {
                        break lab7;
                      }
                      break lab4;
                    }
                    base.cursor = base.limit - v_7;
                  }
                  base.cursor = base.limit - v_6;
                  break lab3;
                }
                base.cursor = base.limit - v_4;
                // (, line 262
                // literal, line 262
                if (!(base.eq_s_b("\u0BC8"))) {
                  break lab2;
                }
                // (, line 262
                // test, line 262
                var /** number */ v_8 = base.limit - base.cursor;
                // (, line 262
                // among, line 262
                if (base.find_among_b(a_19) == 0) {
                  break lab2;
                }
                // literal, line 262
                if (!(base.eq_s_b("\u0BCD"))) {
                  break lab2;
                }
                base.cursor = base.limit - v_8;
              }
              // ], line 263
              base.bra = base.cursor;
              // <-, line 263
              if (!base.slice_from("\u0BCD")) {
                return false;
              }
              base.cursor = base.limit - v_3;
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab8: {
              // test, line 266
              var /** number */ v_9 = base.limit - base.cursor;
              // (, line 266
              // [, line 266
              base.ket = base.cursor;
              // or, line 267
              lab9: {
                var /** number */ v_10 = base.limit - base.cursor;
                lab10: {
                  // literal, line 267
                  if (!(base.eq_s_b("\u0BCA\u0B9F\u0BC1"))) {
                    break lab10;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab11: {
                  // literal, line 268
                  if (!(base.eq_s_b("\u0BCB\u0B9F\u0BC1"))) {
                    break lab11;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab12: {
                  // literal, line 269
                  if (!(base.eq_s_b("\u0BBF\u0BB2\u0BCD"))) {
                    break lab12;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab13: {
                  // literal, line 270
                  if (!(base.eq_s_b("\u0BBF\u0BB1\u0BCD"))) {
                    break lab13;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab14: {
                  // (, line 271
                  // literal, line 271
                  if (!(base.eq_s_b("\u0BBF\u0BA9\u0BCD"))) {
                    break lab14;
                  }
                  // (, line 271
                  // test, line 271
                  var /** number */ v_11 = base.limit - base.cursor;
                  // not, line 271
                  {
                    var /** number */ v_12 = base.limit - base.cursor;
                    lab15: {
                      // literal, line 271
                      if (!(base.eq_s_b("\u0BAE"))) {
                        break lab15;
                      }
                      break lab14;
                    }
                    base.cursor = base.limit - v_12;
                  }
                  base.cursor = base.limit - v_11;
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab16: {
                  // literal, line 272
                  if (!(base.eq_s_b("\u0BBF\u0BA9\u0BCD\u0BB1\u0BC1"))) {
                    break lab16;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab17: {
                  // literal, line 273
                  if (!(base.eq_s_b("\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1"))) {
                    break lab17;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab18: {
                  // literal, line 274
                  if (!(base.eq_s_b("\u0BB5\u0BBF\u0B9F"))) {
                    break lab18;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab19: {
                  // (, line 275
                  if (!(base.current.length >= 7)) {
                    break lab19;
                  }
                  // literal, line 275
                  if (!(base.eq_s_b("\u0BBF\u0B9F\u0BAE\u0BCD"))) {
                    break lab19;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab20: {
                  // literal, line 276
                  if (!(base.eq_s_b("\u0BBE\u0BB2\u0BCD"))) {
                    break lab20;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab21: {
                  // literal, line 277
                  if (!(base.eq_s_b("\u0BC1\u0B9F\u0BC8"))) {
                    break lab21;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab22: {
                  // literal, line 278
                  if (!(base.eq_s_b("\u0BBE\u0BAE\u0BB2\u0BCD"))) {
                    break lab22;
                  }
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                lab23: {
                  // (, line 279
                  // literal, line 279
                  if (!(base.eq_s_b("\u0BB2\u0BCD"))) {
                    break lab23;
                  }
                  // (, line 279
                  // test, line 279
                  var /** number */ v_13 = base.limit - base.cursor;
                  // not, line 279
                  {
                    var /** number */ v_14 = base.limit - base.cursor;
                    lab24: {
                      // among, line 279
                      if (base.find_among_b(a_20) == 0) {
                        break lab24;
                      }
                      break lab23;
                    }
                    base.cursor = base.limit - v_14;
                  }
                  base.cursor = base.limit - v_13;
                  break lab9;
                }
                base.cursor = base.limit - v_10;
                // literal, line 280
                if (!(base.eq_s_b("\u0BC1\u0BB3\u0BCD"))) {
                  break lab8;
                }
              }
              // ], line 281
              base.bra = base.cursor;
              // <-, line 281
              if (!base.slice_from("\u0BCD")) {
                return false;
              }
              base.cursor = base.limit - v_9;
              break lab0;
            }
            base.cursor = base.limit - v_1;
            lab25: {
              // test, line 284
              var /** number */ v_15 = base.limit - base.cursor;
              // (, line 284
              // [, line 284
              base.ket = base.cursor;
              // or, line 285
              lab26: {
                var /** number */ v_16 = base.limit - base.cursor;
                lab27: {
                  // literal, line 285
                  if (!(base.eq_s_b("\u0B95\u0BA3\u0BCD"))) {
                    break lab27;
                  }
                  break lab26;
                }
                base.cursor = base.limit - v_16;
                lab28: {
                  // literal, line 286
                  if (!(base.eq_s_b("\u0BAE\u0BC1\u0BA9\u0BCD"))) {
                    break lab28;
                  }
                  break lab26;
                }
                base.cursor = base.limit - v_16;
                lab29: {
                  // literal, line 287
                  if (!(base.eq_s_b("\u0BAE\u0BC7\u0BB2\u0BCD"))) {
                    break lab29;
                  }
                  break lab26;
                }
                base.cursor = base.limit - v_16;
                lab30: {
                  // literal, line 288
                  if (!(base.eq_s_b("\u0BAE\u0BC7\u0BB1\u0BCD"))) {
                    break lab30;
                  }
                  break lab26;
                }
                base.cursor = base.limit - v_16;
                lab31: {
                  // literal, line 289
                  if (!(base.eq_s_b("\u0B95\u0BC0\u0BB4\u0BCD"))) {
                    break lab31;
                  }
                  break lab26;
                }
                base.cursor = base.limit - v_16;
                lab32: {
                  // literal, line 290
                  if (!(base.eq_s_b("\u0BAA\u0BBF\u0BA9\u0BCD"))) {
                    break lab32;
                  }
                  break lab26;
                }
                base.cursor = base.limit - v_16;
                // (, line 291
                // literal, line 291
                if (!(base.eq_s_b("\u0BA4\u0BC1"))) {
                  break lab25;
                }
                // (, line 291
                // test, line 291
                var /** number */ v_17 = base.limit - base.cursor;
                // not, line 291
                {
                  var /** number */ v_18 = base.limit - base.cursor;
                  lab33: {
                    // among, line 291
                    if (base.find_among_b(a_21) == 0) {
                      break lab33;
                    }
                    break lab25;
                  }
                  base.cursor = base.limit - v_18;
                }
                base.cursor = base.limit - v_17;
              }
              // ], line 292
              base.bra = base.cursor;
              // delete, line 292
              if (!base.slice_del()) {
                return false;
              }
              base.cursor = base.limit - v_15;
              break lab0;
            }
            base.cursor = base.limit - v_1;
            // test, line 295
            var /** number */ v_19 = base.limit - base.cursor;
            // (, line 295
            // [, line 295
            base.ket = base.cursor;
            // literal, line 295
            if (!(base.eq_s_b("\u0BC0"))) {
              return false;
            }
            // ], line 295
            base.bra = base.cursor;
            // <-, line 295
            if (!base.slice_from("\u0BBF")) {
              return false;
            }
            base.cursor = base.limit - v_19;
          }
          // (, line 297
          // set found_a_match, line 297
          B_found_a_match = true;
          // (, line 298
          // set found_vetrumai_urupu, line 298
          B_found_vetrumai_urupu = true;
          // do, line 299
          var /** number */ v_20 = base.limit - base.cursor;
          lab34: {
            // (, line 299
            // [, line 299
            base.ket = base.cursor;
            // literal, line 299
            if (!(base.eq_s_b("\u0BBF\u0BA9\u0BCD"))) {
              break lab34;
            }
            // ], line 299
            base.bra = base.cursor;
            // <-, line 299
            if (!base.slice_from("\u0BCD")) {
              return false;
            }
          }
          base.cursor = base.limit - v_20;
          base.cursor = base.limit_backward;
          // do, line 301
          lab35: {
            // call fix_endings, line 301
            if (!r_fix_endings()) {
              break lab35;
            }
          }
          return true;
        };

        /** @return {boolean} */
        function r_remove_tense_suffixes() {
          // (, line 304
          // set found_a_match, line 305
          B_found_a_match = true;
          // repeat, line 306
          replab0: while (true) {
            var /** number */ v_1 = base.cursor;
            lab1: {
              // (, line 306
              // Boolean test found_a_match, line 306
              if (!B_found_a_match) {
                break lab1;
              }
              // (, line 306
              // do, line 306
              var /** number */ v_2 = base.cursor;
              lab2: {
                // call remove_tense_suffix, line 306
                if (!r_remove_tense_suffix()) {
                  break lab2;
                }
              }
              base.cursor = v_2;
              continue replab0;
            }
            base.cursor = v_1;
            break replab0;
          }
          return true;
        };

        /** @return {boolean} */
        function r_remove_tense_suffix() {
          // (, line 309
          // unset found_a_match, line 310
          B_found_a_match = false;
          // call has_min_length, line 311
          if (!r_has_min_length()) {
            return false;
          }
          // backwards, line 312
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 312
          // do, line 313
          var /** number */ v_1 = base.limit - base.cursor;
          lab0: {
            // (, line 313
            // or, line 320
            lab1: {
              var /** number */ v_2 = base.limit - base.cursor;
              lab2: {
                // test, line 314
                var /** number */ v_3 = base.limit - base.cursor;
                // (, line 314
                // [, line 314
                base.ket = base.cursor;
                // among, line 314
                if (base.find_among_b(a_22) == 0) {
                  break lab2;
                }
                // ], line 317
                base.bra = base.cursor;
                // delete, line 317
                if (!base.slice_del()) {
                  return false;
                }
                // (, line 318
                // set found_a_match, line 318
                B_found_a_match = true;
                base.cursor = base.limit - v_3;
                break lab1;
              }
              base.cursor = base.limit - v_2;
              lab3: {
                // test, line 321
                var /** number */ v_4 = base.limit - base.cursor;
                // (, line 321
                // [, line 321
                base.ket = base.cursor;
                // or, line 322
                lab4: {
                  var /** number */ v_5 = base.limit - base.cursor;
                  lab5: {
                    // literal, line 322
                    if (!(base.eq_s_b("\u0BAE\u0BBE\u0BB0\u0BCD"))) {
                      break lab5;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab6: {
                    // literal, line 323
                    if (!(base.eq_s_b("\u0BAE\u0BBF\u0BA9\u0BCD"))) {
                      break lab6;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab7: {
                    // literal, line 324
                    if (!(base.eq_s_b("\u0BA9\u0BA9\u0BCD"))) {
                      break lab7;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab8: {
                    // literal, line 325
                    if (!(base.eq_s_b("\u0BA9\u0BBE\u0BA9\u0BCD"))) {
                      break lab8;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab9: {
                    // literal, line 326
                    if (!(base.eq_s_b("\u0BA9\u0BBE\u0BB3\u0BCD"))) {
                      break lab9;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab10: {
                    // literal, line 327
                    if (!(base.eq_s_b("\u0BA9\u0BBE\u0BB0\u0BCD"))) {
                      break lab10;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab11: {
                    // (, line 328
                    // literal, line 328
                    if (!(base.eq_s_b("\u0BB5\u0BA9\u0BCD"))) {
                      break lab11;
                    }
                    // test, line 328
                    var /** number */ v_6 = base.limit - base.cursor;
                    // (, line 328
                    // not, line 328
                    {
                      var /** number */ v_7 = base.limit - base.cursor;
                      lab12: {
                        // among, line 328
                        if (base.find_among_b(a_23) == 0) {
                          break lab12;
                        }
                        break lab11;
                      }
                      base.cursor = base.limit - v_7;
                    }
                    base.cursor = base.limit - v_6;
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab13: {
                    // literal, line 329
                    if (!(base.eq_s_b("\u0BA9\u0BB3\u0BCD"))) {
                      break lab13;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab14: {
                    // literal, line 330
                    if (!(base.eq_s_b("\u0BB5\u0BB3\u0BCD"))) {
                      break lab14;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab15: {
                    // literal, line 331
                    if (!(base.eq_s_b("\u0BA9\u0BB0\u0BCD"))) {
                      break lab15;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab16: {
                    // literal, line 332
                    if (!(base.eq_s_b("\u0BB5\u0BB0\u0BCD"))) {
                      break lab16;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab17: {
                    // literal, line 333
                    if (!(base.eq_s_b("\u0BA9"))) {
                      break lab17;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab18: {
                    // literal, line 333
                    if (!(base.eq_s_b("\u0BAA"))) {
                      break lab18;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab19: {
                    // literal, line 333
                    if (!(base.eq_s_b("\u0B95"))) {
                      break lab19;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab20: {
                    // literal, line 333
                    if (!(base.eq_s_b("\u0BA4"))) {
                      break lab20;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab21: {
                    // literal, line 333
                    if (!(base.eq_s_b("\u0BAF"))) {
                      break lab21;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab22: {
                    // literal, line 334
                    if (!(base.eq_s_b("\u0BAA\u0BA9\u0BCD"))) {
                      break lab22;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab23: {
                    // literal, line 335
                    if (!(base.eq_s_b("\u0BAA\u0BB3\u0BCD"))) {
                      break lab23;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab24: {
                    // literal, line 336
                    if (!(base.eq_s_b("\u0BAA\u0BB0\u0BCD"))) {
                      break lab24;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab25: {
                    // (, line 337
                    // literal, line 337
                    if (!(base.eq_s_b("\u0BA4\u0BC1"))) {
                      break lab25;
                    }
                    // (, line 337
                    // test, line 337
                    var /** number */ v_8 = base.limit - base.cursor;
                    // not, line 337
                    {
                      var /** number */ v_9 = base.limit - base.cursor;
                      lab26: {
                        // among, line 337
                        if (base.find_among_b(a_24) == 0) {
                          break lab26;
                        }
                        break lab25;
                      }
                      base.cursor = base.limit - v_9;
                    }
                    base.cursor = base.limit - v_8;
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab27: {
                    // literal, line 338
                    if (!(base.eq_s_b("\u0BBF\u0BB1\u0BCD\u0BB1\u0BC1"))) {
                      break lab27;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab28: {
                    // literal, line 339
                    if (!(base.eq_s_b("\u0BAA\u0BAE\u0BCD"))) {
                      break lab28;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab29: {
                    // literal, line 340
                    if (!(base.eq_s_b("\u0BA9\u0BAE\u0BCD"))) {
                      break lab29;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab30: {
                    // literal, line 341
                    if (!(base.eq_s_b("\u0BA4\u0BC1\u0BAE\u0BCD"))) {
                      break lab30;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab31: {
                    // literal, line 342
                    if (!(base.eq_s_b("\u0BB1\u0BC1\u0BAE\u0BCD"))) {
                      break lab31;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab32: {
                    // literal, line 343
                    if (!(base.eq_s_b("\u0B95\u0BC1\u0BAE\u0BCD"))) {
                      break lab32;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab33: {
                    // literal, line 344
                    if (!(base.eq_s_b("\u0BA9\u0BC6\u0BA9\u0BCD"))) {
                      break lab33;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  lab34: {
                    // literal, line 345
                    if (!(base.eq_s_b("\u0BA9\u0BC8"))) {
                      break lab34;
                    }
                    break lab4;
                  }
                  base.cursor = base.limit - v_5;
                  // literal, line 346
                  if (!(base.eq_s_b("\u0BB5\u0BC8"))) {
                    break lab3;
                  }
                }
                // ], line 347
                base.bra = base.cursor;
                // delete, line 347
                if (!base.slice_del()) {
                  return false;
                }
                // (, line 348
                // set found_a_match, line 348
                B_found_a_match = true;
                base.cursor = base.limit - v_4;
                break lab1;
              }
              base.cursor = base.limit - v_2;
              lab35: {
                // test, line 351
                var /** number */ v_10 = base.limit - base.cursor;
                // (, line 351
                // [, line 351
                base.ket = base.cursor;
                // or, line 352
                lab36: {
                  var /** number */ v_11 = base.limit - base.cursor;
                  lab37: {
                    // (, line 352
                    // literal, line 352
                    if (!(base.eq_s_b("\u0BBE\u0BA9\u0BCD"))) {
                      break lab37;
                    }
                    // test, line 352
                    var /** number */ v_12 = base.limit - base.cursor;
                    // (, line 352
                    // not, line 352
                    {
                      var /** number */ v_13 = base.limit - base.cursor;
                      lab38: {
                        // literal, line 352
                        if (!(base.eq_s_b("\u0B9A"))) {
                          break lab38;
                        }
                        break lab37;
                      }
                      base.cursor = base.limit - v_13;
                    }
                    base.cursor = base.limit - v_12;
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab39: {
                    // literal, line 353
                    if (!(base.eq_s_b("\u0BBE\u0BB3\u0BCD"))) {
                      break lab39;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab40: {
                    // literal, line 354
                    if (!(base.eq_s_b("\u0BBE\u0BB0\u0BCD"))) {
                      break lab40;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab41: {
                    // literal, line 355
                    if (!(base.eq_s_b("\u0BC7\u0BA9\u0BCD"))) {
                      break lab41;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab42: {
                    // literal, line 356
                    if (!(base.eq_s_b("\u0BBE"))) {
                      break lab42;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab43: {
                    // literal, line 357
                    if (!(base.eq_s_b("\u0BBE\u0BAE\u0BCD"))) {
                      break lab43;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab44: {
                    // literal, line 358
                    if (!(base.eq_s_b("\u0BC6\u0BAE\u0BCD"))) {
                      break lab44;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab45: {
                    // literal, line 359
                    if (!(base.eq_s_b("\u0BC7\u0BAE\u0BCD"))) {
                      break lab45;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab46: {
                    // literal, line 360
                    if (!(base.eq_s_b("\u0BCB\u0BAE\u0BCD"))) {
                      break lab46;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab47: {
                    // literal, line 361
                    if (!(base.eq_s_b("\u0B95\u0BC1\u0BAE\u0BCD"))) {
                      break lab47;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab48: {
                    // literal, line 362
                    if (!(base.eq_s_b("\u0BA4\u0BC1\u0BAE\u0BCD"))) {
                      break lab48;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab49: {
                    // literal, line 363
                    if (!(base.eq_s_b("\u0B9F\u0BC1\u0BAE\u0BCD"))) {
                      break lab49;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab50: {
                    // literal, line 364
                    if (!(base.eq_s_b("\u0BB1\u0BC1\u0BAE\u0BCD"))) {
                      break lab50;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab51: {
                    // literal, line 365
                    if (!(base.eq_s_b("\u0BBE\u0BAF\u0BCD"))) {
                      break lab51;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab52: {
                    // literal, line 366
                    if (!(base.eq_s_b("\u0BA9\u0BC6\u0BA9\u0BCD"))) {
                      break lab52;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab53: {
                    // literal, line 367
                    if (!(base.eq_s_b("\u0BA9\u0BBF\u0BB0\u0BCD"))) {
                      break lab53;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  lab54: {
                    // literal, line 368
                    if (!(base.eq_s_b("\u0BC0\u0BB0\u0BCD"))) {
                      break lab54;
                    }
                    break lab36;
                  }
                  base.cursor = base.limit - v_11;
                  // literal, line 369
                  if (!(base.eq_s_b("\u0BC0\u0BAF\u0BB0\u0BCD"))) {
                    break lab35;
                  }
                }
                // ], line 370
                base.bra = base.cursor;
                // <-, line 370
                if (!base.slice_from("\u0BCD")) {
                  return false;
                }
                // (, line 371
                // set found_a_match, line 371
                B_found_a_match = true;
                base.cursor = base.limit - v_10;
                break lab1;
              }
              base.cursor = base.limit - v_2;
              // test, line 374
              var /** number */ v_14 = base.limit - base.cursor;
              // (, line 374
              // (, line 374
              // [, line 374
              base.ket = base.cursor;
              // or, line 374
              lab55: {
                var /** number */ v_15 = base.limit - base.cursor;
                lab56: {
                  // literal, line 374
                  if (!(base.eq_s_b("\u0B95\u0BC1"))) {
                    break lab56;
                  }
                  break lab55;
                }
                base.cursor = base.limit - v_15;
                // literal, line 374
                if (!(base.eq_s_b("\u0BA4\u0BC1"))) {
                  break lab0;
                }
              }
              // (, line 374
              // test, line 374
              var /** number */ v_16 = base.limit - base.cursor;
              // literal, line 374
              if (!(base.eq_s_b("\u0BCD"))) {
                break lab0;
              }
              base.cursor = base.limit - v_16;
              // ], line 374
              base.bra = base.cursor;
              // delete, line 374
              if (!base.slice_del()) {
                return false;
              }
              // (, line 375
              // set found_a_match, line 375
              B_found_a_match = true;
              base.cursor = base.limit - v_14;
            }
          }
          base.cursor = base.limit - v_1;
          // do, line 378
          var /** number */ v_17 = base.limit - base.cursor;
          lab57: {
            // (, line 378
            // [, line 378
            base.ket = base.cursor;
            // among, line 378
            if (base.find_among_b(a_25) == 0) {
              break lab57;
            }
            // ], line 385
            base.bra = base.cursor;
            // delete, line 385
            if (!base.slice_del()) {
              return false;
            }
            // (, line 386
            // set found_a_match, line 386
            B_found_a_match = true;
          }
          base.cursor = base.limit - v_17;
          base.cursor = base.limit_backward;
          // do, line 389
          lab58: {
            // call fix_endings, line 389
            if (!r_fix_endings()) {
              break lab58;
            }
          }
          return true;
        };

        this.stem = /** @return {boolean} */ function() {
          // (, line 392
          // unset found_vetrumai_urupu, line 393
          B_found_vetrumai_urupu = false;
          // do, line 394
          var /** number */ v_1 = base.cursor;
          lab0: {
            // call fix_ending, line 394
            if (!r_fix_ending()) {
              break lab0;
            }
          }
          base.cursor = v_1;
          // call has_min_length, line 395
          if (!r_has_min_length()) {
            return false;
          }
          // do, line 396
          var /** number */ v_2 = base.cursor;
          lab1: {
            // call remove_question_prefixes, line 396
            if (!r_remove_question_prefixes()) {
              break lab1;
            }
          }
          base.cursor = v_2;
          // do, line 397
          var /** number */ v_3 = base.cursor;
          lab2: {
            // call remove_pronoun_prefixes, line 397
            if (!r_remove_pronoun_prefixes()) {
              break lab2;
            }
          }
          base.cursor = v_3;
          // do, line 398
          var /** number */ v_4 = base.cursor;
          lab3: {
            // call remove_question_suffixes, line 398
            if (!r_remove_question_suffixes()) {
              break lab3;
            }
          }
          base.cursor = v_4;
          // do, line 399
          var /** number */ v_5 = base.cursor;
          lab4: {
            // call remove_um, line 399
            if (!r_remove_um()) {
              break lab4;
            }
          }
          base.cursor = v_5;
          // do, line 400
          var /** number */ v_6 = base.cursor;
          lab5: {
            // call remove_common_word_endings, line 400
            if (!r_remove_common_word_endings()) {
              break lab5;
            }
          }
          base.cursor = v_6;
          // do, line 401
          var /** number */ v_7 = base.cursor;
          lab6: {
            // call remove_vetrumai_urupukal, line 401
            if (!r_remove_vetrumai_urupukal()) {
              break lab6;
            }
          }
          base.cursor = v_7;
          // do, line 402
          var /** number */ v_8 = base.cursor;
          lab7: {
            // call remove_plural_suffix, line 402
            if (!r_remove_plural_suffix()) {
              break lab7;
            }
          }
          base.cursor = v_8;
          // do, line 403
          var /** number */ v_9 = base.cursor;
          lab8: {
            // call remove_command_suffixes, line 403
            if (!r_remove_command_suffixes()) {
              break lab8;
            }
          }
          base.cursor = v_9;
          // do, line 404
          var /** number */ v_10 = base.cursor;
          lab9: {
            // call remove_tense_suffixes, line 404
            if (!r_remove_tense_suffixes()) {
              break lab9;
            }
          }
          base.cursor = v_10;
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
            return st.stemWord(word);
          })
        } else { // for lunr version <= 1
          return st.stemWord(token);
        }
      }
    })();

    lunr.Pipeline.registerFunction(lunr.ta.stemmer, 'stemmer-ta');

    lunr.ta.stopWordFilter = lunr.generateStopWordFilter("".split(' '));

    lunr.Pipeline.registerFunction(lunr.ta.stopWordFilter, 'stopWordFilter-ta');
  };
}))