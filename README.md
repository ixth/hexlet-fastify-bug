Похоже, в окружении Hexlet не подхватываются новые изменения: при прогоне тестов по адресу `/articles/new` отображается страница "article not found", будто не был добавлен хэндлер для `/articles/new`. При запуске тестов локально, этого не происходит.

Запуск тестов:

```sh
./exercise_internal/web-server.sh &
make test
kill $!
```
