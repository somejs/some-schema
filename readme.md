# [some-schema](http://somejs.org/schema) [![Build Status](https://secure.travis-ci.org/somejs/some-schema.png)](http://travis-ci.org/somejs/some-schema)

Язык декларативного описания данных.

Используется для моделирования сложных структур данных в виде вложенных схем. Поддерживает наследование и переопределение свойств. Реализует возможность валидации значений.

 
## Установка
```
npm install https://github.com/somejs/some-schema/archive/master.tar.gz
npm test
```
Зависимостей нет. Для тестирования необходимы **[mocha]()** и **[chai]()**.

## Использование

### Определение схемы объекта

Например, определение схемы некоторого объекта:
```javascript
var Schema= require('some-schema')
var Foo= Schema({
    'f': Schema.Property({ value:'foo' }),
})
```
Возвращает конструктор схемы, определения свойств которого расширены переданными определениями.

Определение потомков:
```javascript
var Bar= Foo({
    'b': Schema.Property({ value:'bar' }),
})
var Baz= Bar({
    'b': Schema.Property({ value:'baz' }),
})
```
Возвращает конструктор потомка, который наследует тип и свойства родителя.

### Инстанцирование экземпляра
Переобъявляет свойства инстанцируемого объекта, значения которых — экземпляры *Schema.Property*.

К примеру, вызов конструктора схемы с указанными значениями свойств:
```javascript
var baz= new Baz({
    'f':'foo-oo-o',
    'o':'other',
})
```
Возвращает объект определенного типа:
```javascript
assert( // экземпляр схемы
    baz instanceof Schema === true
)
assert( // экземпляр потомков
    baz instanceof Foo === true 
,   baz instanceof Bar === true
,   baz instanceof Baz === true
)
```
Свойства объекта объявлены согласно определениям, со значениями переданными в конструктор:
```javascript
assert(
    baz.f == 'foo-oo-o'
,   baz.b == 'baz'
,   baz.o == 'other'
)
```
Определения свойств доступны в экземпляре через конструктор — *schema.constructor.properties*:
```javascript
assert(
    baz.constructor.properties
)
assert(
    baz.constructor.properties.f instanceof Schema.Property
,   baz.constructor.properties.f.value === 'foo'
)
assert(
    baz.constructor.properties.b instanceof Schema.Property
,   baz.constructor.properties.b.value === 'baz'
)
assert(
    undefined === baz.constructor.properties.o
)
```
В качестве определения свойства можно использовать схему:
```javascript
var User= Schema({
    'type': 'user',
    'name': Schema.Property({ value:'anonymous' }),
    'profile1': Schema.Property({ // первый вариант определения
        type: Schema({
            'type': 'profile',
            'firstname': Schema.Property(),
            'lastname': Schema.Property(),
            'midname': Schema.Property(),
        }),
        value: { // можно указать значение инициализации типа
            'firstname': 'Anonymous' // с заглавной же
        }
    }),
    'profile2': Schema({ // второй вариант определения
        'type': 'profile',
        'firstname': Schema.Property(),
        'lastname': Schema.Property(),
        'midname': Schema.Property(),
    }),
})
var user= new User({
    name: 'Alice',
    profile: {
        'firstname': 'Alice',
        'lastname': 'Selezneva'
    }
})
assert(
    user.properties.name instanceof Schema.Property
,   user.properties.profile instanceof Schema
)
```

 
## API и [документация](http://api.somejs.org/schema)

 
# [Schema](https://github.com/somejs/some-schema/tree/master/lib/Schema)
Схема. Модель js-объекта.

### [Schema](https://github.com/somejs/some-schema/blob/master/lib/Schema/index.js#L5) (parent, properties)
Расширяет переданный конструктор **parent** определениями **properties**. Если родительский конструктор не передан, расширяет конструктор схемы. Возвращает конструктор потомка.

### new [Schema](https://github.com/somejs/some-schema/blob/master/lib/Schema/index.js#L81) (values)
Инстанцирует экземпляр схемы, объявляет свойства, и заполняет их переданными значениями **values**.

 
##### Экспортирует

# [Schema.Property](https://github.com/somejs/some-schema/tree/master/lib/Schema/Property)
Свойство схемы. Модель дескриптора свойства js-объекта.

Может быть сконструирована из js-дескриптора:
```javascript
descriptor= new Schema.Property(
    Object.getOwnPropertyDescriptor(obj, 'foo')
)
```
И может быть использована в качестве js-дескриптора:
```javascript
Object.defineProperty(obj, 'foo', new Schema.Property(
    configurable:true, value:null
))
```

##### Параметры определения свойства

**property.type** — конструктор, экземпляром которого должно являться значение свойства. Если значение не соответствует указанному типу, свойство пытается инстанцировать значение нужного типа с помощью имеющегося конструктора. Если не получается — бросает исключение ```BadValueError```.

**property.value** — значение свойства.

##### Нативные параметры свойства

**property.enumerable** — свойство должно быть видимо. По умолчанию — ```false```.

**property.configurable** — определение свойства можно изменить. По умолчанию — ```false```.

**property.writable** — значение можно изменить. По умолчанию — ```false```.

##### Методы класса

### [Property.define](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L135) (obj, k, descriptor)
Определяет свойство в указанном объекте **obj** под именем **k** согласно определению **descriptor**.

### [Property.map](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L149) (obj, iterator)
Получает дескрипторы свойств объекта **obj** и передает их, и их имена в функцию **iterator(property, k)**
Если **iterator** не указан, — возвращает массив дескрипторов.

### [Property.copy](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L168) (src, obj)
Копирует свойства из объекта **src** в объект **obj**.

##### Методы экземпляра

### [property.define](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L103) (obj, k)
Определяет текущее свойство в указанном объекте **obj** под именем **k**.

### [property.validate](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L117) (value)
Проверяет значение **value** на соответствие требованиям свойства.

 
##### Экспортирует

# [Schema.Property.BadValue](https://github.com/somejs/some-schema/blob/master/lib/Schema/Property/index.js#L189)
Ошибка валидации значения.

 
## Лицензия
MIT