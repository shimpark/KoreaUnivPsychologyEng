/*
* 대학내일
* Copyright(c) DAEHAKNAEIL. All rights reserved.
* Dual licensed under the MIT and GPL licenses
*/

/***********************************
* 작성목적 : http -> https 로 치환
***********************************/

if (window.location.protocol != "https:") {
    var host = window.location.hostname;
    var loc = "https:" + window.location.href.substring(window.location.protocol.length);

    window.location.href = loc;
}

var aesKey = "zbcd1efghi4jklm2nopq5rstu3vw6xya";

function AES_Encode(plain_text) {
    GibberishAES.size(256);
    return GibberishAES.aesEncrypt(plain_text, aesKey);
}

$(document).ready(function () {
    //checkbox plugin 적용
    if ($('.i-checks').length > 0) {
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });
    }

    //더블클릭 제한 적용
    if ($('.ladda-button').length > 0) {
        if ($(".ladda-button")[0]) {
            //Loading buttons
            $('.ladda-button').ladda('bind', { timeout: 2000 });
        }
    }
});

/*****************************
* 작성목적 : 특수문자 존재여부
*****************************/
ExistSpecialChar = function (p_name) {
    var re = /[<>()#{}']/gi;
    if (re.test(p_name)) {
        return false;
    }

    return true;
}

/*****************************
* 작성목적 : 경고창 배열로 출력하기
*****************************/
function Alert() {
    var args = [].join.call(arguments, ' : ')
    alert(args)
}

/*****************************
* 작성목적 : form to json

$('form').submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeFormJSON();
    console.log(data);

    //output
    Object
        email: "value"
        name: "value"
        password: "value"
});

*****************************/
$.fn.serializeFormJSON = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] || o[this.name] == "") {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/*****************************
* 작성목적 : form to json
            같은 name의 Value값이 있을 때 사용한다.

$('form').submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeFormJSONWithEmpty();
    console.log(data);

    //output
    Object
        param1 : "","value"
        param2 : "value","value"
        param3 : "value", ""
});

*****************************/
$.fn.serializeFormJSONWithEmpty = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] || o[this.name] == "") {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/*****************************
* 작성목적 : JSON 형식을 파라미터 형식으로 만들고 암호화 처리
*****************************/
GetJsonToEncParam = function (paramJson) {
    var response = "";

    //json 을 parameter 만든다.
    $.each(paramJson, function (key, value) {
        if (value == undefined) { return; }

        var valueString = "";
        if (typeof value == 'object') {
            //name 으로 여러개 tag 값 가져올 때 구분자는 특수문자 , 임 (c# 단에서 split 할때 ， 이걸로 하세요)
            var objValue = value;
            var first = false;
            $.each(objValue, function (i, iValue) {
                if (!first) {
                    valueString += iValue;
                    first = true;
                } else {
                    valueString += "，" + iValue;
                }
            });
        } else {
            valueString = value;
        }

        valueString = valueString.toString();
        valueString = valueString.replace(/&/g, "＆");
        valueString = valueString.replace(/=/gi, "＝");

        response += key + "=" + valueString + "&";
    });

    response = response.trimEnds("&");
    //josn 을 base64 로 암호화 한다.
    //response = Base64.encode(response);

    //aes 코드
    response = AES_Encode(response);

    //base64 값 중에 + 기호를 ~univ~ 로 치환한다.
    return response.replace(/[+]/gi, '~univ~');
}

/*****************************
* 작성목적 : JSON 형식을 파라미터 형식으로 만들고 암호화 처리
* parameter name이 동일할 때 (배열) 공백도 포함해서 암호화 처리
*****************************/
GetJsonToEncParamWithEmpty = function (paramJson) {
    var response = "";

    //json 을 parameter 만든다.
    $.each(paramJson, function (key, value) {
        if (value == undefined) { alert(key + " 값이 undefined 입니다."); return; }

        var valueString = "";

        if (typeof value == 'object') {
            var objValue = value;

            var b = false;
            $.each(objValue, function (i, iValue) {
                if (!b) {
                    valueString += iValue;
                    b = true;
                } else {
                    valueString += "，" + iValue;
                }
            });
        } else {
            valueString = value;
        }

        valueString = valueString.toString();
        valueString = valueString.replace(/&/g, "＆");
        valueString = valueString.replace(/=/gi, "＝");

        response += key + "=" + valueString + "&";
    });

    response = response.trimEnds("&");
    //josn 을 base64 로 암호화 한다.
    response = AES_Encode(response);
    //base64 값 중에 + 기호를 ~univ~ 로 치환한다.
    return response.replace(/[+]/gi, '~univ~');
}

/*****************************
* 작성목적 : GUID
*****************************/
Guids = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/*****************************
* 작성목적 : 동적 js 호출
*****************************/
CallJS = function (jsFileName) {
    var ran = Math.ceil(Math.random() * 500);
    jsFileName = jsFileName + "?v=" + ran;
    document.write("<scr" + "ipt type=\"text/javascript\" src=\"" + jsFileName + "\"></scr" + "ipt>");
}

/**********************************************************************************************
* 작성목적 : POPUP 창 가운데 띄우기
**********************************************************************************************/
PopupWinOpen = function (url, parm, winName, width, height, pro) {
    var sw = screen.availWidth;
    var sh = screen.availHeight;

    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        height = parseInt(height) + parseInt(50);
    }

    var px = (sw - width) / 2;
    var py = (sh - height) / 2;

    var opt = 'top=' + py + ',left=' + px + ',width=' + width + ',height=' + height + ',' + pro;

    var objPopup = null;

    if (parm != "") {
        objPopup = window.open(url + '?' + parm, winName, opt);
        objPopup.focus();
    } else {
        objPopup = window.open(url, winName, opt);
        objPopup.focus();
    }

    if (objPopup == null) {
        // safari 는 window.open 기본적으로 차단되어 있음
        alert("Please allow me to access window open");
        return;
    }

    return objPopup;
}

