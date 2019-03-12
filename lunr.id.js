/*!
 * Lunr languages, `indonesian-stemmer.js` language
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
    lunr.id = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.id.trimmer,
        lunr.id.stopWordFilter,
        lunr.id.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.id.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.id.wordCharacters = "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A";
    lunr.id.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.id.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.id.trimmer, 'trimmer-id');

    /* lunr stemmer function */
    lunr.id.stemmer = (function() {
      /* create the wrapped stemmer object */
      var st = new function() {
        var base = new BaseStemmer();
        /** @const */
        var a_0 = [
          ["kah", -1, 1],
          ["lah", -1, 1],
          ["pun", -1, 1]
        ];

        /** @const */
        var a_1 = [
          ["nya", -1, 1],
          ["ku", -1, 1],
          ["mu", -1, 1]
        ];

        /** @const */
        var a_2 = [
          ["i", -1, 1, r_SUFFIX_I_OK],
          ["an", -1, 1, r_SUFFIX_AN_OK],
          ["kan", 1, 1, r_SUFFIX_KAN_OK]
        ];

        /** @const */
        var a_3 = [
          ["di", -1, 1],
          ["ke", -1, 2],
          ["me", -1, 1],
          ["mem", 2, 5],
          ["men", 2, 1],
          ["meng", 4, 1],
          ["meny", 4, 3, r_VOWEL],
          ["pem", -1, 6],
          ["pen", -1, 2],
          ["peng", 8, 2],
          ["peny", 8, 4, r_VOWEL],
          ["ter", -1, 1]
        ];

        /** @const */
        var a_4 = [
          ["be", -1, 3, r_KER],
          ["belajar", 0, 4],
          ["ber", 0, 3],
          ["pe", -1, 1],
          ["pelajar", 3, 2],
          ["per", 3, 1]
        ];

        /** @const */
        var /** Array<int> */ g_vowel = [17, 65, 16];

        var /** number */ I_prefix = 0;
        var /** number */ I_measure = 0;


        /** @return {boolean} */
        function r_remove_particle() {
          // (, line 50
          // [, line 51
          base.ket = base.cursor;
          // substring, line 51
          if (base.find_among_b(a_0) == 0) {
            return false;
          }
          // ], line 51
          base.bra = base.cursor;
          // (, line 52
          // delete, line 52
          if (!base.slice_del()) {
            return false;
          }
          I_measure -= 1;
          return true;
        };

        /** @return {boolean} */
        function r_remove_possessive_pronoun() {
          // (, line 56
          // [, line 57
          base.ket = base.cursor;
          // substring, line 57
          if (base.find_among_b(a_1) == 0) {
            return false;
          }
          // ], line 57
          base.bra = base.cursor;
          // (, line 58
          // delete, line 58
          if (!base.slice_del()) {
            return false;
          }
          I_measure -= 1;
          return true;
        };

        /** @return {boolean} */
        function r_SUFFIX_KAN_OK() {
          // (, line 63
          // and, line 85
          if (!(I_prefix != 3)) {
            return false;
          }
          if (!(I_prefix != 2)) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_SUFFIX_AN_OK() {
          // (, line 89
          if (!(I_prefix != 1)) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_SUFFIX_I_OK() {
          // (, line 91
          if (!(I_prefix <= 2)) {
            return false;
          }
          // not, line 128
          {
            var /** number */ v_1 = base.limit - base.cursor;
            lab0: {
              // literal, line 128
              if (!(base.eq_s_b("s"))) {
                break lab0;
              }
              return false;
            }
            base.cursor = base.limit - v_1;
          }
          return true;
        };

        /** @return {boolean} */
        function r_remove_suffix() {
          // (, line 131
          // [, line 132
          base.ket = base.cursor;
          // substring, line 132
          if (base.find_among_b(a_2) == 0) {
            return false;
          }
          // ], line 132
          base.bra = base.cursor;
          // (, line 134
          // delete, line 134
          if (!base.slice_del()) {
            return false;
          }
          I_measure -= 1;
          return true;
        };

        /** @return {boolean} */
        function r_VOWEL() {
          // (, line 141
          if (!(base.in_grouping(g_vowel, 97, 117))) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_KER() {
          // (, line 143
          if (!(base.out_grouping(g_vowel, 97, 117))) {
            return false;
          }
          // literal, line 143
          if (!(base.eq_s("er"))) {
            return false;
          }
          return true;
        };

        /** @return {boolean} */
        function r_remove_first_order_prefix() {
          var /** number */ among_var;
          // (, line 145
          // [, line 146
          base.bra = base.cursor;
          // substring, line 146
          among_var = base.find_among(a_3);
          if (among_var == 0) {
            return false;
          }
          // ], line 146
          base.ket = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 147
              // delete, line 147
              if (!base.slice_del()) {
                return false;
              }
              I_prefix = 1;
              I_measure -= 1;
              break;
            case 2:
              // (, line 148
              // delete, line 148
              if (!base.slice_del()) {
                return false;
              }
              I_prefix = 3;
              I_measure -= 1;
              break;
            case 3:
              // (, line 149
              I_prefix = 1;
              // <-, line 149
              if (!base.slice_from("s")) {
                return false;
              }
              I_measure -= 1;
              break;
            case 4:
              // (, line 150
              I_prefix = 3;
              // <-, line 150
              if (!base.slice_from("s")) {
                return false;
              }
              I_measure -= 1;
              break;
            case 5:
              // (, line 151
              I_prefix = 1;
              I_measure -= 1;
              // or, line 151
              lab0: {
                var /** number */ v_1 = base.cursor;
                lab1: {
                  // and, line 151
                  var /** number */ v_2 = base.cursor;
                  if (!(base.in_grouping(g_vowel, 97, 117))) {
                    break lab1;
                  }
                  base.cursor = v_2;
                  // <-, line 151
                  if (!base.slice_from("p")) {
                    return false;
                  }
                  break lab0;
                }
                base.cursor = v_1;
                // delete, line 151
                if (!base.slice_del()) {
                  return false;
                }
              }
              break;
            case 6:
              // (, line 152
              I_prefix = 3;
              I_measure -= 1;
              // or, line 152
              lab2: {
                var /** number */ v_3 = base.cursor;
                lab3: {
                  // and, line 152
                  var /** number */ v_4 = base.cursor;
                  if (!(base.in_grouping(g_vowel, 97, 117))) {
                    break lab3;
                  }
                  base.cursor = v_4;
                  // <-, line 152
                  if (!base.slice_from("p")) {
                    return false;
                  }
                  break lab2;
                }
                base.cursor = v_3;
                // delete, line 152
                if (!base.slice_del()) {
                  return false;
                }
              }
              break;
          }
          return true;
        };

        /** @return {boolean} */
        function r_remove_second_order_prefix() {
          var /** number */ among_var;
          // (, line 156
          // [, line 162
          base.bra = base.cursor;
          // substring, line 162
          among_var = base.find_among(a_4);
          if (among_var == 0) {
            return false;
          }
          // ], line 162
          base.ket = base.cursor;
          switch (among_var) {
            case 1:
              // (, line 163
              // delete, line 163
              if (!base.slice_del()) {
                return false;
              }
              I_prefix = 2;
              I_measure -= 1;
              break;
            case 2:
              // (, line 164
              // <-, line 164
              if (!base.slice_from("ajar")) {
                return false;
              }
              I_measure -= 1;
              break;
            case 3:
              // (, line 165
              // delete, line 165
              if (!base.slice_del()) {
                return false;
              }
              I_prefix = 4;
              I_measure -= 1;
              break;
            case 4:
              // (, line 166
              // <-, line 166
              if (!base.slice_from("ajar")) {
                return false;
              }
              I_prefix = 4;
              I_measure -= 1;
              break;
          }
          return true;
        };

        this.stem = /** @return {boolean} */ function() {
          // (, line 171
          I_measure = 0;
          // do, line 173
          var /** number */ v_1 = base.cursor;
          lab0: {
            // (, line 173
            // repeat, line 173
            replab1: while (true) {
              var /** number */ v_2 = base.cursor;
              lab2: {
                // (, line 173
                // gopast, line 173
                golab3: while (true) {
                  lab4: {
                    if (!(base.in_grouping(g_vowel, 97, 117))) {
                      break lab4;
                    }
                    break golab3;
                  }
                  if (base.cursor >= base.limit) {
                    break lab2;
                  }
                  base.cursor++;
                }
                I_measure += 1;
                continue replab1;
              }
              base.cursor = v_2;
              break replab1;
            }
          }
          base.cursor = v_1;
          if (!(I_measure > 2)) {
            return false;
          }
          I_prefix = 0;
          // backwards, line 176
          base.limit_backward = base.cursor;
          base.cursor = base.limit;
          // (, line 176
          // do, line 177
          var /** number */ v_4 = base.limit - base.cursor;
          lab5: {
            // call remove_particle, line 177
            if (!r_remove_particle()) {
              break lab5;
            }
          }
          base.cursor = base.limit - v_4;
          if (!(I_measure > 2)) {
            return false;
          }
          // do, line 179
          var /** number */ v_5 = base.limit - base.cursor;
          lab6: {
            // call remove_possessive_pronoun, line 179
            if (!r_remove_possessive_pronoun()) {
              break lab6;
            }
          }
          base.cursor = base.limit - v_5;
          base.cursor = base.limit_backward;
          if (!(I_measure > 2)) {
            return false;
          }
          // or, line 188
          lab7: {
            var /** number */ v_6 = base.cursor;
            lab8: {
              // test, line 182
              var /** number */ v_7 = base.cursor;
              // (, line 182
              // call remove_first_order_prefix, line 183
              if (!r_remove_first_order_prefix()) {
                break lab8;
              }
              // do, line 184
              var /** number */ v_8 = base.cursor;
              lab9: {
                // (, line 184
                // test, line 185
                var /** number */ v_9 = base.cursor;
                // (, line 185
                if (!(I_measure > 2)) {
                  break lab9;
                }
                // backwards, line 185
                base.limit_backward = base.cursor;base.cursor = base.limit;
                // call remove_suffix, line 185
                if (!r_remove_suffix()) {
                  break lab9;
                }
                base.cursor = base.limit_backward;
                base.cursor = v_9;
                if (!(I_measure > 2)) {
                  break lab9;
                }
                // call remove_second_order_prefix, line 186
                if (!r_remove_second_order_prefix()) {
                  break lab9;
                }
              }
              base.cursor = v_8;
              base.cursor = v_7;
              break lab7;
            }
            base.cursor = v_6;
            // (, line 188
            // do, line 189
            var /** number */ v_10 = base.cursor;
            lab10: {
              // call remove_second_order_prefix, line 189
              if (!r_remove_second_order_prefix()) {
                break lab10;
              }
            }
            base.cursor = v_10;
            // do, line 190
            var /** number */ v_11 = base.cursor;
            lab11: {
              // (, line 190
              if (!(I_measure > 2)) {
                break lab11;
              }
              // backwards, line 190
              base.limit_backward = base.cursor;base.cursor = base.limit;
              // call remove_suffix, line 190
              if (!r_remove_suffix()) {
                break lab11;
              }
              base.cursor = base.limit_backward;
            }
            base.cursor = v_11;
          }
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

    lunr.Pipeline.registerFunction(lunr.id.stemmer, 'stemmer-id');

    lunr.id.stopWordFilter = lunr.generateStopWordFilter("ada adalah adanya adapun agak agaknya agar akan akankah akhir akhiri akhirnya aku akulah amat amatlah anda andalah antar antara antaranya apa apaan apabila apakah apalagi apatah artinya asal asalkan atas atau ataukah ataupun awal awalnya bagai bagaikan bagaimana bagaimanakah bagaimanapun bagi bagian bahkan bahwa bahwasanya baik bakal bakalan balik banyak bapak baru bawah beberapa begini beginian beginikah beginilah begitu begitukah begitulah begitupun bekerja belakang belakangan belum belumlah benar benarkah benarlah berada berakhir berakhirlah berakhirnya berapa berapakah berapalah berapapun berarti berawal berbagai berdatangan beri berikan berikut berikutnya berjumlah berkali-kali berkata berkehendak berkeinginan berkenaan berlainan berlalu berlangsung berlebihan bermacam bermacam-macam bermaksud bermula bersama bersama-sama bersiap bersiap-siap bertanya bertanya-tanya berturut berturut-turut bertutur berujar berupa besar betul betulkah biasa biasanya bila bilakah bisa bisakah boleh bolehkah bolehlah buat bukan bukankah bukanlah bukannya bulan bung cara caranya cukup cukupkah cukuplah cuma dahulu dalam dan dapat dari daripada datang dekat demi demikian demikianlah dengan depan di dia diakhiri diakhirinya dialah diantara diantaranya diberi diberikan diberikannya dibuat dibuatnya didapat didatangkan digunakan diibaratkan diibaratkannya diingat diingatkan diinginkan dijawab dijelaskan dijelaskannya dikarenakan dikatakan dikatakannya dikerjakan diketahui diketahuinya dikira dilakukan dilalui dilihat dimaksud dimaksudkan dimaksudkannya dimaksudnya diminta dimintai dimisalkan dimulai dimulailah dimulainya dimungkinkan dini dipastikan diperbuat diperbuatnya dipergunakan diperkirakan diperlihatkan diperlukan diperlukannya dipersoalkan dipertanyakan dipunyai diri dirinya disampaikan disebut disebutkan disebutkannya disini disinilah ditambahkan ditandaskan ditanya ditanyai ditanyakan ditegaskan ditujukan ditunjuk ditunjuki ditunjukkan ditunjukkannya ditunjuknya dituturkan dituturkannya diucapkan diucapkannya diungkapkan dong dua dulu empat enggak enggaknya entah entahlah guna gunakan hal hampir hanya hanyalah hari harus haruslah harusnya hendak hendaklah hendaknya hingga ia ialah ibarat ibaratkan ibaratnya ibu ikut ingat ingat-ingat ingin inginkah inginkan ini inikah inilah itu itukah itulah jadi jadilah jadinya jangan jangankan janganlah jauh jawab jawaban jawabnya jelas jelaskan jelaslah jelasnya jika jikalau juga jumlah jumlahnya justru kala kalau kalaulah kalaupun kalian kami kamilah kamu kamulah kan kapan kapankah kapanpun karena karenanya kasus kata katakan katakanlah katanya ke keadaan kebetulan kecil kedua keduanya keinginan kelamaan kelihatan kelihatannya kelima keluar kembali kemudian kemungkinan kemungkinannya kenapa kepada kepadanya kesampaian keseluruhan keseluruhannya keterlaluan ketika khususnya kini kinilah kira kira-kira kiranya kita kitalah kok kurang lagi lagian lah lain lainnya lalu lama lamanya lanjut lanjutnya lebih lewat lima luar macam maka makanya makin malah malahan mampu mampukah mana manakala manalagi masa masalah masalahnya masih masihkah masing masing-masing mau maupun melainkan melakukan melalui melihat melihatnya memang memastikan memberi memberikan membuat memerlukan memihak meminta memintakan memisalkan memperbuat mempergunakan memperkirakan memperlihatkan mempersiapkan mempersoalkan mempertanyakan mempunyai memulai memungkinkan menaiki menambahkan menandaskan menanti menanti-nanti menantikan menanya menanyai menanyakan mendapat mendapatkan mendatang mendatangi mendatangkan menegaskan mengakhiri mengapa mengatakan mengatakannya mengenai mengerjakan mengetahui menggunakan menghendaki mengibaratkan mengibaratkannya mengingat mengingatkan menginginkan mengira mengucapkan mengucapkannya mengungkapkan menjadi menjawab menjelaskan menuju menunjuk menunjuki menunjukkan menunjuknya menurut menuturkan menyampaikan menyangkut menyatakan menyebutkan menyeluruh menyiapkan merasa mereka merekalah merupakan meski meskipun meyakini meyakinkan minta mirip misal misalkan misalnya mula mulai mulailah mulanya mungkin mungkinkah nah naik namun nanti nantinya nyaris nyatanya oleh olehnya pada padahal padanya pak paling panjang pantas para pasti pastilah penting pentingnya per percuma perlu perlukah perlunya pernah persoalan pertama pertama-tama pertanyaan pertanyakan pihak pihaknya pukul pula pun punya rasa rasanya rata rupanya saat saatnya saja sajalah saling sama sama-sama sambil sampai sampai-sampai sampaikan sana sangat sangatlah satu saya sayalah se sebab sebabnya sebagai sebagaimana sebagainya sebagian sebaik sebaik-baiknya sebaiknya sebaliknya sebanyak sebegini sebegitu sebelum sebelumnya sebenarnya seberapa sebesar sebetulnya sebisanya sebuah sebut sebutlah sebutnya secara secukupnya sedang sedangkan sedemikian sedikit sedikitnya seenaknya segala segalanya segera seharusnya sehingga seingat sejak sejauh sejenak sejumlah sekadar sekadarnya sekali sekali-kali sekalian sekaligus sekalipun sekarang sekecil seketika sekiranya sekitar sekitarnya sekurang-kurangnya sekurangnya sela selagi selain selaku selalu selama selama-lamanya selamanya selanjutnya seluruh seluruhnya semacam semakin semampu semampunya semasa semasih semata semata-mata semaunya sementara semisal semisalnya sempat semua semuanya semula sendiri sendirian sendirinya seolah seolah-olah seorang sepanjang sepantasnya sepantasnyalah seperlunya seperti sepertinya sepihak sering seringnya serta serupa sesaat sesama sesampai sesegera sesekali seseorang sesuatu sesuatunya sesudah sesudahnya setelah setempat setengah seterusnya setiap setiba setibanya setidak-tidaknya setidaknya setinggi seusai sewaktu siap siapa siapakah siapapun sini sinilah soal soalnya suatu sudah sudahkah sudahlah supaya tadi tadinya tahu tahun tak tambah tambahnya tampak tampaknya tandas tandasnya tanpa tanya tanyakan tanyanya tapi tegas tegasnya telah tempat tengah tentang tentu tentulah tentunya tepat terakhir terasa terbanyak terdahulu terdapat terdiri terhadap terhadapnya teringat teringat-ingat terjadi terjadilah terjadinya terkira terlalu terlebih terlihat termasuk ternyata tersampaikan tersebut tersebutlah tertentu tertuju terus terutama tetap tetapi tiap tiba tiba-tiba tidak tidakkah tidaklah tiga tinggi toh tunjuk turut tutur tuturnya ucap ucapnya ujar ujarnya umum umumnya ungkap ungkapnya untuk usah usai waduh wah wahai waktu waktunya walau walaupun wong yaitu yakin yakni yang".split(' '));

    lunr.Pipeline.registerFunction(lunr.id.stopWordFilter, 'stopWordFilter-id');
  };
}))