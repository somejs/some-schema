describe('some-schema', require('./spec/tests')(
    require('./index')
))

describe('some-schema / Schema', require('./spec/tests/Schema')(
    require('./lib/Schema')
))
