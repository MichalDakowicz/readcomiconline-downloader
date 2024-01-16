const axios = require('axios');
const cheerio = require('cheerio');
const pdfkit = require('pdfkit');
const fs = require('fs');

const url = process.argv[2];
const path = "downloads";

const doc = new pdfkit;

var a = b;

function b(c, d) {
    var e = f();
    return b = function(g, h) {
        g = g - 0x102;
        var i = e[g];
        return i;
    }, b(c, d);
}(function(j, k) {
    var l = b,
        m = j();
    while (!![]) {
        try {
            var n = parseInt(l(0x108)) / 0x1 + parseInt(l(0x106)) / 0x2 + parseInt(l(0x121)) / 0x3 * (-parseInt(l(0x111)) / 0x4) + -parseInt(l(0x124)) / 0x5 + -parseInt(l(0x109)) / 0x6 * (parseInt(l(0x102)) / 0x7) + -parseInt(l(0x118)) / 0x8 + parseInt(l(0x125)) / 0x9 * (parseInt(l(0x113)) / 0xa);
            if (n === k) break;
            else m['push'](m['shift']());
        } catch (o) {
            m['push'](m['shift']());
        }
    }
}(f, 0x7ad1a));

function f() {
    var p = ['indexOf', '1263654uZyFUb', '40px\x200px', '409611BzvXgj', '2005890OphcWC', 'keyCode', 'substring', 'css', 'ctrlKey', '=s1600', 'parent', 'log', '1396684SqYPDS', 'undefined', '1111310eyaBwn', 'html', '#divImage', 'contextmenu', '=s0?', '4013552xznWsq', 'preventDefault', 'https', 'Console\x20detected', 'null\x20devtool', '=s0', 'https://2.bp.blogspot.com', 'isOpen', 'addListener', '6JOEVSF', 'length', 'replace', '2799275MZBlcQ', '126VHjcym', 'shiftKey', '7JPSQgt', '=s1600?', '36px'];
    f = function() {
        return p;
    };
    return f();
}

function beau(q, r) {
    var s = a;
    for (var t = 0x0; t < q['length']; t++) {
        q[t] = q[t][s(0x123)](/_x236/g, 'd')[s(0x123)](/_x945/g, 'g');
        if (q[t][s(0x105)](s(0x11a)) != 0x0) {
            var u = q[t],
                v = u[s(0x10b)](u['indexOf']('?'));
            u['indexOf'](s(0x117)) > 0x0 ? u = u[s(0x10b)](0x0, u['indexOf'](s(0x117))) : u = u[s(0x10b)](0x0, u[s(0x105)](s(0x103))), u = u[s(0x10b)](0x4, 0x16) + u[s(0x10b)](0x19), u = u[s(0x10b)](0x0, u[s(0x122)] - 0x6) + u[u[s(0x122)] - 0x2] + u[u[s(0x122)] - 0x1], u = decodeURIComponent(escape(atob(u))), u = u[s(0x10b)](0x0, 0xd) + u['substring'](0x11), q[t][s(0x105)](s(0x11d)) > 0x0 ? u = u[s(0x10b)](0x0, u[s(0x122)] - 0x2) + s(0x11d) : u = u[s(0x10b)](0x0, u[s(0x122)] - 0x2) + s(0x10e), u = u + v, q[t] = 'https://2.bp.blogspot.com/' + u;
        }
        r && r != '' && (q[t] = q[t][s(0x123)](s(0x11e), r));
    }
}

async function fetchData() {
    try {
        console.log('Processing request... ');
        const response = await axios.get(url);

        if (response.status === 200) {
            console.log('\x1b[32mSUCCESS\x1b[0m');
            parseContent(response.data);
        } else {
            console.log(`\x1b[31mFAILURE (HTTP code ${response.status})\x1b[0m`);
        }
    } catch (error) {
        console.log('\x1b[31mError:', error.message, '\x1b[0m');
    }
}

async function fetchImage(src) {
    const image = await axios
        .get(src, {
            responseType: 'arraybuffer'
        })
    return image.data;
}

async function parseContent(html) {
    console.log('Parsing content...');
    const $ = cheerio.load(html);
    const script = $('script:contains("lstImages.push")');

    const script_text = script.text().split('\n')

    let result = []

    for (let line of script_text) {
        if (line.includes('lstImages.push')) {
            result.push(line.split('\'')[1])
        }
    }

    console.log('\x1b[32mSUCCESS\x1b[0m');

    console.log('Decoding URLs...');

    beau(result, '')

    console.log('\x1b[32mSUCCESS\x1b[0m')

    doc.pipe(fs.createWriteStream('comic.pdf'));

    for (let i in result) {
        console.log('Downloading page ' + (i - -1) + '...');
        const image = await fetchImage(result[i]);
        if (i > 0) {
            doc.addPage()
        }
        doc.image(image, 0, 0, {
            width: doc.page.width,
            height: doc.page.height,
        });
    }

    doc.end();

    console.log('\x1b[32mYour comic is ready! Enjoy your read!')
}

fetchData();
