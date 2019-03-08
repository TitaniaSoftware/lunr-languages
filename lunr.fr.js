/*!
 * Lunr languages, `french-stemmer.js` language
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
    lunr.fr = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.fr.trimmer,
        lunr.fr.stopWordFilter,
        lunr.fr.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.fr.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.fr.wordCharacters = "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A";
    lunr.fr.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.fr.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.fr.trimmer, 'trimmer-fr');

    /* lunr stemmer function */
    lunr.fr.stemmer = (function() {
      /* create the wrapped stemmer object */
      var st = new function() {
        var base = new BaseStemmer();
        /** @const */
        var a_0 = [
          ["col", -1, -1],
          ["par", -1, -1],
          ["tap", -1, -1]
        ];

        /** @const */
        var a_1 = [
          ["", -1, 7],
          ["H", 0, 6],
          ["He", 1, 4],
          ["Hi", 1, 5],
          ["I", 0, 1],
          ["U", 0, 2],
          ["Y", 0, 3]
        ];

        /** @const */
        var a_2 = [
          ["iqU", -1, 3],
          ["abl", -1, 3],
          ["I\u00E8r", -1, 4],
          ["i\u00E8r", -1, 4],
          ["eus", -1, 2],
          ["iv", -1, 1]
        ];

        /** @const */
        var a_3 = [
          ["ic", -1, 2],
          ["abil", -1, 1],
          ["iv", -1, 3]
        ];

        /** @const */
        var a_4 = [
          ["iqUe", -1, 1],
          ["atrice", -1, 2],
          ["ance", -1, 1],
          ["ence", -1, 5],
          ["logie", -1, 3],
          ["able", -1, 1],
          ["isme", -1, 1],
          ["euse", -1, 11],
          ["iste", -1, 1],
          ["ive", -1, 8],
          ["if", -1, 8],
          ["usion", -1, 4],
          ["ation", -1, 2],
          ["ution", -1, 4],
          ["ateur", -1, 2],
          ["iqUes", -1, 1],
          ["atrices", -1, 2],
          ["ances", -1, 1],
          ["ences", -1, 5],
          ["logies", -1, 3],
          ["ables", -1, 1],
          ["ismes", -1, 1],
          ["euses", -1, 11],
          ["istes", -1, 1],
          ["ives", -1, 8],
          ["ifs", -1, 8],
          ["usions", -1, 4],
          ["ations", -1, 2],
          ["utions", -1, 4],
          ["ateurs", -1, 2],
          ["ments", -1, 15],
          ["ements", 30, 6],
          ["issements", 31, 12],
          ["it\u00E9s", -1, 7],
          ["ment", -1, 15],
          ["ement", 34, 6],
          ["issement", 35, 12],
          ["amment", 34, 13],
          ["emment", 34, 14],
          ["aux", -1, 10],
          ["eaux", 39, 9],
          ["eux", -1, 1],
          ["it\u00E9", -1, 7]
        ];

        /** @const */
        var a_5 = [
          ["ira", -1, 1],
          ["ie", -1, 1],
          ["isse", -1, 1],
          ["issante", -1, 1],
          ["i", -1, 1],
          ["irai", 4, 1],
          ["ir", -1, 1],
          ["iras", -1, 1],
          ["ies", -1, 1],
          ["\u00EEmes", -1, 1],
          ["isses", -1, 1],
          ["issantes", -1, 1],
          ["\u00EEtes", -1, 1],
          ["is", -1, 1],
          ["irais", 13, 1],
          ["issais", 13, 1],
          ["irions", -1, 1],
          ["issions", -1, 1],
          ["irons", -1, 1],
          ["issons", -1, 1],
          ["issants", -1, 1],
          ["it", -1, 1],
          ["irait", 21, 1],
          ["issait", 21, 1],
          ["issant", -1, 1],
          ["iraIent", -1, 1],
          ["issaIent", -1, 1],
          ["irent", -1, 1],
          ["issent", -1, 1],
          ["iront", -1, 1],
          ["\u00EEt", -1, 1],
          ["iriez", -1, 1],
          ["issiez", -1, 1],
          ["irez", -1, 1],
          ["issez", -1, 1]
        ];

        /** @const */
        var a_6 = [
          ["a", -1, 3],
          ["era", 0, 2],
          ["asse", -1, 3],
          ["ante", -1, 3],
          ["\u00E9e", -1, 2],
          ["ai", -1, 3],
          ["erai", 5, 2],
          ["er", -1, 2],
          ["as", -1, 3],
          ["eras", 8, 2],
          ["\u00E2mes", -1, 3],
          ["asses", -1, 3],
          ["antes", -1, 3],
          ["\u00E2tes", -1, 3],
          ["\u00E9es", -1, 2],
          ["ais", -1, 3],
          ["erais", 15, 2],
          ["ions", -1, 1],
          ["erions", 17, 2],
          ["assions", 17, 3],
          ["erons", -1, 2],
          ["ants", -1, 3],
          ["\u00E9s", -1, 2],
          ["ait", -1, 3],
          ["erait", 23, 2],
          ["ant", -1, 3],
          ["aIent", -1, 3],
          ["eraIent", 26, 2],
          ["\u00E8rent", -1, 2],
          ["assent", -1, 3],
          ["eront", -1, 2],
          ["\u00E2t", -1, 3],
          ["ez", -1, 2],
          ["iez", 32, 2],
          ["eriez", 33, 2],
          ["assiez", 33, 3],
          ["erez", 32, 2],
          ["\u00E9", -1, 2]
        ];

        /** @const */
        var a_7 = [
          ["e", -1, 3],
          ["I\u00E8re", 0, 2],
          ["i\u00E8re", 0, 2],
          ["ion", -1, 1],
          ["Ier", -1, 2],
          ["ier", -1, 2]
        ];

        /** @const */
        var a_8 = [
          ["ell", -1, -1],
          ["eill", -1, -1],
          ["enn", -1, -1],
          ["onn", -1, -1],
          ["ett", -1, -1]
        ];

        /** @const */
        var /** Array<int> */ g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 130, 103, 8, 5];

        /** @const */
        var /** Array<int> */ g_keep_with_s = [1, 65, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128];

        var /** number */ I_p2 = 0;
        var /** number */ I_p1 = 0;
        var /** number */ I_pV = 0;


        /** @return {boolean} */
        function r_prelude() {
          // repeat, line 38
          replab0: while (true) {
            var /** number */ v_1 = base.cursor;
            lab1: {
              // goto, line 38
              golab2: while (true) {
                var /** number */ v_2 = base.cursor;
                lab3: {
                  // (, line 38
                  // or, line 44
                  lab4: {
                    var /** number */ v_3 = base.cursor;
                    lab5: {
                      // (, line 40
                      if (!(base.in_grouping(g_v, 97, 251))) {
                        break lab5;
                      }
                      // [, line 40
                      base.bra = base.cursor;
                      // or, line 40
                      lab6: {
                        var /** number */ v_4 = base.cursor;
                        lab7: {
                          // (, line 40
                          // literal, line 40
                          if (!(base.eq_s("u"))) {
                            break lab7;
                          }
                          // ], line 40
                          base.ket = base.cursor;
                          if (!(base.in_grouping(g_v, 97, 251))) {
                            break lab7;
                          }
                          // <-, line 40
                          if (!base.slice_from("U")) {
                            return false;
                          }
                          break lab6;
                        }
                        base.cursor = v_4;
                        lab8: {
                          // (, line 41
                          // literal, line 41
                          if (!(base.eq_s("i"))) {
                            break lab8;
                          }
                          // ], line 41
                          base.ket = base.cursor;
                          if (!(base.in_grouping(g_v, 97, 251))) {
                            break lab8;
                          }
                          // <-, line 41
                          if (!base.slice_from("I")) {
                            return false;
                          }
                          break lab6;
                        }
                        base.cursor = v_4;
                        // (, line 42
                        // literal, line 42
                        if (!(base.eq_s("y"))) {
                          break lab5;
                        }
                        // ], line 42
                        base.ket = base.cursor;
                        // <-, line 42
                        if (!base.slice_from("Y")) {
                          return false;
                        }
                      }
                      break lab4;
                    }
                    base.cursor = v_3;
                    lab9: {
                      // (, line 45
                      // [, line 45
                      base.bra = base.cursor;
                      // literal, line 45
                      if (!(base.eq_s("\u00EB"))) {
                        break lab9;
                      }
                      // ], line 45
                      base.ket = base.cursor;
                      // <-, line 45
                      if (!base.slice_from("He")) {
                        return false;
                      }
                      break lab4;
                    }
                    base.cursor = v_3;
                    lab10: {
                      // (, line 47
                      // [, line 47
                      base.bra = base.cursor;
                      // literal, line 47
                      if (!(base.eq_s("\u00EF"))) {
                        break lab10;
                      }
                      // ], line 47
                      base.ket = base.cursor;
                      // <-, line 47
                      if (!base.slice_from("Hi")) {
                        return false;
                      }
                      break lab4;
                    }
                    base.cursor = v_3;
                    lab11: {
                      // (, line 49
                      // [, line 49
                      base.bra = base.cursor;
                      // literal, line 49
                      if (!(base.eq_s("y"))) {
                        break lab11;
                      }
                      // ], line 49
                      base.ket = base.cursor;
                      if (!(base.in_grouping(g_v, 97, 251))) {
                        break lab11;
                      }
                      // <-, line 49
                      if (!base.slice_from("Y")) {
                        return false;
                      }
                      break lab4;
                    }
                    base.cursor = v_3;
                    // (, line 51
                    // literal, line 51
                    if (!(base.eq_s("q"))) {
                      break lab3;
                    }
                    // [, line 51
                    base.bra = base.cursor;
                    // literal, line 51
                    if (!(base.eq_s("u"))) {
                      break lab3;
                    }
                    // ], line 51
                    base.ket = base.cursor;
                    // <-, line 51
                    if (!base.slice_from("U")) {
                      return false;
                    }
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
              continue replab0;
            }
            base.cursor = v_1;
            break replab0;
          }
          return true;
        };

        /** @return {boolean} */
        function r_mark_regions() {
          // (, line 54
          I_pV = base.limit;
          I_p1 = base.limit;
          I_p2 = base.limit;
          // do, line 60
          var /** number */ v_1 = base.cursor;
          lab0: {
            // (, line 60
            // or, line 62
            lab1: {
              var /** number */ v_2 = base.cursor;
              lab2: {
                // (, line 61
                if (!(base.in_grouping(g_v, 97, 251))) {
                  break lab2;
                }
                if (!(base.in_grouping(g_v, 97, 251))) {
                  break lab2;
                }
                // next, line 61
                if (base.cursor >= base.limit) {
                  break lab2;
                }
                base.cursor++;
                break lab1;
              }
              base.cursor = v_2;
              lab3: {
                // among, line 63
                if (base.find_among(a_0) == 0) {
                  break lab3;
                }
                break lab1;
              }
              base.cursor = v_2;
              // (, line 70
              // next, line 70
              if (base.cursor >= base.limit) {
                break lab0;
              }
              base.cursor++;
              // gopast, line 70
              golab4: while (true) {
                lab5: {
                  if (!(base.in_grouping(g_v, 97, 251))) {
                    break lab5;
                  }
                  break golab4;
                }
                if (base.cursor >= base.limit) {
                  break lab0;
                }
                base.cursor++;
              }
            }
            // setmark pV, line 71
            I_pV = base.cursor;
          }
          base.cursor = v_1;
          // do, line 73
          var /** number */ v_4 = base.cursor;
          lab6: {
            // (, line 73
            // gopast, line 74
            golab7: while (true) {
              lab8: {
                if (!(base.in_grouping(g_v, 97, 251))) {
                  break lab8;
                }
                break golab7;
              }
              if (base.cursor >= base.limit) {
                break lab6;
              }
              base.cursor++;
            }
            // gopast, line 74
            golab9: while (true) {
              lab10: {
                if (!(base.out_grouping(g_v, 97, 251))) {
                  break lab10;
                }
                break golab9;
              }
              if (base.cursor >= base.limit) {
                break lab6;
              }
              base.cursor++;
            }
            // setmark p1, line 74
            I_p1 = base.cursor;
            // gopast, line 75
            golab11: while (true) {
              lab12: {
                if (!(base.in_grouping(g_v, 97, 251))) {
                  break lab12;
                }
                break golab11;
              }
              if (base.cursor >= base.limit) {
                break lab6;
              }
              base.cursor++;
            }
            // gopast, line 75
            golab13: while (true) {
              lab14: {
                if (!(base.out_grouping(g_v, 97, 251))) {
                  break lab14;
                }
                break golab13;
              }
              if (base.cursor >= base.limit) {
                break lab6;
              }
              base.cursor++;
            }
            // setmark p2, line 75
            I_p2 = base.cursor;
          }
          base.cursor = v_4;
          return true;
        };

        /** @return {boolean} */
        function r_postlude() {
          var /** number */ among_var;
          // repeat, line 79
          replab0: while (true) {
            var /** number */ v_1 = base.cursor;
            lab1: {
              // (, line 79
              // [, line 81
              base.bra = base.cursor;
              // substring, line 81
              among_var = base.find_among(a_1);
              if (among_var == 0) {
                break lab1;
              }
              // ], line 81
              base.ket = base.cursor;
              switch (among_var) {
                case 1:
                  // (, line 82
                  // <-, line 82
                  if (!base.slice_from("i")) {
                    return false;
                  }
                  break;
                case 2:
                  // (, line 83
                  // <-, line 83
                  if (!base.slice_from("u")) {
                    return false;
                  }
                  break;
                case 3:
                  // (, line 84
                  // <-, line 84
                  if (!base.slice_from("y")) {
                    return false;
                  }
                  break;
                case 4:
                  // (, line 85
                  // <-, line 85
                  if (!base.slice_from("\u00EB")) {
                    return false;
                  }
                  break;
                case 5:
                  // (, line 86
                  // <-, line 86
                  if (!base.slice_from("\u00EF")) {
                    return false;
                  }
                  break;
                case 6:
                  // (, line 87
                  // delete, line 87
                  if (!base.slice_del()) {
                    return false;
                  }
                  break;
                case 7:
                  // (, line 88
                  // next, line 88
                  if (base.cursor >= base.limit) {
                    break lab1;
                  }
                  base.cursor++;
                  break;
              }
              continue replab0;
            }
            base.cursor = v_1;
            break replab0;
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
        function r_standard_suffix() {
          var /** number */ among_var;
          // (, line 98
          // [, line 99
          base.ket = base.cursor;
          // substring, line 99
          among_var = base.find_among_b(a_4);
          if (among_var == 0) {
            return false;
          }
          // ], line 99
          base.bra = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 103
              // call R2, line 103
              if (!r_R2()) {
                return false;
              }
              // delete, line 103
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 106
              // call R2, line 106
              if (!r_R2()) {
                return false;
              }
              // delete, line 106
              if (!base.slice_del()) {
                return false;
              }
              // try, line 107
              var /** number */ v_1 = base.limit - base.cursor;
              lab0: {
                // (, line 107
                // [, line 107
                base.ket = base.cursor;
                // literal, line 107
                if (!(base.eq_s_b("ic"))) {
                  base.cursor = base.limit - v_1;
                  break lab0;
                }
                // ], line 107
                base.bra = base.cursor;
                // or, line 107
                lab1: {
                  var /** number */ v_2 = base.limit - base.cursor;
                  lab2: {
                    // (, line 107
                    // call R2, line 107
                    if (!r_R2()) {
                      break lab2;
                    }
                    // delete, line 107
                    if (!base.slice_del()) {
                      return false;
                    }
                    break lab1;
                  }
                  base.cursor = base.limit - v_2;
                  // <-, line 107
                  if (!base.slice_from("iqU")) {
                    return false;
                  }
                }
              }
              break;
            case 3:
              // (, line 111
              // call R2, line 111
              if (!r_R2()) {
                return false;
              }
              // <-, line 111
              if (!base.slice_from("log")) {
                return false;
              }
              break;
            case 4:
              // (, line 114
              // call R2, line 114
              if (!r_R2()) {
                return false;
              }
              // <-, line 114
              if (!base.slice_from("u")) {
                return false;
              }
              break;
            case 5:
              // (, line 117
              // call R2, line 117
              if (!r_R2()) {
                return false;
              }
              // <-, line 117
              if (!base.slice_from("ent")) {
                return false;
              }
              break;
            case 6:
              // (, line 120
              // call RV, line 121
              if (!r_RV()) {
                return false;
              }
              // delete, line 121
              if (!base.slice_del()) {
                return false;
              }
              // try, line 122
              var /** number */ v_3 = base.limit - base.cursor;
              lab3: {
                // (, line 122
                // [, line 123
                base.ket = base.cursor;
                // substring, line 123
                among_var = base.find_among_b(a_2);
                if (among_var == 0) {
                  base.cursor = base.limit - v_3;
                  break lab3;
                }
                // ], line 123
                base.bra = base.cursor;
                switch (among_var) {
                  case 1:
                    // (, line 124
                    // call R2, line 124
                    if (!r_R2()) {
                      base.cursor = base.limit - v_3;
                      break lab3;
                    }
                    // delete, line 124
                    if (!base.slice_del()) {
                      return false;
                    }
                    // [, line 124
                    base.ket = base.cursor;
                    // literal, line 124
                    if (!(base.eq_s_b("at"))) {
                      base.cursor = base.limit - v_3;
                      break lab3;
                    }
                    // ], line 124
                    base.bra = base.cursor;
                    // call R2, line 124
                    if (!r_R2()) {
                      base.cursor = base.limit - v_3;
                      break lab3;
                    }
                    // delete, line 124
                    if (!base.slice_del()) {
                      return false;
                    }
                    break;
                  case 2:
                    // (, line 125
                    // or, line 125
                    lab4: {
                      var /** number */ v_4 = base.limit - base.cursor;
                      lab5: {
                        // (, line 125
                        // call R2, line 125
                        if (!r_R2()) {
                          break lab5;
                        }
                        // delete, line 125
                        if (!base.slice_del()) {
                          return false;
                        }
                        break lab4;
                      }
                      base.cursor = base.limit - v_4;
                      // (, line 125
                      // call R1, line 125
                      if (!r_R1()) {
                        base.cursor = base.limit - v_3;
                        break lab3;
                      }
                      // <-, line 125
                      if (!base.slice_from("eux")) {
                        return false;
                      }
                    }
                    break;
                  case 3:
                    // (, line 127
                    // call R2, line 127
                    if (!r_R2()) {
                      base.cursor = base.limit - v_3;
                      break lab3;
                    }
                    // delete, line 127
                    if (!base.slice_del()) {
                      return false;
                    }
                    break;
                  case 4:
                    // (, line 129
                    // call RV, line 129
                    if (!r_RV()) {
                      base.cursor = base.limit - v_3;
                      break lab3;
                    }
                    // <-, line 129
                    if (!base.slice_from("i")) {
                      return false;
                    }
                    break;
                }
              }
              break;
            case 7:
              // (, line 135
              // call R2, line 136
              if (!r_R2()) {
                return false;
              }
              // delete, line 136
              if (!base.slice_del()) {
                return false;
              }
              // try, line 137
              var /** number */ v_5 = base.limit - base.cursor;
              lab6: {
                // (, line 137
                // [, line 138
                base.ket = base.cursor;
                // substring, line 138
                among_var = base.find_among_b(a_3);
                if (among_var == 0) {
                  base.cursor = base.limit - v_5;
                  break lab6;
                }
                // ], line 138
                base.bra = base.cursor;
                switch (among_var) {
                  case 1:
                    // (, line 139
                    // or, line 139
                    lab7: {
                      var /** number */ v_6 = base.limit - base.cursor;
                      lab8: {
                        // (, line 139
                        // call R2, line 139
                        if (!r_R2()) {
                          break lab8;
                        }
                        // delete, line 139
                        if (!base.slice_del()) {
                          return false;
                        }
                        break lab7;
                      }
                      base.cursor = base.limit - v_6;
                      // <-, line 139
                      if (!base.slice_from("abl")) {
                        return false;
                      }
                    }
                    break;
                  case 2:
                    // (, line 140
                    // or, line 140
                    lab9: {
                      var /** number */ v_7 = base.limit - base.cursor;
                      lab10: {
                        // (, line 140
                        // call R2, line 140
                        if (!r_R2()) {
                          break lab10;
                        }
                        // delete, line 140
                        if (!base.slice_del()) {
                          return false;
                        }
                        break lab9;
                      }
                      base.cursor = base.limit - v_7;
                      // <-, line 140
                      if (!base.slice_from("iqU")) {
                        return false;
                      }
                    }
                    break;
                  case 3:
                    // (, line 141
                    // call R2, line 141
                    if (!r_R2()) {
                      base.cursor = base.limit - v_5;
                      break lab6;
                    }
                    // delete, line 141
                    if (!base.slice_del()) {
                      return false;
                    }
                    break;
                }
              }
              break;
            case 8:
              // (, line 147
              // call R2, line 148
              if (!r_R2()) {
                return false;
              }
              // delete, line 148
              if (!base.slice_del()) {
                return false;
              }
              // try, line 149
              var /** number */ v_8 = base.limit - base.cursor;
              lab11: {
                // (, line 149
                // [, line 149
                base.ket = base.cursor;
                // literal, line 149
                if (!(base.eq_s_b("at"))) {
                  base.cursor = base.limit - v_8;
                  break lab11;
                }
                // ], line 149
                base.bra = base.cursor;
                // call R2, line 149
                if (!r_R2()) {
                  base.cursor = base.limit - v_8;
                  break lab11;
                }
                // delete, line 149
                if (!base.slice_del()) {
                  return false;
                }
                // [, line 149
                base.ket = base.cursor;
                // literal, line 149
                if (!(base.eq_s_b("ic"))) {
                  base.cursor = base.limit - v_8;
                  break lab11;
                }
                // ], line 149
                base.bra = base.cursor;
                // or, line 149
                lab12: {
                  var /** number */ v_9 = base.limit - base.cursor;
                  lab13: {
                    // (, line 149
                    // call R2, line 149
                    if (!r_R2()) {
                      break lab13;
                    }
                    // delete, line 149
                    if (!base.slice_del()) {
                      return false;
                    }
                    break lab12;
                  }
                  base.cursor = base.limit - v_9;
                  // <-, line 149
                  if (!base.slice_from("iqU")) {
                    return false;
                  }
                }
              }
              break;
            case 9:
              // (, line 151
              // <-, line 151
              if (!base.slice_from("eau")) {
                return false;
              }
              break;
            case 10:
              // (, line 152
              // call R1, line 152
              if (!r_R1()) {
                return false;
              }
              // <-, line 152
              if (!base.slice_from("al")) {
                return false;
              }
              break;
            case 11:
              // (, line 154
              // or, line 154
              lab14: {
                var /** number */ v_10 = base.limit - base.cursor;
                lab15: {
                  // (, line 154
                  // call R2, line 154
                  if (!r_R2()) {
                    break lab15;
                  }
                  // delete, line 154
                  if (!base.slice_del()) {
                    return false;
                  }
                  break lab14;
                }
                base.cursor = base.limit - v_10;
                // (, line 154
                // call R1, line 154
                if (!r_R1()) {
                  return false;
                }
                // <-, line 154
                if (!base.slice_from("eux")) {
                  return false;
                }
              }
              break;
            case 12:
              // (, line 157
              // call R1, line 157
              if (!r_R1()) {
                return false;
              }
              if (!(base.out_grouping_b(g_v, 97, 251))) {
                return false;
              }
              // delete, line 157
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 13:
              // (, line 162
              // call RV, line 162
              if (!r_RV()) {
                return false;
              }
              // fail, line 162
              // (, line 162
              // <-, line 162
              if (!base.slice_from("ant")) {
                return false;
              }
              return false;
            case 14:
              // (, line 163
              // call RV, line 163
              if (!r_RV()) {
                return false;
              }
              // fail, line 163
              // (, line 163
              // <-, line 163
              if (!base.slice_from("ent")) {
                return false;
              }
              return false;
            case 15:
              // (, line 165
              // test, line 165
              var /** number */ v_11 = base.limit - base.cursor;
              // (, line 165
              if (!(base.in_grouping_b(g_v, 97, 251))) {
                return false;
              }
              // call RV, line 165
              if (!r_RV()) {
                return false;
              }
              base.cursor = base.limit - v_11;
              // fail, line 165
              // (, line 165
              // delete, line 165
              if (!base.slice_del()) {
                return false;
              }
              return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_i_verb_suffix() {
          // setlimit, line 170
          if (base.cursor < I_pV) {
            return false;
          }
          var /** number */ v_2 = base.limit_backward;
          base.limit_backward = I_pV;
          // (, line 170
          // [, line 171
          base.ket = base.cursor;
          // substring, line 171
          if (base.find_among_b(a_5) == 0) {
            base.limit_backward = v_2;
            return false;
          }
          // ], line 171
          base.bra = base.cursor;
          // (, line 177
          // not, line 177
          {
            var /** number */ v_3 = base.limit - base.cursor;
            lab0: {
              // literal, line 177
              if (!(base.eq_s_b("H"))) {
                break lab0;
              }
              base.limit_backward = v_2;
              return false;
            }
            base.cursor = base.limit - v_3;
          }
          if (!(base.out_grouping_b(g_v, 97, 251))) {
            base.limit_backward = v_2;
            return false;
          }
          // delete, line 177
          if (!base.slice_del()) {
            return false;
          }
          base.limit_backward = v_2;
          return true;
        };

        /** @return {boolean} */
        function r_verb_suffix() {
          var /** number */ among_var;
          // setlimit, line 181
          if (base.cursor < I_pV) {
            return false;
          }
          var /** number */ v_2 = base.limit_backward;
          base.limit_backward = I_pV;
          // (, line 181
          // [, line 182
          base.ket = base.cursor;
          // substring, line 182
          among_var = base.find_among_b(a_6);
          if (among_var == 0) {
            base.limit_backward = v_2;
            return false;
          }
          // ], line 182
          base.bra = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 184
              // call R2, line 184
              if (!r_R2()) {
                base.limit_backward = v_2;
                return false;
              }
              // delete, line 184
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 192
              // delete, line 192
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 3:
              // (, line 197
              // delete, line 197
              if (!base.slice_del()) {
                return false;
              }
              // try, line 198
              var /** number */ v_3 = base.limit - base.cursor;
              lab0: {
                // (, line 198
                // [, line 198
                base.ket = base.cursor;
                // literal, line 198
                if (!(base.eq_s_b("e"))) {
                  base.cursor = base.limit - v_3;
                  break lab0;
                }
                // ], line 198
                base.bra = base.cursor;
                // delete, line 198
                if (!base.slice_del()) {
                  return false;
                }
              }
              break;
          }
          base.limit_backward = v_2;
          return true;
        };

        /** @return {boolean} */
        function r_residual_suffix() {
          var /** number */ among_var;
          // (, line 205
          // try, line 206
          var /** number */ v_1 = base.limit - base.cursor;
          lab0: {
            // (, line 206
            // [, line 206
            base.ket = base.cursor;
            // literal, line 206
            if (!(base.eq_s_b("s"))) {
              base.cursor = base.limit - v_1;
              break lab0;
            }
            // ], line 206
            base.bra = base.cursor;
            // test, line 206
            var /** number */ v_2 = base.limit - base.cursor;
            // (, line 206
            // or, line 206
            lab1: {
              var /** number */ v_3 = base.limit - base.cursor;
              lab2: {
                // literal, line 206
                if (!(base.eq_s_b("Hi"))) {
                  break lab2;
                }
                break lab1;
              }
              base.cursor = base.limit - v_3;
              if (!(base.out_grouping_b(g_keep_with_s, 97, 232))) {
                base.cursor = base.limit - v_1;
                break lab0;
              }
            }
            base.cursor = base.limit - v_2;
            // delete, line 206
            if (!base.slice_del()) {
              return false;
            }
          }
          // setlimit, line 207
          if (base.cursor < I_pV) {
            return false;
          }
          var /** number */ v_5 = base.limit_backward;
          base.limit_backward = I_pV;
          // (, line 207
          // [, line 208
          base.ket = base.cursor;
          // substring, line 208
          among_var = base.find_among_b(a_7);
          if (among_var == 0) {
            base.limit_backward = v_5;
            return false;
          }
          // ], line 208
          base.bra = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 209
              // call R2, line 209
              if (!r_R2()) {
                base.limit_backward = v_5;
                return false;
              }
              // or, line 209
              lab3: {
                var /** number */ v_6 = base.limit - base.cursor;
                lab4: {
                  // literal, line 209
                  if (!(base.eq_s_b("s"))) {
                    break lab4;
                  }
                  break lab3;
                }
                base.cursor = base.limit - v_6;
                // literal, line 209
                if (!(base.eq_s_b("t"))) {
                  base.limit_backward = v_5;
                  return false;
                }
              }
              // delete, line 209
              if (!base.slice_del()) {
                return false;
              }
              break;
            case 2:
              // (, line 211
              // <-, line 211
              if (!base.slice_from("i")) {
                return false;
              }
              break;
            case 3:
              // (, line 212
              // delete, line 212
              if (!base.slice_del()) {
                return false;
              }
              break;
          }
          base.limit_backward = v_5;
          return true;
        };

        /** @return {boolean} */
        function r_un_double() {
          // (, line 217
          // test, line 218
          var /** number */ v_1 = base.limit - base.cursor;
          // among, line 218
          if (base.find_among_b(a_8) == 0) {
            return false;
          }
          base.cursor = base.limit - v_1;
          // [, line 218
          base.ket = base.cursor;
          // next, line 218
          if (base.cursor <= base.limit_backward) {
            return false;
          }
          base.cursor--;
          // ], line 218
          base.bra = base.cursor;
          // delete, line 218
          if (!base.slice_del()) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_un_accent() {
          // (, line 221
          // atleast, line 222
          {
            var v_1 = 1;
            // atleast, line 222
            replab0: while (true) {
              lab1: {
                if (!(base.out_grouping_b(g_v, 97, 251))) {
                  break lab1;
                }
                v_1--;
                continue replab0;
              }
              break replab0;
            }
            if (v_1 > 0) {
              return false;
            }
          }
          // [, line 223
          base.ket = base.cursor;
          // or, line 223
          lab2: {
            var /** number */ v_3 = base.limit - base.cursor;
            lab3: {
              // literal, line 223
              if (!(base.eq_s_b("\u00E9"))) {
                break lab3;
              }
              break lab2;
            }
            base.cursor = base.limit - v_3;
            // literal, line 223
            if (!(base.eq_s_b("\u00E8"))) {
              return false;
            }
          }
          // ], line 223
          base.bra = base.cursor;
          // <-, line 223
          if (!base.slice_from("e")) {
            return false;
          }
          return true;
        };

        this.stem = /** @return {boolean} */ function() {
          // (, line 227
          // do, line 229
          var /** number */ v_1 = base.cursor;
          lab0: {
            // call prelude, line 229
            if (!r_prelude()) {
              break lab0;
            }
          }
          base.cursor = v_1;
          // do, line 230
          lab1: {
            // call mark_regions, line 230
            if (!r_mark_regions()) {
              break lab1;
            }
          }
          // backwards, line 231
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 231
          // do, line 233
          var /** number */ v_3 = base.limit - base.cursor;
          lab2: {
            // (, line 233
            // or, line 243
            lab3: {
              var /** number */ v_4 = base.limit - base.cursor;
              lab4: {
                // (, line 234
                // and, line 239
                var /** number */ v_5 = base.limit - base.cursor;
                // (, line 235
                // or, line 235
                lab5: {
                  var /** number */ v_6 = base.limit - base.cursor;
                  lab6: {
                    // call standard_suffix, line 235
                    if (!r_standard_suffix()) {
                      break lab6;
                    }
                    break lab5;
                  }
                  base.cursor = base.limit - v_6;
                  lab7: {
                    // call i_verb_suffix, line 236
                    if (!r_i_verb_suffix()) {
                      break lab7;
                    }
                    break lab5;
                  }
                  base.cursor = base.limit - v_6;
                  // call verb_suffix, line 237
                  if (!r_verb_suffix()) {
                    break lab4;
                  }
                }
                base.cursor = base.limit - v_5;
                // try, line 240
                var /** number */ v_7 = base.limit - base.cursor;
                lab8: {
                  // (, line 240
                  // [, line 240
                  base.ket = base.cursor;
                  // or, line 240
                  lab9: {
                    var /** number */ v_8 = base.limit - base.cursor;
                    lab10: {
                      // (, line 240
                      // literal, line 240
                      if (!(base.eq_s_b("Y"))) {
                        break lab10;
                      }
                      // ], line 240
                      base.bra = base.cursor;
                      // <-, line 240
                      if (!base.slice_from("i")) {
                        return false;
                      }
                      break lab9;
                    }
                    base.cursor = base.limit - v_8;
                    // (, line 241
                    // literal, line 241
                    if (!(base.eq_s_b("\u00E7"))) {
                      base.cursor = base.limit - v_7;
                      break lab8;
                    }
                    // ], line 241
                    base.bra = base.cursor;
                    // <-, line 241
                    if (!base.slice_from("c")) {
                      return false;
                    }
                  }
                }
                break lab3;
              }
              base.cursor = base.limit - v_4;
              // call residual_suffix, line 244
              if (!r_residual_suffix()) {
                break lab2;
              }
            }
          }
          base.cursor = base.limit - v_3;
          // do, line 249
          var /** number */ v_9 = base.limit - base.cursor;
          lab11: {
            // call un_double, line 249
            if (!r_un_double()) {
              break lab11;
            }
          }
          base.cursor = base.limit - v_9;
          // do, line 250
          var /** number */ v_10 = base.limit - base.cursor;
          lab12: {
            // call un_accent, line 250
            if (!r_un_accent()) {
              break lab12;
            }
          }
          base.cursor = base.limit - v_10;
          base.cursor = base.limit_backward;
          // do, line 252
          var /** number */ v_11 = base.cursor;
          lab13: {
            // call postlude, line 252
            if (!r_postlude()) {
              break lab13;
            }
          }
          base.cursor = v_11;
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

    lunr.Pipeline.registerFunction(lunr.fr.stemmer, 'stemmer-fr');

    lunr.fr.stopWordFilter = lunr.generateStopWordFilter("ai aie aient aies ait as au aura aurai auraient aurais aurait auras aurez auriez aurions aurons auront aux avaient avais avait avec avez aviez avions avons ayant ayez ayons c ce ceci celà ces cet cette d dans de des du elle en es est et eu eue eues eurent eus eusse eussent eusses eussiez eussions eut eux eûmes eût eûtes furent fus fusse fussent fusses fussiez fussions fut fûmes fût fûtes ici il ils j je l la le les leur leurs lui m ma mais me mes moi mon même n ne nos notre nous on ont ou par pas pour qu que quel quelle quelles quels qui s sa sans se sera serai seraient serais serait seras serez seriez serions serons seront ses soi soient sois soit sommes son sont soyez soyons suis sur t ta te tes toi ton tu un une vos votre vous y à étaient étais était étant étiez étions été étée étées étés êtes".split(' '));

    lunr.Pipeline.registerFunction(lunr.fr.stopWordFilter, 'stopWordFilter-fr');
  };
}))