/**********************************************************************************************
* 작성목적 : 레이어 팝업
**********************************************************************************************/
PopupWin = function (w, h, url, title) {
    var modelWidth = w + 70;
    $('#modalDialogWidth').attr('style', 'width: ' + modelWidth + 'px !important');

    $('#ModalIfrm').attr("src", url);
    $('#ModalIfrm').attr("width", w);
    $('#ModalIfrm').attr("height", h);

    $('#ModalContact').find(".modal-title").html(title);
    $('#ModalContact').modal({ show: true });
}

/**************************************************
* 작성목적 : 날짜 비교
***************************************************/
CompareDT = function (p_sDate, p_eDate, p_compare) {
    var dateformat = "yy-mm-dd";
    p_sDate = p_sDate.replaceText("-", "");
    p_eDate = p_eDate.replaceText("-", "");
    p_sDate = Number(p_sDate.substring(0, 4) + p_sDate.substring(4, 6) + p_sDate.substring(6, 8));
    p_eDate = Number(p_eDate.substring(0, 4) + p_eDate.substring(4, 6) + p_eDate.substring(6, 8));

    switch (p_compare) {
        case "equal":
            if (p_sDate == p_eDate) {
                return true;
            }
            break;
        case "not":
            if (p_sDate != p_eDate) {
                return true;
            }
            break;
        case "less":
            if (p_sDate < p_eDate) {
                return true;
            }
            break;
        case "greater":
            if (p_sDate > p_eDate) {
                return true;
            }
            break;
        case "lessequal":
            if (p_sDate <= p_eDate) {
                return true;
            }
            break;
        case "greaterequal":
            if (p_sDate >= p_eDate) {
                return true;
            }
            break;
        default:
            return false;
            break;
    }

    return false;
}

/**************************************************
* 작성목적 : 년 월 일 파리미터로 다국어 표현삭하기
***************************************************/
GetMultiDate = function (p_year, p_month, p_day) {
    var p_month = (p_month < 10) ? '0' + p_month : p_month;
    var p_day = (p_day < 10) ? '0' + p_day : p_day;
    var getDate = p_year + "-" + p_month + "-" + p_day;
    return getDate;
}

/**************************************************
* 작성목적 : 년월일 8자리를 다국어로 표현식하기
***************************************************/
GetMultiDate2 = function (dateYMD, cult) {
    if (dateYMD == undefined) {
        return "";
    }

    if (dateYMD.length == 8) {
        return dateYMD.substr(0, 4) + "-" + dateYMD.substr(4, 2) + "-" + dateYMD.substr(6, 2)
    }
    else {
        return dateYMD;
    }
}

