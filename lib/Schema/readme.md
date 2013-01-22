# [some-schema](http://somejs.org/schema) / Schema

Схема.

 
## API

 
# [Schema](https://github.com/somejs/some-schema/tree/master/lib/Schema)
Схема. Модель js-объекта.

### [Schema](https://github.com/somejs/some-schema/blob/master/lib/Schema/index.js#L5) (parent, properties)
Расширяет переданный конструктор **parent** определениями **properties**. Если родительский конструктор не передан, расширяет конструктор схемы. Возвращает конструктор потомка.

### new [Schema](https://github.com/somejs/some-schema/blob/master/lib/Schema/index.js#L81) (values)
Инстанцирует экземпляр схемы, объявляет свойства, и заполняет их переданными значениями **values**.

 
# [Schema.Property](https://github.com/somejs/some-schema/tree/master/lib/Schema/Property)
Свойство схемы. Модель дескриптора свойства js-объекта.