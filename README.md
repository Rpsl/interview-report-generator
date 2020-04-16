<p align="center">
  <img width="96" height="96" src="https://github.com/Rpsl/interview-report-generator/blob/master/assets/favicon.ico/android-icon-192x192.png?raw=true">
</p>

# Interview report generator

Страница с простой html формой, заполнив которую, можно получить отчет о проведенном собеседование. Чтобы не забывать о чем поговорил с кандидатом.

  - К странице с формой не подключаются никакие внешние скрипты, с целью уважения персональных данных
  - Страница работает в браузере и не требует backend
  - Данные формы сохраняются в localstorage браузера


[--> Форма <---](https://rpsl.github.io/interview-report-generator/)

---

## Development

```javascript
$ yarn install
$ yand build
```

## Todo

- [x] Autosize for textarea
- [ ] Create publish comand for generating static vesion in `docs/` forlder
- [ ] Add browsersync and autoreload
- [ ] Add `serve` method and remove `web-server.sh`
- [ ] Make form dynamic