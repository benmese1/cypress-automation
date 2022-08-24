const faker = require("faker")

let randomPayload = [
{
    "name": faker.random.alpha(5),
    "static": false,
    "type": randomWord,
    "min": 1,
    "max": 100000,
    "default": 1
}
]

let longLat = [{
    "name": faker.random.alpha(5) + '-latitude',
    "static": false,
    "type": "location",
    "lat": faker.address.latitude(),
    "long": faker.address.longitude(),
    "radius": faker.datatype.number({ 'min': 1, 'max': 1000000 }
    )
}]
