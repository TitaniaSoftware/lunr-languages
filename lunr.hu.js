/*!
 * Lunr languages, `hungarian-stemmer.js` language
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
    if ('undefined' === typeof lunr.trimmerSupport) {
      throw new Error('Lunr trimmer support is not present. Please include / require Lunr trimmer support before this script.');
    }

    /* register specific locale function */
    lunr.hu = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.hu.trimmer,
        lunr.hu.stopWordFilter,
        lunr.hu.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.hu.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.hu.wordCharacters = "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A";
    lunr.hu.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.hu.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.hu.trimmer, 'trimmer-hu');

    /* lunr stemmer function */
    lunr.hu.stemmer = (function() {
      /* create the wrapped stemmer object */
      var st = new function() {
        var base = new BaseStemmer();
        /** @const */
        var a_0 = [
          ["cs", -1, -1],
          ["dzs", -1, -1],
          ["gy", -1, -1],
          ["ly", -1, -1],
          ["ny", -1, -1],
          ["sz", -1, -1],
          ["ty", -1, -1],
          ["zs", -1, -1]
        ];

        /** @const */
        var a_1 = [
          ["\u00E1", -1, 1],
          ["\u00E9", -1, 2]
        ];

        /** @const */
        var a_2 = [
          ["bb", -1, -1],
          ["cc", -1, -1],
          ["dd", -1, -1],
          ["ff", -1, -1],
          ["gg", -1, -1],
          ["jj", -1, -1],
          ["kk", -1, -1],
          ["ll", -1, -1],
          ["mm", -1, -1],
          ["nn", -1, -1],
          ["pp", -1, -1],
          ["rr", -1, -1],
          ["ccs", -1, -1],
          ["ss", -1, -1],
          ["zzs", -1, -1],
          ["tt", -1, -1],
          ["vv", -1, -1],
          ["ggy", -1, -1],
          ["lly", -1, -1],
          ["nny", -1, -1],
          ["tty", -1, -1],
          ["ssz", -1, -1],
          ["zz", -1, -1]
        ];

        /** @const */
        var a_3 = [
          ["al", -1, 1],
          ["el", -1, 1]
        ];

        /** @const */
        var a_4 = [
          ["ba", -1, -1],
          ["ra", -1, -1],
          ["be", -1, -1],
          ["re", -1, -1],
          ["ig", -1, -1],
          ["nak", -1, -1],
          ["nek", -1, -1],
          ["val", -1, -1],
          ["vel", -1, -1],
          ["ul", -1, -1],
          ["n\u00E1l", -1, -1],
          ["n\u00E9l", -1, -1],
          ["b\u00F3l", -1, -1],
          ["r\u00F3l", -1, -1],
          ["t\u00F3l", -1, -1],
          ["\u00FCl", -1, -1],
          ["b\u0151l", -1, -1],
          ["r\u0151l", -1, -1],
          ["t\u0151l", -1, -1],
          ["n", -1, -1],
          ["an", 19, -1],
          ["ban", 20, -1],
          ["en", 19, -1],
          ["ben", 22, -1],
          ["k\u00E9ppen", 22, -1],
          ["on", 19, -1],
          ["\u00F6n", 19, -1],
          ["k\u00E9pp", -1, -1],
          ["kor", -1, -1],
          ["t", -1, -1],
          ["at", 29, -1],
          ["et", 29, -1],
          ["k\u00E9nt", 29, -1],
          ["ank\u00E9nt", 32, -1],
          ["enk\u00E9nt", 32, -1],
          ["onk\u00E9nt", 32, -1],
          ["ot", 29, -1],
          ["\u00E9rt", 29, -1],
          ["\u00F6t", 29, -1],
          ["hez", -1, -1],
          ["hoz", -1, -1],
          ["h\u00F6z", -1, -1],
          ["v\u00E1", -1, -1],
          ["v\u00E9", -1, -1]
        ];

        /** @const */
        var a_5 = [
          ["\u00E1n", -1, 2],
          ["\u00E9n", -1, 1],
          ["\u00E1nk\u00E9nt", -1, 2]
        ];

        /** @const */
        var a_6 = [
          ["stul", -1, 1],
          ["astul", 0, 1],
          ["\u00E1stul", 0, 2],
          ["st\u00FCl", -1, 1],
          ["est\u00FCl", 3, 1],
          ["\u00E9st\u00FCl", 3, 3]
        ];

        /** @const */
        var a_7 = [
          ["\u00E1", -1, 1],
          ["\u00E9", -1, 1]
        ];

        /** @const */
        var a_8 = [
          ["k", -1, 3],
          ["ak", 0, 3],
          ["ek", 0, 3],
          ["ok", 0, 3],
          ["\u00E1k", 0, 1],
          ["\u00E9k", 0, 2],
          ["\u00F6k", 0, 3]
        ];

        /** @const */
        var a_9 = [
          ["\u00E9i", -1, 1],
          ["\u00E1\u00E9i", 0, 3],
          ["\u00E9\u00E9i", 0, 2],
          ["\u00E9", -1, 1],
          ["k\u00E9", 3, 1],
          ["ak\u00E9", 4, 1],
          ["ek\u00E9", 4, 1],
          ["ok\u00E9", 4, 1],
          ["\u00E1k\u00E9", 4, 3],
          ["\u00E9k\u00E9", 4, 2],
          ["\u00F6k\u00E9", 4, 1],
          ["\u00E9\u00E9", 3, 2]
        ];

        /** @const */
        var a_10 = [
          ["a", -1, 1],
          ["ja", 0, 1],
          ["d", -1, 1],
          ["ad", 2, 1],
          ["ed", 2, 1],
          ["od", 2, 1],
          ["\u00E1d", 2, 2],
          ["\u00E9d", 2, 3],
          ["\u00F6d", 2, 1],
          ["e", -1, 1],
          ["je", 9, 1],
          ["nk", -1, 1],
          ["unk", 11, 1],
          ["\u00E1nk", 11, 2],
          ["\u00E9nk", 11, 3],
          ["\u00FCnk", 11, 1],
          ["uk", -1, 1],
          ["juk", 16, 1],
          ["\u00E1juk", 17, 2],
          ["\u00FCk", -1, 1],
          ["j\u00FCk", 19, 1],
          ["\u00E9j\u00FCk", 20, 3],
          ["m", -1, 1],
          ["am", 22, 1],
          ["em", 22, 1],
          ["om", 22, 1],
          ["\u00E1m", 22, 2],
          ["\u00E9m", 22, 3],
          ["o", -1, 1],
          ["\u00E1", -1, 2],
          ["\u00E9", -1, 3]
        ];

        /** @const */
        var a_11 = [
          ["id", -1, 1],
          ["aid", 0, 1],
          ["jaid", 1, 1],
          ["eid", 0, 1],
          ["jeid", 3, 1],
          ["\u00E1id", 0, 2],
          ["\u00E9id", 0, 3],
          ["i", -1, 1],
          ["ai", 7, 1],
          ["jai", 8, 1],
          ["ei", 7, 1],
          ["jei", 10, 1],
          ["\u00E1i", 7, 2],
          ["\u00E9i", 7, 3],
          ["itek", -1, 1],
          ["eitek", 14, 1],
          ["jeitek", 15, 1],
          ["\u00E9itek", 14, 3],
          ["ik", -1, 1],
          ["aik", 18, 1],
          ["jaik", 19, 1],
          ["eik", 18, 1],
          ["jeik", 21, 1],
          ["\u00E1ik", 18, 2],
          ["\u00E9ik", 18, 3],
          ["ink", -1, 1],
          ["aink", 25, 1],
          ["jaink", 26, 1],
          ["eink", 25, 1],
          ["jeink", 28, 1],
          ["\u00E1ink", 25, 2],
          ["\u00E9ink", 25, 3],
          ["aitok", -1, 1],
          ["jaitok", 32, 1],
          ["\u00E1itok", -1, 2],
          ["im", -1, 1],
          ["aim", 35, 1],
          ["jaim", 36, 1],
          ["eim", 35, 1],
          ["jeim", 38, 1],
          ["\u00E1im", 35, 2],
          ["\u00E9im", 35, 3]
        ];

        /** @const */
        var /** Array<int> */ g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 36, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1];

        var /** number */ I_p1 = 0;


        /** @return {boolean} */
        function r_mark_regions() {
          // (, line 44
          I_p1 = base.limit;
          // or, line 51
          lab0: {
            var /** number */ v_1 = base.cursor;
            lab1: {
              // (, line 48
              if (!(base.in_grouping(g_v, 97, 369))) {
                break lab1;
              }
              // goto, line 48
              golab2: while (true) {
                var /** number */ v_2 = base.cursor;
                lab3: {
                  if (!(base.out_grouping(g_v, 97, 369))) {
                    break lab3;
                  }
                  base.cursor = v_2;
                  break golab2;
                }
                base.cursor = v_2;
                if (base.cursor >= base.limit) {
                  break lab1;
                }
                base.cursor++;
              }
              // or, line 49
              lab4: {
                var /** number */ v_3 = base.cursor;
                lab5: {
                  // among, line 49
                  if (base.find_among(a_0) == 0) {
                    break lab5;
                  }
                  break lab4;
                }
                base.cursor = v_3;
                // next, line 49
                if (base.cursor >= base.limit) {
                  break lab1;
                }
                base.cursor++;
              }
              // setmark p1, line 50
              I_p1 = base.cursor;
              break lab0;
            }
            base.cursor = v_1;
            // (, line 53
            if (!(base.out_grouping(g_v, 97, 369))) {
              return false;
            }
            // gopast, line 53
            golab6: while (true) {
              lab7: {
                if (!(base.in_grouping(g_v, 97, 369))) {
                  break lab7;
                }
                break golab6;
              }
              if (base.cursor >= base.limit) {
                return false;
              }
              base.cursor++;
            }
            // setmark p1, line 53
            I_p1 = base.cursor;
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
        function r_v_ending() {
          var /** number */ among_var;
          // (, line 60
          // [, line 61
          base.ket = base.cursor;
          // substring, line 61
          among_var = base.find_among_b(a_1);
          if (among_var == 0) {
            return false;
          }
          // ], line 61
          base.bra = base.cursor;
          // call R1, line 61
          if (!r_R1()) {
            return false;
          }
          switch (among_var) {
            case 1:
              // (, line 62
              // <-, line 62
              if (!base.slice_from("a")) {
                return false;
              }
              break;
            case 2:
              // (, line 63
              // <-, line 63
              if (!base.slice_from("e")) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_double() {
          // (, line 67
          // test, line 68
          var /** number */ v_1 = base.limit - base.cursor;
          // among, line 68
          if (base.find_among_b(a_2) == 0) {
            return false;
          }
          base.cursor = base.limit - v_1;
          return true;
        };

        /** @return {boolean} */
        function r_undouble() {
          // (, line 72
          // next, line 73
          if (base.cursor <= base.limit_backward) {
            return false;
          }
          base.cursor--;
          // [, line 73
          base.ket = base.cursor;
          // hop, line 73
          {
            var /** number */ c1 = base.cursor - 1;
            if (base.limit_backward > c1 || c1 > base.limit) {
              return false;
            }
            base.cursor = c1;
          }
          // ], line 73
          base.bra = base.cursor;
          // delete, line 73
          if (!base.slice_del()) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_instrum() {
          // (, line 76
          // [, line 77
          base.ket = base.cursor;
          // substring, line 77
          if (base.find_among_b(a_3) == 0) {
            return false;
          }
          // ], line 77
          base.bra = base.cursor;
          // call R1, line 77
          if (!r_R1()) {
            return false;
          }
          // (, line 78
          // call double, line 78
          if (!r_double()) {
            return false;
          }
          // delete, line 81
          if (!base.slice_del()) {
            return false;
          }
          // call undouble, line 82
          if (!r_undouble()) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_case() {
          // (, line 86
          // [, line 87
          base.ket = base.cursor;
          // substring, line 87
          if (base.find_among_b(a_4) == 0) {
            return false;
          }
          // ], line 87
          base.bra = base.cursor;
          // call R1, line 87
          if (!r_R1()) {
            return false;
          }
          // delete, line 111
          if (!base.slice_del()) {
            return false;
          }
          // call v_ending, line 112
          if (!r_v_ending()) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_case_special() {
          var /** number */ among_var;
          // (, line 115
          // [, line 116
          base.ket = base.cursor;
          // substring, line 116
          among_var = base.find_among_b(a_5);
          if (among_var == 0) {
            return false;
          }
          // ], line 116
          base.bra = base.cursor;
          // call R1, line 116
          if (!r_R1()) {
            return false;
          }
          switch (among_var) {
            case 1:
              // (, line 117
              // <-, line 117
              if (!base.slice_from("e")) {
                return false;
              }
              break;
            case 2:
              // (, line 118
              // <-, line 118
              if (!base.slice_from("a")) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_case_other() {
          var /** number */ among_var;
          // (, line 123
          // [, line 124
          base.ket = base.cursor;
          // substring, line 124
          among_var = base.find_among_b(a_6);
          if (among_var == 0) {
            return false;
          }
          // ], line 124
          base.bra = base.cursor;
          // call R1, line 124
          if (!r_R1()) {
            return false;
          }
          switch (among_var) {
            case 1:
              // (, line 125
              // delete, line 125
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 127
              // <-, line 127
              if (!base.slice_from("a")) {
                return false;
              }
              break;
            case 3:
              // (, line 128
              // <-, line 128
              if (!base.slice_from("e")) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_factive() {
          // (, line 132
          // [, line 133
          base.ket = base.cursor;
          // substring, line 133
          if (base.find_among_b(a_7) == 0) {
            return false;
          }
          // ], line 133
          base.bra = base.cursor;
          // call R1, line 133
          if (!r_R1()) {
            return false;
          }
          // (, line 134
          // call double, line 134
          if (!r_double()) {
            return false;
          }
          // delete, line 137
          if (!base.slice_del()) {
            return false;
          }
          // call undouble, line 138
          if (!r_undouble()) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_plural() {
          var /** number */ among_var;
          // (, line 141
          // [, line 142
          base.ket = base.cursor;
          // substring, line 142
          among_var = base.find_among_b(a_8);
          if (among_var == 0) {
            return false;
          }
          // ], line 142
          base.bra = base.cursor;
          // call R1, line 142
          if (!r_R1()) {
            return false;
          }
          switch (among_var) {
            case 1:
              // (, line 143
              // <-, line 143
              if (!base.slice_from("a")) {
                return false;
              }
              break;
            case 2:
              // (, line 144
              // <-, line 144
              if (!base.slice_from("e")) {
                return false;
              }
              break;
            case 3:
              // (, line 145
              // delete, line 145
              if (!base.slice_del()) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_owned() {
          var /** number */ among_var;
          // (, line 153
          // [, line 154
          base.ket = base.cursor;
          // substring, line 154
          among_var = base.find_among_b(a_9);
          if (among_var == 0) {
            return false;
          }
          // ], line 154
          base.bra = base.cursor;
          // call R1, line 154
          if (!r_R1()) {
            return false;
          }
          switch (among_var) {
            case 1:
              // (, line 155
              // delete, line 155
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 156
              // <-, line 156
              if (!base.slice_from("e")) {
                return false;
              }
              break;
            case 3:
              // (, line 157
              // <-, line 157
              if (!base.slice_from("a")) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_sing_owner() {
          var /** number */ among_var;
          // (, line 167
          // [, line 168
          base.ket = base.cursor;
          // substring, line 168
          among_var = base.find_among_b(a_10);
          if (among_var == 0) {
            return false;
          }
          // ], line 168
          base.bra = base.cursor;
          // call R1, line 168
          if (!r_R1()) {
            return false;
          }
          switch (among_var) {
            case 1:
              // (, line 169
              // delete, line 169
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 170
              // <-, line 170
              if (!base.slice_from("a")) {
                return false;
              }
              break;
            case 3:
              // (, line 171
              // <-, line 171
              if (!base.slice_from("e")) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_plur_owner() {
          var /** number */ among_var;
          // (, line 192
          // [, line 193
          base.ket = base.cursor;
          // substring, line 193
          among_var = base.find_among_b(a_11);
          if (among_var == 0) {
            return false;
          }
          // ], line 193
          base.bra = base.cursor;
          // call R1, line 193
          if (!r_R1()) {
            return false;
          }
          switch (among_var) {
            case 1:
              // (, line 194
              // delete, line 194
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 195
              // <-, line 195
              if (!base.slice_from("a")) {
                return false;
              }
              break;
            case 3:
              // (, line 196
              // <-, line 196
              if (!base.slice_from("e")) {
                return false;
              }
              break;
          }
          return true;
        };

        this.stem = /** @return {boolean} */ function() {
          // (, line 228
          // do, line 229
          var /** number */ v_1 = base.cursor;
          lab0: {
            // call mark_regions, line 229
            if (!r_mark_regions()) {
              break lab0;
            }
          }
          base.cursor = v_1;
          // backwards, line 230
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 230
          // do, line 231
          var /** number */ v_2 = base.limit - base.cursor;
          lab1: {
            // call instrum, line 231
            if (!r_instrum()) {
              break lab1;
            }
          }
          base.cursor = base.limit - v_2;
          // do, line 232
          var /** number */ v_3 = base.limit - base.cursor;
          lab2: {
            // call case, line 232
            if (!r_case()) {
              break lab2;
            }
          }
          base.cursor = base.limit - v_3;
          // do, line 233
          var /** number */ v_4 = base.limit - base.cursor;
          lab3: {
            // call case_special, line 233
            if (!r_case_special()) {
              break lab3;
            }
          }
          base.cursor = base.limit - v_4;
          // do, line 234
          var /** number */ v_5 = base.limit - base.cursor;
          lab4: {
            // call case_other, line 234
            if (!r_case_other()) {
              break lab4;
            }
          }
          base.cursor = base.limit - v_5;
          // do, line 235
          var /** number */ v_6 = base.limit - base.cursor;
          lab5: {
            // call factive, line 235
            if (!r_factive()) {
              break lab5;
            }
          }
          base.cursor = base.limit - v_6;
          // do, line 236
          var /** number */ v_7 = base.limit - base.cursor;
          lab6: {
            // call owned, line 236
            if (!r_owned()) {
              break lab6;
            }
          }
          base.cursor = base.limit - v_7;
          // do, line 237
          var /** number */ v_8 = base.limit - base.cursor;
          lab7: {
            // call sing_owner, line 237
            if (!r_sing_owner()) {
              break lab7;
            }
          }
          base.cursor = base.limit - v_8;
          // do, line 238
          var /** number */ v_9 = base.limit - base.cursor;
          lab8: {
            // call plur_owner, line 238
            if (!r_plur_owner()) {
              break lab8;
            }
          }
          base.cursor = base.limit - v_9;
          // do, line 239
          var /** number */ v_10 = base.limit - base.cursor;
          lab9: {
            // call plural, line 239
            if (!r_plural()) {
              break lab9;
            }
          }
          base.cursor = base.limit - v_10;
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

    lunr.Pipeline.registerFunction(lunr.hu.stemmer, 'stemmer-hu');

    lunr.hu.stopWordFilter = lunr.generateStopWordFilter("a abban ahhoz ahogy ahol aki akik akkor alatt amely amelyek amelyekben amelyeket amelyet amelynek ami amikor amit amolyan amíg annak arra arról az azok azon azonban azt aztán azután azzal azért be belül benne bár cikk cikkek cikkeket csak de e ebben eddig egy egyes egyetlen egyik egyre egyéb egész ehhez ekkor el ellen elsõ elég elõ elõször elõtt emilyen ennek erre ez ezek ezen ezt ezzel ezért fel felé hanem hiszen hogy hogyan igen ill ill. illetve ilyen ilyenkor ismét ison itt jobban jó jól kell kellett keressünk keresztül ki kívül között közül legalább legyen lehet lehetett lenne lenni lesz lett maga magát majd majd meg mellett mely melyek mert mi mikor milyen minden mindenki mindent mindig mint mintha mit mivel miért most már más másik még míg nagy nagyobb nagyon ne nekem neki nem nincs néha néhány nélkül olyan ott pedig persze rá s saját sem semmi sok sokat sokkal szemben szerint szinte számára talán tehát teljes tovább továbbá több ugyanis utolsó után utána vagy vagyis vagyok valaki valami valamint való van vannak vele vissza viszont volna volt voltak voltam voltunk által általában át én éppen és így õ õk õket össze úgy új újabb újra".split(' '));

    lunr.Pipeline.registerFunction(lunr.hu.stopWordFilter, 'stopWordFilter-hu');
  };
}))