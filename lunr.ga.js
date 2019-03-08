/*!
 * Lunr languages, `irish-stemmer.js` language
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
    lunr.ga = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.ga.trimmer,
        lunr.ga.stopWordFilter,
        lunr.ga.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.ga.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.ga.wordCharacters = "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A";
    lunr.ga.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.ga.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.ga.trimmer, 'trimmer-ga');

    /* lunr stemmer function */
    lunr.ga.stemmer = (function() {
      /* create the wrapped stemmer object */
      var st = new function() {
        var base = new BaseStemmer();
        /** @const */
        var a_0 = [
          ["b'", -1, 1],
          ["bh", -1, 4],
          ["bhf", 1, 2],
          ["bp", -1, 8],
          ["ch", -1, 5],
          ["d'", -1, 1],
          ["d'fh", 5, 2],
          ["dh", -1, 6],
          ["dt", -1, 9],
          ["fh", -1, 2],
          ["gc", -1, 5],
          ["gh", -1, 7],
          ["h-", -1, 1],
          ["m'", -1, 1],
          ["mb", -1, 4],
          ["mh", -1, 10],
          ["n-", -1, 1],
          ["nd", -1, 6],
          ["ng", -1, 7],
          ["ph", -1, 8],
          ["sh", -1, 3],
          ["t-", -1, 1],
          ["th", -1, 9],
          ["ts", -1, 3]
        ];

        /** @const */
        var a_1 = [
          ["\u00EDochta", -1, 1],
          ["a\u00EDochta", 0, 1],
          ["ire", -1, 2],
          ["aire", 2, 2],
          ["abh", -1, 1],
          ["eabh", 4, 1],
          ["ibh", -1, 1],
          ["aibh", 6, 1],
          ["amh", -1, 1],
          ["eamh", 8, 1],
          ["imh", -1, 1],
          ["aimh", 10, 1],
          ["\u00EDocht", -1, 1],
          ["a\u00EDocht", 12, 1],
          ["ir\u00ED", -1, 2],
          ["air\u00ED", 14, 2]
        ];

        /** @const */
        var a_2 = [
          ["\u00F3ideacha", -1, 6],
          ["patacha", -1, 5],
          ["achta", -1, 1],
          ["arcachta", 2, 2],
          ["eachta", 2, 1],
          ["grafa\u00EDochta", -1, 4],
          ["paite", -1, 5],
          ["ach", -1, 1],
          ["each", 7, 1],
          ["\u00F3ideach", 8, 6],
          ["gineach", 8, 3],
          ["patach", 7, 5],
          ["grafa\u00EDoch", -1, 4],
          ["pataigh", -1, 5],
          ["\u00F3idigh", -1, 6],
          ["acht\u00FAil", -1, 1],
          ["eacht\u00FAil", 15, 1],
          ["gineas", -1, 3],
          ["ginis", -1, 3],
          ["acht", -1, 1],
          ["arcacht", 19, 2],
          ["eacht", 19, 1],
          ["grafa\u00EDocht", -1, 4],
          ["arcachta\u00ED", -1, 2],
          ["grafa\u00EDochta\u00ED", -1, 4]
        ];

        /** @const */
        var a_3 = [
          ["imid", -1, 1],
          ["aimid", 0, 1],
          ["\u00EDmid", -1, 1],
          ["a\u00EDmid", 2, 1],
          ["adh", -1, 2],
          ["eadh", 4, 2],
          ["faidh", -1, 1],
          ["fidh", -1, 1],
          ["\u00E1il", -1, 2],
          ["ain", -1, 2],
          ["tear", -1, 2],
          ["tar", -1, 2]
        ];

        /** @const */
        var /** Array<int> */ g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 4, 2];

        var /** number */ I_p2 = 0;
        var /** number */ I_p1 = 0;
        var /** number */ I_pV = 0;


        /** @return {boolean} */
        function r_mark_regions() {
          // (, line 28
          I_pV = base.limit;
          I_p1 = base.limit;
          I_p2 = base.limit;
          // do, line 34
          var /** number */ v_1 = base.cursor;
          lab0: {
            // (, line 34
            // gopast, line 35
            golab1: while (true) {
              lab2: {
                if (!(base.in_grouping(g_v, 97, 250))) {
                  break lab2;
                }
                break golab1;
              }
              if (base.cursor >= base.limit) {
                break lab0;
              }
              base.cursor++;
            }
            // setmark pV, line 35
            I_pV = base.cursor;
          }
          base.cursor = v_1;
          // do, line 37
          var /** number */ v_3 = base.cursor;
          lab3: {
            // (, line 37
            // gopast, line 38
            golab4: while (true) {
              lab5: {
                if (!(base.in_grouping(g_v, 97, 250))) {
                  break lab5;
                }
                break golab4;
              }
              if (base.cursor >= base.limit) {
                break lab3;
              }
              base.cursor++;
            }
            // gopast, line 38
            golab6: while (true) {
              lab7: {
                if (!(base.out_grouping(g_v, 97, 250))) {
                  break lab7;
                }
                break golab6;
              }
              if (base.cursor >= base.limit) {
                break lab3;
              }
              base.cursor++;
            }
            // setmark p1, line 38
            I_p1 = base.cursor;
            // gopast, line 39
            golab8: while (true) {
              lab9: {
                if (!(base.in_grouping(g_v, 97, 250))) {
                  break lab9;
                }
                break golab8;
              }
              if (base.cursor >= base.limit) {
                break lab3;
              }
              base.cursor++;
            }
            // gopast, line 39
            golab10: while (true) {
              lab11: {
                if (!(base.out_grouping(g_v, 97, 250))) {
                  break lab11;
                }
                break golab10;
              }
              if (base.cursor >= base.limit) {
                break lab3;
              }
              base.cursor++;
            }
            // setmark p2, line 39
            I_p2 = base.cursor;
          }
          base.cursor = v_3;
          return true;
        };

        /** @return {boolean} */
        function r_initial_morph() {
          var /** number */ among_var;
          // (, line 43
          // [, line 44
          base.bra = base.cursor;
          // substring, line 44
          among_var = base.find_among(a_0);
          if (among_var == 0) {
            return false;
          }
          // ], line 44
          base.ket = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 46
              // delete, line 46
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 52
              // <-, line 52
              if (!base.slice_from("f")) {
                return false;
              }
              break;
            case 3:
              // (, line 58
              // <-, line 58
              if (!base.slice_from("s")) {
                return false;
              }
              break;
            case 4:
              // (, line 61
              // <-, line 61
              if (!base.slice_from("b")) {
                return false;
              }
              break;
            case 5:
              // (, line 63
              // <-, line 63
              if (!base.slice_from("c")) {
                return false;
              }
              break;
            case 6:
              // (, line 65
              // <-, line 65
              if (!base.slice_from("d")) {
                return false;
              }
              break;
            case 7:
              // (, line 69
              // <-, line 69
              if (!base.slice_from("g")) {
                return false;
              }
              break;
            case 8:
              // (, line 71
              // <-, line 71
              if (!base.slice_from("p")) {
                return false;
              }
              break;
            case 9:
              // (, line 75
              // <-, line 75
              if (!base.slice_from("t")) {
                return false;
              }
              break;
            case 10:
              // (, line 89
              // <-, line 89
              if (!base.slice_from("m")) {
                return false;
              }
              break;
          }
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
        function r_R2() {
          if (!(I_p2 <= base.cursor)) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_noun_sfx() {
          var /** number */ among_var;
          // (, line 103
          // [, line 104
          base.ket = base.cursor;
          // substring, line 104
          among_var = base.find_among_b(a_1);
          if (among_var == 0) {
            return false;
          }
          // ], line 104
          base.bra = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 108
              // call R1, line 108
              if (!r_R1()) {
                return false;
              }
              // delete, line 108
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 110
              // call R2, line 110
              if (!r_R2()) {
                return false;
              }
              // delete, line 110
              if (!base.slice_del()) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_deriv() {
          var /** number */ among_var;
          // (, line 113
          // [, line 114
          base.ket = base.cursor;
          // substring, line 114
          among_var = base.find_among_b(a_2);
          if (among_var == 0) {
            return false;
          }
          // ], line 114
          base.bra = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 116
              // call R2, line 116
              if (!r_R2()) {
                return false;
              }
              // delete, line 116
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 118
              // <-, line 118
              if (!base.slice_from("arc")) {
                return false;
              }
              break;
            case 3:
              // (, line 120
              // <-, line 120
              if (!base.slice_from("gin")) {
                return false;
              }
              break;
            case 4:
              // (, line 122
              // <-, line 122
              if (!base.slice_from("graf")) {
                return false;
              }
              break;
            case 5:
              // (, line 124
              // <-, line 124
              if (!base.slice_from("paite")) {
                return false;
              }
              break;
            case 6:
              // (, line 126
              // <-, line 126
              if (!base.slice_from("\u00F3id")) {
                return false;
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_verb_sfx() {
          var /** number */ among_var;
          // (, line 129
          // [, line 130
          base.ket = base.cursor;
          // substring, line 130
          among_var = base.find_among_b(a_3);
          if (among_var == 0) {
            return false;
          }
          // ], line 130
          base.bra = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 133
              // call RV, line 133
              if (!r_RV()) {
                return false;
              }
              // delete, line 133
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 138
              // call R1, line 138
              if (!r_R1()) {
                return false;
              }
              // delete, line 138
              if (!base.slice_del()) {
                return false;
              }
              break;
          }
          return true;
        };

        this.stem = /** @return {boolean} */ function() {
          // (, line 143
          // do, line 144
          var /** number */ v_1 = base.cursor;
          lab0: {
            // call initial_morph, line 144
            if (!r_initial_morph()) {
              break lab0;
            }
          }
          base.cursor = v_1;
          // do, line 145
          lab1: {
            // call mark_regions, line 145
            if (!r_mark_regions()) {
              break lab1;
            }
          }
          // backwards, line 146
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 146
          // do, line 147
          var /** number */ v_3 = base.limit - base.cursor;
          lab2: {
            // call noun_sfx, line 147
            if (!r_noun_sfx()) {
              break lab2;
            }
          }
          base.cursor = base.limit - v_3;
          // do, line 148
          var /** number */ v_4 = base.limit - base.cursor;
          lab3: {
            // call deriv, line 148
            if (!r_deriv()) {
              break lab3;
            }
          }
          base.cursor = base.limit - v_4;
          // do, line 149
          var /** number */ v_5 = base.limit - base.cursor;
          lab4: {
            // call verb_sfx, line 149
            if (!r_verb_sfx()) {
              break lab4;
            }
          }
          base.cursor = base.limit - v_5;
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

    lunr.Pipeline.registerFunction(lunr.ga.stemmer, 'stemmer-ga');

    lunr.ga.stopWordFilter = lunr.generateStopWordFilter("a ach ag agus an aon ar arna as b' ba beirt bh�r caoga ceathair ceathrar chomh cht� chuig chun cois c�ad c�ig c�igear d' daichead dar de deich deichni�r den dh� do don dt� d� d� d�r faoi faoin faoina faoin�r fara fiche gach gan go gur haon hocht i iad idir in ina ins in�r is le leis lena len�r m' mar mo m� na nach naoi naon�r n� n� n� n�cha n�or ocht ochtar os roimh sa seacht seachtar seacht� seasca seisear siad sibh sinn sna s� s� tar thar th� tri�r tr� tr�na tr�n�r tr�ocha t� um � � � �is �n �na �n�r �r".split(' '));

    lunr.Pipeline.registerFunction(lunr.ga.stopWordFilter, 'stopWordFilter-ga');
  };
}))