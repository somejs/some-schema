# Модель свойства схемы
## [Some.js](http://somejs.org/schema) / [Schema](https://github.com/freaking-awesome/some-schema/tree/master/lib/Schema) / Property

 

**Schema.Property** представляет собой js-совместимый дескриптор свойства.

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

 

## API

 

##### Параметры свойства схемы
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

 

##### Экспортирует

# [Schema.Property.BadValue](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L189)
Ошибка валидации значения.

 

 

## Лицензия
MIT