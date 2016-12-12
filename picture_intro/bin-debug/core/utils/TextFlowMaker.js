/**
 * Created by Saco on 16/5/20.
 */
var TextFlowMaker = (function () {
    function TextFlowMaker() {
    }
    var d = __define,c=TextFlowMaker,p=c.prototype;
    p.makeTextFlow = function (sourceText) {
        var result = [];
        if (!sourceText || sourceText == "") {
            return [];
        }
        var tempIndex;
        sourceText = sourceText.replace(/\\\{/g, "\|Saco\|");
        sourceText = sourceText.replace(/\\\}/g, "\|Sacoz\|");
        sourceText = sourceText.replace(/\\\,/g, "\|Saco1\|");
        sourceText = sourceText.replace(/\\\:/g, "\|Saco2\|");
        while (sourceText.length) {
            tempIndex = sourceText.indexOf("{");
            if (tempIndex > 0) {
                result.push(this.getTextFlowElement(sourceText.slice(0, sourceText.indexOf("{"))));
                sourceText = sourceText.slice(sourceText.indexOf("{"));
            }
            else if (tempIndex == 0) {
                result.push(this.getTextFlowElement(sourceText.slice(tempIndex, sourceText.indexOf("}") + 1)));
                sourceText = sourceText.slice(sourceText.indexOf("}") + 1);
            }
            else {
                result.push(this.getTextFlowElement(sourceText));
                break;
            }
        }
        return result;
    };
    p.getTextFlowElement = function (text) {
        var textFlow = new TextFlowElement();
        if (text.charAt(0) == "{") {
            text = text.replace(/ *, */g, "\",\"");
            text = text.replace(/ *: */g, "\":\"");
            text = text.replace(/\{/g, "\{\"");
            text = text.replace(/}/g, "\"\}");
            var textStyle = JSON.parse(text);
            textFlow.text = this.resumeText(textStyle.t);
            textFlow.style = new TextFlowElementStyle();
            textFlow.style.textColor = textStyle.c;
            textFlow.style.size = textStyle.s;
            textFlow.style.underline = textStyle.u;
            textFlow.style.italic = textStyle.i;
            textFlow.style.bold = textStyle.b;
            textFlow.style.stroke = textStyle.st;
            textFlow.style.strokeColor = textStyle.sc;
            textFlow.style.fontFamily = textStyle.f;
            textFlow.style.target = textStyle.ta;
            if (textStyle.h) {
                textFlow.style.href = textStyle.h;
            }
            if (textStyle.e) {
                textFlow.style.href = "event:" + textStyle.e;
            }
        }
        else {
            textFlow.text = this.resumeText(text);
        }
        return textFlow;
    };
    p.resumeText = function (text) {
        text = text.replace(/\|Saco\|/g, "\{");
        text = text.replace(/\|Sacoz\|/g, "\}");
        text = text.replace(/\|Saco1\|/g, "\,");
        text = text.replace(/\|Saco2\|/g, "\:");
        return text;
    };
    return TextFlowMaker;
}());
egret.registerClass(TextFlowMaker,'TextFlowMaker');
var TextFlowElement = (function () {
    function TextFlowElement(text) {
        this.text = text;
    }
    var d = __define,c=TextFlowElement,p=c.prototype;
    return TextFlowElement;
}());
egret.registerClass(TextFlowElement,'TextFlowElement',["egret.ITextElement"]);
var TextFlowElementStyle = (function () {
    function TextFlowElementStyle() {
    }
    var d = __define,c=TextFlowElementStyle,p=c.prototype;
    return TextFlowElementStyle;
}());
egret.registerClass(TextFlowElementStyle,'TextFlowElementStyle',["egret.ITextStyle"]);
