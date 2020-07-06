'use strict'

// 轉成 utf-8 再來算
// 所以一個中文字的長度會變成 3 (應該)
// function stringLen(string) {
//     let utf8_str = encodeURIComponent(string);
//     let len = utf8_str.replace(/%[A-F\d]{2}/g, 'U').length;
//     return len;
// }

// 這算是硬寫，寫成中文字長度算成 2
// function stringLen(string) {
//     let n = string.length;
//     let s;
//     let len = 0;
//     for (let i=0; i<n; i++) {
//         s = string.charCodeAt(i);
//         while (s > 0){
//             len++;
//             s = s >> 8;
//         }
//     }
//     return len;
// }

function isAscii(c) {
    return ((c >> 8) <= 0) ? true : false;
}

function titleSubStr(title, len) {
    let i;
    for (i = 0; i<title.length; i++) {
        let code = title.charCodeAt(i);
        len -= isAscii(code) ? 1 : 2;
        if (len <= 0) {
            break;
        }
    }
    return title.slice(0, i+1);
}

const special_predefined_pattern = [
    "(𥚃, 裡)",
    "(䕶, 護)",
    "(𨍭, 轉)",
    "(絶, 絕)",
    "(爲, 為)",
    "(徳, 德)",
    "(䆀, 麥)",
    "(岀, 出)",
    "(讉, 譴)",
    "(鳯, 鳳)",
    "(樓, 樓)",
    "(滑, 滑)",
    "(啓, 啟)",
    "(呑, 吞)",
    "(駡, 罵)",
    "(恊, 協)",
    "(説, 說)",
    "(发, 發)",
    "(啰, 囉)",
    "(麽, 麼)",
    "(别, 別)",
    "(内, 內)",
    "(并, 並)",
    "(擕, 攜)",
    "(︰, ：)",
    "(酛, 酉元)",
    "(硏, 研)",
    "(産, 產)",
    "(闗, 關)",
    "(｢, 「)",
    "(❤, ♥)",
    "(吅, 口口)",
    "(藴, 蘊)",
    "(缐, 線)",
    "(ˌ, .)",
    "(縂, 總)",
    "(吿, 告)",
    "(掚, 倆)",
    "(叄, 參)",
    "(殐, □)",
    "(吅, 口口)",
    "(👨, ♂)",
    "(👩, ♀)",
    "(🏆, ◎)",
    "(⇒, =>)",
    "(☓, ╳);(仌, □)",
    "(▶, =>)",
    "(►, =>)",
    "(⋯, …)",
    "(⭐, ✩)",
    "(✅, ✓)",
    "(▪, ■)",
    "(➡, =>)",
    "(缐, 線)",
    "(ˌ, .)",
    "(滳, 滴);(縂, 總)",
    "(吿, 告)",
    "(掚, 倆)",
    "(叄, 參)",
    "(庝, 疼)",
    "(鹮, 䴉)",
    "(殐, □)",
    "(倂, 併)",
    "(昖, 日公)",
    "(俢, 修)",
    "(緃, 縱)",
    "(嗮, 曬)",
    "(戱, 戲)",
    "(跶, 躂)",
    "(梻, 木佛)"
];

