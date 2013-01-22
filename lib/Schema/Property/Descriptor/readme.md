## Интерфейс дескриптора
# [Some.js](http://somejs.org/schema) / [Schema](https://github.com/freaking-awesome/some-schema/tree/master/lib/Schema) / [Property](https://github.com/freaking-awesome/some-schema/tree/master/lib/Schema/Property) / Descriptor


Может быть сконструирована из js-дескриптора:
```javascript
descriptor= new Schema.Property(
    Object.getOwnPropertyDescriptor(obj, 'foo')
)
```
И может быть использована в качестве js-дескриптора:
```javascript
Object.defineProperty(obj, 'foo', new Schema.Property(
    configurable:true, default:null
))
```

 

## API