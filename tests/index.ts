import { $, AR } from '../src/extjs';

let base = '../api/index.php?';

$('.test').forEach(function() {
    let test_url = $(this).attr('data-url');
    try {
        $(this).html('Launched test for ' + test_url);

        AR.GET(base + test_url, data => {
            console.log(test_url);
            if ($(this).attr('data-format') == 'json') {
                let e = $(this).attr('data-expected');

                let e_p: string[] = e.split('=>')[1].split(',');
                e_p = e_p.map(k => k.trim());

                let d;

                let result = '';

                try {
                    d = JSON.parse(data);
                } catch (error) {
                    result += `<br><span style="color:red"> <h3> Test failed ${test_url}: <br /> ${data}</h3> </span> `;
                    $(this).html(result);
                    return;
                }

                let toTest = {};

                if (e.indexOf('[]') == 0) {
                    toTest = d[0];
                } else if (e.indexOf('{}') == 0) {
                    toTest = d;
                } else {
                    $(this).html('Test description error');
                    return false;
                }

                e_p.forEach((p: string) => {
                    //@ts-ignore
                    if (toTest[p] == undefined) {
                        result += `<br><span style="color:red"> <h3> >>>>>>> Test failed for ${p} @ ${test_url} <<<<<<< </h3> </span> `;
                    } else {
                        result += `<br><span style="color:green"> >> Test passed for ${p} @ ${test_url}</span>`;
                    }
                });

                let keys = Object.keys(toTest);
                console.log(keys, e_p);
                keys.forEach(key => {
                    if (e_p.indexOf(key) < 0) {
                        result += `<br><span style="color:orange"> >> Warning unknown <b style="color:red;">${key}</b> given but not in the test</span>`;
                    }
                });
                //result += '<br />' + JSON.stringify(toTest);

                $(this).html(result);
            } else {
            }
        });
    } catch (error) {
        $(this).html('Error while testing ' + base + test_url);
    }
});
