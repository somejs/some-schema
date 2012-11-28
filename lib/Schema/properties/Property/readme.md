# [Some.js](http://somejs.org/) / [Schema](https://github.com/freaking-awesome/some-schema/tree/master/lib/Schema) / Property
Свойство схемы. Атомарная единица модели данных.

 

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

 

##### Параметры свойств схемы
* **require**, или **required** — указывает на то, что свойство обязательно должно иметь некое значение. Простейший валидатор.
* **validate** — функция проверки значения. Может менять устанавливаемое значение. Для неподходящего бросает исключение ```BadValueError```

##### Нативные параметры js-свойств
* **enumerable** — свойство должно быть видимо. По умолчанию — ```false```
* **configurable** — определение свойства можно изменить. По умолчанию — ```false```
* **writable** — значение можно изменить. По умолчанию — ```false```

 

##### Методы класса

### [Property.define](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L129) (obj, k, descriptor)
Определяет свойство в указанном объекте **obj** под именем **k** согласно определению **descriptor**.

### [Property.map](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L143) (obj, iterator)
Получает дескрипторы свойств объекта **obj** и передает их, и их имена в функцию **iterator(property, k)**
Если **iterator** не указан, — возвращает массив дескрипторов.

### [Property.copy](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L162) (src, obj)
Копирует свойства из объекта **src** в объект **obj**.

 

##### Методы экземпляра

### [property.define](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L97) (obj, k)
Определяет текущее свойство в указанном объекте **obj** под именем **k**.

### [property.validate](https://github.com/freaking-awesome/some-schema/blob/master/lib/Schema/properties/Property/index.js#L111) (value)
Проверяет значение **value** на соответствие требованиям свойства.