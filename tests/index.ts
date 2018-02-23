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

                let e_p = e.split('=>')[1].split(',');

                let d;

                let result = `<h2>${base + test_url}</h2>`;
                try {
                    d = JSON.parse(data);
                } catch (error) {
                    result += `<br><span style="color:red"> <h3> Test failed : <br /> ${data}</h3> </span> `;
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

                result += JSON.stringify(toTest) + '<br />';

                e_p.forEach((p: string) => {
                    //@ts-ignore
                    if (toTest[p.trim()] == undefined) {
                        result += `<br><span style="color:red"> <h3> >>>>>>> Test failed for ${p} @ ${test_url} <<<<<<< </h3> </span> `;
                    } else {
                        result += `<br><span style="color:green"> >> Test passed for ${p}</span>`;
                    }
                });

                $(this).html(result);
            } else {
            }
        });
    } catch (error) {
        $(this).html('Error while testing ' + base + test_url);
    }
});
