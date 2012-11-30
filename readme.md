# Язык декларативного описания данных [![Build Status](https://secure.travis-ci.org/freaking-awesome/some-schema.png)](http://travis-ci.org/freaking-awesome/some-schema)
## [some.js](http://somejs.org/schema) / schema

Используется для моделирования сложных иерархических структур данных простым наглядным способом в виде вложенных схем. Поддерживает наследование и переопределение свойств. Реализует возможность валидации значений.

 

Установить — ``` npm install https://github.com/freaking-awesome/some-schema/archive/master.tar.gz ```

Протестировать — ``` npm test ```

 

## Использование

### Определение схемы объекта

Например, определение некоторой иерархии схем:
```javascript

var Schema= require('some-schema')

var Foo= Schema({
    'f': 'foo',
})

var Bar= Foo({
    'b': Schema.Property({ default:'bar' }),
})

var Baz= Bar({
    'b': Schema.Property({ default:'baz' }),
})
```
Дочерняя схема наследует тип и определения свойств родителя.


### Инстанцирование экземпляра схемы

Вызов конструктора:
```javascript
var baz= new Baz({
    'f':'foo-oo-o',
    'o':'other',
})
```
Возвращает объект определенного типа с объявленными свойствами согласно схеме:

```javascript
assert(baz instanceof Schema === true)

assert(baz instanceof Baz === true, baz instanceof Bar === true, baz instanceof Foo === true)
```

Определения свойств доступны в экземпляре в свойстве **properties**:
```javascript
assert( baz.properties )

assert( baz.properties.f.default === 'foo', baz.properties.f.value === 'foo-oo-o' )

assert( baz.properties.b.default === 'bar' )

assert( baz.properties.o === undefined )
```

 

## API и [документация](http://api.somejs.org)

 

 

# [Schema](https://github.com/freaking-awesome/some-schema/tree/master/lib/Schema)
Конструктор схемы.

 

##### Методы класса

### [Schema](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/index.js#L57)(properties)
Конструктор схемы. Возвращает дочерний конструктор, расширенный переданными определениями **properties**.

### [Schema.factory](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/index.js#L45)(Parent, properties)
Производит конструктор схемы на основе родительского конструктора **parent**, расширеный указанными свойствами **properties**.

 

##### Методы экземпляра

### new [Schema](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/index.js#L2)(value)
Конструктор экземпляра. Инстанцирует экземпляр схемы, объявляет свойства, и заполняет их переданными значениями **values**.

 

 

# [Schema.Property](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property)
Конструктор свойства схемы.

Представляет собой js-совместимый дескриптор свойства. Может быть сконструирован из js-дескриптора:
```javascript
descriptor= new Schema.Property(
    Object.getOwnPropertyDescriptor(obj, 'foo')
)
```

И может быть использован в качестве js-дескриптора:
```javascript
descriptor= Schema.Property(
    Object.defineProperty(obj, 'foo', new Schema.Property(
        configurable:true, default:null
    ))
)
```

Если при инстанцировании не указано значение, — ```decriptor.value```, — тогда дескриптор будет создан с закрытым от прямого изменения, — с помощь сеттера и геттера, — значением ```null```

 

##### Параметры свойств 
* **require**, или **required** — указывает на то, что свойство обязательно должно иметь некое значение. Простейший валидатор.
* **type** — указывает конструктор, экземпляром которого должно являться значение свойства. Если значение не соответствует указанному типу, свойство пытается инстанцировать значение нужного типа с помощью имеющегося конструктора. Если не получается — бросает исключение ```BadValueError```.
* **validate** — функция проверки значения. Может менять устанавливаемое значение. Для неподходящего бросает исключение ```BadValueError```.
* **enumerable** — свойство должно быть видимо. По умолчанию — ```false```.
* **configurable** — определение свойства можно изменить. По умолчанию — ```false```.
* **writable** — значение можно изменить. По умолчанию — ```false```.

 

##### Методы класса

### [Property.define](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L135)(obj, k, descriptor)
Определяет свойство в указанном объекте **obj** под именем **k** согласно определению **descriptor**.

### [Property.map](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L149)(obj, iterator)
Получает дескрипторы свойств объекта **obj** и передает их, и их имена в функцию **iterator(property, k)**
Если **iterator** не указан, — возвращает массив дескрипторов.

### [Property.copy](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L168) (src, obj)
Копирует свойства из объекта **src** в объект **obj**.

 

##### Методы экземпляра

### [property.define](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L103)(obj, k)
Определяет текущее свойство в указанном объекте **obj** под именем **k**.

### [property.validate](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L117)(value)
Проверяет значение **value** на соответствие требованиям свойства.

 

 

# [Schema.Property.BadValue](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L189)
Ошибка валидации значения.

 

 

## Лицензия
MIT