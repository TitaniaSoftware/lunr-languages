/**
 * execute like this (from the project root folder):
 * node build/build.js
 */

var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var UglifyJS = require("uglify-js");

// shortcut for minifying a piece of code
function compress(orig_code) {
    return UglifyJS.minify(orig_code, {fromString: true, comments: true}).code;
}

// take some of the stop words list from the stopwords-filter repo
var stopwordsRepoFolder = './stopwords-filter/lib/stopwords/snowball/locales/';
// and, since that repository does not include all the stopwords we want, we add more, custom stopwords lists
var stopwordsCustomFolder = './stopwords-custom/';

// Use the Unicode library to produce a regex for characters of a particular
// 'script' (such as Latin), then extract the character ranges from that
// regex for use in our trimmer
function wordCharacters(script) {
    var charRegex = require('unicode-8.0.0/scripts/' + script + '/regex');
    // Now from /[a-z]/ get "a-z"
    var regexString = charRegex.toString()
    // Format sanity check
    if (regexString.slice(0,2) !== '/[' || regexString.slice(-2) != ']/') {
        console.error('Unexpected regex structure, aborting: ' + regexString);
        throw Error;
    }
    return regexString.slice(2, -2);
}

// list mapping between locale, stemmer file, stopwords file, and char pattern
var list = [{
    locale: 'ar',
    file: 'arabic-stemmer.js',
    stopwords: stopwordsCustomFolder + 'ar.csv',
    wordCharacters: wordCharacters('Arabic')
},{
    locale: 'cs',
    file: 'czech-stemmer.js',
    stopwords: stopwordsCustomFolder + 'cs.csv',
    wordCharacters: wordCharacters('Latin')
},{
    locale: 'da',
    file: 'danish-stemmer.js',
    stopwords: stopwordsRepoFolder + 'da.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'de',
    file: 'german-stemmer.js',
    stopwords: stopwordsRepoFolder + 'de.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'el',
    file: 'greek-stemmer.js',
    stopwords: stopwordsCustomFolder + 'el.csv',
    wordCharacters: wordCharacters('Greek')
}, {
    locale: 'es',
    file: 'spanish-stemmer.js',
    stopwords: stopwordsRepoFolder + 'es.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'fi',
    file: 'finnish-stemmer.js',
    stopwords: stopwordsRepoFolder + 'fn.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'fr',
    file: 'french-stemmer.js',
    stopwords: stopwordsRepoFolder + 'fr.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'ga',
    file: 'irish-stemmer.js',
    stopwords: stopwordsCustomFolder + 'ga.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'hu',
    file: 'hungarian-stemmer.js',
    stopwords: stopwordsRepoFolder + 'hu.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'id',
    file: 'indonesian-stemmer.js',
    stopwords: stopwordsCustomFolder + 'id.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'it',
    file: 'italian-stemmer.js',
    stopwords: stopwordsRepoFolder + 'it.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'ja'
}, {
    locale: 'lt',
    file: 'lithuanian-stemmer.js',
    stopwords: stopwordsCustomFolder + 'lt.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'ne',
    file: 'nepali-stemmer.js',
    stopwords: stopwordsCustomFolder + 'ne.csv',
    wordCharacters: wordCharacters('Devanagari')
}, {
    locale: 'nl',
    file: 'dutch-stemmer.js',
    stopwords: stopwordsRepoFolder + 'nl.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'no',
    file: 'norwegian-stemmer.js',
    stopwords: stopwordsCustomFolder + 'no.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'pt',
    file: 'portuguese-stemmer.js',
    stopwords: stopwordsRepoFolder + 'pt.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'ro',
    file: 'romanian-stemmer.js',
    stopwords: stopwordsCustomFolder + 'ro.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'ru',
    file: 'russian-stemmer.js',
    stopwords: stopwordsCustomFolder + 'ru.csv',
    wordCharacters: wordCharacters('Cyrillic')
}, {
    locale: 'sv',
    file: 'swedish-stemmer.js',
    stopwords: stopwordsCustomFolder + 'sv.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'ta',
    file: 'tamil-stemmer.js',
    stopwords: stopwordsCustomFolder + 'ta.csv',
    wordCharacters: wordCharacters('Tamil')
}, {
    locale: 'tr',
    file: 'turkish-stemmer.js',
    stopwords: stopwordsCustomFolder + 'tr.csv',
    wordCharacters: wordCharacters('Latin')
}, {
    locale: 'zh'
}
];

console.log('Starting building lunr-languages ...');
// read templates
var tpl = fs.readFileSync('build/lunr.template', 'utf8');
var cm = fs.readFileSync('build/lunr.comments', 'utf8');

// for each language, start building
for(var i = 0; i < list.length; i++) {
    console.log('Building for "' + list[i].locale + '"');
    var data;
    var stopWords;
    var f;
    var fromTemplate = list[i].file && list[i].stopwords;

    if (fromTemplate) {
        data = fs.readFileSync('build/snowball/jsstemmer/' + list[i].file, 'utf8');
        stopWords = fs.readFileSync('build/' + list[i].stopwords, 'utf8');

        // start replacing the placeholders
        f = tpl;
        f = cm + f;
        f = f.replace(/\{\{locale\}\}/g, list[i].locale);
        f = f.replace(/\{\{stemmerFunction\}\}/g, data.substring(data.indexOf('function')));
        f = f.replace(/\{\{stopWords\}\}/g, stopWords.split(',').sort().join(' '));
        f = f.replace(/\{\{stopWordsLength\}\}/g, stopWords.split(',').length + 1);
        f = f.replace(/\{\{languageName\}\}/g, list[i].file.replace(/Stemmer\.js/g, ''));
        f = f.replace(/\{\{wordCharacters\}\}/g, list[i].wordCharacters);
    } else {
        // beautify and minify languages not generated from the template.
        f = fs.readFileSync('lunr.' + list[i].locale + '.js', 'utf8');
    }

    // write the full file
    fs.writeFile('lunr.' + list[i].locale + '.js', beautify(f, { indent_size: 2 }));
    // and the minified version
    fs.writeFile('min/lunr.' + list[i].locale + '.min.js',
        fromTemplate ? cm.replace(/\{\{languageName\}\}/g, list[i].file.replace(/Stemmer\.js/g, '')) + compress(f) : compress(f)
    );
}

console.log('Building Stemmer Support');
// build stemmer support
var support = fs.readFileSync('lunr.stemmer.support.js', 'utf8');
fs.writeFile('min/lunr.stemmer.support.min.js', compress(support));
var baseStemmer = fs.readFileSync('build/snowball/jsstemmer/base-stemmer.js', 'utf8');
fs.writeFile('base-stemmer.js', baseStemmer);
fs.writeFile('min/base-stemmer.min.js', compress(baseStemmer));

console.log('Building Multi-Language Extension');
// build multi
var multi = fs.readFileSync('lunr.multi.js', 'utf8');
fs.writeFile('min/lunr.multi.min.js', compress(multi));

console.log('Done!');