const keep_unicodes = [
    ////////////////////////////////////////////////////////////////////////////
    // 0000 ~ 1000
    ////////////////////////////////////////////////////////////////////////////

    // LF
    "\u000A",
    // CR
    "\u000D",
    // 半形空白
    "\u0020",
    // 標點符號 0-9
    "\u0021-\u0040\u005B-\u0060\u007B-\u007E",
    // a-z, A-Z
    "\u0041-\u005A\u0061-\u007A",
    // !￠￡
    "\u00A5-\u00AA",
    "\u00AE-\u00B5",
    // ×
    "\u00D7",
    // 注音 二四聲 ˊˋ
    "\u02CA-\u02CB",
    // 注音 三聲 ˇ
    "\u02C7",
    // α β γ ...
    "\u03B1-\u03C1",
    // LF CR
    "\u0A0D",
    // CR LF
    "\u0D0A",
    // 中日韓標點符號，全形空白
    "\u3000\u3001-\u303F",
    // 日文平片假名
    "\u3040-\u30FF",
    "\u31F0-\u31FF",
    // 注音符號
    "\u3105-\u312C",
    // 中日韓漢字
    "\u4E00-\u9FFF",
    // 全形英文、全形標點符號
    "\uFF01-\uFF5E",

    ////////////////////////////////////////////////////////////////////////////
    // 1001 ~ 3000
    ////////////////////////////////////////////////////////////////////////////

    // –—─∥
    "\u2012-\u2016",
    // ‘’
    "\u2018-\u2019",
    // “”
    "\u201C-\u201D",
    // •
    "\u2022",
    // ˙ ‥…‧
    "\u2023-\u2027",
    // ※
    "\u203B",

    // ℃ ℉
    "\u2103",
    "\u2109",
    // Trademark   0x97FC  U+2122  ™
    "\u2122",
    //Ⅰ ~ Ⅻ 羅馬數字， i ~ xii
    "\u2160-\u216B",
    "\u2170-\u217B",
    // 箭頭類的一部分
    "\u2190-\u2193",
    "\u2196-\u2199",
    // 埃        0x9652(U+212B) Å
    "\u212B",
    // 平衡      0x9653(U+21CB) ⇋
    "\u21CB",
    // 互推      0x9965(U+21D4) ⇔
    "\u21D4",

    // 所有      0x91F9(U+2200) ∀
    "\u2200",
    // 存在      0x98F9(U+2203) ∃
    "\u2203",
    // 屬於      0x916B(U+2208) ∈  0x915F(U+220B) ∋
    "\u2208",
    "\u220B",
    // 偏微分    0xA079(U+2202) ∂
    "\u2202",
    // 雙重積分  0x9F4C(U+222C) ∬
    "\u222C",
    // ::        0x9F46(U+2237) ∷
    "\u2237",
    // ≠
    "\u2260",
    // 包含於    0x9AE0(U+2282) ⊂  0x9AA6(U+2283) ⊃
    "\u2282-\u2283",
    // 包含等於  0x9C72(U+2286) ⊆  0x9CAA(U+2287) ⊇
    "\u2286-\u2287",

    // 加圈數字 (0)=U+24EA, (1)~(20)=U+2460~U+2473
    // ⓪①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳
    // 括號數字  0x9941~0x9954, U+2474~U+2487
    // ⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇
    // 加點數字  0x9A41~0x9A54, U+2488~U+249B
    // ⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛
    // 括號小寫  0x99E1~0x99FA, U+249C~U+24B5
    //　⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵
    // 加圈大寫  0x97C7~0x97E0, U+24B6~U+24CF
    // ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ
    // 加圈小寫  0x97E1~0x97FA, U+24D0~U+24E9
    // ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ
    "\u24EA",
    "\u2460-\u24E9",
    // ─ │ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼ ═ ║ ╒ ╓ ╔ ╕ ╖ ╗ ╘ ╙ ╚ ╛ ╜ ╝ ╞ ╟ ╠ ╡ ╢ ╣
    // ╤ ╥ ╦ ╧  ...
    "\u2500",
    "\u2502",
    "\u250C",
    "\u2510",
    "\u2514",
    "\u2518",
    "\u251C",
    "\u2524",
    "\u252C",
    "\u2534",
    "\u253C",
    "\u2550-\u2574",
    "\u2581-\u258F",
    // ■ □
    "\u25A0-\u25A1",
    // ▲ △
    "\u25B2-\u25B3",
    // ▶
    "\u25B6",
    // ▼▽
    "\u25BC-\u25BD",
    // ◆
    "\u25C6",
    // ○
    "\u25CB",
    // ◎ ●
    "\u25CE-\u25CF",
    // ◯
    "\u25EF",
    // 八卦  0x9F56~0x9F5D
    // 　乾坤震巽坎離艮兌
    // 　☰☷☳☴☵☲☶☱
    "\u2630-\u2637",
    // ♀ ♂
    "\u2640",
    "\u2642",
    // 撲克牌花色
    // 空心  ♤♧♢♡  0x9DD7, 0x9DD9, 0x9DDB, 0x9DDD (U+2664,U+2667,U+2662,U+2661)
    // 實心  ♠♣♦♥  0x9DD8, 0x9DDA, 0x9DDC, 0x9DDE (U+2660,U+2663,U+2666,U+2665)
    "\u2660-\u2667",
    // ✓
    "\u2713",
    // ✕
    "\u2715",
    // ✩
    "\u2729",
    // 黑底加圈數字  0x9841~0x984A, U+2776~U+277F
    // ➊➋➌➍➎➏➐➑➒➓
    "\u2776-\u277F",

    // 括號國字  0x9C41~0x9C4A, U+3220~U+3229
    // ㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩
    "\u3220-\u3229",

    // 一些不知道為什麼造出來的重複字？
    "\uF900-\uFA2D",
];