/**************************************************
* 작성목적 : 시분초 문자 6자리를 표현식으로 표현하기 00:00:00
***************************************************/
GetMultiTime = function (hhmmss) {
    if (hhmmss.length == 6) {
        return hhmmss.substr(0, 2) + ":" + hhmmss.substr(2, 2) + ":" + hhmmss.substr(4, 2)
    }
    else {
        return hhmmss;
    }
}

/**************************************************
* 작성목적 : datetime ("/Date(1499158800000)/" 을 string 형태로 표기
***************************************************/
GetMultiDateTime = function (date, useHM, cult) {
    if (useHM == undefined || useHM == "") { useHM = false; }
    if (cult == undefined || cult == "") { cult = "ko"; }
    var value = new Date(parseInt(date.replace(/(^.*\()|([+-].*$)/g, '')));

    var formatted = "";

    //yyyy-MM-dd
    if (cult == "ko") {
        formatted = value.getFullYear() + "-" +
            ("0" + (value.getMonth() + 1)).slice(-2) + "-" +
            ("0" + value.getDate()).slice(-2);
    }

    //시분사용여부
    if (useHM) {
        formatted += " " +
            ("0" + value.getHours()).slice(-2) + ":" +
            ("0" + value.getMinutes()).slice(-2);
    }

    return formatted;
}

/**************************************************
* 작성목적 : 모바일 기기 체크
***************************************************/
IsMobieDevice = function () {
    var isMobile = false;

    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }

    return isMobile
}

/**********************************************************************************************
Base64 encode / decode
**********************************************************************************************/

var Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64._utf8_decode(output);

        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return string;
    },

    URLEncode: function (string) {
        return escape(this._utf8_encode(string));
    },

    // public method for url decoding
    URLDecode: function (string) {
        return this._utf8_decode(unescape(string));
    }
}

/**********************************************************************************************
작성목적 : 뒷자리 하나 없애기
**********************************************************************************************/
String.prototype.trimEnds = function (c) {
    if (c) return this.replace(new RegExp(c.escapeRegExp() + "*$"), '');
    return this.replace(/\s+$/, '');
};

String.prototype.escapeRegExp = function () {
    return this.replace(/[.*+?^${}()|[\]\/\\]/g, "\\$0");
};

/**********************************************************************************************
작성목적 : 특수문자 제거(보안 이슈)
**********************************************************************************************/
String.prototype.securityText = function () {
    var vals = this.replace(/&/g, "＆");
    vals = vals.replace(/=/gi, "＝");

    return vals;
};

/**********************************************************************************************
작성목적 : 날짜 특수문자 제거
**********************************************************************************************/
String.prototype.dateCharRemove = function () {
    var vals = this.replace(/[\-]/gi, "");
    vals = vals.replace(/[\/]/gi, "");
    vals = vals.replace(/[\.]/gi, "");

    return vals;
};

/**********************************************************************************************
작성목적 : 모든 문자열을 변경 :replaceText('the','a')
**********************************************************************************************/
String.prototype.replaceText = function (find, replaceWith) {
    return this.split(find).join(replaceWith);
};

/**********************************************************************************************
작성목적 : 양쪽 공백 제거
**********************************************************************************************/
String.prototype.trimText = function () {
    return jQuery.trim(this);
};

/**********************************************************************************************
작성목적 : 금액 표기
**********************************************************************************************/
String.prototype.toMoney = function () {
    var num = this.replaceText();
    while ((/(-?[0-9]+)([0-9]{3})/).test(num)) {
        num = num.replace((/(-?[0-9]+)([0-9]{3})/), "$1,$2");
    }
    return num;
};

/**********************************************************************************************
작성목적 : 사업자 등록번호 표기
**********************************************************************************************/
String.prototype.toCompanyNumber = function () {
    if (this == undefined) {
        return "";
    }

    var num = this.replaceText();

    if (num.length == 10) {
        return num.substr(0, 3) + "-" + num.substr(3, 2) + "-" + num.substr(5, 5);
    }
    else {
        return num;
    }
};

/**********************************************************************************************
작성목적 : 카드번호 표기
**********************************************************************************************/
String.prototype.toCardNumber = function () {
    var num = this.replaceText();

    if (num.length == 16) {
        return num.substr(0, 4) + "-" + num.substr(4, 4) + "-" + num.substr(8, 4) + "-" + num.substr(12, 4);
    }
    else {
        return num;
    }
};

