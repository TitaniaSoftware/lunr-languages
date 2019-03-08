// This file was generated automatically by the Snowball to Javascript compiler
// http://snowballstem.org/

/**@constructor*/
ArabicStemmer = function() {
    var base = new BaseStemmer();
    /** @const */ var a_0 = [
        ["\u0640", -1, 1],
        ["\u064B", -1, 1],
        ["\u064C", -1, 1],
        ["\u064D", -1, 1],
        ["\u064E", -1, 1],
        ["\u064F", -1, 1],
        ["\u0650", -1, 1],
        ["\u0651", -1, 1],
        ["\u0652", -1, 1],
        ["\u0660", -1, 2],
        ["\u0661", -1, 3],
        ["\u0662", -1, 4],
        ["\u0663", -1, 5],
        ["\u0664", -1, 6],
        ["\u0665", -1, 7],
        ["\u0666", -1, 8],
        ["\u0667", -1, 9],
        ["\u0668", -1, 10],
        ["\u0669", -1, 11],
        ["\uFE80", -1, 12],
        ["\uFE81", -1, 16],
        ["\uFE82", -1, 16],
        ["\uFE83", -1, 13],
        ["\uFE84", -1, 13],
        ["\uFE85", -1, 17],
        ["\uFE86", -1, 17],
        ["\uFE87", -1, 14],
        ["\uFE88", -1, 14],
        ["\uFE89", -1, 15],
        ["\uFE8A", -1, 15],
        ["\uFE8B", -1, 15],
        ["\uFE8C", -1, 15],
        ["\uFE8D", -1, 18],
        ["\uFE8E", -1, 18],
        ["\uFE8F", -1, 19],
        ["\uFE90", -1, 19],
        ["\uFE91", -1, 19],
        ["\uFE92", -1, 19],
        ["\uFE93", -1, 20],
        ["\uFE94", -1, 20],
        ["\uFE95", -1, 21],
        ["\uFE96", -1, 21],
        ["\uFE97", -1, 21],
        ["\uFE98", -1, 21],
        ["\uFE99", -1, 22],
        ["\uFE9A", -1, 22],
        ["\uFE9B", -1, 22],
        ["\uFE9C", -1, 22],
        ["\uFE9D", -1, 23],
        ["\uFE9E", -1, 23],
        ["\uFE9F", -1, 23],
        ["\uFEA0", -1, 23],
        ["\uFEA1", -1, 24],
        ["\uFEA2", -1, 24],
        ["\uFEA3", -1, 24],
        ["\uFEA4", -1, 24],
        ["\uFEA5", -1, 25],
        ["\uFEA6", -1, 25],
        ["\uFEA7", -1, 25],
        ["\uFEA8", -1, 25],
        ["\uFEA9", -1, 26],
        ["\uFEAA", -1, 26],
        ["\uFEAB", -1, 27],
        ["\uFEAC", -1, 27],
        ["\uFEAD", -1, 28],
        ["\uFEAE", -1, 28],
        ["\uFEAF", -1, 29],
        ["\uFEB0", -1, 29],
        ["\uFEB1", -1, 30],
        ["\uFEB2", -1, 30],
        ["\uFEB3", -1, 30],
        ["\uFEB4", -1, 30],
        ["\uFEB5", -1, 31],
        ["\uFEB6", -1, 31],
        ["\uFEB7", -1, 31],
        ["\uFEB8", -1, 31],
        ["\uFEB9", -1, 32],
        ["\uFEBA", -1, 32],
        ["\uFEBB", -1, 32],
        ["\uFEBC", -1, 32],
        ["\uFEBD", -1, 33],
        ["\uFEBE", -1, 33],
        ["\uFEBF", -1, 33],
        ["\uFEC0", -1, 33],
        ["\uFEC1", -1, 34],
        ["\uFEC2", -1, 34],
        ["\uFEC3", -1, 34],
        ["\uFEC4", -1, 34],
        ["\uFEC5", -1, 35],
        ["\uFEC6", -1, 35],
        ["\uFEC7", -1, 35],
        ["\uFEC8", -1, 35],
        ["\uFEC9", -1, 36],
        ["\uFECA", -1, 36],
        ["\uFECB", -1, 36],
        ["\uFECC", -1, 36],
        ["\uFECD", -1, 37],
        ["\uFECE", -1, 37],
        ["\uFECF", -1, 37],
        ["\uFED0", -1, 37],
        ["\uFED1", -1, 38],
        ["\uFED2", -1, 38],
        ["\uFED3", -1, 38],
        ["\uFED4", -1, 38],
        ["\uFED5", -1, 39],
        ["\uFED6", -1, 39],
        ["\uFED7", -1, 39],
        ["\uFED8", -1, 39],
        ["\uFED9", -1, 40],
        ["\uFEDA", -1, 40],
        ["\uFEDB", -1, 40],
        ["\uFEDC", -1, 40],
        ["\uFEDD", -1, 41],
        ["\uFEDE", -1, 41],
        ["\uFEDF", -1, 41],
        ["\uFEE0", -1, 41],
        ["\uFEE1", -1, 42],
        ["\uFEE2", -1, 42],
        ["\uFEE3", -1, 42],
        ["\uFEE4", -1, 42],
        ["\uFEE5", -1, 43],
        ["\uFEE6", -1, 43],
        ["\uFEE7", -1, 43],
        ["\uFEE8", -1, 43],
        ["\uFEE9", -1, 44],
        ["\uFEEA", -1, 44],
        ["\uFEEB", -1, 44],
        ["\uFEEC", -1, 44],
        ["\uFEED", -1, 45],
        ["\uFEEE", -1, 45],
        ["\uFEEF", -1, 46],
        ["\uFEF0", -1, 46],
        ["\uFEF1", -1, 47],
        ["\uFEF2", -1, 47],
        ["\uFEF3", -1, 47],
        ["\uFEF4", -1, 47],
        ["\uFEF5", -1, 51],
        ["\uFEF6", -1, 51],
        ["\uFEF7", -1, 49],
        ["\uFEF8", -1, 49],
        ["\uFEF9", -1, 50],
        ["\uFEFA", -1, 50],
        ["\uFEFB", -1, 48],
        ["\uFEFC", -1, 48]
    ];

    /** @const */ var a_1 = [
        ["\u0622", -1, 1],
        ["\u0623", -1, 1],
        ["\u0624", -1, 1],
        ["\u0625", -1, 1],
        ["\u0626", -1, 1]
    ];

    /** @const */ var a_2 = [
        ["\u0622", -1, 1],
        ["\u0623", -1, 1],
        ["\u0624", -1, 2],
        ["\u0625", -1, 1],
        ["\u0626", -1, 3]
    ];

    /** @const */ var a_3 = [
        ["\u0627\u0644", -1, 2],
        ["\u0628\u0627\u0644", -1, 1],
        ["\u0643\u0627\u0644", -1, 1],
        ["\u0644\u0644", -1, 2]
    ];

    /** @const */ var a_4 = [
        ["\u0623\u0622", -1, 2],
        ["\u0623\u0623", -1, 1],
        ["\u0623\u0624", -1, 1],
        ["\u0623\u0625", -1, 4],
        ["\u0623\u0627", -1, 3]
    ];

    /** @const */ var a_5 = [
        ["\u0641", -1, 1],
        ["\u0648", -1, 1]
    ];

    /** @const */ var a_6 = [
        ["\u0627\u0644", -1, 2],
        ["\u0628\u0627\u0644", -1, 1],
        ["\u0643\u0627\u0644", -1, 1],
        ["\u0644\u0644", -1, 2]
    ];

    /** @const */ var a_7 = [
        ["\u0628", -1, 1],
        ["\u0628\u0628", 0, 2],
        ["\u0643\u0643", -1, 3]
    ];

    /** @const */ var a_8 = [
        ["\u0633\u0623", -1, 4],
        ["\u0633\u062A", -1, 2],
        ["\u0633\u0646", -1, 3],
        ["\u0633\u064A", -1, 1]
    ];

    /** @const */ var a_9 = [
        ["\u062A\u0633\u062A", -1, 1],
        ["\u0646\u0633\u062A", -1, 1],
        ["\u064A\u0633\u062A", -1, 1]
    ];

    /** @const */ var a_10 = [
        ["\u0643\u0645\u0627", -1, 3],
        ["\u0647\u0645\u0627", -1, 3],
        ["\u0646\u0627", -1, 2],
        ["\u0647\u0627", -1, 2],
        ["\u0643", -1, 1],
        ["\u0643\u0645", -1, 2],
        ["\u0647\u0645", -1, 2],
        ["\u0647\u0646", -1, 2],
        ["\u0647", -1, 1],
        ["\u064A", -1, 1]
    ];

    /** @const */ var a_11 = [
        ["\u0646", -1, 1]
    ];

    /** @const */ var a_12 = [
        ["\u0627", -1, 1],
        ["\u0648", -1, 1],
        ["\u064A", -1, 1]
    ];

    /** @const */ var a_13 = [
        ["\u0627\u062A", -1, 1]
    ];

    /** @const */ var a_14 = [
        ["\u062A", -1, 1]
    ];

    /** @const */ var a_15 = [
        ["\u0629", -1, 1]
    ];

    /** @const */ var a_16 = [
        ["\u064A", -1, 1]
    ];

    /** @const */ var a_17 = [
        ["\u0643\u0645\u0627", -1, 3],
        ["\u0647\u0645\u0627", -1, 3],
        ["\u0646\u0627", -1, 2],
        ["\u0647\u0627", -1, 2],
        ["\u0643", -1, 1],
        ["\u0643\u0645", -1, 2],
        ["\u0647\u0645", -1, 2],
        ["\u0643\u0646", -1, 2],
        ["\u0647\u0646", -1, 2],
        ["\u0647", -1, 1],
        ["\u0643\u0645\u0648", -1, 3],
        ["\u0646\u064A", -1, 2]
    ];

    /** @const */ var a_18 = [
        ["\u0627", -1, 1],
        ["\u062A\u0627", 0, 2],
        ["\u062A\u0645\u0627", 0, 4],
        ["\u0646\u0627", 0, 2],
        ["\u062A", -1, 1],
        ["\u0646", -1, 1],
        ["\u0627\u0646", 5, 3],
        ["\u062A\u0646", 5, 2],
        ["\u0648\u0646", 5, 3],
        ["\u064A\u0646", 5, 3],
        ["\u064A", -1, 1]
    ];

    /** @const */ var a_19 = [
        ["\u0648\u0627", -1, 1],
        ["\u062A\u0645", -1, 1]
    ];

    /** @const */ var a_20 = [
        ["\u0648", -1, 1],
        ["\u062A\u0645\u0648", 0, 2]
    ];

    /** @const */ var a_21 = [
        ["\u0649", -1, 1]
    ];

    var /** boolean */ B_is_defined = false;
    var /** boolean */ B_is_verb = false;
    var /** boolean */ B_is_noun = false;


    /** @return {boolean} */
    function r_Normalize_pre() {
        var /** number */ among_var;
        // (, line 246
        // do, line 247
        var /** number */ v_1 = base.cursor;
        lab0: {
            // repeat, line 247
            replab1: while(true)
            {
                var /** number */ v_2 = base.cursor;
                lab2: {
                    // (, line 247
                    // or, line 311
                    lab3: {
                        var /** number */ v_3 = base.cursor;
                        lab4: {
                            // (, line 248
                            // [, line 249
                            base.bra = base.cursor;
                            // substring, line 249
                            among_var = base.find_among(a_0);
                            if (among_var == 0)
                            {
                                break lab4;
                            }
                            // ], line 249
                            base.ket = base.cursor;
                            switch (among_var) {
                                case 1:
                                    // (, line 250
                                    // delete, line 250
                                    if (!base.slice_del())
                                    {
                                        return false;
                                    }
                                    break;
                                case 2:
                                    // (, line 254
                                    // <-, line 254
                                    if (!base.slice_from("0"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 3:
                                    // (, line 255
                                    // <-, line 255
                                    if (!base.slice_from("1"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 4:
                                    // (, line 256
                                    // <-, line 256
                                    if (!base.slice_from("2"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 5:
                                    // (, line 257
                                    // <-, line 257
                                    if (!base.slice_from("3"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 6:
                                    // (, line 258
                                    // <-, line 258
                                    if (!base.slice_from("4"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 7:
                                    // (, line 259
                                    // <-, line 259
                                    if (!base.slice_from("5"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 8:
                                    // (, line 260
                                    // <-, line 260
                                    if (!base.slice_from("6"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 9:
                                    // (, line 261
                                    // <-, line 261
                                    if (!base.slice_from("7"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 10:
                                    // (, line 262
                                    // <-, line 262
                                    if (!base.slice_from("8"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 11:
                                    // (, line 263
                                    // <-, line 263
                                    if (!base.slice_from("9"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 12:
                                    // (, line 266
                                    // <-, line 266
                                    if (!base.slice_from("\u0621"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 13:
                                    // (, line 267
                                    // <-, line 267
                                    if (!base.slice_from("\u0623"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 14:
                                    // (, line 268
                                    // <-, line 268
                                    if (!base.slice_from("\u0625"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 15:
                                    // (, line 269
                                    // <-, line 269
                                    if (!base.slice_from("\u0626"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 16:
                                    // (, line 270
                                    // <-, line 270
                                    if (!base.slice_from("\u0622"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 17:
                                    // (, line 271
                                    // <-, line 271
                                    if (!base.slice_from("\u0624"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 18:
                                    // (, line 272
                                    // <-, line 272
                                    if (!base.slice_from("\u0627"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 19:
                                    // (, line 273
                                    // <-, line 273
                                    if (!base.slice_from("\u0628"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 20:
                                    // (, line 274
                                    // <-, line 274
                                    if (!base.slice_from("\u0629"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 21:
                                    // (, line 275
                                    // <-, line 275
                                    if (!base.slice_from("\u062A"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 22:
                                    // (, line 276
                                    // <-, line 276
                                    if (!base.slice_from("\u062B"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 23:
                                    // (, line 277
                                    // <-, line 277
                                    if (!base.slice_from("\u062C"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 24:
                                    // (, line 278
                                    // <-, line 278
                                    if (!base.slice_from("\u062D"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 25:
                                    // (, line 279
                                    // <-, line 279
                                    if (!base.slice_from("\u062E"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 26:
                                    // (, line 280
                                    // <-, line 280
                                    if (!base.slice_from("\u062F"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 27:
                                    // (, line 281
                                    // <-, line 281
                                    if (!base.slice_from("\u0630"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 28:
                                    // (, line 282
                                    // <-, line 282
                                    if (!base.slice_from("\u0631"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 29:
                                    // (, line 283
                                    // <-, line 283
                                    if (!base.slice_from("\u0632"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 30:
                                    // (, line 284
                                    // <-, line 284
                                    if (!base.slice_from("\u0633"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 31:
                                    // (, line 285
                                    // <-, line 285
                                    if (!base.slice_from("\u0634"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 32:
                                    // (, line 286
                                    // <-, line 286
                                    if (!base.slice_from("\u0635"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 33:
                                    // (, line 287
                                    // <-, line 287
                                    if (!base.slice_from("\u0636"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 34:
                                    // (, line 288
                                    // <-, line 288
                                    if (!base.slice_from("\u0637"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 35:
                                    // (, line 289
                                    // <-, line 289
                                    if (!base.slice_from("\u0638"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 36:
                                    // (, line 290
                                    // <-, line 290
                                    if (!base.slice_from("\u0639"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 37:
                                    // (, line 291
                                    // <-, line 291
                                    if (!base.slice_from("\u063A"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 38:
                                    // (, line 292
                                    // <-, line 292
                                    if (!base.slice_from("\u0641"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 39:
                                    // (, line 293
                                    // <-, line 293
                                    if (!base.slice_from("\u0642"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 40:
                                    // (, line 294
                                    // <-, line 294
                                    if (!base.slice_from("\u0643"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 41:
                                    // (, line 295
                                    // <-, line 295
                                    if (!base.slice_from("\u0644"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 42:
                                    // (, line 296
                                    // <-, line 296
                                    if (!base.slice_from("\u0645"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 43:
                                    // (, line 297
                                    // <-, line 297
                                    if (!base.slice_from("\u0646"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 44:
                                    // (, line 298
                                    // <-, line 298
                                    if (!base.slice_from("\u0647"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 45:
                                    // (, line 299
                                    // <-, line 299
                                    if (!base.slice_from("\u0648"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 46:
                                    // (, line 300
                                    // <-, line 300
                                    if (!base.slice_from("\u0649"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 47:
                                    // (, line 301
                                    // <-, line 301
                                    if (!base.slice_from("\u064A"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 48:
                                    // (, line 304
                                    // <-, line 304
                                    if (!base.slice_from("\u0644\u0627"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 49:
                                    // (, line 305
                                    // <-, line 305
                                    if (!base.slice_from("\u0644\u0623"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 50:
                                    // (, line 306
                                    // <-, line 306
                                    if (!base.slice_from("\u0644\u0625"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 51:
                                    // (, line 307
                                    // <-, line 307
                                    if (!base.slice_from("\u0644\u0622"))
                                    {
                                        return false;
                                    }
                                    break;
                            }
                            break lab3;
                        }
                        base.cursor = v_3;
                        // next, line 312
                        if (base.cursor >= base.limit)
                        {
                            break lab2;
                        }
                        base.cursor++;
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
    function r_Normalize_post() {
        var /** number */ among_var;
        // (, line 316
        // do, line 318
        var /** number */ v_1 = base.cursor;
        lab0: {
            // (, line 318
            // backwards, line 320
            base.limit_backward = base.cursor; base.cursor = base.limit;
            // (, line 320
            // [, line 321
            base.ket = base.cursor;
            // substring, line 321
            if (base.find_among_b(a_1) == 0)
            {
                break lab0;
            }
            // ], line 321
            base.bra = base.cursor;
            // (, line 322
            // <-, line 322
            if (!base.slice_from("\u0621"))
            {
                return false;
            }
            base.cursor = base.limit_backward;
        }
        base.cursor = v_1;
        // do, line 329
        var /** number */ v_2 = base.cursor;
        lab1: {
            // repeat, line 329
            replab2: while(true)
            {
                var /** number */ v_3 = base.cursor;
                lab3: {
                    // (, line 329
                    // or, line 338
                    lab4: {
                        var /** number */ v_4 = base.cursor;
                        lab5: {
                            // (, line 330
                            // [, line 332
                            base.bra = base.cursor;
                            // substring, line 332
                            among_var = base.find_among(a_2);
                            if (among_var == 0)
                            {
                                break lab5;
                            }
                            // ], line 332
                            base.ket = base.cursor;
                            switch (among_var) {
                                case 1:
                                    // (, line 333
                                    // <-, line 333
                                    if (!base.slice_from("\u0627"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 2:
                                    // (, line 334
                                    // <-, line 334
                                    if (!base.slice_from("\u0648"))
                                    {
                                        return false;
                                    }
                                    break;
                                case 3:
                                    // (, line 335
                                    // <-, line 335
                                    if (!base.slice_from("\u064A"))
                                    {
                                        return false;
                                    }
                                    break;
                            }
                            break lab4;
                        }
                        base.cursor = v_4;
                        // next, line 339
                        if (base.cursor >= base.limit)
                        {
                            break lab3;
                        }
                        base.cursor++;
                    }
                    continue replab2;
                }
                base.cursor = v_3;
                break replab2;
            }
        }
        base.cursor = v_2;
        return true;
    };

    /** @return {boolean} */
    function r_Checks1() {
        var /** number */ among_var;
        // (, line 344
        // [, line 345
        base.bra = base.cursor;
        // substring, line 345
        among_var = base.find_among(a_3);
        if (among_var == 0)
        {
            return false;
        }
        // ], line 345
        base.ket = base.cursor;
        switch (among_var) {
            case 1:
                // (, line 346
                if (!(base.current.length > 4))
                {
                    return false;
                }
                // set is_noun, line 346
                B_is_noun = true;
                // unset is_verb, line 346
                B_is_verb = false;
                // set is_defined, line 346
                B_is_defined = true;
                break;
            case 2:
                // (, line 347
                if (!(base.current.length > 3))
                {
                    return false;
                }
                // set is_noun, line 347
                B_is_noun = true;
                // unset is_verb, line 347
                B_is_verb = false;
                // set is_defined, line 347
                B_is_defined = true;
                break;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Prefix_Step1() {
        var /** number */ among_var;
        // (, line 353
        // [, line 354
        base.bra = base.cursor;
        // substring, line 354
        among_var = base.find_among(a_4);
        if (among_var == 0)
        {
            return false;
        }
        // ], line 354
        base.ket = base.cursor;
        switch (among_var) {
            case 1:
                // (, line 355
                if (!(base.current.length > 3))
                {
                    return false;
                }
                // <-, line 355
                if (!base.slice_from("\u0623"))
                {
                    return false;
                }
                break;
            case 2:
                // (, line 356
                if (!(base.current.length > 3))
                {
                    return false;
                }
                // <-, line 356
                if (!base.slice_from("\u0622"))
                {
                    return false;
                }
                break;
            case 3:
                // (, line 358
                if (!(base.current.length > 3))
                {
                    return false;
                }
                // <-, line 358
                if (!base.slice_from("\u0627"))
                {
                    return false;
                }
                break;
            case 4:
                // (, line 359
                if (!(base.current.length > 3))
                {
                    return false;
                }
                // <-, line 359
                if (!base.slice_from("\u0625"))
                {
                    return false;
                }
                break;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Prefix_Step2() {
        // (, line 364
        // not, line 365
        {
            var /** number */ v_1 = base.cursor;
            lab0: {
                // literal, line 365
                if (!(base.eq_s("\u0641\u0627")))
                {
                    break lab0;
                }
                return false;
            }
            base.cursor = v_1;
        }
        // not, line 366
        {
            var /** number */ v_2 = base.cursor;
            lab1: {
                // literal, line 366
                if (!(base.eq_s("\u0648\u0627")))
                {
                    break lab1;
                }
                return false;
            }
            base.cursor = v_2;
        }
        // [, line 367
        base.bra = base.cursor;
        // substring, line 367
        if (base.find_among(a_5) == 0)
        {
            return false;
        }
        // ], line 367
        base.ket = base.cursor;
        // (, line 368
        if (!(base.current.length > 3))
        {
            return false;
        }
        // delete, line 368
        if (!base.slice_del())
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Prefix_Step3a_Noun() {
        var /** number */ among_var;
        // (, line 373
        // [, line 374
        base.bra = base.cursor;
        // substring, line 374
        among_var = base.find_among(a_6);
        if (among_var == 0)
        {
            return false;
        }
        // ], line 374
        base.ket = base.cursor;
        switch (among_var) {
            case 1:
                // (, line 375
                if (!(base.current.length > 5))
                {
                    return false;
                }
                // delete, line 375
                if (!base.slice_del())
                {
                    return false;
                }
                break;
            case 2:
                // (, line 376
                if (!(base.current.length > 4))
                {
                    return false;
                }
                // delete, line 376
                if (!base.slice_del())
                {
                    return false;
                }
                break;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Prefix_Step3b_Noun() {
        var /** number */ among_var;
        // (, line 380
        // not, line 381
        {
            var /** number */ v_1 = base.cursor;
            lab0: {
                // literal, line 381
                if (!(base.eq_s("\u0628\u0627")))
                {
                    break lab0;
                }
                return false;
            }
            base.cursor = v_1;
        }
        // [, line 382
        base.bra = base.cursor;
        // substring, line 382
        among_var = base.find_among(a_7);
        if (among_var == 0)
        {
            return false;
        }
        // ], line 382
        base.ket = base.cursor;
        switch (among_var) {
            case 1:
                // (, line 383
                if (!(base.current.length > 3))
                {
                    return false;
                }
                // delete, line 383
                if (!base.slice_del())
                {
                    return false;
                }
                break;
            case 2:
                // (, line 385
                if (!(base.current.length > 3))
                {
                    return false;
                }
                // <-, line 385
                if (!base.slice_from("\u0628"))
                {
                    return false;
                }
                break;
            case 3:
                // (, line 386
                if (!(base.current.length > 3))
                {
                    return false;
                }
                // <-, line 386
                if (!base.slice_from("\u0643"))
                {
                    return false;
                }
                break;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Prefix_Step3_Verb() {
        var /** number */ among_var;
        // (, line 391
        // [, line 392
        base.bra = base.cursor;
        // substring, line 392
        among_var = base.find_among(a_8);
        if (among_var == 0)
        {
            return false;
        }
        // ], line 392
        base.ket = base.cursor;
        switch (among_var) {
            case 1:
                // (, line 394
                if (!(base.current.length > 4))
                {
                    return false;
                }
                // <-, line 394
                if (!base.slice_from("\u064A"))
                {
                    return false;
                }
                break;
            case 2:
                // (, line 395
                if (!(base.current.length > 4))
                {
                    return false;
                }
                // <-, line 395
                if (!base.slice_from("\u062A"))
                {
                    return false;
                }
                break;
            case 3:
                // (, line 396
                if (!(base.current.length > 4))
                {
                    return false;
                }
                // <-, line 396
                if (!base.slice_from("\u0646"))
                {
                    return false;
                }
                break;
            case 4:
                // (, line 397
                if (!(base.current.length > 4))
                {
                    return false;
                }
                // <-, line 397
                if (!base.slice_from("\u0623"))
                {
                    return false;
                }
                break;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Prefix_Step4_Verb() {
        // (, line 401
        // [, line 402
        base.bra = base.cursor;
        // substring, line 402
        if (base.find_among(a_9) == 0)
        {
            return false;
        }
        // ], line 402
        base.ket = base.cursor;
        // (, line 403
        if (!(base.current.length > 4))
        {
            return false;
        }
        // set is_verb, line 403
        B_is_verb = true;
        // unset is_noun, line 403
        B_is_noun = false;
        // <-, line 403
        if (!base.slice_from("\u0627\u0633\u062A"))
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_Noun_Step1a() {
        var /** number */ among_var;
        // (, line 410
        // [, line 411
        base.ket = base.cursor;
        // substring, line 411
        among_var = base.find_among_b(a_10);
        if (among_var == 0)
        {
            return false;
        }
        // ], line 411
        base.bra = base.cursor;
        switch (among_var) {
            case 1:
                // (, line 412
                if (!(base.current.length >= 4))
                {
                    return false;
                }
                // delete, line 412
                if (!base.slice_del())
                {
                    return false;
                }
                break;
            case 2:
                // (, line 413
                if (!(base.current.length >= 5))
                {
                    return false;
                }
                // delete, line 413
                if (!base.slice_del())
                {
                    return false;
                }
                break;
            case 3:
                // (, line 414
                if (!(base.current.length >= 6))
                {
                    return false;
                }
                // delete, line 414
                if (!base.slice_del())
                {
                    return false;
                }
                break;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_Noun_Step1b() {
        // (, line 417
        // [, line 418
        base.ket = base.cursor;
        // substring, line 418
        if (base.find_among_b(a_11) == 0)
        {
            return false;
        }
        // ], line 418
        base.bra = base.cursor;
        // (, line 419
        if (!(base.current.length > 5))
        {
            return false;
        }
        // delete, line 419
        if (!base.slice_del())
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_Noun_Step2a() {
        // (, line 423
        // [, line 424
        base.ket = base.cursor;
        // substring, line 424
        if (base.find_among_b(a_12) == 0)
        {
            return false;
        }
        // ], line 424
        base.bra = base.cursor;
        // (, line 425
        if (!(base.current.length > 4))
        {
            return false;
        }
        // delete, line 425
        if (!base.slice_del())
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_Noun_Step2b() {
        // (, line 429
        // [, line 430
        base.ket = base.cursor;
        // substring, line 430
        if (base.find_among_b(a_13) == 0)
        {
            return false;
        }
        // ], line 430
        base.bra = base.cursor;
        // (, line 431
        if (!(base.current.length >= 5))
        {
            return false;
        }
        // delete, line 431
        if (!base.slice_del())
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_Noun_Step2c1() {
        // (, line 435
        // [, line 436
        base.ket = base.cursor;
        // substring, line 436
        if (base.find_among_b(a_14) == 0)
        {
            return false;
        }
        // ], line 436
        base.bra = base.cursor;
        // (, line 437
        if (!(base.current.length >= 4))
        {
            return false;
        }
        // delete, line 437
        if (!base.slice_del())
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_Noun_Step2c2() {
        // (, line 440
        // [, line 441
        base.ket = base.cursor;
        // substring, line 441
        if (base.find_among_b(a_15) == 0)
        {
            return false;
        }
        // ], line 441
        base.bra = base.cursor;
        // (, line 442
        if (!(base.current.length >= 4))
        {
            return false;
        }
        // delete, line 442
        if (!base.slice_del())
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_Noun_Step3() {
        // (, line 445
        // [, line 446
        base.ket = base.cursor;
        // substring, line 446
        if (base.find_among_b(a_16) == 0)
        {
            return false;
        }
        // ], line 446
        base.bra = base.cursor;
        // (, line 447
        if (!(base.current.length >= 3))
        {
            return false;
        }
        // delete, line 447
        if (!base.slice_del())
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_Verb_Step1() {
        var /** number */ among_var;
        // (, line 451
        // [, line 452
        base.ket = base.cursor;
        // substring, line 452
        among_var = base.find_among_b(a_17);
        if (among_var == 0)
        {
            return false;
        }
        // ], line 452
        base.bra = base.cursor;
        switch (among_var) {
            case 1:
                // (, line 453
                if (!(base.current.length >= 4))
                {
                    return false;
                }
                // delete, line 453
                if (!base.slice_del())
                {
                    return false;
                }
                break;
            case 2:
                // (, line 454
                if (!(base.current.length >= 5))
                {
                    return false;
                }
                // delete, line 454
                if (!base.slice_del())
                {
                    return false;
                }
                break;
            case 3:
                // (, line 455
                if (!(base.current.length >= 6))
                {
                    return false;
                }
                // delete, line 455
                if (!base.slice_del())
                {
                    return false;
                }
                break;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_Verb_Step2a() {
        var /** number */ among_var;
        // (, line 458
        // [, line 459
        base.ket = base.cursor;
        // substring, line 459
        among_var = base.find_among_b(a_18);
        if (among_var == 0)
        {
            return false;
        }
        // ], line 459
        base.bra = base.cursor;
        switch (among_var) {
            case 1:
                // (, line 460
                if (!(base.current.length >= 4))
                {
                    return false;
                }
                // delete, line 460
                if (!base.slice_del())
                {
                    return false;
                }
                break;
            case 2:
                // (, line 462
                if (!(base.current.length >= 5))
                {
                    return false;
                }
                // delete, line 462
                if (!base.slice_del())
                {
                    return false;
                }
                break;
            case 3:
                // (, line 463
                if (!(base.current.length > 5))
                {
                    return false;
                }
                // delete, line 463
                if (!base.slice_del())
                {
                    return false;
                }
                break;
            case 4:
                // (, line 464
                if (!(base.current.length >= 6))
                {
                    return false;
                }
                // delete, line 464
                if (!base.slice_del())
                {
                    return false;
                }
                break;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_Verb_Step2b() {
        // (, line 468
        // [, line 469
        base.ket = base.cursor;
        // substring, line 469
        if (base.find_among_b(a_19) == 0)
        {
            return false;
        }
        // ], line 469
        base.bra = base.cursor;
        // (, line 470
        if (!(base.current.length >= 5))
        {
            return false;
        }
        // delete, line 470
        if (!base.slice_del())
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_Verb_Step2c() {
        var /** number */ among_var;
        // (, line 475
        // [, line 476
        base.ket = base.cursor;
        // substring, line 476
        among_var = base.find_among_b(a_20);
        if (among_var == 0)
        {
            return false;
        }
        // ], line 476
        base.bra = base.cursor;
        switch (among_var) {
            case 1:
                // (, line 477
                if (!(base.current.length >= 4))
                {
                    return false;
                }
                // delete, line 477
                if (!base.slice_del())
                {
                    return false;
                }
                break;
            case 2:
                // (, line 478
                if (!(base.current.length >= 6))
                {
                    return false;
                }
                // delete, line 478
                if (!base.slice_del())
                {
                    return false;
                }
                break;
        }
        return true;
    };

    /** @return {boolean} */
    function r_Suffix_All_alef_maqsura() {
        // (, line 482
        // [, line 483
        base.ket = base.cursor;
        // substring, line 483
        if (base.find_among_b(a_21) == 0)
        {
            return false;
        }
        // ], line 483
        base.bra = base.cursor;
        // (, line 484
        // <-, line 484
        if (!base.slice_from("\u064A"))
        {
            return false;
        }
        return true;
    };

    this.stem = /** @return {boolean} */ function() {
        // (, line 491
        // set is_noun, line 493
        B_is_noun = true;
        // set is_verb, line 494
        B_is_verb = true;
        // unset is_defined, line 495
        B_is_defined = false;
        // do, line 498
        var /** number */ v_1 = base.cursor;
        lab0: {
            // call Checks1, line 498
            if (!r_Checks1())
            {
                break lab0;
            }
        }
        base.cursor = v_1;
        // do, line 501
        lab1: {
            // call Normalize_pre, line 501
            if (!r_Normalize_pre())
            {
                break lab1;
            }
        }
        // backwards, line 504
        base.limit_backward = base.cursor; base.cursor = base.limit;
        // (, line 504
        // do, line 506
        var /** number */ v_3 = base.limit - base.cursor;
        lab2: {
            // (, line 506
            // or, line 520
            lab3: {
                var /** number */ v_4 = base.limit - base.cursor;
                lab4: {
                    // (, line 508
                    // Boolean test is_verb, line 509
                    if (!B_is_verb)
                    {
                        break lab4;
                    }
                    // (, line 510
                    // or, line 515
                    lab5: {
                        var /** number */ v_5 = base.limit - base.cursor;
                        lab6: {
                            // (, line 511
                            // (, line 512
                            // atleast, line 512
                            {
                                var v_6 = 1;
                                // atleast, line 512
                                replab7: while(true)
                                {
                                    var /** number */ v_7 = base.limit - base.cursor;
                                    lab8: {
                                        // call Suffix_Verb_Step1, line 512
                                        if (!r_Suffix_Verb_Step1())
                                        {
                                            break lab8;
                                        }
                                        v_6--;
                                        continue replab7;
                                    }
                                    base.cursor = base.limit - v_7;
                                    break replab7;
                                }
                                if (v_6 > 0)
                                {
                                    break lab6;
                                }
                            }
                            // (, line 513
                            // or, line 513
                            lab9: {
                                var /** number */ v_8 = base.limit - base.cursor;
                                lab10: {
                                    // call Suffix_Verb_Step2a, line 513
                                    if (!r_Suffix_Verb_Step2a())
                                    {
                                        break lab10;
                                    }
                                    break lab9;
                                }
                                base.cursor = base.limit - v_8;
                                lab11: {
                                    // call Suffix_Verb_Step2c, line 513
                                    if (!r_Suffix_Verb_Step2c())
                                    {
                                        break lab11;
                                    }
                                    break lab9;
                                }
                                base.cursor = base.limit - v_8;
                                // next, line 513
                                if (base.cursor <= base.limit_backward)
                                {
                                    break lab6;
                                }
                                base.cursor--;
                            }
                            break lab5;
                        }
                        base.cursor = base.limit - v_5;
                        lab12: {
                            // call Suffix_Verb_Step2b, line 515
                            if (!r_Suffix_Verb_Step2b())
                            {
                                break lab12;
                            }
                            break lab5;
                        }
                        base.cursor = base.limit - v_5;
                        // call Suffix_Verb_Step2a, line 516
                        if (!r_Suffix_Verb_Step2a())
                        {
                            break lab4;
                        }
                    }
                    break lab3;
                }
                base.cursor = base.limit - v_4;
                lab13: {
                    // (, line 520
                    // Boolean test is_noun, line 521
                    if (!B_is_noun)
                    {
                        break lab13;
                    }
                    // (, line 522
                    // try, line 524
                    var /** number */ v_9 = base.limit - base.cursor;
                    lab14: {
                        // (, line 524
                        // or, line 526
                        lab15: {
                            var /** number */ v_10 = base.limit - base.cursor;
                            lab16: {
                                // call Suffix_Noun_Step2c2, line 525
                                if (!r_Suffix_Noun_Step2c2())
                                {
                                    break lab16;
                                }
                                break lab15;
                            }
                            base.cursor = base.limit - v_10;
                            lab17: {
                                // (, line 526
                                // not, line 526
                                lab18: {
                                    // Boolean test is_defined, line 526
                                    if (!B_is_defined)
                                    {
                                        break lab18;
                                    }
                                    break lab17;
                                }
                                // call Suffix_Noun_Step1a, line 526
                                if (!r_Suffix_Noun_Step1a())
                                {
                                    break lab17;
                                }
                                // (, line 526
                                // or, line 528
                                lab19: {
                                    var /** number */ v_12 = base.limit - base.cursor;
                                    lab20: {
                                        // call Suffix_Noun_Step2a, line 527
                                        if (!r_Suffix_Noun_Step2a())
                                        {
                                            break lab20;
                                        }
                                        break lab19;
                                    }
                                    base.cursor = base.limit - v_12;
                                    lab21: {
                                        // call Suffix_Noun_Step2b, line 528
                                        if (!r_Suffix_Noun_Step2b())
                                        {
                                            break lab21;
                                        }
                                        break lab19;
                                    }
                                    base.cursor = base.limit - v_12;
                                    lab22: {
                                        // call Suffix_Noun_Step2c1, line 529
                                        if (!r_Suffix_Noun_Step2c1())
                                        {
                                            break lab22;
                                        }
                                        break lab19;
                                    }
                                    base.cursor = base.limit - v_12;
                                    // next, line 530
                                    if (base.cursor <= base.limit_backward)
                                    {
                                        break lab17;
                                    }
                                    base.cursor--;
                                }
                                break lab15;
                            }
                            base.cursor = base.limit - v_10;
                            lab23: {
                                // (, line 531
                                // call Suffix_Noun_Step1b, line 531
                                if (!r_Suffix_Noun_Step1b())
                                {
                                    break lab23;
                                }
                                // (, line 531
                                // or, line 533
                                lab24: {
                                    var /** number */ v_13 = base.limit - base.cursor;
                                    lab25: {
                                        // call Suffix_Noun_Step2a, line 532
                                        if (!r_Suffix_Noun_Step2a())
                                        {
                                            break lab25;
                                        }
                                        break lab24;
                                    }
                                    base.cursor = base.limit - v_13;
                                    lab26: {
                                        // call Suffix_Noun_Step2b, line 533
                                        if (!r_Suffix_Noun_Step2b())
                                        {
                                            break lab26;
                                        }
                                        break lab24;
                                    }
                                    base.cursor = base.limit - v_13;
                                    // call Suffix_Noun_Step2c1, line 534
                                    if (!r_Suffix_Noun_Step2c1())
                                    {
                                        break lab23;
                                    }
                                }
                                break lab15;
                            }
                            base.cursor = base.limit - v_10;
                            lab27: {
                                // (, line 535
                                // not, line 535
                                lab28: {
                                    // Boolean test is_defined, line 535
                                    if (!B_is_defined)
                                    {
                                        break lab28;
                                    }
                                    break lab27;
                                }
                                // call Suffix_Noun_Step2a, line 535
                                if (!r_Suffix_Noun_Step2a())
                                {
                                    break lab27;
                                }
                                break lab15;
                            }
                            base.cursor = base.limit - v_10;
                            // (, line 536
                            // call Suffix_Noun_Step2b, line 536
                            if (!r_Suffix_Noun_Step2b())
                            {
                                base.cursor = base.limit - v_9;
                                break lab14;
                            }
                        }
                    }
                    // call Suffix_Noun_Step3, line 538
                    if (!r_Suffix_Noun_Step3())
                    {
                        break lab13;
                    }
                    break lab3;
                }
                base.cursor = base.limit - v_4;
                // call Suffix_All_alef_maqsura, line 544
                if (!r_Suffix_All_alef_maqsura())
                {
                    break lab2;
                }
            }
        }
        base.cursor = base.limit - v_3;
        base.cursor = base.limit_backward;
        // do, line 549
        var /** number */ v_15 = base.cursor;
        lab29: {
            // (, line 549
            // try, line 550
            var /** number */ v_16 = base.cursor;
            lab30: {
                // call Prefix_Step1, line 550
                if (!r_Prefix_Step1())
                {
                    base.cursor = v_16;
                    break lab30;
                }
            }
            // try, line 551
            var /** number */ v_17 = base.cursor;
            lab31: {
                // call Prefix_Step2, line 551
                if (!r_Prefix_Step2())
                {
                    base.cursor = v_17;
                    break lab31;
                }
            }
            // (, line 552
            // or, line 553
            lab32: {
                var /** number */ v_18 = base.cursor;
                lab33: {
                    // call Prefix_Step3a_Noun, line 552
                    if (!r_Prefix_Step3a_Noun())
                    {
                        break lab33;
                    }
                    break lab32;
                }
                base.cursor = v_18;
                lab34: {
                    // (, line 553
                    // Boolean test is_noun, line 553
                    if (!B_is_noun)
                    {
                        break lab34;
                    }
                    // call Prefix_Step3b_Noun, line 553
                    if (!r_Prefix_Step3b_Noun())
                    {
                        break lab34;
                    }
                    break lab32;
                }
                base.cursor = v_18;
                // (, line 554
                // Boolean test is_verb, line 554
                if (!B_is_verb)
                {
                    break lab29;
                }
                // try, line 554
                var /** number */ v_19 = base.cursor;
                lab35: {
                    // call Prefix_Step3_Verb, line 554
                    if (!r_Prefix_Step3_Verb())
                    {
                        base.cursor = v_19;
                        break lab35;
                    }
                }
                // call Prefix_Step4_Verb, line 554
                if (!r_Prefix_Step4_Verb())
                {
                    break lab29;
                }
            }
        }
        base.cursor = v_15;
        // do, line 559
        lab36: {
            // call Normalize_post, line 559
            if (!r_Normalize_post())
            {
                break lab36;
            }
        }
        return true;
    };

    /**@return{string}*/
    this['stemWord'] = function(/**string*/word) {
        base.setCurrent(word);
        this.stem();
        return base.getCurrent();
    };
};
