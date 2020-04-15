const FormStorage = require('form-storage');
const Handlebars = require("handlebars");

$(document).ready(function () {
    var storage = new FormStorage('.js-form-storage', {
        name: 'form-storage',
    });

    storage.apply();

    window.onbeforeunload = function (e) {
        return storage.save();
    };

    $('#interview').on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($(this).get(0).reportValidity() === false) {
            return;
        }

        var report = getReportObject($(this));

        openPrintPage(preparePrintTemplate(report));
    });

    $('#clear-form').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm("Очищаем форму?")) {
            storage.clear();
            
            window.onbeforeunload = function(e){
                return;
            }
            
            setTimeout(function(){window.location = "";}, 1000);
        }
    });
});

function getReportObject(form) {
    var data = form.serializeToJSON({
        associativeArrays: false
    });

    var report = {};
    var tmpskills = {};
    var hardskills = [];
    var softskills = [];
    var regexp = /(hard|soft)\[(\d+)\]\[(what|how|result)\]/

    $.each(data, function (k, v) {
        result = k.match(regexp);

        if (result === null) {
            return;
        }

        key = result[1] + '.' + result[2];

        if (tmpskills[key] === undefined) {
            tmpskills[key] = {
                "what": null,
                "how": null,
                "result": null
            };
        }
        tmpskills[key][result[3]] = v;
    });

    // console.log(tmpskills);
    $.each(tmpskills, function (k, v) {
        if (v.what === "" || v.how === "") {
            return;
        }

        if (v.result === "positive") {
            v.positive = true;
        }

        if (v.result === "negative") {
            v.negative = true;
        }

        if (k.substr(0, 4) === 'hard') {
            hardskills.push(v);
        } else {
            softskills.push(v);
        }
    });

    report = {
        "candidate": data.name,
        "who_talks": data.who_talks,
        "position": data.position,
        "hard-skills": hardskills,
        "soft-skills": softskills,
        "summary": data.summary,
        "summary-result": data.summary_result,
        "level": data.level,
        "verdict": data.verdict,
        "verdict_why": data.verdict_why
    };
console.log(report)
    return {
        report: report
    };
}

function preparePrintTemplate(report) {
    var source = document.getElementById("print-template").innerHTML;
    var template = Handlebars.compile(source);

    var html = template(report);

    return html;
}

function openPrintPage(content) {
    var printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
}