/**********************************************************************************************
금액표기
**********************************************************************************************/
Number.prototype.toMoney = function () {
    if (this == 0) return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
    while (reg.test(n)) { n = n.replace(reg, '$1' + ',' + '$2'); }
    return n;
};

/**********************************************************************************************
Json을 String으로 변환
**********************************************************************************************/
jQuery.extend({
    stringify: function stringify(obj) {
        if ("JSON" in window) {
            return JSON.stringify(obj);
        }

        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj.replace(/"/g, '\\\"') + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof (v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") {
                        v = '"' + v.replace(/"/g, '\\\"') + '"';
                    } else if (t == "object" && v !== null) {
                        v = jQuery.stringify(v);
                    }
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }

            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});

/**********************************************************************************************
금액 입력시 숫자 체크
input 금액 입력시 keyup에서 사용
**********************************************************************************************/
GetInputMoney = function (obj) {
    var price = $(obj).val().replace(/,/g, "").replace("NaN", "");
    if (price == "-") {
        return "-";
    }
    else if (isNaN(price)) {
        return "";
    }
    else {
        return price;
    }
}

/**********************************************************************************************
금액 입력 시, 컴마 표기
input 금액 입력시 keyup에서 사용
**********************************************************************************************/
SetInputMoney = function (obj, event) {
    if (event.keyCode == 37 || event.keyCode == 39) {
        return;
    }

    var price = $(obj).val().replace(/,/g, "").replace("NaN", "");
    if (price == "-") {
        $(obj).val(price);
    }
    else if (isNaN(price)) {
        $(obj).val("");
    }
    else {
        $(obj).val(price.toMoney());
    }
}

/**********************************************************************************************
* 작성목적 : 사업자등록번호 체크
**********************************************************************************************/
CheckCompanyNumber = function (compNo) {
    compNo = compNo.replace(/-/g, "");
    var sum = 0;
    var getlist = new Array(10);
    var chkvalue = new Array("1", "3", "7", "1", "3", "7", "1", "3", "5");
    for (var i = 0; i < 10; i++) { getlist[i] = compNo.substring(i, i + 1); }
    for (var i = 0; i < 9; i++) { sum += getlist[i] * chkvalue[i]; }
    sum = sum + parseInt((getlist[8] * 5) / 10);
    sidliy = sum % 10;
    sidchk = 0;
    if (sidliy != 0) { sidchk = 10 - sidliy; }
    else { sidchk = 0; }
    if (sidchk != getlist[9]) { return false; }
    return true;
}

/**********************************************************************************************
* 작성목적 : 주민등록번호 체크
**********************************************************************************************/
function CheckRes(ssn) {
    ssn = ssn.replace(/-/g, "");

    var sum = 0;
    var month = ssn.substr(2, 2);
    var day = ssn.substr(4, 2);

    if (ssn.length != 13) {
        return false;
    }

    if (ssn.substr(7, 5) == "00000") {
        return false;
    }

    //월의 경우 13월을 넘지 않아야 한다.
    if (month < 13 && month != 0 && day != 0) {
        //2월의 경우
        if (month == 2) {
            //29일을 넘지 않아야 한다.
            if (day > 29) return false;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            // 4,6,9,11월의 경우 30일을 넘지 않아야 한다.
            if (day > 30) return false;
        } else {
            // 그외 월이 31일을 넘지 않아야 한다.
            if (day > 31) return false;
        }
    } else {
        return false;
    }

    for (var i = 0; i < 12; i++) {
        sum += Number(ssn.substr(i, 1)) * ((i % 8) + 2);
    }

    if (ssn.substr(6, 1) == 1 || ssn.substr(6, 1) == 2 || ssn.substr(6, 1) == 3 || ssn.substr(6, 1) == 4 || ssn.substr(6, 1) == 9 || ssn.substr(6, 1) == 0) {
        //내국인 주민번호 검증(1900(남/여) 2000(남/여))
        if (((11 - (sum % 11)) % 10) == Number(ssn.substr(12, 1))) {
            return true;
        }
        return false;
    } else if (ssn.substr(6, 1) == 5 || ssn.substr(6, 1) == 6 || ssn.substr(6, 1) == 7 || ssn.substr(6, 1) == 8) {
        //외국인 주민번호 검증(1900(남/여) 2000(남/여))
        if (Number(ssn.substr(8, 1)) % 2 != 0) {
            return false;
        }
        if ((((11 - (sum % 11)) % 10 + 2) % 10) == Number(ssn.substr(12, 1))) {
            return true;
        }
        return false;
    }

    return true;  //정상 주민번호
}

/**********************************************************************************************
* 작성목적 : 0으로 채우기
**********************************************************************************************/
function FillZeros(str, digits) {
    var zero = '';
    if (str.length < digits) {
        for (i = 0; i < digits - str.length; i++) {
            zero += '0';
        }
    }
    return zero + str;
}

/**********************************************************************************************
* 작성목적 : 한글제거
**********************************************************************************************/
function RemoveKor(obj) {
    var regexp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/g; // 한글제거
    obj.value = obj.value.replace(regexp, '');
}

/**********************************************************************************************
* 작성목적 : 쿠키저장
**********************************************************************************************/
function SetCookie(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

/**********************************************************************************************
* 작성목적 : 쿠키값 가져오기
**********************************************************************************************/
function GetCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;

    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);

        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;

            return unescape(document.cookie.substring(y, endOfCookie));
        }

        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0) break;
    }

    return "";
}