// pattern 大概會長這樣 (العربية , ???) ; (👨, ???) ; (👩, ???) ; (é, e) ; (ž, z) ;
// (🏆, ???) ; (⇒, =>); (☓, ╳); (▶, =>); (⋯, …); (⭐, ✩); (✅, ✓)
// 先用分號切開，再去除前後的括號，最後再用逗號切開
// 前面的是「特殊字元」，後面的是「要替代它的字串」
function handleSpecialString(text, pattern) {
    // 有一些特殊的，
    let ret = text;
    pattern.forEach(function(p) {
        p = p.trim();
        if (p.length > 0) {
            p = p.slice(1, -1); // 把括號去掉
            const replace = p.split(',');
            if (replace.length == 2) {
                ret = ret.replace(new RegExp(replace[0].trim(), 'g'), replace[1].trim());
            }
        }
    });

    return ret;
}

function handleOthers(text) {
    let ret = text;
    const space = [
        "\u0020\u0085\u00A0\u1680\u2000-\u200B\u2028-\u2029\u202F\u205F\u3000",
        "\u00B7\u237D\u2420\u2422\u2423",
        "\u180E\u200B-\u200D\u2060\uFEFF",
    ];

    let space_str = "[";
    space.forEach(function(elem) {
        space_str += elem;
    });
    space_str += "]";

    ret = ret.replace(new RegExp(space_str, "g"), " ");

    // ^ 是表示 "不屬於" 的意思
    let ucodes_str = "[^";
    keep_unicodes.forEach(function(elem) {
        ucodes_str += elem;
    });
    ucodes_str += "]";

    // 除此之外全部換成 □
    ret = ret.replace(new RegExp(ucodes_str, "g"), "□");

    return ret;
}

