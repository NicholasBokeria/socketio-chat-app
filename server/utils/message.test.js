let expect = require('expect')

let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let user = {
            from: 'Nika',
            text: 'Hey hey'
        }
        let res = generateMessage(user.from, user.text);

        expect(res.from).toBe(user.from)
        expect(res.text).toBe(user.text)
        expect(res.createdAt).toBeA('number')
    })
})

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let location = {
            from: 'Admin',
            lat: 43,
            lon: 42,
            url: 'https://www.google.com/maps?q=43,42'
        }
        let res = generateLocationMessage(location.from, location.lat, location.lon)

        expect(res.from).toBe(location.from)
        expect(res.url).toBe(location.url)
    })
})