/**********************************************************************************************
* 작성목적 : 날짜 형태 확인하기 (xxxx-xx-xx)
**********************************************************************************************/
function IsValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx))
        return false;
    var d;
    if (!((d = new Date(dateString)) | 0))
        return false;
    return d.toISOString().slice(0, 10) == dateString;
}

/**********************************************************************************************
* 작성목적 : jquery 로 post 발송하기
**********************************************************************************************/
/*
jQuery Redirect v1.0.1

Copyright (c) 2013-2015 Miguel Galante
Copyright (c) 2011-2013 Nemanja Avramovic, www.avramovic.info

Licensed under CC BY-SA 4.0 License: http://creativecommons.org/licenses/by-sa/4.0/

This means everyone is allowed to:

Share - copy and redistribute the material in any medium or format
Adapt - remix, transform, and build upon the material for any purpose, even commercially.
Under following conditions:

Attribution - You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
ShareAlike - If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

*/
(function ($) {
    'use strict';

    /**
     * jQuery Redirect
     * @param {string} url - Url of the redirection
     * @param {Object} values - (optional) An object with the data to send. If not present will look for values as QueryString in the target url.
     * @param {string} method - (optional) The HTTP verb can be GET or POST (defaults to POST)
     * @param {string} target - (optional) The target of the form. "_blank" will open the url in a new window.
     */
    $.redirect = function (url, values, method, target) {
        method = (method && ["GET", "POST", "PUT", "DELETE"].indexOf(method.toUpperCase()) != -1) ? method.toUpperCase() : 'POST';

        if (!values) {
            var obj = $.parseUrl(url);
            url = obj.url;
            values = obj.params;
        }

        var form = $('<form>')
            .attr("method", method)
            .attr("action", url);

        if (target) {
            form.attr("target", target);
        }

        var submit = {}; //Create a symbol
        form[0][submit] = form[0].submit;
        iterateValues(values, [], form);
        $('body').append(form);
        form[0][submit]();
    };

    //Utility Functions
    /**
     * Url and QueryString Parser.
     * @param {string} url - a Url to parse.
     * @returns {object} an object with the parsed url with the following structure {url: URL, params:{ KEY: VALUE }}
     */
    $.parseUrl = function (url) {
        if (url.indexOf('?') === -1) {
            return {
                url: url,
                params: {}
            };
        }
        var parts = url.split('?'),
            query_string = parts[1],
            elems = query_string.split('&');
        url = parts[0];

        var i, pair, obj = {};
        for (i = 0; i < elems.length; i += 1) {
            pair = elems[i].split('=');
            obj[pair[0]] = pair[1];
        }

        return {
            url: url,
            params: obj
        };
    };

    //Private Functions
    var getInput = function (name, value, parent, array) {
        var parentString;
        if (parent.length > 0) {
            parentString = parent[0];
            var i;
            for (i = 1; i < parent.length; i += 1) {
                parentString += "[" + parent[i] + "]";
            }

            if (array) {
                name = parentString + "[]";
            } else {
                name = parentString + "[" + name + "]";
            }
        }

        return $("<input>").attr("type", "hidden")
            .attr("name", name)
            .attr("value", value);
    };

    var iterateValues = function (values, parent, form, array) {
        var i, iterateParent = [];
        for (i in values) {
            if (typeof values[i] === "object") {
                iterateParent = parent.slice();
                if (array) {
                    iterateParent.push('');
                } else {
                    iterateParent.push(i);
                }
                iterateValues(values[i], iterateParent, form, Array.isArray(values[i]));
            } else {
                form.append(getInput(i, values[i], parent, array));
            }
        }
    };
}(window.jQuery || window.Zepto || window.jqlite));