function processCopyRequest(request, sender, sendResponse) {
    if (request.message == 'tacolin.pcman.copy.click') {

        let select = window.getSelection().toString().trim();
        if (select.length <= 0) {
            console.log("no selected text");
            return;
        }

        chrome.storage.sync.get([
            "pcman_line_size",
            "line_head_insert_spaces",
            "title_size",
            "wide_line_interval",
            "newline_num",
            "special_pattern"
            ], function(result) {

                const PCMAN_LINE_MAX_SIZE     = parseInt(result.pcman_line_size) || 76;
                const TITLE_MAX_SIZE          = parseInt(result.title_size) || 36;
                const LINE_HEAD_INSERT_SPACES = parseInt(result.line_head_insert_spaces) || 0;
                const SPECIAL_PATTERN         = (result.special_pattern) ? result.special_pattern.split(';') : [];
                const NEWLINE_NUM             = parseInt(result.newline_num) || 2;
                const WIDE_LINE_INTERVAL      = result.wide_line_interval;
                const LINE_LIMIT = PCMAN_LINE_MAX_SIZE - LINE_HEAD_INSERT_SPACES * 2;
                select = handleSpecialString(select, SPECIAL_PATTERN);
                select = handleSpecialString(select, special_predefined_pattern);
                select = handleOthers(select);
                const sections = select.split('\n');
                let line_array = [];
                let head_insert = '';

                for (let i=0; i< LINE_HEAD_INSERT_SPACES; i++) {
                    head_insert = head_insert.concat(" ");
                }

                let full_text = '';

                if (request.command == 'title-special') {
                    let title_str = handleSpecialString(document.title, SPECIAL_PATTERN);
                    title_str = handleSpecialString(title_str, special_predefined_pattern);
                    title_str = handleOthers(title_str);
                    sections.unshift(title_str);
                    full_text = full_text.concat(titleSubStr(title_str, TITLE_MAX_SIZE));
                    for (let i=0; i<NEWLINE_NUM; i++) {
                        full_text = full_text.concat("\r\n");
                    }
                }

                sections.forEach(function(element) {
                    let trim_elm = element.trim();
                    if (trim_elm) {

                        let start_idx = 0;
                        let line_len  = 0;
                        let i         = 0;

                        while (i<trim_elm.length) {

                            let code = trim_elm.charCodeAt(i);
                            let offset = isAscii(code) ? 1 : 2;
                            let increasement = 1;

                            if (line_len + offset > LINE_LIMIT) {
                                if (isAscii(code)) {
                                    // 分界點是英數
                                    let char = trim_elm.charAt(i);
                                    if (char != ' ') {
                                        // 可能會把英文字從中間斷開
                                        // 去找英文單字的頭在哪裡
                                        let j = i;
                                        while (j > start_idx) {
                                            char = trim_elm.charAt(j-1);
                                            code = trim_elm.charCodeAt(j-1);
                                            if (char == ' ' || isAscii(code) == false) {
                                                // j-1 的 char 是空白、或者是非英數，則代表 j 是英數字的頭
                                                break;
                                            }
                                            j--;
                                        }

                                        if (j > start_idx) {
                                            i = j;
                                        }
                                    }
                                }
                                line_array.push(trim_elm.slice(start_idx, i).trim());
                                start_idx = i;
                                line_len  = 0;
                            }

                            line_len += offset;
                            i += 1;
                        }

                        // for (let i=0; i<trim_elm.length; i++) {
                        //     let code = trim_elm.charCodeAt(i);
                        //     let offset = isAscii(code) ? 1 : 2;

                        //     if (line_len + offset > LINE_LIMIT) {
                        //         line_array.push(trim_elm.slice(start_idx, i).trim());
                        //         start_idx = i;
                        //         line_len = 0;
                        //     }

                        //     line_len += offset;
                        // }

                        if (line_len > 0) {
                            line_array.push(trim_elm.slice(start_idx));
                            line_len = 0;
                        }

                        line_array.push('\r\n');
                    }
                });

                line_array.forEach(function(line) {
                    if (line != "\r\n") {
                        full_text = full_text.concat(head_insert, line, "\r\n");
                    } else {
                        full_text = full_text.concat(line);
                    }

                    if (WIDE_LINE_INTERVAL) {
                        full_text = full_text.concat("\r\n");
                    }
                });

                if (window.isSecureContext) {
                    // https 下使用 navigator.clipboard.writeText();
                    navigator.clipboard.writeText(full_text)
                } else {
                    // http 下使用 document.execCommand('Copy');
                    let tmp = document.createElement("textarea");
                    document.body.appendChild(tmp);
                    tmp.value = full_text;
                    tmp.select();
                    document.execCommand('Copy');
                    document.body.removeChild(tmp);
                }
            });
    }
}

chrome.runtime.onMessage.addListener(processCopyRequest);

// 為了讓文字都可以反白
document.onselectstart = null;
// document.body.style.MozUserSelect = "text";

