<p align="center">
  <img width="96" height="96" src="https://github.com/Rpsl/interview-report-generator/blob/master/assets/favicon.ico/android-icon-192x192.png?raw=true">
</p>

# Interview report generator

Страница с простой html формой, заполнив которую, можно получить отчет о проведенном собеседование. Чтобы не забывать о чем поговорил с кандидатом.

  - К странице с формой не подключаются никакие внешние скрипты, с целью уважения персональных данных
  - Страница работает в браузере и не требует backend
  - Данные формы сохраняются в localstorage браузера

[--> Форма <---](https://rpsl.github.io/interview-report-generator/)

## how it works?

- We have html page with static form
- Also we have `handlebars` template for pdf like page
- When we submit form, data from form compiled by `handelbars` into html, opens a new page and calls the print method

```javascript
function openPrintPage(content) {
    var printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
}
```


## development

```javascript
$ yarn install
$ yarn build

$ yarn serve
```

## todo

- [x] Autosize for textarea
- [x] ~~Create publish comand for generating static vesion in `docs/` forlder~~ at now gh-pages work from root of repo
- [ ] Add browsersync and autoreload
- [x] Add `serve` method and remove `web-server.sh`
- [ ] Make form dynamic