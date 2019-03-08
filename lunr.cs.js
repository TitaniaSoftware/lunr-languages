/*!
 * Lunr languages, `czech-stemmer.js` language
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
    lunr.cs = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.cs.trimmer,
        lunr.cs.stopWordFilter,
        lunr.cs.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.cs.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.cs.wordCharacters = "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A";
    lunr.cs.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.cs.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.cs.trimmer, 'trimmer-cs');

    /* lunr stemmer function */
    lunr.cs.stemmer = (function() {
      /* create the wrapped stemmer object */
      var st = new function() {
        var base = new BaseStemmer();
        /** @const */
        var a_0 = [
          ["ce", -1, 1],
          ["ze", -1, 2],
          ["\u00BEe", -1, 2],
          ["ci", -1, 1],
          ["\u00B9ti", -1, 4],
          ["\u00E8ti", -1, 3],
          ["zi", -1, 2],
          ["\u00BEi", -1, 2],
          ["\u00E8i", -1, 1],
          ["\u00E8", -1, 1],
          ["\u00B9t\u00E9", -1, 4],
          ["\u00E8t\u00E9", -1, 3],
          ["\u00B9t\u00EC", -1, 4],
          ["\u00E8t\u00EC", -1, 3]
        ];

        /** @const */
        var a_1 = [
          ["in", -1, 2],
          ["ov", -1, 1],
          ["\u00F9v", -1, 1]
        ];

        /** @const */
        var a_2 = [
          ["a", -1, 1],
          ["ama", 0, 1],
          ["ata", 0, 1],
          ["e", -1, 2],
          ["\u00ECte", 3, 2],
          ["ech", -1, 2],
          ["atech", 5, 1],
          ["ich", -1, 2],
          ["\u00E1ch", -1, 1],
          ["\u00EDch", -1, 2],
          ["\u00FDch", -1, 1],
          ["i", -1, 2],
          ["mi", 11, 1],
          ["ami", 12, 1],
          ["emi", 12, 2],
          ["\u00ECmi", 12, 2],
          ["\u00EDmi", 12, 2],
          ["\u00FDmi", 12, 1],
          ["\u00ECti", 11, 2],
          ["ovi", 11, 1],
          ["em", -1, 3],
          ["\u00ECtem", 20, 1],
          ["\u00E1m", -1, 1],
          ["\u00E9m", -1, 2],
          ["\u00EDm", -1, 2],
          ["at\u00F9m", -1, 1],
          ["\u00FDm", -1, 1],
          ["o", -1, 1],
          ["iho", 27, 2],
          ["\u00E9ho", 27, 2],
          ["\u00EDho", 27, 2],
          ["es", -1, 2],
          ["os", -1, 1],
          ["us", -1, 1],
          ["at", -1, 1],
          ["u", -1, 1],
          ["imu", 35, 2],
          ["\u00E9mu", 35, 2],
          ["ou", 35, 1],
          ["y", -1, 1],
          ["aty", 39, 1],
          ["\u00E1", -1, 1],
          ["\u00E9", -1, 1],
          ["ov\u00E9", 42, 1],
          ["\u00EC", -1, 2],
          ["\u00ED", -1, 2],
          ["\u00F9", -1, 1],
          ["\u00FD", -1, 1]
        ];

        /** @const */
        var a_3 = [
          ["ob", -1, 1],
          ["itb", -1, 2],
          ["ec", -1, 3],
          ["inec", 2, 2],
          ["obinec", 3, 1],
          ["ovec", 2, 1],
          ["ic", -1, 2],
          ["enic", 6, 3],
          ["och", -1, 1],
          ["\u00E1sek", -1, 1],
          ["nk", -1, 1],
          ["isk", -1, 2],
          ["ovisk", 11, 1],
          ["tk", -1, 1],
          ["vk", -1, 1],
          ["i\u00B9k", -1, 2],
          ["u\u00B9k", -1, 1],
          ["\u00E8k", -1, 1],
          ["n\u00EDk", -1, 1],
          ["ovn\u00EDk", 18, 1],
          ["ov\u00EDk", -1, 1],
          ["dl", -1, 1],
          ["itel", -1, 2],
          ["ul", -1, 1],
          ["an", -1, 1],
          ["\u00E8an", 24, 1],
          ["en", -1, 3],
          ["in", -1, 2],
          ["\u00B9tin", 27, 1],
          ["ovin", 27, 1],
          ["teln", -1, 1],
          ["\u00E1rn", -1, 1],
          ["\u00EDrn", -1, 6],
          ["oun", -1, 1],
          ["loun", 33, 1],
          ["ovn", -1, 1],
          ["yn", -1, 1],
          ["kyn", 36, 1],
          ["\u00E1n", -1, 1],
          ["i\u00E1n", 38, 2],
          ["\u00E8n", -1, 1],
          ["\u00ECn", -1, 5],
          ["\u00EDn", -1, 6],
          ["as", -1, 1],
          ["it", -1, 2],
          ["ot", -1, 1],
          ["ist", -1, 2],
          ["ost", -1, 1],
          ["nost", 47, 1],
          ["out", -1, 1],
          ["ovi\u00B9t", -1, 1],
          ["iv", -1, 2],
          ["ov", -1, 1],
          ["tv", -1, 1],
          ["ctv", 53, 1],
          ["stv", 53, 1],
          ["ovstv", 55, 1],
          ["ovtv", 53, 1],
          ["ou\u00B9", -1, 1],
          ["a\u00E8", -1, 1],
          ["\u00E1\u00E8", -1, 1],
          ["o\u00F2", -1, 1],
          ["\u00E1\u00F8", -1, 1],
          ["k\u00E1\u00F8", 62, 1],
          ["ion\u00E1\u00F8", 62, 2],
          ["\u00E9\u00F8", -1, 4],
          ["n\u00E9\u00F8", 65, 1],
          ["\u00ED\u00F8", -1, 6]
        ];

        /** @const */
        var a_4 = [
          ["c", -1, 1],
          ["k", -1, 1],
          ["l", -1, 1],
          ["n", -1, 1],
          ["t", -1, 1],
          ["\u00E8", -1, 1]
        ];

        /** @const */
        var a_5 = [
          ["isk", -1, 2],
          ["\u00E1k", -1, 1],
          ["izn", -1, 2],
          ["ajzn", -1, 1]
        ];

        /** @const */
        var a_6 = [
          ["k", -1, 1],
          ["ak", 0, 7],
          ["ek", 0, 2],
          ["anek", 2, 1],
          ["enek", 2, 2],
          ["inek", 2, 4],
          ["onek", 2, 1],
          ["unek", 2, 1],
          ["\u00E1nek", 2, 1],
          ["ou\u00B9ek", 2, 1],
          ["a\u00E8ek", 2, 1],
          ["e\u00E8ek", 2, 2],
          ["i\u00E8ek", 2, 4],
          ["o\u00E8ek", 2, 1],
          ["u\u00E8ek", 2, 1],
          ["\u00E1\u00E8ek", 2, 1],
          ["\u00E9\u00E8ek", 2, 3],
          ["\u00ED\u00E8ek", 2, 5],
          ["ik", 0, 4],
          ["ank", 0, 1],
          ["enk", 0, 1],
          ["ink", 0, 1],
          ["onk", 0, 1],
          ["unk", 0, 1],
          ["\u00E1nk", 0, 1],
          ["\u00E9nk", 0, 1],
          ["\u00EDnk", 0, 1],
          ["ok", 0, 8],
          ["\u00E1tk", 0, 1],
          ["uk", 0, 9],
          ["u\u00B9k", 0, 1],
          ["\u00E1k", 0, 6],
          ["a\u00E8k", 0, 1],
          ["e\u00E8k", 0, 1],
          ["i\u00E8k", 0, 1],
          ["o\u00E8k", 0, 1],
          ["u\u00E8k", 0, 1],
          ["\u00E1\u00E8k", 0, 1],
          ["\u00E9\u00E8k", 0, 1],
          ["\u00ED\u00E8k", 0, 1],
          ["\u00E9k", 0, 3],
          ["\u00EDk", 0, 5]
        ];

        /** @const */
        var a_7 = [
          ["ej\u00B9", -1, 2],
          ["\u00ECj\u00B9", -1, 1]
        ];

        /** @const */
        var /** Array<int> */ g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 25, 4, 19];

        var /** number */ I_p1 = 0;
        var /** number */ I_pV = 0;


        /** @return {boolean} */
        function r_mark_regions() {
          // (, line 43
          I_pV = base.limit;
          I_p1 = base.limit;
          // do, line 48
          var /** number */ v_1 = base.cursor;
          lab0: {
            // (, line 48
            // gopast, line 49
            golab1: while (true) {
              lab2: {
                if (!(base.out_grouping(g_v, 97, 253))) {
                  break lab2;
                }
                break golab1;
              }
              if (base.cursor >= base.limit) {
                break lab0;
              }
              base.cursor++;
            }
            // setmark pV, line 49
            I_pV = base.cursor;
            // gopast, line 50
            golab3: while (true) {
              lab4: {
                if (!(base.out_grouping(g_v, 97, 253))) {
                  break lab4;
                }
                break golab3;
              }
              if (base.cursor >= base.limit) {
                break lab0;
              }
              base.cursor++;
            }
            // gopast, line 50
            golab5: while (true) {
              lab6: {
                if (!(base.in_grouping(g_v, 97, 253))) {
                  break lab6;
                }
                break golab5;
              }
              if (base.cursor >= base.limit) {
                break lab0;
              }
              base.cursor++;
            }
            // setmark p1, line 50
            I_p1 = base.cursor;
          }
          base.cursor = v_1;
          return true;
        };

        /** @return {boolean} */
        function r_RV() {
          if (!(I_pV <= base.cursor)) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_R1() {
          if (!(I_p1 <= base.cursor)) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_palatalise() {
          var /** number */ among_var;
          // (, line 59
          // [, line 60
          base.ket = base.cursor;
          // substring, line 60
          among_var = base.find_among_b(a_0);
          if (among_var == 0) {
            return false;
          }
          // ], line 60
          base.bra = base.cursor;
          // call RV, line 60
          if (!r_RV()) {
            return false;
          }
          switch (among_var) {
            case 1:
              // (, line 62
              // <-, line 62
              if (!base.slice_from("k")) {
                return false;
              }
              break;
            case 2:
              // (, line 64
              // <-, line 64
              if (!base.slice_from("h")) {
                return false;
              }
              break;
            case 3:
              // (, line 66
              // <-, line 66
              if (!base.slice_from("ck")) {
                return false;
              }
              break;
            case 4:
              // (, line 68
              // <-, line 68
              if (!base.slice_from("sk")) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_do_possessive() {
          var /** number */ among_var;
          // (, line 72
          // [, line 73
          base.ket = base.cursor;
          // substring, line 73
          among_var = base.find_among_b(a_1);
          if (among_var == 0) {
            return false;
          }
          // ], line 73
          base.bra = base.cursor;
          // call RV, line 73
          if (!r_RV()) {
            return false;
          }
          switch (among_var) {
            case 1:
              // (, line 75
              // delete, line 75
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 77
              // delete, line 78
              if (!base.slice_del()) {
                return false;
              }
              // try, line 79
              var /** number */ v_1 = base.limit - base.cursor;
              lab0: {
                // call palatalise, line 79
                if (!r_palatalise()) {
                  base.cursor = base.limit - v_1;
                  break lab0;
                }
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_do_case() {
          var /** number */ among_var;
          // (, line 84
          // [, line 85
          base.ket = base.cursor;
          // substring, line 85
          among_var = base.find_among_b(a_2);
          if (among_var == 0) {
            return false;
          }
          // ], line 85
          base.bra = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 92
              // delete, line 92
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 98
              // delete, line 99
              if (!base.slice_del()) {
                return false;
              }
              // try, line 100
              var /** number */ v_1 = base.limit - base.cursor;
              lab0: {
                // call palatalise, line 100
                if (!r_palatalise()) {
                  base.cursor = base.limit - v_1;
                  break lab0;
                }
              }
              break;
            case 3:
              // (, line 103
              // <-, line 104
              if (!base.slice_from("e")) {
                return false;
              }
              // try, line 105
              var /** number */ v_2 = base.limit - base.cursor;
              lab1: {
                // call palatalise, line 105
                if (!r_palatalise()) {
                  base.cursor = base.limit - v_2;
                  break lab1;
                }
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_do_derivational() {
          var /** number */ among_var;
          // (, line 110
          // [, line 111
          base.ket = base.cursor;
          // substring, line 111
          among_var = base.find_among_b(a_3);
          if (among_var == 0) {
            return false;
          }
          // ], line 111
          base.bra = base.cursor;
          // call R1, line 111
          if (!r_R1()) {
            return false;
          }
          switch (among_var) {
            case 1:
              // (, line 120
              // delete, line 120
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 125
              // <-, line 126
              if (!base.slice_from("i")) {
                return false;
              }
              // call palatalise, line 127
              if (!r_palatalise()) {
                return false;
              }
              break;
            case 3:
              // (, line 130
              // <-, line 131
              if (!base.slice_from("e")) {
                return false;
              }
              // call palatalise, line 132
              if (!r_palatalise()) {
                return false;
              }
              break;
            case 4:
              // (, line 135
              // <-, line 136
              if (!base.slice_from("\u00E9")) {
                return false;
              }
              // call palatalise, line 137
              if (!r_palatalise()) {
                return false;
              }
              break;
            case 5:
              // (, line 140
              // <-, line 141
              if (!base.slice_from("\u00EC")) {
                return false;
              }
              // call palatalise, line 142
              if (!r_palatalise()) {
                return false;
              }
              break;
            case 6:
              // (, line 146
              // <-, line 147
              if (!base.slice_from("\u00ED")) {
                return false;
              }
              // call palatalise, line 148
              if (!r_palatalise()) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_do_deriv_single() {
          // (, line 152
          // [, line 153
          base.ket = base.cursor;
          // substring, line 153
          if (base.find_among_b(a_4) == 0) {
            return false;
          }
          // ], line 153
          base.bra = base.cursor;
          // (, line 155
          // delete, line 155
          if (!base.slice_del()) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_do_augmentative() {
          var /** number */ among_var;
          // (, line 160
          // [, line 161
          base.ket = base.cursor;
          // substring, line 161
          among_var = base.find_among_b(a_5);
          if (among_var == 0) {
            return false;
          }
          // ], line 161
          base.bra = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 163
              // delete, line 163
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 165
              // <-, line 166
              if (!base.slice_from("i")) {
                return false;
              }
              // call palatalise, line 167
              if (!r_palatalise()) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_do_diminutive() {
          var /** number */ among_var;
          // (, line 172
          // [, line 173
          base.ket = base.cursor;
          // substring, line 173
          among_var = base.find_among_b(a_6);
          if (among_var == 0) {
            return false;
          }
          // ], line 173
          base.bra = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 180
              // delete, line 180
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 182
              // <-, line 183
              if (!base.slice_from("e")) {
                return false;
              }
              // call palatalise, line 184
              if (!r_palatalise()) {
                return false;
              }
              break;
            case 3:
              // (, line 187
              // <-, line 188
              if (!base.slice_from("\u00E9")) {
                return false;
              }
              // call palatalise, line 189
              if (!r_palatalise()) {
                return false;
              }
              break;
            case 4:
              // (, line 192
              // <-, line 193
              if (!base.slice_from("i")) {
                return false;
              }
              // call palatalise, line 194
              if (!r_palatalise()) {
                return false;
              }
              break;
            case 5:
              // (, line 197
              // <-, line 198
              if (!base.slice_from("\u00ED")) {
                return false;
              }
              // call palatalise, line 199
              if (!r_palatalise()) {
                return false;
              }
              break;
            case 6:
              // (, line 202
              // <-, line 202
              if (!base.slice_from("\u00E1")) {
                return false;
              }
              break;
            case 7:
              // (, line 204
              // <-, line 204
              if (!base.slice_from("a")) {
                return false;
              }
              break;
            case 8:
              // (, line 206
              // <-, line 206
              if (!base.slice_from("o")) {
                return false;
              }
              break;
            case 9:
              // (, line 208
              // <-, line 208
              if (!base.slice_from("u")) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_do_comparative() {
          var /** number */ among_var;
          // (, line 212
          // [, line 213
          base.ket = base.cursor;
          // substring, line 213
          among_var = base.find_among_b(a_7);
          if (among_var == 0) {
            return false;
          }
          // ], line 213
          base.bra = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 215
              // <-, line 216
              if (!base.slice_from("\u00EC")) {
                return false;
              }
              // call palatalise, line 217
              if (!r_palatalise()) {
                return false;
              }
              break;
            case 2:
              // (, line 220
              // <-, line 221
              if (!base.slice_from("e")) {
                return false;
              }
              // call palatalise, line 222
              if (!r_palatalise()) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_do_aggressive() {
          // (, line 227
          // do, line 228
          var /** number */ v_1 = base.limit - base.cursor;
          lab0: {
            // call do_comparative, line 228
            if (!r_do_comparative()) {
              break lab0;
            }
          }
          base.cursor = base.limit - v_1;
          // do, line 229
          var /** number */ v_2 = base.limit - base.cursor;
          lab1: {
            // call do_diminutive, line 229
            if (!r_do_diminutive()) {
              break lab1;
            }
          }
          base.cursor = base.limit - v_2;
          // do, line 230
          var /** number */ v_3 = base.limit - base.cursor;
          lab2: {
            // call do_augmentative, line 230
            if (!r_do_augmentative()) {
              break lab2;
            }
          }
          base.cursor = base.limit - v_3;
          // or, line 231
          lab3: {
            var /** number */ v_4 = base.limit - base.cursor;
            lab4: {
              // call do_derivational, line 231
              if (!r_do_derivational()) {
                break lab4;
              }
              break lab3;
            }
            base.cursor = base.limit - v_4;
            // call do_deriv_single, line 231
            if (!r_do_deriv_single()) {
              return false;
            }
          }
          return true;
        };

        this.stem = /** @return {boolean} */ function() {
          // (, line 235
          // do, line 236
          lab0: {
            // call mark_regions, line 236
            if (!r_mark_regions()) {
              break lab0;
            }
          }
          // backwards, line 237
          base.limit_backward = base.cursor;base.cursor = base.limit;
          // (, line 237
          // call do_case, line 238
          if (!r_do_case()) {
            return false;
          }
          // call do_possessive, line 239
          if (!r_do_possessive()) {
            return false;
          }
          // call do_aggressive, line 242
          if (!r_do_aggressive()) {
            return false;
          }
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
            return st.stemWord(word);
          })
        } else { // for lunr version <= 1
          return st.stemWord(token);
        }
      }
    })();

    lunr.Pipeline.registerFunction(lunr.cs.stemmer, 'stemmer-cs');

    lunr.cs.stopWordFilter = lunr.generateStopWordFilter("a aby ahoj aj ale anebo ani aniž ano asi aspoåˆ aspoň atd atp az aäkoli ačkoli až bez beze blã­zko blízko bohuå¾el bohužel brzo bude budem budeme budes budete budeå¡ budeš budou budu by byl byla byli bylo byly bys byt bä›hem být během chce chceme chcete chceå¡ chceš chci chtã­t chtä›jã­ chtít chtějí chut' chuti ci clanek clanku clanky co coz což cz daleko dalsi další den deset design devatenáct devatenã¡ct devä›t devět dnes do dobrã½ dobrý docela dva dvacet dvanáct dvanã¡ct dvä› dvě dál dále dã¡l dã¡le dä›kovat dä›kujeme dä›kuji děkovat děkujeme děkuji email ho hodnä› hodně i jak jakmile jako jakož jde je jeden jedenáct jedenã¡ct jedna jedno jednou jedou jeho jehož jej jeji jejich jejã­ její jelikož jemu jen jenom jenž jeste jestli jestliå¾e jestliže jeå¡tä› ještě jež ji jich jimi jinak jine jiné jiz již jsem jses jseš jsi jsme jsou jste já jã¡ jã­ jã­m jí jím jíž jšte k kam každý kde kdo kdy kdyz kdyå¾ když ke kolik kromä› kromě ktera ktere kteri kterou ktery která kterã¡ kterã© kterã½ které který kteå™ã­ kteři kteří ku kvå¯li kvůli ma majã­ mají mate me mezi mi mit mne mnou mnä› mně moc mohl mohou moje moji moå¾nã¡ možná muj musã­ musí muze my má málo mám máme máte máš mã¡ mã¡lo mã¡m mã¡me mã¡te mã¡å¡ mã© mã­ mã­t mä› må¯j må¯å¾e mé mí mít mě můj může na nad nade nam napiste napište naproti nas nasi naå¡e naå¡i načež naše naši ne nebo nebyl nebyla nebyli nebyly nechť nedä›lajã­ nedä›lã¡ nedä›lã¡m nedä›lã¡me nedä›lã¡te nedä›lã¡å¡ nedělají nedělá nedělám neděláme neděláte neděláš neg nejsi nejsou nemajã­ nemají nemáme nemáte nemã¡me nemã¡te nemä›l neměl neni nenã­ není nestaäã­ nestačí nevadã­ nevadí nez neå¾ než nic nich nimi nove novy nové nový nula ná nám námi nás náš nã¡m nã¡mi nã¡s nã¡å¡ nã­m nä› nä›co nä›jak nä›kde nä›kdo nä›mu ní ním ně něco nějak někde někdo němu němuž o od ode on ona oni ono ony osm osmnáct osmnã¡ct pak patnáct patnã¡ct po pod podle pokud potom pouze pozdä› pozdě poå™ã¡d pořád prave pravé pred pres pri pro proc prostä› prostě prosã­m prosím proti proto protoze protoå¾e protože proä proč prvni první práve pta pä›t på™ed på™es på™ese pět před přede přes přese při přičemž re rovnä› rovně s se sedm sedmnáct sedmnã¡ct si sice skoro smã­ smä›jã­ smí smějí snad spolu sta sto strana stã© sté sve svych svym svymi své svých svým svými svůj ta tady tak take takhle taky takze také takže tam tamhle tamhleto tamto tato te tebe tebou ted' tedy tema ten tento teto ti tim timto tipy tisã­c tisã­ce tisíc tisíce to tobä› tobě tohle toho tohoto tom tomto tomu tomuto toto troå¡ku trošku tu tuto tvoje tvá tvã¡ tvã© två¯j tvé tvůj ty tyto tä› tå™eba tå™i tå™inã¡ct téma této tím tímto tě těm těma těmu třeba tři třináct u uräitä› určitě uz uå¾ už v vam vas vase vaå¡e vaå¡i vaše vaši ve vedle veäer večer vice vlastnä› vlastně vsak vy vám vámi vás váš vã¡m vã¡mi vã¡s vã¡å¡ vå¡echno vå¡ichni vå¯bec vå¾dy více však všechen všechno všichni vůbec vždy z za zatã­mco zatímco zaä zač zda zde ze zpet zpravy zprávy zpět äau ätrnã¡ct ätyå™i å¡est å¡estnã¡ct å¾e čau či článek článku články čtrnáct čtyři šest šestnáct že".split(' '));

    lunr.Pipeline.registerFunction(lunr.cs.stopWordFilter, 'stopWordFilter-cs');
  };
}))