/**
 * selectbox년도를 생성합니다.
 * @param inputID - selectBox Id
 * @param base - 기본년도
 * @param selectedData - selectBox 선택된 값
 * @param options - 옵션 (필수사항 아님)
 */
yearSelectBoxDynamic = function (inputID, base, selectedData, options) {
    if ($("#" + inputID).length <= 0) return;

    var defaults = {
        tum: "-10:+10"		//범위
        , all: false		//전체 생성여부
        , dynamic: true	//동적 추가 여부
        , text: "전체"		//기본 text
    };

    var option_st = '<option value=';
    var option_en = '년</option>';

    var settings = $.extend({}, defaults, options);

    var min_tum = Number(settings['tum'].split(':')[0] == null ? "0" : settings['tum'].split(':')[0]);
    var plus_tum = Number(settings['tum'].split(':')[1] == null ? "0" : settings['tum'].split(':')[1]);

    var resultArray = new Array();

    for (var i = Number(base) - 1; i >= (Number(base) + min_tum); i--) {
        if (i == selectedData)
            resultArray.push(option_st + '"' + i + '" selected="selected">' + i + option_en);
        else
            resultArray.push(option_st + '"' + i + '">' + i + option_en);

        if (i == (Number(base) + min_tum) && settings['all']) {
            if (selectedData == null || selectedData == '')
                resultArray.push(option_st + '"" selected="selected">' + settings['text'] + option_en);
            else
                resultArray.push(option_st + '"">' + settings['text'] + option_en);
        }
    }

    resultArray.reverse();

    if (Number(base) == selectedData)
        resultArray.push(option_st + '"' + base + '" selected="selected">' + base + option_en);
    else
        resultArray.push(option_st + '"' + base + '">' + base + option_en);

    for (var i = (Number(base) + 1); i <= (Number(base) + plus_tum); i++) {
        if (i == selectedData)
            resultArray.push(option_st + '"' + i + '" selected="selected">' + i + option_en);
        else
            resultArray.push(option_st + '"' + i + '">' + i + option_en);
    }

    $("#" + inputID).html(resultArray.join(''));

    if (!settings['all'] && settings['dynamic']) {
        var this_idx, this_last, selectedVal, obj;
        $("#" + inputID).change(function () {
            obj = this;
            this_idx = $("option", obj).index($("option:selected", obj));
            this_last = $("option", obj).length - 1;
            selectedVal = Number($("option:selected", obj).val());
            resultArray = new Array();

            if (this_idx == 0) {
                for (var i = (selectedVal - 1); i >= (selectedVal - 10); i--) {
                    resultArray.push(option_st + '"' + i + '">' + i + option_en);
                }

                resultArray.reverse();
                $(obj).prepend(resultArray.join(''));
            }
            else if (this_idx == this_last) {
                for (var i = (selectedVal + 1); i <= (selectedVal + 10); i++) {
                    resultArray.push(option_st + '"' + i + '">' + i + option_en);
                }
                $(obj).append(resultArray.join(''));
            }
        });
    }
}

/**
 * form 동적 post 전송
 * @param requJson - json 데이터
 * @param action - 이동경로
 */
PostSubmit = function (requJson, action, isDownload) {
    var encParam = GetJsonToEncParam(requJson);

    var $form = $('<form></form>');
    $form.attr('action', action);
    $form.attr('method', 'post');
    if (isDownload) {
        $form.attr('target', 'iFrm');
    }
    $form.appendTo('body');

    var p = $('<input name="p" type="hidden" value="' + encParam + '">');

    $form.append(p);
    $form.submit();
    $form.remove();
}

/**
 * SUBMIT 버튼 더블클릭 차단하기
 */
var doubleSubmitFlag = false;
DoubleSubmitCheck = function () {
    if (doubleSubmitFlag) {
        return doubleSubmitFlag;
    } else {
        doubleSubmitFlag = true;
        return false;
    }
}
